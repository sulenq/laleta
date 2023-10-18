import React, { useEffect, useState } from "react";
import { Role } from "../types";
import { Navigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import FullPageSpinner from "../components/FullPageSpinner";

type Props = {
  allowedRoles: Role[];
  children: any;
};

export default function RequireAuth({ children }: Props) {
  const [page, setPage] = useState(<FullPageSpinner />);

  useEffect(() => {
    const authCookie = getCookie("_auth");
    if (authCookie) {
      setPage(children);
    } else {
      setPage(<Navigate to="/signin" />);
    }
  }, [children]);

  return page;
}
