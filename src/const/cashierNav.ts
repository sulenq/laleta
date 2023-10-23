import { Receipt, ShoppingCartSimple } from "@phosphor-icons/react";

const cashierNav = [
  {
    name: "Cashiering",
    link: "/work/:outletId/:employeeId/Cashier/dashboard",
    icon: ShoppingCartSimple,
    bg: "var(--p500)",
    linkAlias: "dashboard",
  },
  {
    name: "Transaction",
    link: "/work/:outletId/:employeeId/Cashier/transaction",
    icon: Receipt,
    bg: "var(--cyan)",
    linkAlias: "transaction",
  },
];

export { cashierNav };
