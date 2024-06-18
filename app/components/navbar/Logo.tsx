'use client';

import Image from "next/image";

const Logo = () => {
  return (
    <Image
        alt="logo"
        className="hidden md:block cursor-pointer"
        height={60}
        width={90}
        src="/images/logo.png"
    />
  )
}

export default Logo;