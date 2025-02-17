import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
<<<<<<< HEAD
  publicRoutes: ["/"], 
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
=======
  // Define public routes here
  publicRoutes: ["/sign-in", "/api/public-endpoint"],
});

export const config = {
  matcher: [
    // Ensure middleware runs on all necessary routes
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)", // Apply middleware to API routes
  ],
};

>>>>>>> origin/main
