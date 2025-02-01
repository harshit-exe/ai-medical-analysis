'use client'
import { useState } from "react";
export default function Appointment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    date: "",
    time: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.department) newErrors.department = "Please select a department";
    if (!formData.date) newErrors.date = "Select a valid date";
    if (!formData.time) newErrors.time = "Select a valid time";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit the form (You can integrate API here)
    alert("Appointment booked successfully!");
    setFormData({
      name: "",
      email: "",
      department: "",
      date: "",
      time: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <section id="appointment" className="py-16 bg-blue-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800">Book an Appointment</h2>
          <p className="text-gray-500 text-center mt-2 mb-6">
            Schedule your visit with our experienced medical professionals.
          </p>
          <form className="grid gap-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full rounded-md border px-4 py-2 focus:ring focus:ring-blue-300"
                id="name"
                placeholder="Enter your name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full rounded-md border px-4 py-2 focus:ring focus:ring-blue-300"
                id="email"
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Department */}
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="department">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full rounded-md border px-4 py-2 focus:ring focus:ring-blue-300"
                id="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option>Emergency</option>
                <option>Pediatric</option>
                <option>Cardiology</option>
                <option>Neurology</option>
              </select>
              {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
            </div>

            {/* Date */}
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="date">
                Appointment Date <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full rounded-md border px-4 py-2 focus:ring focus:ring-blue-300"
                id="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>

            {/* Time */}
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="time">
                Preferred Time <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full rounded-md border px-4 py-2 focus:ring focus:ring-blue-300"
                id="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
              />
              {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
            </div>

            {/* Additional Message */}
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="message">
                Additional Message (Optional)
              </label>
              <textarea
                className="w-full rounded-md border px-4 py-2 focus:ring focus:ring-blue-300"
                id="message"
                placeholder="Enter any specific requests or concerns..."
                rows="3"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              className="w-full rounded-md bg-blue-600 px-8 py-2 text-white hover:bg-blue-700 focus:ring focus:ring-blue-300"
              type="submit"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
