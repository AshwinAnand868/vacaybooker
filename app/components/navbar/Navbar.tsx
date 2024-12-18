"use client";

import { SafeUser } from "@/app/types";
import { Suspense } from "react";
import Container from "../Container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <Suspense fallback={"Navbar"}>

    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
        py-1
        border-b-[1px]
        "
        >
        <Container>
          <div
            className="
            flex
            items-center
            justify-between
            gap-3
            md:gap-0
            "
            >
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser}/>
          </div>
        </Container>
      </div>
        <Categories />
    </div>
            </Suspense>
  );
};

export default Navbar;
