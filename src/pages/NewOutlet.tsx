import React, { useState } from "react";
import HomeContainer from "../components/HomeContainer";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
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
import createStoreCategory from "../const/newOutletCategory";
import useJwt from "../globalState/useJwt";
import Alert from "../components/Alert";
import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function NewOutlet() {
  const jwt = useJwt();

  const [alertModal, setAlertModal] = useState<any>(null);
  const [alertIsOpen, setAlertIsOpen] = useState<boolean>(false);

  const formik = useFormik({
    validateOnChange: false,

    validationSchema: yup.object().shape({
      outletName: yup.string().required("Outlet Name is required"),
      address: yup.string().required("Address is required"),
      phone: yup.string().required("Phone is required"),
      email: yup.string().required("Email is required"),
      category: yup.string().required("Category is required"),
    }),

    initialValues: {
      outletName: "",
      address: "",
      phone: "",
      email: "",
      category: "",
    },

    onSubmit: (values, { resetForm }) => {
      const options = {
        method: "POST",
        baseURL: process.env.REACT_APP_BASE_URL,
        url: "api/outlet-create",
        headers: { Authorization: "Bearer " + jwt },
        data: values,
      };

      async function createOutlet() {
        try {
          const response = await axios.request(options);
          console.log(response.data);

          if (response.data.status === 201) {
            resetForm();

            setAlertModal({
              img: "/img/newOutletOpened.png",
              title: "New Outlet has Opened",
              desc: "Your outlet is ready to set, go to Work menu at Home page then select your outlet, work as admin then setup your outlet",
              action: (
                <Button
                  as={Link}
                  to={"/home"}
                  w={"100%"}
                  fontSize={[13, null, 15]}
                  className="clicky"
                  colorScheme="bnw"
                  rightIcon={<Icon as={ArrowRight} fontSize={16} />}
                >
                  Home
                </Button>
              ),
            });

            setAlertIsOpen(true);
          } else if (response.data.status === 400) {
            const keys = Object.keys(response.data.invalid);

            setAlertModal({
              img: "/img/400.png",
              title: "Open New Outlet Failed",
              desc: keys.map((i) => response.data.invalid[i]).join(", "),
              action: (
                <Button
                  onClick={() => {
                    setAlertIsOpen(false);
                  }}
                  w={"100%"}
                  className="btn-solid clicky"
                >
                  Close
                </Button>
              ),
            });

            setAlertIsOpen(true);
          } else {
            setAlertModal({
              img: "/img/bad.png",
              title: "Something Wrong",
              desc: "Try to refreshing the page or comeback later",
              action: (
                <Button
                  onClick={() => {
                    setAlertIsOpen(false);
                  }}
                  w={"100%"}
                  className="btn-solid clicky"
                >
                  Close
                </Button>
              ),
            });

            setAlertIsOpen(true);
          }
        } catch (error) {
          console.error(error);
          setAlertModal({
            img: "/img/bad.png",
            title: "Something Wrong",
            desc: "Try to refreshing the page or comeback later",
            action: (
              <Button
                onClick={() => {
                  setAlertIsOpen(false);
                }}
                w={"100%"}
                className="btn-solid clicky"
              >
                Close
              </Button>
            ),
          });

          setAlertIsOpen(true);
        }
      }

      if (jwt) {
        createOutlet();
      }
    },
  });

  return (
    <HomeContainer>
      <NavHeader
        title={"Opening New Outlet"}
        left={"backButton"}
        backPath={"/home"}
      />

      <Container flex={1}>
        <VStack flex={1} w={"100%"} justify={"center"} py={4}>
          <SimpleGrid w={"100%"} columns={[1, null, 2]} gap={8}>
            <Image
              src="/img/newOutlet.png"
              title="New Outlet Vector"
              loading="eager"
            />

            <VStack justify={"center"} w={"100%"} gap={0} pr={[null, null, 10]}>
              <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                <FormControl
                  mb={4}
                  isInvalid={formik.errors.outletName ? true : false}
                >
                  <FormLabel>Outlet Name</FormLabel>
                  <Input
                    name="outletName"
                    placeholder="Jasmine Kiosk"
                    value={formik.values.outletName}
                    onChange={(e) => {
                      formik.setFieldValue("outletName", e.target.value);
                    }}
                  />
                  <FormErrorMessage>
                    {formik.errors.outletName}
                  </FormErrorMessage>
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

                <FormControl
                  mb={4}
                  isInvalid={formik.errors.category ? true : false}
                >
                  <FormLabel>Category</FormLabel>
                  {/* <Input name="email" placeholder="Jasmine Kiosk" /> */}
                  <Select
                    value={formik.values.category}
                    onChange={(e) => {
                      formik.setFieldValue("category", e.target.value);
                    }}
                    placeholder="Select outlet category"
                  >
                    {createStoreCategory.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{formik.errors.category}</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  w={"100%"}
                  colorScheme="ap"
                  color={"wt"}
                  borderRadius={"full"}
                  mb={4}
                  className="clicky"
                  isLoading={alertIsOpen}
                >
                  Open New Outlet
                </Button>

                <Text
                  fontSize={[11, null, 13]}
                  textAlign={"center"}
                  opacity={0.5}
                >
                  Your status will be the owner of this outlet
                </Text>
              </form>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>

      <Alert
        alert={alertModal}
        isOpen={alertIsOpen}
        onClose={() => {
          setAlertIsOpen(false);
        }}
        backOnClose={true}
      />
    </HomeContainer>
  );
}
