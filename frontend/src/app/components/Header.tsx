import bliqSvg from "@/public/bliq.svg";

import Image from "next/image";

export function Header() {
  return (
    <header className="flex py-5 bg-gray-50">
      <div className="container mx-auto flex items-center justify-between px-2 sm:px-0">
        <div className="flex gap-10">
          <Image src={bliqSvg} width={95} height={35} alt="bliq-icon" />
        </div>
      </div>
    </header>
  );
}
