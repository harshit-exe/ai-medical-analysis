import Navbar from "./landing-page-component/Navbar";
import Hero from "./landing-page-component/Hero";
import About from "./landing-page-component/About";
import Features from "./landing-page-component/Features";
// import Upload from "./landing-page-component/Upload";
import Footer from "./landing-page-component/Footer";
// import Upload from "./landing-page-component/Appointment";
// import Upload from "./landing-page-component/Departments";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="features"><Features /></section>
        {/* <section id="upload"><Upload /></section> */}
      </main>
      <Footer />
    </>
  );
}