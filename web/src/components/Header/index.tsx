import Image from "next/image";

import Logo from "@/assets/Logo.png";

export function Header() {
  return (
    <header className="flex h-fit w-screen flex-col items-center p-3">
      <Image alt="Logo OVG" src={Logo} />
      <span className="text-center text-2xl font-black">
        Confraternização {new Date().getFullYear()}
      </span>
    </header>
  );
}
