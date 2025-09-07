import axios from "axios";
import type { LoginSigninUser, loginSigninUserResponse } from "./types";

const resourceUser = "user";

async function login(
  loginUser: LoginSigninUser
): Promise<loginSigninUserResponse> {
  const url = `/${resourceUser}/login`;
  const body = loginUser;
  const fetched = await axios.post(url, body);
  return fetched.data;
}
async function signup(
  signupUser: LoginSigninUser
): Promise<loginSigninUserResponse> {
  const url = `/${resourceUser}/signup`;
  const body = signupUser;
  const fetched = await axios.post(url, body);
  return fetched.data;
}

export const userApis = {
  signup,
  login,
};
