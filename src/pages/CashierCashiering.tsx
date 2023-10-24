import React from "react";
import CashierContainer from "../components/CashierContainer";
import Container from "../components/Container";
import {
  Button,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { ArrowRight, MagnifyingGlass, Plus } from "@phosphor-icons/react";
import useScreenWidth from "../utils/useGetScreenWidth";
import { iconSize } from "../const/sizes";

export default function CashierCashiering() {
  const sw = useScreenWidth();

  return (
    <CashierContainer activeNav={"cashiering"}>
      <Container borderRight={"1px solid var(--divider)"}>
        <HStack justify={"space-between"} my={3}>
          <Text fontWeight={600} fontSize={[19, null, 21]} noOfLines={1}>
            Cashiering
          </Text>

          <HStack>
            <Tooltip label={"New Transaction"} openDelay={500} placement="left">
              <IconButton
                aria-label="New Transaction"
                icon={<Icon as={Plus} fontSize={iconSize} weight="bold" />}
                borderRadius={"full"}
                size={"sm"}
                className="clicky"
                colorScheme="ap"
                variant={"outline"}
                _hover={{ bg: "var(--p200a)" }}
              />
            </Tooltip>

            <Button
              colorScheme="ap"
              className="clicky"
              flexShrink={0}
              size={"sm"}
              color={"white"}
              borderRadius={"full"}
              rightIcon={<Icon as={ArrowRight} fontSize={iconSize} />}
            >
              Checkout
            </Button>
          </HStack>
        </HStack>
      </Container>

      <Container>
        <HStack gap={4} justify={"space-between"}>
          <InputGroup maxW={"400px"} position={"relative"}>
            <Input
              className="filled"
              name={"productSearch"}
              placeholder="Index product"
              pr={"40px !important"}
            />
            <IconButton
              aria-label="search product"
              icon={<Icon as={MagnifyingGlass} fontSize={iconSize} />}
              position={"absolute"}
              right={0}
              zIndex={3}
              className="btn-solid"
            />
          </InputGroup>

          <HStack gap={[4, null, 8]} flexShrink={0}>
            <VStack
              flexShrink={0}
              justify={"space-between"}
              align={"flex-end"}
              gap={0}
            >
              <Text fontSize={[9, null, 11]} opacity={0.5}>
                Total Order
              </Text>

              <Text lineHeight={1} fontSize={[21, null, 23]} fontWeight={500}>
                4
              </Text>
            </VStack>

            <VStack
              flexShrink={0}
              align={"flex-end"}
              justify={"space-between"}
              gap={0}
            >
              <Text fontSize={[9, null, 11]} opacity={0.5}>
                Total Payment
              </Text>

              <Text
                color={"p.500"}
                lineHeight={1}
                fontSize={[21, null, 23]}
                fontWeight={800}
              >
                210.000
              </Text>
            </VStack>
          </HStack>
        </HStack>
      </Container>
    </CashierContainer>
  );
}
