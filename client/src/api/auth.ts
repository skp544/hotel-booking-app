import { catchError, getToken } from "../helper";
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

export const validateTokenApi = async () => {
  const token = getToken();
  try {
    const { data } = await client("/auth/validate-token", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    return catchError(error);
  }
};
