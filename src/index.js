import Oauth from "./core/auth"
import { validateConfData } from "./core/validateConfigData"

export const createOauth = (config) => {
    validateConfData(config)
    const oauth =  new Oauth(config)

    return {
        generateAuthUrl: async () =>  {
            const state = oauth.generateState()
            const {codeVerifer, codeChallenge} = oauth.generatePKCE()

            return {
                authUrl: await oauth.generateAuthUrl(state, codeChallenge),
                state,
                codeVerifer
            }
        },
        handleCallBack: async(code, codeVerifer) => {
            const tokenObj = await oauth.exchangeToken(code, codeVerifer)
            const user = await oauth.getUserInfo(tokenObj.access_token)

            return {tokenObj, user}
        }
    }
}