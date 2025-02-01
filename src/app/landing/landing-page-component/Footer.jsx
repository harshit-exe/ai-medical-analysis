import { Shield } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container flex flex-col gap-6 py-8 md:py-12">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-blue-600" />
          <span className="text-lg font-bold">AI-Rad Diagnostics</span>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-gray-500 hover:text-gray-900" href="#">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-gray-500 hover:text-gray-900" href="#">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-gray-500 hover:text-gray-900" href="#">
                  AI Diagnosis
                </Link>
              </li>
              <li>
                <Link className="text-gray-500 hover:text-gray-900" href="#">
                  Radiology Support
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-gray-500 hover:text-gray-900" href="#">
                  Email us
                </Link>
              </li>
              <li>
                <Link className="text-gray-500 hover:text-gray-900" href="#">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-gray-500 hover:text-gray-900" href="#">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-gray-500 hover:text-gray-900" href="#">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} AI-Rad Diagnostics. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

