import React from 'react'
import Image from "next/image";


function Hero() {
  return (
    <section className="bg-gray-900 text-white flex items-center flex-col" >
  <div className="mx-auto max-w-screen-xl px-4 py-32 
  lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-3xl text-center">
      <h1
        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl leading-relaxed pb-2"
      >
        Budget Tracker

        <span className="sm:block"> Manage your expenses
        </span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">

        Start tracking your expenses and save a ton of money!

      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded-sm border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:ring-3 focus:outline-hidden sm:w-auto"
          href="#"
        >

          Get Started
        </a>

      </div>
    </div>
  </div>
</section>
  )
}

export default Hero