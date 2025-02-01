export default function Appointment() {
  return (
    <section id="appointment" className="py-12 md:py-24 bg-blue-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Book an Appointment</h2>
            <p className="text-gray-500 md:text-lg">Schedule your visit with our experienced medical professionals.</p>
          </div>
          <div className="space-y-4">
            <form className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="name">
                  Full Name
                </label>
                <input
                  className="rounded-md border border-gray-200 px-4 py-2"
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  className="rounded-md border border-gray-200 px-4 py-2"
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="department">
                  Department
                </label>
                <select className="rounded-md border border-gray-200 px-4 py-2" id="department">
                  <option>Select Department</option>
                  <option>Emergency</option>
                  <option>Pediatric</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                </select>
              </div>
              <button className="rounded-md bg-blue-600 px-8 py-2 text-white hover:bg-blue-700" type="submit">
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

