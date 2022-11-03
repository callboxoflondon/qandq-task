import { AppProps } from "next/app";
import React from "react";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" overflow-hidden">
      <Header />
      <main>{children}</main>
    </div>
  );
}
