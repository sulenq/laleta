import React from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import useFormatNumber from "../utils/useFormatNumber";
import useReverseFormatNumber from "../utils/useReverseFormatNumber";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import retailProductCategory from "../const/retailProductCategory";
import useJwt from "../globalState/useJwt";
import { RetailProduct } from "../types";
import DeleteRetailProduct from "./DeleteRetailProduct";

type Props = {
  outletId: string;
  product: RetailProduct;
};

export default function RetailProductUpdateForm({ outletId, product }: Props) {
  const fn = useFormatNumber;
  const rfn = useReverseFormatNumber;
  const toast = useToast();
  const jwt = useJwt();

  const formik = useFormik({
    validateOnChange: false,

    validationSchema: yup.object().shape({
      code: yup.string().required("Code required"),
      name: yup.string().required("Name required"),
      category: yup.string().required("Category required"),
      price: yup
        .number()
        .required("Price required")
        .test("isNotZero", "Price required", (value) => value !== 0),
      stock: yup
        .number()
        .required("Stock required")
        .test("isNotZero", "Stock required", (value) => value !== 0),
    }),

    initialValues: {
      code: product.code,
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
    },

    onSubmit: (values) => {
      const options = {
        method: "PUT",
        baseURL: process.env.REACT_APP_BASE_URL,
        url: `api/retailproduct-update/${outletId}/${product?.id}`,
        headers: { Authorization: "Bearer " + jwt },
        data: values,
      };

      async function updateProduct() {
        try {
          const response = await axios.request(options);
          console.log(response.data);

          if (response.data.status === 200) {
            window.history.back();
            toast({
              title: response.data.message,
              description: `${values.code}, ${values.name}`,
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          } else if (response.data.status === 400) {
            const keys = Object.keys(response.data.invalid);
            toast({
              title: response.data.message,
              description: keys.map((i) => response.data.invalid[i]).join(", "),
              status: "error",
              duration: 10000,
              isClosable: true,
            });
          } else {
            toast({
              title: response.data.message,
              description: "Try to refreshing the page or comeback later",
              status: "error",
              duration: 10000,
              isClosable: true,
            });
          }
        } catch (error: any) {
          console.error(error);
          toast({
            title: "Error",
            description: error.message,
            status: "error",
            duration: 10000,
            isClosable: true,
          });
        }
      }

      if (jwt) {
        updateProduct();
      }
    },
  });

  return (
    <>
      <form
        id="updateProductForm"
        onSubmit={formik.handleSubmit}
        style={{ width: "100%" }}
      >
        <FormControl isInvalid={formik.errors.code ? true : false} mb={4}>
          <FormLabel>Code</FormLabel>
          <Input
            placeholder="098736287123"
            onChange={(e) => {
              formik.setFieldValue("code", e.target.value);
            }}
            value={formik.values.code}
          />
          <FormErrorMessage>{formik.errors.code}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.errors.name ? true : false} mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Indomie Nyemek"
            onChange={(e) => {
              formik.setFieldValue("name", e.target.value);
            }}
            value={formik.values.name}
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.errors.category ? true : false} mb={4}>
          <FormLabel>Category</FormLabel>
          <Select
            placeholder="Select Category"
            onChange={(e) => {
              formik.setFieldValue("category", e.target.value);
            }}
            value={formik.values.category}
          >
            {retailProductCategory.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{formik.errors.category}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.errors.price ? true : false} mb={4}>
          <FormLabel>Price</FormLabel>
          <Input
            placeholder="3.500"
            onChange={(e) => {
              formik.setFieldValue("price", rfn(e.target.value));
            }}
            value={fn(parseInt(formik.values.price))}
          />
          <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.errors.stock ? true : false}>
          <FormLabel>Stock</FormLabel>
          <Input
            placeholder="47"
            onChange={(e) => {
              formik.setFieldValue("stock", rfn(e.target.value));
            }}
            value={fn(parseInt(formik.values.stock))}
          />
          <FormErrorMessage>{formik.errors.stock}</FormErrorMessage>
        </FormControl>
      </form>

      <VStack w={"100%"} align={"stretch"} mt={4}>
        <Button
          type="submit"
          form="updateProductForm"
          className="clicky"
          colorScheme="bnw"
        >
          Update Product
        </Button>

        <DeleteRetailProduct product={product} />
      </VStack>
    </>
  );
}
