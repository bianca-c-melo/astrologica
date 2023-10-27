import React from "react";
import AuthPage from "../context/login/page";
import { ThemeSwitch } from "@/components/theme-switch";
import HomePage from "../context/login/page";

export default function Home() {
  return (
    <>
      <section className=" ">
      <main className="purple-dark text-foreground bg-background">
      <div className="bg-gradient-to-tl from-lime-100 via-purple-200 to-emerald-100">
          <HomePage />
        </div>
        </main>
      </section>
    </>
  );
}
