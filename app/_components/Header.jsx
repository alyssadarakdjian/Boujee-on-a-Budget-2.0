<<<<<<< HEAD
"use client"; // Ensures client-side rendering for authentication check

import { Button } from "@/components/ui/button"; // Ensure correct import path
import { useAuth, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
=======
import { Button } from '@/components/ui/button';
>>>>>>> origin/main

function Header() {
  const { isSignedIn } = useAuth(); // Check if user is signed in
  const router = useRouter();

  return (
    <div className="p-5 flex justify-between items-center border shadow-md bg-pink-100">
      {/* Logo */}
      <img src="./logo.svg" alt="logo" width="200" />

<<<<<<< HEAD
      {/* If user is signed in, show profile button; otherwise, show Sign In and Sign Up buttons */}
      {isSignedIn ? (
        <UserButton />
      ) : (
        <div className="flex gap-4"> 
          <Button
            onClick={() => router.push("/sign-in")}
            className="bg-pink-500 text-white hover:bg-white hover:text-pink-500 border border-pink-500 transition"
          >
            Sign In
          </Button>

          <Button
            onClick={() => router.push("/sign-up")}
            className="bg-white text-pink-500 hover:bg-pink-500 hover:text-white border border-pink-500 transition"
          >
            Sign Up
          </Button>
        </div> 
      )}
    </div> // ✅ This div closes the header container properly
=======
      <img src="/logo.svg" alt="logo" width="200" />

      {/* Correct way to style the Button */}
      <Button className="bg-pink-500 text-white hover:bg-white hover:text-pink-500 border border-pink-500">
        Get Started
      </Button>

    </div>
>>>>>>> origin/main
  );
}

export default Header;
