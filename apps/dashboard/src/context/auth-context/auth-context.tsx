import React, {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

export type IAuth = {
  accessToken: string;
  refreshToken: string;
};

export type IAuthContext = {
  auth: IAuth;
};

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [auth, setAuth] = useState<IAuth>({
    accessToken: "",
    refreshToken: "",
  });

  const setAuthHandler = useCallback((auth: IAuth) => {
    setAuth(auth);
  }, []);

  const value = useMemo(() => {
    return {
      auth,
      setAuth: setAuthHandler,
    };
  }, [auth, setAuthHandler]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
