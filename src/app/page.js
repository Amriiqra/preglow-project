import Navbar from "@/components/shared/Navbar";
import Header from "../sections/landing/Header";
import Feature from "../sections/landing/Feature";
import Testimonial from "../sections/landing/Testimonial";
import Blog from "../sections/landing/Blog";
import Footer from "../sections/landing/Footer";
import FAQ from "../sections/landing/FAQ";

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <Header />
      <Feature />
      <Testimonial />
      <Blog />
      <FAQ />
      <Footer />
    </div>
  );
}
