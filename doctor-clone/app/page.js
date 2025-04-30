"use client";
import "../app/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import "../../styles/globals.css";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/specialties/destination.js");
    router.push("/add-doctor");
  }, [router]);

  return null;
}
