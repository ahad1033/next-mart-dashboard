'use client'
import Image from "next/image";
import Link from "next/link";

import { navLinks } from "@/lib/constants";
import { usePathname } from "next/navigation";

export const LeftSideBar = () => {
    const pathName = usePathname();
  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden">
      <Image src="/logo.webp" alt="logo" width={150} height={100} />

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
                pathName === link.url ? "text-blue-1" : "text-grey-1"
              }`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
