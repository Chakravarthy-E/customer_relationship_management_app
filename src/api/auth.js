import axios from "axios";
const BASE_URL = "https://relevel-crm--backend.herokuapp.com";

/**
 * Sign up
 * POST:api
 * url:/crm/api/v1/auth/signup
 * data: userId,email,name,password
 */
export async function userSignUp(data) {
  return await axios.post(`${BASE_URL}/crm/api/v1/auth/signup`, data);
}

/**
 * Sign in
 * POST:api
 * url:/crm/api/v1/auth/signin
 * data: userId,password
 */

export async function userSignIn(data) {
  return await axios.post(`${BASE_URL}/crm/api/v1/auth/signin`, data);
}


//post api

