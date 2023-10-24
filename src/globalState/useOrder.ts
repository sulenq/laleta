import { create } from "zustand";
import { PaymentMethod } from "../const/paymentMethods";
import { OrderItem } from "../types";

export type Order = {
  orderList: OrderItem[] | [];
  totalPayment: number;
  paymentMethod: PaymentMethod;
  date: Date;
  pay: number;
  change: number;
};

type Actions = {
  addOrder: (orderItem: OrderItem) => void;
  setQty: (id: number, newQty: number) => void;
  deleteOrder: (id: number) => void;
  resetOrder: () => void;
  setPaymentMethod: (paymentMethod: PaymentMethod) => void;
  setPay: (pay: number) => void;
};

const useOrder = create<Order & Actions>((set) => ({
  orderList: [],
  totalPayment: 0,
  paymentMethod: "Cash",
  pay: 0,
  date: new Date(),
  change: 0,

  addOrder: (newOrderItem) =>
    set((state) => {
      const curentTotal = state.totalPayment;
      const existingOrderItemIndex = state.orderList.findIndex(
        (o) => o.id === newOrderItem.id
      );

      if (existingOrderItemIndex !== -1) {
        const updatedItem = {
          ...state.orderList[existingOrderItemIndex],
          qty: state.orderList[existingOrderItemIndex].qty + newOrderItem.qty,
          totalPrice:
            state.orderList[existingOrderItemIndex].totalPrice +
            newOrderItem.totalPrice,
        };

        const updatedOrderList = [...state.orderList];
        updatedOrderList[existingOrderItemIndex] = updatedItem;

        return {
          orderList: updatedOrderList,
          totalPayment: curentTotal + newOrderItem.totalPrice,
          pay: state.pay,
          change: state.change,
        };
      } else {
        return {
          orderList: [...state.orderList, newOrderItem],
          totalPayment: curentTotal + newOrderItem.totalPrice,
          pay: state.pay,
          change: state.change,
        };
      }
    }),

  setQty: (id, newQty) =>
    set((state) => {
      const index = state.orderList.findIndex((o) => parseInt(o.id) === id);
      const curentTotal = state.totalPayment;
      const newTotalPrice = state.orderList[index].price * newQty;
      const qtyBefore = state.orderList[index].qty;
      const updatedTotal =
        curentTotal - state.orderList[index].price * qtyBefore;
      const updatedItem = {
        ...state.orderList[index],
        qty: newQty,
        totalPrice: newTotalPrice,
      };

      const updatedOrderList = [...state.orderList];
      updatedOrderList[index] = updatedItem;

      return {
        orderList: updatedOrderList,
        totalPayment: updatedTotal + newTotalPrice,
        pay: state.pay,
        change: state.change,
      };
    }),

  deleteOrder: (id) =>
    set((state) => {
      const index = state.orderList.findIndex((o) => parseInt(o.id) === id);
      const curentTotal = state.totalPayment;
      const totalPriceBefore = state.orderList[index].totalPrice;
      const updatedOrderList = [...state.orderList];
      updatedOrderList.splice(index, 1);

      return {
        orderList: updatedOrderList,
        totalPayment: curentTotal - totalPriceBefore,
        pay: state.pay,
        change: state.change,
      };
    }),

  resetOrder: () =>
    set(() => ({
      orderList: [],
      totalPayment: 0,
      paymentMethod: "Cash",
      pay: 0,
      change: 0,
    })),

  setPaymentMethod: (paymentMethod) =>
    set((state) => ({ ...state, paymentMethod: paymentMethod })),

  setPay: (pay) =>
    set((state) => {
      return {
        orderList: [...state.orderList],
        totalPayment: state.totalPayment,
        pay: pay,
        change: pay - state.totalPayment,
      };
    }),
}));

export default useOrder;
