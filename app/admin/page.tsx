"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import { User } from "firebase/auth";

export default function Page() {
  const { user }: { user?: User } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) router.push("/");
  });

  return (
    <>
      <h1>Only logged in users can view this page</h1>
    </>
  );
}
