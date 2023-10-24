import {
  Box,
  HStack,
  Icon,
  IconButton,
  Input,
  Td,
  Text,
  Tooltip,
  Tr,
  VStack,
} from "@chakra-ui/react";
import useFormatNumber from "../utils/useFormatNumber";
import useOrder from "../globalState/useOrder";
import { Minus, Plus, TrashSimple } from "@phosphor-icons/react";
import useReverseFormatNumber from "../utils/useReverseFormatNumber";
import useProductCategoryIcon from "../const/productCategoryIcon";
import useScreenWidth from "../utils/useGetScreenWidth";
import { OrderItem } from "../types";

type Props = {
  order: OrderItem;
};

export default function OrderItemComponent({ order }: Props) {
  const fn = useFormatNumber;
  const rfn = useReverseFormatNumber;
  const sw = useScreenWidth();
  const { setQty, deleteOrder } = useOrder();
  const productCategoryIcon = useProductCategoryIcon;

  const handleQty = (e: any) => {
    let qty;
    const validNums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const isNumValid = validNums?.some((validNum) =>
      e.target.value?.includes(validNum)
    );

    if (e.target.value === "" || e.target.value === "0") {
      qty = 1;
      setQty(parseInt(order.id), qty);
    } else {
      if (isNumValid) {
        qty = rfn(e.target.value);
        setQty(parseInt(order.id), qty);
      }
    }
  };

  return sw < 770 ? (
    <Tr _hover={{ bg: "var(--divider)" }}>
      <Td py={2} px={"18px"}>
        <HStack gap={3}>
          <VStack h={"61px"} justify={"space-between"}>
            <Tooltip label={order.category}>
              <Icon
                mt={1}
                as={productCategoryIcon(order.category)}
                fontSize={18}
              />
            </Tooltip>

            <IconButton
              onClick={() => {
                deleteOrder(parseInt(order.id));
              }}
              aria-label="deleteOrderButton"
              icon={<Icon as={TrashSimple} fontSize={15} />}
              className="sm-clicky"
              minW={"30px !important"}
              variant={"outline"}
              border={"1px solid"}
              colorScheme="red"
              flex={1}
            />
          </VStack>

          <VStack gap={0} justify={"space-between"} align={"flex-start"}>
            <Tooltip label={order.name}>
              <Text noOfLines={1} fontWeight={500}>
                {order.name}
              </Text>
            </Tooltip>

            <Text noOfLines={1} opacity={0.5} fontSize={[10, null, 12]}>
              {order.code}
            </Text>

            <HStack gap={1}>
              <Text opacity={0.5} fontSize={[10, null, 12]}>
                @
              </Text>
              <Text>{fn(order.price)}</Text>
            </HStack>
          </VStack>
        </HStack>
      </Td>

      <Td py={2} px={"18px"}>
        <VStack align={"flex-end"} gap={1} flexShrink={0}>
          <HStack gap={1}>
            {/* <Text opacity={0.5} fontSize={[10, null, 12]}>
              Rp
            </Text> */}
            <Text fontWeight={500}>{fn(order.totalPrice)}</Text>
          </HStack>

          <Box position={"relative"} w={"100px"}>
            <IconButton
              onClick={() => {
                setQty(parseInt(order.id), order.qty > 1 ? order.qty - 1 : 1);
              }}
              className="btn-solid sm-clicky"
              aria-label="qtyMinusButton"
              icon={<Icon as={Minus} />}
              position={"absolute"}
              left={0}
              top={0}
              zIndex={2}
              size={"sm"}
              // borderRadius={"8px 0 0 8px"}
            />

            <Input
              value={order.qty}
              onChange={(e) => {
                handleQty(e);
              }}
              onFocus={(e) => {
                e.target.select();
              }}
              textAlign={"right"}
              placeholder="qty"
              px={"40px !important"}
              size={"sm"}
              className="filled"
            />

            <IconButton
              onClick={() => {
                setQty(parseInt(order.id), order.qty + 1);
              }}
              className="btn-solid sm-clicky"
              aria-label="qtyPlusButton"
              icon={<Icon as={Plus} />}
              position={"absolute"}
              right={0}
              top={0}
              zIndex={2}
              size={"sm"}
              // borderRadius={"0 8px 8px 0"}
            />
          </Box>
        </VStack>
      </Td>
    </Tr>
  ) : (
    <Tr _hover={{ bg: "var(--divider)" }}>
      <Td py={2} px={6} maxW={"50px"}>
        <IconButton
          onClick={() => {
            deleteOrder(parseInt(order.id));
          }}
          aria-label="deleteOrderButton"
          icon={<Icon as={TrashSimple} fontSize={14} />}
          className="sm-clicky"
          minW={"30px !important"}
          flex={1}
          variant={"outline"}
          border={"1px solid"}
          colorScheme="red"
        />
      </Td>

      <Td py={2} px={6} maxW={"50px"}>
        <Tooltip label={order.category}>
          <Icon
            as={productCategoryIcon(order.category)}
            fontSize={25}
            weight="light"
          />
        </Tooltip>
      </Td>

      <Td py={2} px={6}>
        <VStack gap={"2px"} justify={"space-between"} align={"flex-start"}>
          <Tooltip label={order.name}>
            <Text noOfLines={1} fontWeight={500}>
              {order.name}
            </Text>
          </Tooltip>

          <Text noOfLines={1} opacity={0.5} fontSize={[10, null, 12]}>
            {order.code}
          </Text>
        </VStack>
      </Td>

      <Td py={2} px={6}>
        <HStack justify={"flex-end"} gap={1}>
          <Text opacity={0.5} fontSize={[10, null, 12]}>
            @
          </Text>
          <Text>{fn(order.price)}</Text>
        </HStack>
      </Td>

      <Td py={2} px={6}>
        <HStack justify={"flex-end"}>
          <Box position={"relative"} w={"100px"}>
            <IconButton
              onClick={() => {
                setQty(parseInt(order.id), order.qty > 1 ? order.qty - 1 : 1);
              }}
              className="btn-solid sm-clicky"
              aria-label="qtyMinusButton"
              icon={<Icon as={Minus} />}
              position={"absolute"}
              left={0}
              top={0}
              zIndex={2}
              size={"sm"}
              // borderRadius={"8px 0 0 8px"}
            />

            <Input
              value={order.qty}
              onChange={(e) => {
                handleQty(e);
              }}
              onFocus={(e) => {
                e.target.select();
              }}
              textAlign={"right"}
              placeholder="qty"
              px={"40px !important"}
              size={"sm"}
              className="filled"
            />

            <IconButton
              onClick={() => {
                setQty(parseInt(order.id), order.qty + 1);
              }}
              className="btn-solid sm-clicky"
              aria-label="qtyPlusButton"
              icon={<Icon as={Plus} />}
              position={"absolute"}
              right={0}
              top={0}
              zIndex={2}
              size={"sm"}
              // borderRadius={"0 8px 8px 0"}
            />
          </Box>
        </HStack>
      </Td>

      <Td py={2} px={6}>
        <HStack gap={1} justify={"flex-end"}>
          {/* <Text opacity={0.5} fontSize={[10, null, 12]}>
            Rp
          </Text> */}
          <Text fontSize={17} fontWeight={500}>
            {fn(order.totalPrice)}
          </Text>
        </HStack>
      </Td>
    </Tr>
  );
}
