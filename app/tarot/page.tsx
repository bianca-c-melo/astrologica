"use client";
import PrivateRoute from "@/context/private-router";
import DockApp from "@/tiragem/dock-app";

export default function TarotPage() {
  return (
    <PrivateRoute>
      <DockApp />
    </PrivateRoute>
  );
}
