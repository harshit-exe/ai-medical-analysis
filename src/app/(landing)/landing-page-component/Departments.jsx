'use client'
import { Stethoscope, Brain, Heart, Baby } from "lucide-react"
export default function Departments() {
  const departments = [
    {
      icon: Stethoscope,
      name: "Emergency Department",
      description: "24/7 emergency care services",
    },
    {
      icon: Baby,
      name: "Pediatric Department",
      description: "Specialized care for children",
    },
    {
      icon: Heart,
      name: "Cardiology Department",
      description: "Expert heart care services",
    },
    {
      icon: Brain,
      name: "Neurology Department",
      description: "Advanced neurological treatment",
    },
  ]

  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-600">OUR DEPARTMENTS</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">For Your Health</h2>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-2 mt-12">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 rounded-lg border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="rounded-full bg-blue-100 p-3">
                <dept.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">{dept.name}</h3>
              <p className="text-center text-gray-500">{dept.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

