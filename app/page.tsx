import Image from "next/image";
import Hero from "./components/Hero";
import Service from "./components/Service";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/testimonials";
import HomeProducts from "./components/HomeProduct";
import HashScroll from "./components/HashScroll";
import HomeProduct2 from "./components/HomeProduct2";
import ContactForm from "./components/ContactForm";
import ContentSection from "./components/ContentSection";

export default function Home() {
  return (
    <>

      <Hero />
      <Service />
      <HomeProducts />
      <ContentSection />
      <HomeProduct2 />
      <WhyChooseUs />
      <Testimonials />
      <ContactForm />

    </>
  );
}
