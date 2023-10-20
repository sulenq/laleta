import React from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { PlusCircle } from "@phosphor-icons/react";
import useScreenWidth from "../utils/useGetScreenWidth";
import useModalBackOnClose from "../utils/useModalBackOnClose";
import * as yup from "yup";
import { useFormik } from "formik";
import retailProductCategory from "../const/retailProductCategory";
import useJwt from "../globalState/useJwt";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AddRetailProduct() {
  const sw = useScreenWidth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useModalBackOnClose(isOpen, onClose);

  const jwt = useJwt();
  const { outletId } = useParams();

  const toast = useToast();

  const formik = useFormik({
    validateOnChange: false,

    validationSchema: yup.object().shape({
      code: yup.string().required("Code required"),
      name: yup.string().required("Name required"),
      category: yup.string().required("Category required"),
      price: yup.string().required("Price required"),
      stock: yup.string().required("Stock required"),
    }),

    initialValues: {
      code: "",
      name: "",
      category: "",
      price: "",
      stock: "",
    },

    onSubmit: (values, { resetForm }) => {
      const options = {
        method: "POST",
        baseURL: process.env.REACT_APP_BASE_URL,
        url: "api/retailproduct-create/" + outletId,
        headers: { Authorization: "Bearer " + jwt },
        data: values,
      };

      async function addProduct() {
        try {
          const response = await axios.request(options);
          console.log(response.data);

          if (response.data.status === 201) {
            resetForm();
            toast({
              title: response.data.message,
              description: "Product name : " + response.data.productName,
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
        } catch (error) {
          console.error(error);
          toast({
            title: "Error",
            description: "Try to refreshing the page or comeback later",
            status: "error",
            duration: 10000,
            isClosable: true,
          });
        }
      }

      if (jwt) {
        addProduct();
      }
    },
  });

  return (
    <>
      {sw > 300 ? (
        <Button
          colorScheme="ap"
          borderRadius={"full"}
          pl={"2px"}
          pr={5}
          h={"30px"}
          className="clicky"
          onClick={onOpen}
        >
          <HStack justify={"space-between"}>
            <Icon
              as={PlusCircle}
              weight="fill"
              color={"white"}
              fontSize={[25, null, 27]}
            />

            <Text color={"white"}>Add Product</Text>
          </HStack>
        </Button>
      ) : (
        <IconButton
          aria-label="Add Product"
          icon={
            <Icon
              as={PlusCircle}
              weight="fill"
              color={"white"}
              fontSize={[25, null, 27]}
            />
          }
          colorScheme="ap"
          borderRadius={"full"}
          h={"30px"}
          minW={"30px"}
          className="clicky"
          onClick={onOpen}
        />
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          window.history.back();
        }}
        isCentered
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Adding Product</ModalHeader>

          <ModalBody>
            <form id="addProductForm" onSubmit={formik.handleSubmit}>
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
                    formik.setFieldValue("price", e.target.value);
                  }}
                  value={formik.values.price}
                />
                <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.stock ? true : false}>
                <FormLabel>Stock</FormLabel>
                <Input
                  placeholder="47"
                  onChange={(e) => {
                    formik.setFieldValue("stock", e.target.value);
                  }}
                  value={formik.values.stock}
                />
                <FormErrorMessage>{formik.errors.stock}</FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter pb={"10px"} px={6}>
            <VStack w={"100%"} align={"stretch"}>
              <Button
                type="submit"
                form="addProductForm"
                className="clicky"
                colorScheme="bnw"
              >
                Add Product
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
