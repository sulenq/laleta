import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import useJwt from "../globalState/useJwt";
import axios from "axios";
import { RetailProduct } from "../types";

export default function DeleteRetailProduct({
  product,
}: {
  product: RetailProduct;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { outletId, productId } = useParams();
  const jwt = useJwt();
  const toast = useToast();

  const onDelete = () => {
    const options = {
      method: "DELETE",
      baseURL: process.env.REACT_APP_BASE_URL,
      url: `api/retailproduct-delete/${outletId}/${productId}`,
      headers: { Authorization: "Bearer " + jwt },
    };

    const deleteProduct = async () => {
      try {
        const response = await axios.request(options);
        console.log(response.data);

        if (response.data.status === 200) {
          window.history.back();
          toast({
            title: response.data.message,
            description: `${product.code}, ${product.name}`,
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
      } catch (error: any) {
        console.error(error);
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      }
    };

    if (jwt) {
      deleteProduct();
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        className="clicky"
        colorScheme="red"
        variant={"outline"}
      >
        Delete Product
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Deleting Product</ModalHeader>

          <ModalBody>
            <Text>
              {`This item will be deleted (${product.name}), `}
              <span style={{ fontWeight: 600 }}>
                you cannot undo this action
              </span>
            </Text>
          </ModalBody>

          <ModalFooter pb={"10px"}>
            <VStack align={"stretch"} w={"100%"}>
              <Button
                onClick={onDelete}
                className="clicky"
                colorScheme="red"
                variant={"outline"}
              >
                Confirm Delete
              </Button>

              <Button onClick={onClose} variant={"unstyled"} className="clicky">
                Cancel
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
