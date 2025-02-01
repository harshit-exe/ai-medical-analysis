import { Shield } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b">
      <div className="container flex h-16 items-center justify-between px-20">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">AI Diagnostics</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-10">
          <Link href="#" className="text-sm font-medium hover:text-blue-600">
            Home
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-blue-600">
            About
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-blue-600">
            Features
          </Link>
          <Link href={'/login'} className="text-sm font-medium hover:text-blue-600">
            Login
          </Link>
        </nav>
        {/* <div className="flex items-center space-x-4">
          <Link
            href="#upload"
            className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Upload Your Scan
          </Link>
        </div> */}
      </div>
    </header>
  )
}

