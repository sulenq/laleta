import React from "react";
import {
  Button,
  ButtonGroup,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { SignOut } from "@phosphor-icons/react";
import { removeCookie } from "typescript-cookie";
import { useNavigate } from "react-router-dom";
import useModalBackOnClose from "../utils/useModalBackOnClose";
import { iconSize } from "../const/sizes";

export default function SignOutModal(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useModalBackOnClose(isOpen, onClose);

  return (
    <>
      <Button
        {...props}
        className="clicky"
        colorScheme="red"
        variant={"outline"}
        transition={"200ms"}
        // cursor={"pointer"}
        flexShrink={0}
        onClick={onOpen}
        rightIcon={<Icon as={SignOut} fontSize={iconSize} weight="bold" />}
      >
        <Text fontWeight={500}>Sign Out</Text>
      </Button>

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
          <ModalHeader>Signing Out</ModalHeader>

          <ModalBody>
            <Text>Finish working, wanna take a break or just leave?</Text>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup w={"100%"}>
              <Button
                w={"50%"}
                className="clicky"
                colorScheme="bnw"
                onClick={() => {
                  onClose();
                  window.history.back();
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  removeCookie("_auth");
                  removeCookie("_authState");
                  navigate("/signin");
                }}
                w={"50%"}
                className="btn clicky"
                variant={"ghost"}
              >
                Sign Out
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
