import Image from "next/image";
import Hero from "./components/Hero";
import Service from "./components/Service";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/testimonials";
import HomeProducts from "./components/HomeProduct";

export default function Home() {
  return (
    <>
      <Hero />
      <Service />
      <HomeProducts />
      <WhyChooseUs />
      <Testimonials />

    </>
  );
}
