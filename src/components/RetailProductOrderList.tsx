import React from "react";
import { Box, Table, Tbody } from "@chakra-ui/react";
import OrderItemComponent from "./RetailProductOrderItem";
import useOrder from "../globalState/useOrder";
import TableContainer from "./TableContainer";

export default function OrderList() {
  const { orderList } = useOrder();

  return (
    <Box mt={4}>
      <TableContainer>
        <Table>
          <Tbody>
            {orderList.length > 0 &&
              orderList
                .slice()
                .reverse()
                .map((order, i) => (
                  <OrderItemComponent key={i} order={order} />
                ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
