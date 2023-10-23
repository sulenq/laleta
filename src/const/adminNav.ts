import {
  ChartLineUp,
  ChartPie,
  CurrencyDollar,
  Package,
  Receipt,
  ReceiptX,
  UsersThree,
} from "@phosphor-icons/react";

const adminNav = [
  {
    name: "Dashboard",
    link: "/work/:outletId/:employeeId/Admin/dashboard",
    icon: ChartPie,
    bg: "var(--p500)",
    linkAlias: "dashboard",
  },
  {
    name: "Product",
    link: "/work/:outletId/:employeeId/Admin/product",
    icon: Package,
    bg: "var(--cyan)",
    linkAlias: "product",
  },
  {
    name: "Expenditure",
    link: "/work/:outletId/:employeeId/Admin/expenditure",
    icon: CurrencyDollar,
    bg: "var(--yellow)",
    linkAlias: "expenditure",
  },
  {
    name: "Employee",
    link: "/work/:outletId/:employeeId/Admin/employee",
    icon: UsersThree,
    bg: "var(--green)",
    linkAlias: "employee",
  },
  {
    name: "Report",
    link: "/work/:outletId/:employeeId/Admin/report",
    icon: ChartLineUp,
    bg: "var(--purple)",
    linkAlias: "report",
  },
];

const adminNavMore = [
  {
    name: "Transacion",
    link: "/work/:outletId/:employeeId/Admin/transaction",
    icon: Receipt,
    bg: "var(--p500)",
    linkAlias: "transaction",
  },
  {
    name: "Debt",
    link: "/work/:outletId/:employeeId/Admin/debt",
    icon: ReceiptX,
    bg: "var(--cyan)",
    linkAlias: "debt",
  },
];

export { adminNav, adminNavMore };
