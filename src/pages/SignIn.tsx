import axios from "axios";
import Container from "../components/Container";
import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import NavHeader from "../components/NavHeader";
import { useFormik } from "formik";
import * as yup from "yup";
import InputPassword from "../components/InputPassword";
import { Link } from "react-router-dom";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { PrimaryButton } from "../components/Buttons";
import { useNavigate } from "react-router-dom";
import { AuthState } from "../types";
import { setCookie } from "typescript-cookie";
import { useState } from "react";

export default function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    validateOnChange: false,

    initialValues: {
      emailOrUsername: "",
      password: "",
      staySignedIn: false,
    },

    validationSchema: yup.object().shape({
      emailOrUsername: yup.string().required("Email/username is required"),
      password: yup.string().required("Password is required"),
    }),

    onSubmit: (values, { resetForm }) => {
      const data = {
        emailOrUsername: values.emailOrUsername,
        password: values.password,
      };

      const options = {
        method: "POST",
        baseURL: process.env.REACT_APP_BASE_URL,
        url: "api/signin",
        data: data,
      };

      async function signin() {
        setLoading(true);
        try {
          const response = await axios.request(options);
          if (response.data.status === 200) {
            const jwt = response.data.jwt;
            const authState: AuthState = response.data.payload;

            setCookie("_auth", jwt);
            setCookie("_authState", JSON.stringify(authState));
            console.log(jwt, authState);

            navigate("/home");
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.error(error);
          alert("Something wrong, try refreshing the page  or comeback later");
        } finally {
          setLoading(false);
        }

        resetForm();
      }

      signin();
    },
  });

  const handleForm = (event: any) => {
    const { name, value, checked } = event.target;
    if (name === "staySignedIn") {
      formik.setFieldValue(name, checked);
    } else {
      formik.setFieldValue(name, value);
    }
  };

  return (
    <>
      <NavHeader
        title={"Signing In"}
        left={"backButton"}
        backPath={"/"}
        right={
          <ColorModeSwitcher
            className="btn sm-clicky"
            borderRadius={"full"}
            h={"40px !important"}
          />
        }
      />

      <Container>
        <VStack
          w={"100%"}
          minH={"calc(100vh - 70px)"}
          py={8}
          justify={"center"}
          animation={"fade-in 1s"}
          transition={"200ms"}
        >
          <SimpleGrid w={"100%"} columns={[1, null, 2]} gap={12}>
            <Image src="/img/signin.png" animation={"fade-in 200ms"} />

            <VStack justify={"center"} w={"100%"} gap={0} pr={[null, null, 10]}>
              <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                <FormControl
                  mb={4}
                  isInvalid={formik.errors.emailOrUsername ? true : false}
                >
                  <FormLabel>Email/Username</FormLabel>
                  <Input
                    placeholder="sulenq"
                    name="emailOrUsername"
                    onChange={handleForm}
                    value={formik.values.emailOrUsername}
                  />
                  <FormErrorMessage>
                    {formik.errors.emailOrUsername}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  mb={4}
                  isInvalid={formik.errors.password ? true : false}
                >
                  <FormLabel>Password</FormLabel>
                  <InputPassword formik={formik} handleForm={handleForm} />
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>

                <HStack justify={"space-between"} mb={4}>
                  <Checkbox
                    colorScheme="ap"
                    name="staySignedIn"
                    isChecked={formik.values.staySignedIn}
                    onChange={handleForm}
                  >
                    <Text>Stay Signed In (1 week) </Text>
                  </Checkbox>

                  <Link to="">
                    <Text color={"p.500"}>Forgot password?</Text>
                  </Link>
                </HStack>

                {/* SUBMIT BUTTON */}
                <PrimaryButton
                  type={"submit"}
                  w={"100%"}
                  borderRadius={"full"}
                  mb={4}
                  isLoading={loading}
                >
                  Sign in
                </PrimaryButton>

                <Text
                  fontSize={[11, null, 13]}
                  textAlign={"center"}
                  opacity={0.5}
                >
                  By default you will stay signed in for 24 hours
                </Text>
              </form>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>
    </>
  );
}
