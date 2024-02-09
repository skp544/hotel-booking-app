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

  const isAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return setSuccess(false);
    }

    try {
      const response = await validateTokenApi();
      setSuccess(response.success);
      if (!response.success) {
        return toast.error(response.message);
      }
    } catch (error) {
      return toast.error("An error occurred");
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

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
