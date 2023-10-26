import axios from "axios";
import useJwt from "../globalState/useJwt";
import { useEffect, useState } from "react";
import { RetailProduct } from "../types";

const useGetRetailProductByOutlet = (outletId: string | undefined) => {
  const jwt = useJwt();
  const [products, setProducts] = useState<RetailProduct[] | null>(null);
  const [notFound, setNotFound] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const options = {
      method: "GET",
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url: "api/retailproduct-by-outlet/" + outletId,
      headers: { Authorization: "Bearer " + jwt },
    };

    const getRetailProduct = async () => {
      try {
        const response = await axios.request(options);
        const res = response.data;
        console.log(res);

        if (res.status === 200) {
          setProducts(response.data.data);
        } else if (res.status === 404) {
          setNotFound(res.message);
        }
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    if (jwt) {
      getRetailProduct();
    }
  }, [jwt, outletId]);

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
        message: notFound,
      },
    };
  }

  if (products) {
    return {
      status: "found",
      data: products,
    };
  }
};

export default useGetRetailProductByOutlet;
