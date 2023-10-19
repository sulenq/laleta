export type Gender = "Male" | "Female";

export type Role = "Admin" | "Cashier";

export type Status = "Owner" | "Permanent" | "Contract" | "Intern";

export type AuthState = {
  id: number;
  email: string;
  username: string;
  name: string;
  age: number;
  gender: Gender;
  address: string;
  phone: string;
  image: string;
};

export type HomeNavItem = {
  name: string;
  link: string;
  icon: any;
  bg: string;
};

export type Employee = {
  createdAt: string;
  deletedAt: string;
  id: string;
  outletId: string;
  role: string;
  salary: string;
  status: string;
  updatedAt: string;
};

export type Outlet = {
  address: string;
  category: string;
  createdAt: string;
  createdBy: string;
  deletedAt: string;
  email: string;
  id: string;
  image: string;
  outletName: string;
  phone: string;
  updatedAt: string;
};

export type Work = {
  outlet: Outlet;
  employee: Employee;
};
