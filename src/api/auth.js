import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log(BASE_URL)

/** 
 * Sign up
 * POST: api
 * url: /crm/api/v1/auth/signup
 * data: userId, email, name, password
 */
export async function userSignUp(data) {
  return await axios.post(`${BASE_URL}/crm/api/v1/auth/signup`, data, {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

/**
 * Sign in
 * POST: api
 * url: /crm/api/v1/auth/signin
 * data: userId, password
 */
export async function userSignIn(data) {
  return await axios.post(`${BASE_URL}/crm/api/v1/auth/signin`, data, {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

// post api
