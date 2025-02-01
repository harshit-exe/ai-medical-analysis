import Navbar from "./landing-page-component/Navbar"
import Hero from "./landing-page-component/Hero"
import About from "./landing-page-component/About"
import Features from "./landing-page-component/Features"
import Upload from "./landing-page-component/Upload"
import Footer from "./landing-page-component/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <About />
        <Features />
        {/* <Upload /> */}
      </main>
      <Footer />
    </>
  )
}

