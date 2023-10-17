export type Gender = "Male" | "Female";

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
