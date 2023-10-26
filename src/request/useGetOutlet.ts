import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useJwt from "../globalState/useJwt";
import { Outlet } from "../types";

const useGetOutlet = () => {
  const [outlet, setOutlet] = useState<Outlet | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const navigate = useNavigate();
  const { outletId } = useParams();
  const jwt = useJwt();

  useEffect(() => {
    const getOutletOptions = {
      method: "GET",
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: "api/outlet/" + outletId,
      headers: { Authorization: "Bearer " + jwt },
    };

    const getOutlet = async () => {
      try {
        const response = await axios.request(getOutletOptions);
        console.log(response.data);

        if (response.data.status === 200) {
          setOutlet(response.data.outlet);
        } else if (response.data.status === 404) {
          setNotFound(true);
          navigate("/signin");
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    if (!outlet && jwt) {
      getOutlet();
    }
  }, [jwt, outlet, outletId, navigate]);

  if (error) {
    return {
      status: "error",
      data: error,
    };
  }

  if (notFound) {
    return {
      status: "notFound",
      data: {
        message: "Outlet not found",
      },
    };
  }

  if (outlet) {
    return {
      status: "found",
      data: outlet,
    };
  }
};

export default useGetOutlet;
