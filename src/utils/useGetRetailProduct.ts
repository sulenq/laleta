import axios from "axios";
import useJwt from "../globalState/useJwt";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RetailProduct } from "../types";

const useGetRetailProduct = () => {
  const jwt = useJwt();
  const { outletId } = useParams();
  const [products, setProducts] = useState<RetailProduct[] | null>(null);
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
        console.log(response.data);
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    if (jwt) {
      getRetailProduct();
    }
  }, [jwt, outletId]);

  if (products) {
    return {
      status: true,
      data: products,
    };
  }

  if (error) {
    return {
      status: false,
      data: error,
    };
  }
};

export default useGetRetailProduct;
