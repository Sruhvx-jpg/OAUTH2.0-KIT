// src/core/http.js
import axios from "axios";

export const postMan = (tokenEP, config, code, codeVer) => {
  const payload = {
    client_id: config.clientId,
    grant_type: "authorization_code",
    redirect_uri: config.redirectUri,
    code: code
  }

  if(config.clientSecret){
    payload.client_secret =  config.clientSecret
  }

  if(codeVer){
    payload.code_verifier =  codeVer
  }


  return axios.post(
    tokenEP,
    new URLSearchParams(payload),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
}



