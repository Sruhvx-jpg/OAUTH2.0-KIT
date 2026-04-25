import Oauth from "./core/auth"
import { validateConfData } from "./core/validateConfigData"

export const createOauth = (config) => {
    validateConfData(config)
    const oauth =  new Oauth(config)

    return {
        generateState: () => await oauth.generateState(),
        generateAuthUrl: (state) => await oauth.generateAuthUrl(state),
        handleCallBack: async(code) => {
            const tokenObj = await oauth.exchangeToken(code)
            const user = await oauth.getUserInfo(tokenObj.access_token)

            return {tokenObj, user}
        }
    }
}