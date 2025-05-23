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

              {/* Update this link to scroll to the 'learn-more' section */}
              <a
                href="#learn-more" // Change href to scroll to the Learn More section
                className="block w-full rounded-sm bg-white px-12 py-3 text-sm font-medium text-pink-400 shadow-sm hover:text-white hover:bg-pink-400 focus:ring-3 focus:outline-hidden sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Add the Learn More section here */}
      <section id="learn-more" className="p-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-pink-500">Learn More</h2>
        <p className="mt-4 text-md font-semibold text-pink-400">
          Living boujee on a budget is all about making smart choices while still
          enjoying the finer things in life. Whether you're looking to travel in style, 
          eat at top-tier restaurants, or update your wardrobe, it's possible to achieve 
          your dreams without breaking the bank. In this section, we’ll explore practical 
          tips, tools, and strategies for budgeting, saving, and finding affordable luxury. 
          You can have it all—without the stress of overspending. With a little planning and 
          some expert tricks, you can live fancy without the hefty price tag. RRA Budget Trackers, 
          the creators behind this platform, is a group of three students who understand what it’s 
          like to want nice things while not always having a lot of money. We’re here to help you 
          balance your desire for luxury with the realities of student life. Let us show you
          how to make it work!
        </p>
        {/* Add additional content for the Learn More section */}
      </section>
    </div>
  );
}

export default Hero;
