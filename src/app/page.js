import Navbar from "@/components/shared/Navbar";
import Header from "../../sections/landing/Header";
import Feature from "../../sections/landing/Feature";
import Testimonial from "../../sections/landing/Testimonial";
import Blog from "../../sections/landing/Blog";
import Footer from "../../sections/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Header />
      <Feature />
      <Testimonial />
      <Blog />
      <Footer />
    </>
  );
}
