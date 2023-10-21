import React from "react";
import {
  Button,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import useModalBackOnClose from "../utils/useModalBackOnClose";
import { Link } from "react-router-dom";

export default function Alert({ alert, isOpen, onClose }: any) {
  useModalBackOnClose(isOpen, onClose);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        window.history.back();
      }}
      size={"sm"}
      isCentered
    >
      <ModalOverlay />

      <ModalContent>
        <ModalBody pt={8}>
          <Center flexDir={"column"}>
            <Image
              src={alert?.img || "/img/404.png"}
              maxW={"300px"}
              mb={4}
              loading="eager"
            />

            <Text
              textAlign={"center"}
              fontSize={[17, null, 19]}
              fontWeight={600}
              mb={4}
            >
              {alert?.title || "Wooops"}
            </Text>

            <Text textAlign={"center"} opacity={0.5} w={"80%"}>
              {alert?.desc || "Something wrong"}
            </Text>
          </Center>
        </ModalBody>
        <ModalFooter>
          {alert?.action || (
            <Button
              as={Link}
              fontSize={[13, null, 15]}
              to={"/home"}
              w={"100%"}
              className="btn-solid clicky"
            >
              Close
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
