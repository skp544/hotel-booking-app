import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { validateTokenApi } from "../api/auth";
import { AppContext } from "../types";

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const isAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return setSuccess(false);
    }

    try {
      setLoading(true);
      const response = await validateTokenApi();
      setSuccess(response.success);
      if (!response.success) {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    isAuth();
  }, [loading]);

  return (
    <AppContext.Provider
      value={{
        success,
        isAuth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
