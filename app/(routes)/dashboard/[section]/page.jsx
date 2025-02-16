"use client"; // Ensure client-side rendering

import { useAuth } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardSection() {
  const { section } = useParams();  // Ensure it's named 'section' (not 'sections')
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.replace("/sign-in"); 
    } else {
      setLoading(false);
    }
  }, [isSignedIn, isLoaded, router]);

  if (loading) {
    return <p className="text-center text-lg mt-10">Redirecting...</p>;
  }

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">{section.charAt(0).toUpperCase() + section.slice(1)}</h1>
      <p>Welcome to the {section} section.</p>
    </div>
  );
}
