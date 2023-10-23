import { ChartPie, Receipt, ShoppingCartSimple } from "@phosphor-icons/react";

const cashierNav = [
  {
    name: "Dashboard",
    link: "/work/:outletId/:employeeId/Cashier/dashboard",
    icon: ChartPie,
    bg: "var(--p500)",
    linkAlias: "dashboard",
  },
  {
    name: "Cashiering",
    link: "/work/:outletId/:employeeId/Cashier/cashiering",
    icon: ShoppingCartSimple,
    bg: "var(--cyan)",
    linkAlias: "cashiering",
  },
  {
    name: "Transaction",
    link: "/work/:outletId/:employeeId/Cashier/transaction",
    icon: Receipt,
    bg: "var(--yellow)",
    linkAlias: "transaction",
  },
];

export { cashierNav };
