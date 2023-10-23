import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import FullPageSpinner from "../components/FullPageSpinner";
import { Role } from "../types";

type Props = {
  allowedRoles: Role[];
  children: any;
};

export default function RequireAuth({ allowedRoles, children }: Props) {
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
