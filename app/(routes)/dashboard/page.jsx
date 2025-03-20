"use client"; // Ensure client-side rendering

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return; // Wait until Clerk is fully loaded

    if (!isSignedIn) {
      router.replace("/sign-in"); // Redirect unauthorized users to Sign In
    } else {
      setLoading(false); // Allow dashboard to render
    }
  }, [isSignedIn, isLoaded, router]);

  if (loading) {
    return <p className="text-center text-lg mt-10">Redirecting...</p>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl text-pink-500 font-bold">Welcome to Boujee on a Budget</h1>
      <p className="text-pink-300 mt-2">
        Manage your budgets, track expenses, and upgrade your experience.
      </p>
    </div>
  );
}


  
