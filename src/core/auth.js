import axios from "axios"
import crypto from "crypto";
import { postForm } from "./httpHelper";

class Oauth {
    constructor(config){
        this.metadata = null,
        this.config = config
    }

    async getMetaData () {
        if(this.metadata) return this.metadata
        
        const res = await axios.get(this.config.discoveryUrl)

        this.metadata = {
            auth: res.authorization_endpoint,
            token: res.token_endpoint,
            userInfo: res.userinfo_endpoint
        }

        return this.metadata
    }

    generateState(){
        return crypto.randomBytes(32).toString("hex")
    }

    async generateAuthUrl(state) {
        const endpoint = this.getMetaData()

        const params = new URLSearchParams({
            client_id: this.config.clientId,
            redirect_uri: this.config.redirectUri,
            response_type: "code",
            scope: "openid email profile",
            state: state
        });

        return `${endpoint.auth}?${params}`
    }
    
    async exchangeToken(code) {
        const endpoint =  await this.getMetaData()

        const payload = {
            client_id: this.config.clientId,
            client_secret: this.config.clientSecret,
            grant_type: "authorization_code",
            redirect_uri: redirectUri,
            code: code
        }

        const providerFeedback = await postForm(endpoint.token, payload)

        return providerFeedback.data
    }

    async getUserInfo(accessToken) {
        const endpoint = await this.getMetaData()

        const providerFeedback = await axios.get(endpoint.userInfo, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        return providerFeedback.data
    }
}

export default Oauth