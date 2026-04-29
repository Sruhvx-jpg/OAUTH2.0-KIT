import axios from "axios"
import crypto from "node:crypto";
import { postMan } from "./httpHelper.js";

class Oauth {
    constructor(config){
        this.metadata = null,
        this.config = config
    }

    generatePKCE(){
        const codeVerifer = crypto.randomBytes(32).toString("base64url")

        const codeChallenge = crypto.createHash("sha256").update(codeVerifer).digest("base64url") 

        return {codeVerifer, codeChallenge}
    }

    async getMetaData () {
        if(this.metadata) return this.metadata
        
        const res = await axios.get(this.config.discoveryUrl)

        this.metadata = {
            auth: res.data.authorization_endpoint,
            token: res.data.token_endpoint,
            userInfo: res.data.userinfo_endpoint
        }

        return this.metadata
    }

    generateState(){
        return crypto.randomBytes(32).toString("hex")
    }

    async generateAuthUrl(state, codeChlnge) {
        const endpoint = await this.getMetaData()

        const params = new URLSearchParams({
            client_id: this.config.clientId,
            redirect_uri: this.config.redirectUri,
            response_type: "code",
            scope: "openid email profile",
            state: state,
            code_challenge: codeChlnge,
            code_challenge_method: "S256"
        });

        return `${endpoint.auth}?${params}`
    }
    
    async exchangeToken(code, codeVer) {
        const {token} =  await this.getMetaData()

        try {
            const res = await postMan(token, this.config, code, codeVer)
            return res.data
        } catch (error) {
            throw new Error("ERROR 2: Token Exchange Failure")
        }
    }

    async getUserInfo(accessToken) {
        const endPoint = await this.getMetaData()

        const res = await axios.get(endPoint.userInfo, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        return res.data
    }
}

export default Oauth