import { SignIn } from "@clerk/nextjs";

export default function Page() {
<<<<<<< HEAD
return (
    <section className="bg-white">
    <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
        <img
            alt="Background"
            src="https://plus.unsplash.com/premium_photo-1681469490185-60d89aeb7be7?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D0"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Welcome to Boujee on a Budget
            </h2>
            <p className="mt-4 leading-relaxed text-white/90">
            Sign in to continue.
            </p>
        </div>
        </section>

        <main className="flex flex-col items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
        <div className="max-w-xl lg:max-w-3xl text-center">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Sign in to Boujee on a Budget
            </h1>
            <p className="mt-2 text-gray-600">
            Access your account to start saving money!
            </p>

            {/* Clerk SignIn Component */}
            <div className="mt-8 w-full flex justify-center">
            <SignIn />
            </div>
        </div>
        </main>
    </div>
    </section>
);
}
=======
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Background"
            src="https://plus.unsplash.com/premium_photo-1681469490185-60d89aeb7be7?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D0"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Boujee on a Budget
            </h2>
            <p className="mt-4 leading-relaxed text-white/90">
              Sign in to continue.
            </p>
          </div>
        </section>

        <main className="flex flex-col items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl text-center">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Sign in to Boujee on a Budget
            </h1>
            <p className="mt-2 text-gray-600">
              Access your account to start saving money!
            </p>

            {/* Clerk SignIn Component */}
            <div className="mt-8 w-full flex justify-center">
              <SignIn />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}


>>>>>>> origin/main
