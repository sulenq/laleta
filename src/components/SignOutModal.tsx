import React, { useCallback, useEffect } from "react";
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

export default function SignOutModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleOnClose = () => {
    window.history.back();
  };

  const handlePopState = useCallback(() => {
    if (isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      // Push URL yang sama saat modal dibuka
      window.history.pushState(null, "", window.location.href);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      if (isOpen) {
        window.removeEventListener("popstate", handlePopState);
      }
    };
  }, [isOpen, onClose, handlePopState]);

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
          handleOnClose();
        }}
        isCentered
      >
        <ModalOverlay backdropFilter={"blur(10px)"} />

        <ModalContent>
          <ModalHeader>Signing Out</ModalHeader>

          <ModalBody>
            <Text>Finish working, wanna break?</Text>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup w={"100%"}>
              <Button
                w={"50%"}
                className="clicky"
                colorScheme="bnw"
                onClick={() => {
                  onClose();
                  handleOnClose();
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
