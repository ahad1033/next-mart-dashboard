import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { LeftSideBar } from "@/components/layout/LeftSideBar";
import { TopBar } from "@/components/layout/TopBar";
import { ToasterProdiver } from "@/lib/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Mart Dashboard",
  description: "An Ecommerce Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProdiver />
        <div className="flex max-lg:flex-col text-gray-1">
          <LeftSideBar />
          <TopBar />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
