"use client";

import { useRef } from "react";
import SplitText from "./animate/SplitText";

export default function About() {
  const containerRef = useRef(null);

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            {/* <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-600">
              ABOUT US
            </div> */}
            <SplitText
              text="About Us"
              className="text-[3rem] font-semibold text-center"
              delay={20}
              animationFrom={{
                opacity: 0,
                transform: "translate3d(0,50px,0)",
              }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-50px"
              // onLetterAnimationComplete={handleAnimationComplete}
            />
            <div className="">
              <SplitText
                text="Our platform leverages cutting-edge artificial intelligence to
              enhance medical imaging diagnostics, providing accurate,
              efficient, and scalable solutions. By analyzing radiology scans
              with high precision, our AI reduces human error and accelerates
              diagnosis, supporting healthcare professionals in delivering
              better patient outcomes."
                className="text-[1.1rem] font-[400] text-center text-zinc-700"
                delay={3}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,50px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-50px"
                // onLetterAnimationComplete={handleAnimationComplete}
              />
            </div>
            {/* <p className="text-gray-500 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              
            </p> */}
          </div>
          <div className="aspect-video overflow-hidden rounded-xl">
            <img
              src="/images/OIP3.avif"
              alt="AI-powered radiology analysis"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
