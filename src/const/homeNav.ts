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
    name: "New Store",
    link: "/new-store",
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
    name: "Profile",
    link: "/profile",
    icon: User,
    bg: "var(--green)",
  },
  {
    name: "Manual",
    link: "/manuak",
    icon: Book,
    bg: "var(--purple)",
  },
  {
    name: "Settings",
    link: "/settings",
    icon: GearSix,
    bg: "var(--gray)",
  },
];

export default homeNav;
