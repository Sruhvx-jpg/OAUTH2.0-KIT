export const validateConfData = (config) => {
    const required = [
        "clientId",
        "clientSecret",
        "redirectUri",
        "discoveryUrl"
    ]

    for(const key of required){
        if(!config[key]){
            throw new Error(`ERROR 1: Missing required config - ${key}`)
        }
    }
}