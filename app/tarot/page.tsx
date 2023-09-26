"use client";
import Card from "@/anime/card";
import CelticCrossSpread from "@/anime/celtic";
import Deck from "@/anime/deck";
import MyPixiComponent from "@/anime/pixi";
import { title } from "@/components/primitives";
import PrivateRoute from "@/context/private-router";
import { Navbar } from "@nextui-org/react";

export default function TarotPage() {
  return (
    <PrivateRoute>
      <div>
        <h1 className={title()}>Leitura de Tarot</h1>
        <CelticCrossSpread />
      </div>

    </PrivateRoute>
  );
}
