import { Brain, Shield, Zap, Clock } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Brain,
      name: "Advanced AI Analysis",
      description: "State-of-the-art machine learning algorithms for accurate diagnosis",
    },
    {
      icon: Shield,
      name: "Data Security",
      description: "HIPAA-compliant platform with end-to-end encryption",
    },
    {
      icon: Zap,
      name: "Fast Results",
      description: "Rapid analysis and reporting for quick decision-making",
    },
    {
      icon: Clock,
      name: "24/7 Availability",
      description: "Round-the-clock access to AI-powered diagnostics",
    },
  ]

  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Platform Features</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our AI-powered platform offers a range of features designed to revolutionize radiology diagnostics
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-2 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 rounded-lg border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="rounded-full bg-blue-100 p-3">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">{feature.name}</h3>
              <p className="text-center text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

