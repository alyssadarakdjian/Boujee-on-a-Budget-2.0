function Hero() {
  return (
    <div>
      <section
        className="relative w-full h-screen bg-[url(https://images.unsplash.com/photo-1705356151894-b1fd39861e3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWxlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        {/* Reduce padding to shift everything up */}
        <div className="relative max-w-screen-xl px-4 py-24 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          
          {/* Move text & buttons up more */}
          <div className="w-[50%] sm:w-[60%] ml-16 mt-[-20px]">
            <h1 className="text-5xl font-bold bg-gradient-to-br from-pink-500 to-pink-300 bg-clip-text text-transparent leading-normal overflow-visible inline-block">
              Boujee on a Budget
            </h1>

            <p className="mt-2 max-w-lg sm:text-xl/relaxed text-pink-400">
              Live fancy while saving money!
            </p>

            {/* Move buttons up as well */}
            <div className="mt-6 flex flex-wrap gap-4 text-center">
              <a
                href="#"
                className="block w-full rounded-sm bg-pink-400 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-white hover:text-pink-400 focus:ring-3 focus:outline-hidden sm:w-auto"
              >
                Get Started
              </a>

              <a
                href="#"
                className="block w-full rounded-sm bg-white px-12 py-3 text-sm font-medium text-pink-400 shadow-sm hover:text-white hover:bg-pink-400 focus:ring-3 focus:outline-hidden sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
