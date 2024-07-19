'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

const UserMenu = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])

  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div
                onClick={()=> {}}
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
                Rent Out
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
                    <Avatar />
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
                    <>
                        <MenuItem
                            onClick={loginModal.onOpen}
                            label="Login"
                        />
                        <MenuItem
                            onClick={registerModal.onOpen}
                            label="Sign up"
                        />
                    </>
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu