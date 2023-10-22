import React, { useRef } from "react";
import {
  Alert,
  AlertIcon,
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
  Tooltip,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Backspace, PlusCircle } from "@phosphor-icons/react";
import useScreenWidth from "../utils/useGetScreenWidth";
import useModalBackOnClose from "../utils/useModalBackOnClose";
import * as yup from "yup";
import { useFormik } from "formik";
import retailProductCategory from "../const/retailProductCategory";
import useJwt from "../globalState/useJwt";
import axios from "axios";
import { useParams } from "react-router-dom";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";

export default function AddExpenditure() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useModalBackOnClose(isOpen, onClose);

  const sw = useScreenWidth();
  const jwt = useJwt();
  const { outletId } = useParams();
  const toast = useToast();
  const firstInput = useRef(null);

  const formik = useFormik({
    validateOnChange: false,

    validationSchema: yup.object().shape({
      amount: yup
        .number()
        .required("Amount is required")
        .test("isNotZero", "Amount is required", (value) => value !== 0),
      date: yup.string().required("Date is required"),
      category: yup.string().required("Category is required"),
      desiption: yup.string(),
      proofOfPayment: yup.string(),
    }),

    initialValues: {
      amount: 0,
      date: "",
      category: "",
      description: "",
      proofOfPayment: "",
    },

    onSubmit: (values, { resetForm }) => {
      console.log(values.date);
      const options = {
        method: "POST",
        baseURL: process.env.REACT_APP_BASE_URL,
        url: "api/retailproduct-create/" + outletId,
        headers: { Authorization: "Bearer " + jwt },
        data: values,
      };

      async function request() {
        try {
          const response = await axios.request(options);
          console.log(response.data);

          if (response.data.status === 201) {
            // resetForm();
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
        request();
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

            <Text color={"white"}>Add Expenditure</Text>
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
        initialFocusRef={firstInput}
        isCentered
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>
            <HStack justify={"space-between"}>
              <Text fontSize={20}>Adding Expenditure</Text>
              <Tooltip label={"Clear Form"} openDelay={500}>
                <IconButton
                  className="clicky"
                  variant={"ghost"}
                  size={"sm"}
                  onClick={() => {
                    formik.resetForm();
                  }}
                  aria-label="clear form"
                  icon={<Icon as={Backspace} fontSize={[23, null, 25]} />}
                >
                  Clear
                </IconButton>
              </Tooltip>
            </HStack>
          </ModalHeader>

          <ModalBody>
            <form id="addProductForm" onSubmit={formik.handleSubmit}>
              <FormControl
                isInvalid={formik.errors.amount ? true : false}
                mb={4}
              >
                <FormLabel>Amount</FormLabel>
                <NumberInput
                  myRef={firstInput}
                  formik={formik}
                  name={"amount"}
                  placeholder="250.000"
                />
                <FormErrorMessage>{formik.errors.amount}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.date ? true : false} mb={4}>
                <FormLabel>Date</FormLabel>
                <Input
                  type="datetime-local"
                  name="date"
                  onChange={(e) => {
                    formik.setFieldValue("date", e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.date}
                />
                <FormErrorMessage>
                  {formik.touched.date && formik.errors.date}
                </FormErrorMessage>
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
                isInvalid={formik.errors.description ? true : false}
                mb={4}
              >
                <FormLabel>Description</FormLabel>
                <TextInput
                  formik={formik}
                  name="description"
                  placeholder="pembelian indomie 2 dus di cik wawa"
                />
                <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={formik.errors.proofOfPayment ? true : false}
              >
                <FormLabel>Proof of Payment</FormLabel>
                <TextInput
                  formik={formik}
                  name="proofOfPayment"
                  placeholder="File Input"
                />
                <FormErrorMessage>
                  {formik.errors.proofOfPayment}
                </FormErrorMessage>
              </FormControl>
            </form>

            <Alert
              minW={"100% !important"}
              mt={6}
              status="info"
              variant="left-accent"
            >
              <AlertIcon />
              <Text> Refresh Expenditure page to see changes</Text>
            </Alert>
          </ModalBody>

          <ModalFooter pb={"10px"} px={6}>
            <VStack w={"100%"} align={"stretch"}>
              <Button
                type="submit"
                form="addProductForm"
                className="clicky"
                colorScheme="bnw"
              >
                Add Expenditure
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
