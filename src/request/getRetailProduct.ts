import axios from "axios";

const getRetailProduct = async (jwt: string, productId: string) => {
  const options = {
    method: "GET",
    baseURL: process.env.REACT_APP_BASE_URL,
    url: "api/retailproduct/" + productId,
    headers: { Authorization: "Bearer " + jwt },
  };

  try {
    const response = await axios.request(options);
    const res = response.data;
    console.log(res);

    if (res.status === 200) {
      return res;
    } else if (res.status === 404) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export default getRetailProduct;
