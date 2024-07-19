import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vacaybooker",
  description: "Vacaybooker - book your next vacation here!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        {/* <Modal secondaryActionLabel="Submit" actionLabel="Submit" title="Hello World!" isOpen /> */}
        <RegisterModal />
        <LoginModal />
        <Navbar />
        {children}
        </body>
    </html>
  );
}
