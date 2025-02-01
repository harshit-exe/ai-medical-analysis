export default function About() {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-600">ABOUT US</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Advanced AI for Radiology</h2>
            <p className="text-gray-500 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              Our platform leverages cutting-edge artificial intelligence to enhance medical imaging diagnostics,
              providing accurate, efficient, and scalable solutions. By analyzing radiology scans with high precision,
              our AI reduces human error and accelerates diagnosis, supporting healthcare professionals in delivering
              better patient outcomes.
            </p>
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
  )
}

