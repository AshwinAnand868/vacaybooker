import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import getCurrentUser from "./actions/getCurrentUser";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        {/* <Modal secondaryActionLabel="Submit" actionLabel="Submit" title="Hello World!" isOpen /> */}
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser}/>
        {children}
        </body>
    </html>
  );
}
