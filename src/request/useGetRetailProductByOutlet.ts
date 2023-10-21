import axios from "axios";
import useJwt from "../globalState/useJwt";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RetailProduct } from "../types";

const useGetRetailProductByOutlet = () => {
  const jwt = useJwt();
  const { outletId } = useParams();
  const [products, setProducts] = useState<RetailProduct[] | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const options = {
      method: "GET",
      baseURL: process.env.REACT_APP_BASE_URL,
      url: "api/retailproduct-by-outlet/" + outletId,
      headers: { Authorization: "Bearer " + jwt },
    };

    const getRetailProduct = async () => {
      try {
        const response = await axios.request(options);
        const res = response.data;
        console.log(res);

        if (res.status === 200) {
          setProducts(response.data.products);
        } else if (res.status === 404) {
          setNotFound(true);
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
        message: "Products not found",
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
