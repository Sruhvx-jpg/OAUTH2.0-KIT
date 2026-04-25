export const validateConfData = (config) => {
    const required = [
        "clientId",
        "clientSecret",
        "redirectUri",
        "discoveryUrl"
    ]

    for(const key of required){
        if(!required[key]){
            return new Error("CONFIG ERROR: Missing required config - ${key}")
        }
    }
}