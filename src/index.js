import Oauth from "./core/auth"
import { validateConfData } from "./core/validateConfigData"

export const createOauth = (config) => {
    validateConfData(config)
    const oauth =  new Oauth(config)

    return {
        generateState: () => oauth.generateState(),
        generateAuthUrl: (state) => oauth.generateAuthUrl(state),
        handleCallBack: async(code) => {
            const tokenObj = oauth.exchangeToken(code)
            const user = oauth.getUserInfo(tokenObj.access_token)

            return {tokeObj, user}
        }
    }
}