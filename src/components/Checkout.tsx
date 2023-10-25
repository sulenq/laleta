import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowRight } from "@phosphor-icons/react";
import { iconSize } from "../const/sizes";
import useOrder from "../globalState/useOrder";
import useFormatNumber from "../utils/useFormatNumber";
import NumberInput from "./NumberInput";
import { useFormik } from "formik";
import useReverseFormatNumber from "../utils/useReverseFormatNumber";

export default function Checkout() {
  const { orderList, totalPayment, pay, setPay } = useOrder();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fn = useFormatNumber;
  const rfn = useReverseFormatNumber;

  const formik = useFormik({
    initialValues: {
      pay: 0,
    },

    onSubmit: (values, { resetForm }) => {},
  });

  return (
    <>
      <Button
        colorScheme="ap"
        className="clicky"
        flexShrink={0}
        size={"sm"}
        color={"white"}
        borderRadius={"full"}
        rightIcon={<Icon as={ArrowRight} fontSize={iconSize} />}
        isDisabled={orderList.length < 1 ? true : false}
        onClick={onOpen}
      >
        Checkout
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Checking Out</ModalHeader>

          <ModalBody>
            <VStack align={"stretch"}>
              <Text opacity={0.5} textAlign={"left"} fontWeight={500}>
                Total Payment
              </Text>

              <Text
                textAlign={"right"}
                fontSize={[31, null, 33]}
                fontWeight={800}
              >
                {fn(totalPayment)}
              </Text>
            </VStack>

            <VStack align={"stretch"} mb={4}>
              <Text opacity={0.5} textAlign={"left"} fontWeight={500}>
                Change
              </Text>

              <Text
                textAlign={"right"}
                fontSize={[31, null, 33]}
                fontWeight={800}
              >
                {fn(pay - totalPayment)}
              </Text>
            </VStack>

            <form id="checkout">
              <FormControl>
                <FormLabel opacity={0.5}>Pay</FormLabel>
                <NumberInput
                  formik={formik}
                  placeholder={"Pay"}
                  name={"pay"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPay(rfn(e.target.value));
                  }}
                  value={fn(pay)}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter pb={"10px"}>
            <VStack w={"100%"} align={"stretch"}>
              <Button
                type="submit"
                form={"checkout"}
                colorScheme="bnw"
                className="clicky"
              >
                Confirm Checkout
              </Button>

              <Button onClick={onClose} variant={"unstyled"}>
                Cancel
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
