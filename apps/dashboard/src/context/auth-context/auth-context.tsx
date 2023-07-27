import { useMe } from "@/lib";
import React, {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export type IAuthContext = {
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { data, isLoading } = useMe();

  const value = useMemo(() => {
    return {
      isAuthenticated: !!data,
      isLoading,
    };
  }, [data, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
