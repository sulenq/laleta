import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useJwt from "../globalState/useJwt";
import { Outlet } from "../types";

const useGetRetailProduct = (productId: string | undefined) => {
  const [data, setProduct] = useState<Outlet | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const navigate = useNavigate();
  const jwt = useJwt();

  useEffect(() => {
    const getOutletOptions = {
      method: "GET",
      baseURL: process.env.REACT_APP_BASE_URL,
      url: "api/retailproduct/" + productId,
      headers: { Authorization: "Bearer " + jwt },
    };

    const getOutlet = async () => {
      try {
        const response = await axios.request(getOutletOptions);
        console.log(response.data);

        if (response.data.status === 200) {
          setProduct(response.data.data);
        } else if (response.data.status === 404) {
          setNotFound(true);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    if (!data && jwt) {
      getOutlet();
    }
  }, [jwt, data, productId, navigate]);

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
        message: "Product not found",
      },
    };
  }

  if (data) {
    return {
      status: "found",
      data: data,
    };
  }
};

export default useGetRetailProduct;
