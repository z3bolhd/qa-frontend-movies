import type { Metadata } from "next";
import { Rubik } from "next/font/google";

import AuthProvider from "@context/AuthProvider";
import { AuthContext } from "@context/AuthContext";
import ToasterContext from "@context/ToasterContext";

import Header from "./_components/Header";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cinescope",
  description: "Сервис по покупке фильмов",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <ToasterContext />
        <AuthProvider>
          <AuthContext>
            <Header />
            <div className="w-full min-h-full max-w-[1200px] mx-auto px-10">{children}</div>
          </AuthContext>
        </AuthProvider>
      </body>
    </html>
  );
}
