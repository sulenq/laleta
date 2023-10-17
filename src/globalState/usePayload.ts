import { useState, useEffect } from "react";
import { getCookie } from "typescript-cookie";
import { AuthState } from "../types";

const usePayload = () => {
  const [authState, setAuthState] = useState<AuthState | null>(null);

  useEffect(() => {
    const authStateCookie = getCookie("_authState");
    if (authStateCookie) {
      setAuthState(JSON.parse(authStateCookie));
    }
  }, []);

  return authState;
};

export default usePayload;
