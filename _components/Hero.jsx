function Hero() {
  return (
    <section className="bg-pink-500 text-white flex items-center flex-col">
      <div className="mx-auto max-w-screen-xl px-4 py-32 
      lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-pink-300 via-pink-400 to-pink-200 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl leading-relaxed pb-2">
            Boujee on a Budget
          </h1> {/* Closing <h1> tag added */}

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Live fancy while saving money!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded-sm border border-white bg-white px-12 py-3 text-sm font-medium text-pink-500 hover:bg-pink-500 hover:text-white focus:ring-3 focus:outline-none sm:w-auto"
              href="#"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
