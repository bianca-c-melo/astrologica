"use client";
import React from "react";
import { useAuthContext } from "../authContext";
import AuthPage from "./authpage";
import AppDeck from "@/anime/cards-anime-homepage";

import { Inter, Noto_Color_Emoji, Sunflower } from 'next/font/google'
import StarField from "@/anime/star-field";
import Deck from "@/anime/cards-anime-homepage";
 
// If loading a variable font, you don't need to specify the font weight
// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
// })

// const noto = Noto_Color_Emoji({weight: '400'})

function HomePage() {
  const { user } = useAuthContext();

  

  return (

    <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
      <div style={{ width: "40%"}}>
       <StarField/>
        <Deck />
      </div>
      <div
        style={{
          width: "60%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <AuthPage></AuthPage>
      </div>
    </div>
  );
}

export default HomePage;
