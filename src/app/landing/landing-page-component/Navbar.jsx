import { Shield } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b">
<<<<<<< HEAD
      <div className="container flex h-16 items-center justify-between px-4">
        <a href="#" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">AI-Rad Diagnostics</span>
        </a>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#home" className="text-sm font-medium hover:text-blue-600">
=======
      <div className="container flex h-16 items-center justify-between px-20">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">AI-Rad Diagnostics</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-10">
          <Link href="#" className="text-sm font-medium hover:text-blue-600">
>>>>>>> origin/abhishek
            Home
          </a>
          <a href="#about" className="text-sm font-medium hover:text-blue-600">
            About
          </a>
          {/* <a href="#appointment" className="text-sm font-medium hover:text-blue-600">
            Appointment
          </a>
          <a href="#departments" className="text-sm font-medium hover:text-blue-600">
            Departments
          </a> */}
          <a href="#features" className="text-sm font-medium hover:text-blue-600">
            Features
          </a>
          <a href="#security" className="text-sm font-medium hover:text-blue-600">
            Security
          </a>
        </nav>
<<<<<<< HEAD
        <div className="flex items-center space-x-4">
          <a
=======
        {/* <div className="flex items-center space-x-4">
          <Link
>>>>>>> origin/abhishek
            href="#upload"
            className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Upload Your Scan
<<<<<<< HEAD
          </a>
        </div>
=======
          </Link>
        </div> */}
>>>>>>> origin/abhishek
      </div>
    </header>
  );
}


