import { useState, useEffect } from "react";
import { getCookie } from "typescript-cookie";

const useJwt = () => {
  const [authState, setAuthState] = useState<string | null>(null);

  useEffect(() => {
    const authStateCookie = getCookie("_auth");
    if (authStateCookie) {
      setAuthState(authStateCookie);
    }
  }, []);

  return authState;
};

export default useJwt;
