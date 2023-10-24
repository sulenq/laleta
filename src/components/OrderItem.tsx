import {
  Box,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  Tooltip,
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

  return sw < 770 ? (
    <HStack gap={3} justify={"space-between"}>
      <HStack gap={3}>
        <VStack h={sw < 770 ? "61px" : "68px"} justify={"space-between"}>
          <Icon mt={1} as={productCategoryIcon(order.category)} fontSize={18} />

          <IconButton
            onClick={() => {
              deleteOrder(parseInt(order.id));
            }}
            aria-label="deleteOrderButton"
            icon={<Icon as={TrashSimple} fontSize={14} />}
            className="btn-solid sm-clicky"
            minW={"30px !important"}
            flex={1}
          />
        </VStack>

        <VStack gap={"2px"} justify={"space-between"} align={"flex-start"}>
          <Tooltip label={order.name} hasArrow>
            <Text noOfLines={1}>{order.name}</Text>
          </Tooltip>

          <Text opacity={0.5} fontSize={[10, null, 12]}>
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

      <VStack align={"flex-end"} gap={1} flexShrink={0}>
        <HStack gap={1}>
          <Text opacity={0.5} fontSize={[10, null, 12]}>
            Rp
          </Text>
          <Text fontSize={14}>{fn(order.totalPrice)}</Text>
        </HStack>

        <Box position={"relative"} w={"120px"}>
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
          />

          <Input
            value={order.qty}
            onChange={(e) => {
              let qty;
              if (e.target.value === "" || e.target.value === "0") {
                qty = 1;
              } else {
                qty = rfn(e.target.value);
              }
              setQty(parseInt(order.id), qty);
            }}
            onFocus={(e) => {
              e.target.select();
            }}
            textAlign={"right"}
            placeholder="qty"
            px={"48px !important"}
            bg={"var(--divider)"}
            border={"2px solid transparent !important"}
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
          />
        </Box>
      </VStack>
    </HStack>
  ) : (
    <HStack gap={3} justify={"space-between"}>
      <IconButton
        w={"5%"}
        onClick={() => {
          deleteOrder(parseInt(order.id));
        }}
        aria-label="deleteOrderButton"
        icon={<Icon as={TrashSimple} fontSize={14} />}
        className="btn-solid sm-clicky"
        minW={"30px !important"}
        flex={1}
      />

      <Icon w={"5%"} as={productCategoryIcon(order.category)} fontSize={25} />

      <VStack
        w={"50%"}
        gap={"2px"}
        justify={"space-between"}
        align={"flex-start"}
      >
        <Tooltip label={order.name} hasArrow>
          <Text noOfLines={1}>{order.name}</Text>
        </Tooltip>

        <Text opacity={0.5} fontSize={[10, null, 12]}>
          {order.code}
        </Text>
      </VStack>

      <HStack justify={"flex-end"} w={"10%"} gap={1}>
        <Text opacity={0.5} fontSize={[10, null, 12]}>
          @
        </Text>
        <Text>{fn(order.price)}</Text>
      </HStack>

      <HStack w={"20%"} justify={"flex-end"}>
        <Box position={"relative"} w={"120px"}>
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
          />

          <Input
            value={order.qty}
            onChange={(e) => {
              let qty;
              if (e.target.value === "" || e.target.value === "0") {
                qty = 1;
              } else {
                qty = rfn(e.target.value);
              }
              setQty(parseInt(order.id), qty);
            }}
            onFocus={(e) => {
              e.target.select();
            }}
            textAlign={"right"}
            placeholder="qty"
            px={"48px !important"}
            bg={"var(--divider)"}
            border={"2px solid transparent !important"}
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
          />
        </Box>
      </HStack>

      <HStack gap={1} w={"10%"} justify={"flex-end"}>
        <Text opacity={0.5} fontSize={[10, null, 12]}>
          Rp
        </Text>
        <Text fontSize={14}>{fn(order.totalPrice)}</Text>
      </HStack>
    </HStack>
  );
}
