import { useState, useEffect } from "react";
import { getCookie } from "typescript-cookie";

const useJwt = () => {
  const [authState, setAuthState] = useState<string | null>(null);

  useEffect(() => {
    const authCookie = getCookie("_auth");
    if (authCookie) {
      setAuthState(authCookie);
    }
  }, []);

  return authState;
};

export default useJwt;
