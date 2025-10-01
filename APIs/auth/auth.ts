import { toasting } from "@/utils/toast";
import axios from "axios";

const api_base = `${process.env.NEXT_PUBLIC_API_BASE}users/`


export const signup = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${api_base}signup/`, { email, password });
    toasting("Account created", "success");
    return response.data;
  } catch (err: any) {
    toasting(`Error creating account ${err}`, "error");
    return null;
  }
};


export const signin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${api_base}signin/`, { email, password });
    toasting("Signin success", "success");
    localStorage.setItem("access", response.data.tokens.access);
    localStorage.setItem("refresh", response.data.tokens.refresh);
    return response.data.tokens;
  } catch (err: any) {
    toasting(`error in Signin: ${err}`,"error")
    return null;
  }
};