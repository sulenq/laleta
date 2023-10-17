import { HomeNavItem } from "../types";
import {
  Book,
  Compass,
  GearSix,
  IdentificationBadge,
  Storefront,
  User,
} from "@phosphor-icons/react";

const homeNav: HomeNavItem[] = [
  {
    name: "Store",
    link: "/store",
    icon: Storefront,
    bg: "var(--p500)",
  },
  {
    name: "Work",
    link: "/work",
    icon: IdentificationBadge,
    bg: "var(--cyan)",
  },
  {
    name: "Explore",
    link: "/explore",
    icon: Compass,
    bg: "var(--yellow)",
  },
  {
    name: "Settings",
    link: "/settings",
    icon: GearSix,
    bg: "var(--green)",
  },
  {
    name: "Manual",
    link: "/manuak",
    icon: Book,
    bg: "var(--purple)",
  },
  {
    name: "Profile",
    link: "/profile",
    icon: User,
    bg: "var(--gray)",
  },
];

export default homeNav;
