"use client";

import { Play } from "lucide-react";
import CountUp from "../components/CountUp";
import { useState } from "react";

export default function Hero() {
  const [hovered, setHovered] = useState(null); // ✅ Correct placement

  return (
    <section className="pt-20 pb-12 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_800px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                AI-Powered Radiology
                <br />
                Diagnosis Platform
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Revolutionizing medical imaging with advanced AI technology for
                faster, more accurate diagnoses.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <a
                href="#upload"
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white hover:bg-blue-700"
              >
                Upload Your Scan
              </a>

              <div className="flex space-x-4">
                {/* <button
                  className={`inline-flex h-10 items-center justify-center rounded-md border border-gray-200 px-6 text-sm font-medium transition-all duration-300 ${
                    hovered === "signin"
                      ? "bg-gray-200 scale-105"
                      : "hover:bg-gray-100"
                  }`}
                  onMouseEnter={() => setHovered("signin")}
                  onMouseLeave={() => setHovered(null)}
                >
                  Sign In
                </button> */}
                <button
                  className={`inline-flex h-10 items-center justify-center rounded-md border border-gray-200 px-6 text-sm font-medium transition-all duration-300 ${
                    hovered === "login"
                      ? "bg-gray-200 scale-105"
                      : "hover:bg-gray-100"
                  }`}
                  onMouseEnter={() => setHovered("login")}
                  onMouseLeave={() => setHovered(null)}
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
          <img
            src={`/images/OIP2.webp`} // Update this URL to your JPEG image
            alt="Medical professionals caring for patient"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
            width={800}
            height={400}
          />
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">
              <CountUp from={0} to={99} separator="," direction="up" duration={1} className="count-up-text" />
              %
            </h3>
            <p className="text-sm text-gray-500">Accuracy Rate</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">
              <CountUp from={0} to={1000000} separator="," direction="up" duration={1} className="count-up-text" />
              +
            </h3>
            <p className="text-sm text-gray-500">Scans Analyzed</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">
              <CountUp from={0} to={500} separator="," direction="up" duration={1} className="count-up-text" />
              +
            </h3>
            <p className="text-sm text-gray-500">Hospitals Using</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">
              <CountUp from={0} to={24} separator="," direction="up" duration={1} className="count-up-text" />
              /7
            </h3>
            <p className="text-sm text-gray-500">Support Available</p>
          </div>
        </div>
      </div>
    </section>
  );
}
