import React from "react";
import {
  Button,
  ButtonGroup,
  HStack,
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

export default function SignOutModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useModalBackOnClose(isOpen, onClose);

  return (
    <>
      <HStack
        className="clicky"
        transition={"200ms"}
        // cursor={"pointer"}
        flexShrink={0}
        onClick={onOpen}
      >
        <Text fontWeight={600}>Sign Out</Text>
        <Icon as={SignOut} weight="bold" fontSize={16} />
      </HStack>

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
