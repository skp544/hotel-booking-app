import { catchError } from "../helper";
import { RegisterFormData } from "../types";
import client from "./client";

export const registerApi = async (formData: RegisterFormData) => {
  try {
    const { data } = await client.post("/auth/register", formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return data;
  } catch (error) {
    return catchError(error);
  }
};
