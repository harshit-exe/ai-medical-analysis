"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Activity, Brain, Zap } from "lucide-react"

const SplitText = ({ text, ...props }) => {
  return (
    <span {...props}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </span>
  )
}

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div className="bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl" whileHover={{ y: -5 }}>
    <div className="flex items-center space-x-4 mb-4">
      <div className="bg-blue-100 rounded-full p-3">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

const StatCard = ({ value, label }) => (
  <motion.div className="bg-white rounded-lg shadow-lg p-6 text-center" whileHover={{ scale: 1.05 }}>
    <motion.h2
      className="text-4xl font-bold text-blue-600 mb-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {value}
    </motion.h2>
    <p className="text-gray-600">{label}</p>
  </motion.div>
)

export default function About() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  const [isHovered, setIsHovered] = useState(false)

  const features = [
    { icon: Activity, title: "Precision Diagnostics", description: "Unparalleled accuracy in medical image analysis" },
    { icon: Brain, title: "AI-Powered Insights", description: "Advanced algorithms for faster, smarter diagnoses" },
    { icon: Zap, title: "Rapid Processing", description: "Lightning-fast analysis of complex medical imagery" },
  ]

  const stats = [
    { value: "99.9%", label: "Accuracy Rate" },
    { value: "500K+", label: "Scans Analyzed" },
    { value: "24/7", label: "Availability" },
  ]

  return (
    <section ref={containerRef} className="py-24 bg-gradient-to-b from-white to-blue-50">
      <motion.div className="container px-4 md:px-6 mx-auto max-w-7xl" style={{ opacity, scale }}>
        <div className="grid gap-12 lg:grid-cols-2 items-center mb-24">
          <div className="space-y-8">
            <div className="space-y-2">
              {/* <motion.div
                className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                About Us
              </motion.div> */}
              <SplitText
                text="Revolutionizing Medical Imaging with AI"
                className="text-4xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
              />
            </div>
            <div className="text-gray-600 text-lg leading-relaxed">
              <SplitText text="Our cutting-edge AI platform is transforming medical imaging diagnostics. We provide healthcare professionals with accurate, efficient, and scalable solutions that reduce human error and accelerate diagnosis, ultimately leading to better patient outcomes." />
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue-600 text-white hover:bg-blue-700 h-11 px-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
              <motion.button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-11 px-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl shadow-2xl">
            <motion.img
              src="/images/OIP3.avif"
              alt="AI-powered radiology analysis"
              className="object-cover w-full h-full transition-all duration-300"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              animate={{ scale: isHovered ? 1.05 : 1 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-transparent mix-blend-overlay"
              animate={{ opacity: isHovered ? 0.8 : 0.6 }}
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-24">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

