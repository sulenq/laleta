import React, { useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Td,
  Text,
  Tr,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import useFormatNumber from "../utils/useFormatNumber";
import useModalBackOnClose from "../utils/useModalBackOnClose";
import * as yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { RetailProduct } from "../types";
import useJwt from "../globalState/useJwt";
import axios from "axios";
import retailProductCategory from "../const/retailProductCategory";
import useReverseFormatNumber from "../utils/useReverseFormatNumber";

export default function RetailProductItem(props: any) {
  const p: RetailProduct = props.p;
  const fn = useFormatNumber;
  const rfn = useReverseFormatNumber;

  const { isOpen, onOpen, onClose } = useDisclosure();

  useModalBackOnClose(isOpen, onClose);

  const jwt = useJwt();
  const { outletId } = useParams();
  const toast = useToast();

  const modalContent = useRef(null);

  const formik = useFormik({
    validateOnChange: false,

    validationSchema: yup.object().shape({
      code: yup.string().required("Code is required"),
      name: yup.string().required("Name is required"),
      category: yup.string().required("Category is required"),
      price: yup
        .number()
        .required("Price is required")
        .test("isNotZero", "Price is required", (value) => value !== 0),
      stock: yup
        .number()
        .required("Stock is required")
        .test("isNotZero", "Stock is required", (value) => value !== 0),
    }),

    initialValues: {
      code: p.code,
      name: p.name,
      category: p.category,
      price: p.price,
      stock: p.stock,
    },

    onSubmit: (values, { resetForm }) => {
      const options = {
        method: "PUT",
        baseURL: process.env.REACT_APP_BASE_URL,
        url: `api/retailproduct-update/${outletId}/${p.id}`,
        headers: { Authorization: "Bearer " + jwt },
        data: values,
      };

      async function updateProduct() {
        try {
          const response = await axios.request(options);
          console.log(response.data);

          if (response.data.status === 200) {
            // resetForm();
            toast({
              title: response.data.message,
              description: "Product name : " + values.name,
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
        // console.log(options.baseURL, options.url);
        updateProduct();
      }
    },
  });

  return (
    <>
      <Tr
        className="listItem"
        _hover={{ bg: "var(--divider)" }}
        cursor={"pointer"}
        onClick={onOpen}
      >
        <Td className="before" py={2} px={"18px"}>
          <Box>
            <Text>{p.name}</Text>
            <Text fontSize={11} opacity={0.5}>
              {p.code}
            </Text>
          </Box>
        </Td>

        <Td textAlign={"center"} py={2} px={"18px"}>
          {p.category}
        </Td>

        <Td py={2} px={"18px"}>
          <Box>
            <Text textAlign={"right"}>{fn(parseInt(p.price))}</Text>
            <Text textAlign={"right"} fontSize={11} opacity={0.5}>
              {fn(parseInt(p.stock))}
            </Text>
          </Box>
        </Td>
      </Tr>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          window.history.back();
        }}
        isCentered
        initialFocusRef={modalContent}
        scrollBehavior="inside"
      >
        <ModalOverlay />

        <ModalContent ref={modalContent}>
          <ModalHeader>Product Detail</ModalHeader>

          <ModalBody>
            <form id="updateProductForm" onSubmit={formik.handleSubmit}>
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

              <FormControl
                isInvalid={formik.errors.category ? true : false}
                mb={4}
              >
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

              <FormControl
                isInvalid={formik.errors.price ? true : false}
                mb={4}
              >
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
          </ModalBody>

          <ModalFooter pb={"10px"} px={6}>
            <VStack w={"100%"} align={"stretch"}>
              <Button
                type="submit"
                form="updateProductForm"
                className="clicky"
                colorScheme="bnw"
              >
                Update Product
              </Button>

              <Button className="clicky" colorScheme="red" variant={"outline"}>
                Delete Product
              </Button>

              <Button className="clicky" variant={"unstyled"} onClick={onClose}>
                Cancel
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
