export const validateConfData = (config) => {
    const required = [
        "clientId",
        "clientSecret",
        "redirectUri",
        "discoveryUrl"
    ]

    for(const key of required){
        if(!config[key]){
            throw new Error(`CONFIG ERROR: Missing required config - ${key}`)
        }
    }
}