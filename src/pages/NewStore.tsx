import React from "react";
import HomeContainer from "../components/HomeContainer";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import NavHeader from "../components/NavHeader";
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import createStoreCategory from "../const/createStoreCategory";
import useJwt from "../globalState/useJwt";

export default function NewStore() {
  const jwt = useJwt();

  const formik = useFormik({
    validateOnChange: false,

    validationSchema: yup.object().shape({
      storeName: yup.string().required("Store Name required"),
      address: yup.string().required("Address required"),
      phone: yup.string().required("Phone required"),
      email: yup.string().required("Email required"),
      category: yup.string().required("Category required"),
    }),

    initialValues: {
      storeName: "",
      address: "",
      phone: "",
      email: "",
      category: "Retail",
    },

    onSubmit: (values, { resetForm }) => {
      const data = {
        storeName: values.storeName,
        address: values.address,
        phone: values.phone,
        email: values.email,
        category: values.category,
      };

      const options = {
        method: "POST",
        baseURL: process.env.REACT_APP_BASE_URL,
        url: "api/store-create",
        headers: { Authorization: "Bearer " + jwt },
        data: data,
      };

      async function createStore() {
        try {
          const response = await axios.request(options);
          // console.log(response.data);

          if (response.data.status === 201) {
            console.log(response.data.status);

            // navigate("/home");
          } else if (response.data.status === 400) {
            const keys = Object.keys(response.data.invalid);
            keys.forEach((i) => {
              alert(response.data.invalid[i]);
            });
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.error(error);
          alert("Something wrong, try refreshing the page or comeback later");
        }

        // resetForm();
      }

      createStore();
    },
  });

  return (
    <HomeContainer>
      <NavHeader title={"Opening New Store"} left={"backButton"} />

      <Container flex={1}>
        <VStack flex={1} w={"100%"} justify={"center"} py={4}>
          <SimpleGrid w={"100%"} columns={[1, null, 2]} gap={8}>
            <Image src="/img/newStore.png" title="New Store Vector" />

            <form onSubmit={formik.handleSubmit}>
              <FormControl
                mb={4}
                isInvalid={formik.errors.storeName ? true : false}
              >
                <FormLabel>Store Name</FormLabel>
                <Input
                  name="storeName"
                  placeholder="Jasmine Kiosk"
                  value={formik.values.storeName}
                  onChange={(e) => {
                    formik.setFieldValue("storeName", e.target.value);
                  }}
                />
                <FormErrorMessage>{formik.errors.storeName}</FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={formik.errors.address ? true : false}
              >
                <FormLabel>Address</FormLabel>
                <Input
                  name="address"
                  placeholder="Banjarsari street no.12"
                  value={formik.values.address}
                  onChange={(e) => {
                    formik.setFieldValue("address", e.target.value);
                  }}
                />
                <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={formik.errors.phone ? true : false}
              >
                <FormLabel>Phone</FormLabel>
                <Input
                  name="phone"
                  placeholder="085877756502"
                  value={formik.values.phone}
                  onChange={(e) => {
                    formik.setFieldValue("phone", e.target.value);
                  }}
                />
                <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={formik.errors.email ? true : false}
              >
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  placeholder="example@email.com"
                  value={formik.values.email}
                  onChange={(e) => {
                    formik.setFieldValue("email", e.target.value);
                  }}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Category</FormLabel>
                {/* <Input name="email" placeholder="Jasmine Kiosk" /> */}
                <Select
                  value={formik.values.category}
                  onChange={(e) => {
                    formik.setFieldValue("category", e.target.value);
                  }}
                >
                  {createStoreCategory.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <Button
                type="submit"
                w={"100%"}
                colorScheme="ap"
                color={"wt"}
                borderRadius={"full"}
                mb={4}
                className="clicky"
              >
                Open New Store
              </Button>

              <Text
                fontSize={[11, null, 13]}
                textAlign={"center"}
                opacity={0.5}
              >
                You will be the owner of this store
              </Text>
            </form>
          </SimpleGrid>
        </VStack>
      </Container>
    </HomeContainer>
  );
}
