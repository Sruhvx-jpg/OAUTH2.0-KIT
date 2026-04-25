// src/core/http.js
import axios from "axios";

export const postForm = (url, data) => {
  return axios.post(
    url,
    new URLSearchParams(data),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
}