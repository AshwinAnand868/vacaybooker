"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const toggleRent = useCallback(() => {
    if (!currentUser) return loginModal.onOpen(); // we must return from here otherwise the logic will continue to execute

    // open the rent modal if user is logged in
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggleRent}
          className="
                    hidden
                    md:block
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                "
        >
          Rent my home
        </div>
        <div
          onClick={toggleOpen}
          className="
                    p-4
                    md:py-1
                    md:px-2
                    cursor-pointer
                    rounded-full
                    border-[1px]
                    border-neutral-200
                    flex
                    items-center
                    gap-3
                    hover:shadow-md
                    transition
                "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
                    absolute
                    right-0
                    top-12
                    text-sm
                    bg-white
                    overflow-hidden
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    rounded-xl
                "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                    router.push("/trips");
                  }}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/favourites");
                  }}
                  label="My favourites"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/reservations");
                  }}
                  label="My reservations"
                />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem onClick={rentModal.onOpen} label="Rent my home" />
                <hr />
                <div
                  onClick={() => signOut()}
                  className="
                    px-4
                    py-3
                    hover:bg-neutral-100
                    transition
                    font-semibold
                    flex
                    justify-between
                "
                >
                  Logout
                  {/* <SignOutButton /> */}
                </div>
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
