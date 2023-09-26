import React from "react";
import AuthPage from "../context/login/page";
import { ThemeSwitch } from "@/components/theme-switch";
import HomePage from "../context/login/page";

export default function Home() {
  return (
    <>
      <section className=" ">
        <div className="">
          <HomePage />
        </div>
      </section>
    </>
  );
}
