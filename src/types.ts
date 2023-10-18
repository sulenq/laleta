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
