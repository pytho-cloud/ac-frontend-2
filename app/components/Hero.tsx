'use client'

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const words = [
  "With Our AC Services",
  "With Trusted Experts",
  "With Affordable Price",
  "With Fast Support"
];

export default function Hero() {
  const router = useRouter();

  /* typing animation */
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  /* modal states */
  const [showService, setShowService] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [loading, setLoading] = useState(false);

  /* forms */
  const [serviceData, setServiceData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    service_requirements: ""
  });

  const [productData, setProductData] = useState({
    name: "",
    address: "",
    product_name: "",
    price: "",
    description: "",
    phone_number: ""
  });

  const [images, setImages] = useState<File[]>([]);
  const API_BASE_URL = "https://api.cooltechservice.net/";

  /* typing effect */
  useEffect(() => {
    const word = words[wordIndex];

    if (charIndex < word.length) {
      const t = setTimeout(() => {
        setText(word.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 80);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCharIndex(0);
        setWordIndex((prev) => (prev + 1) % words.length);
        setText("");
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [charIndex, wordIndex]);

  /* handlers */
  const handleServiceChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });
  };

  const handleProductChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  /* submit service */
  const submitService = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
  const API_BASE_URL = "https://api.cooltechservice.net";

      const res = await fetch(`${API_BASE_URL}/api/post-enquiry/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      });

      if (res.ok) {
        alert("Service booked successfully");
        setShowService(false);
        router.push("/#service");
      }
    } catch {
      alert("Server error");
    }
    setLoading(false);
  };

  /* submit product */
  const submitProduct = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    Object.entries(productData).forEach(([k, v]) => fd.append(k, v));
    images.forEach(img => fd.append("images", img));

    try {
      const res = await fetch(`${API_BASE_URL}/api/product-sell-create/`, {
        method: "POST",
        body: fd,
      });

      if (res.ok) {
        alert("Product submitted successfully");
        setShowProduct(false);
        router.push("/#products");
      }
    } catch {
      alert("Server error");
    }
    setLoading(false);
  };

  return (
    <>
      {/* HERO SECTION */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src="/hero/hero1.png"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />

          {/* LIGHT OVERLAY (NOT DARK) */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Stay Cool & Comfortable <br />
              <span className="text-blue-300">
                {text}
                <span className="animate-pulse">|</span>
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-blue-100">
              Professional AC installation, repair and services.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => setShowService(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition"
              >
                Book Service
              </button>

              <button
                onClick={() => setShowProduct(true)}
                className="border-2 border-blue-300 text-blue-300 px-6 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition"
              >
                Sell Product
              </button>
            </div>
          </div>

          <img
            src="/hero/herologo.png"
            className="w-32 sm:w-40 md:w-44 mx-auto opacity-90 hover:scale-105 transition"
            alt="Logo"
          />

        </div>
      </section>

      {/* SERVICE MODAL */}
      <AnimatePresence>
        {showService && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowService(false)}
          >
            <motion.div
              className="bg-white p-6 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto relative"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowService(false)} className="absolute top-4 right-4">
                <X />
              </button>

              <h2 className="text-xl font-bold mb-4 text-center">Book Service</h2>

              <form className="space-y-4" onSubmit={submitService}>
                <input name="full_name" onChange={handleServiceChange} placeholder="Full Name" className="w-full border p-3 rounded" required />
                <input name="phone_number" onChange={handleServiceChange} placeholder="Phone" className="w-full border p-3 rounded" required />
                <input name="email" onChange={handleServiceChange} placeholder="Email" className="w-full border p-3 rounded" />
                <textarea name="service_requirements" onChange={handleServiceChange} placeholder="Requirement" className="w-full border p-3 rounded" required />
                <button className="w-full bg-blue-600 text-white py-3 rounded">
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRODUCT MODAL */}
      <AnimatePresence>
        {showProduct && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3"
            onClick={() => setShowProduct(false)}
          >
            <motion.div
              className="bg-white p-6 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowProduct(false)} className="absolute top-4 right-4">
                <X />
              </button>

              <h2 className="text-xl font-bold mb-4 text-center">Sell Product</h2>

              <form className="space-y-4" onSubmit={submitProduct}>
                <input name="name" onChange={handleProductChange} placeholder="Name" className="w-full border p-3 rounded" required />
                <textarea name="address" onChange={handleProductChange} placeholder="Address" className="w-full border p-3 rounded" required />
                <input name="product_name" onChange={handleProductChange} placeholder="Product Name" className="w-full border p-3 rounded" required />
                <input name="price" onChange={handleProductChange} placeholder="Price" className="w-full border p-3 rounded" required />
                <textarea name="description" onChange={handleProductChange} placeholder="Description" className="w-full border p-3 rounded" required />
                <input name="phone_number" onChange={handleProductChange} placeholder="Phone" className="w-full border p-3 rounded" required />
                <input type="file" multiple onChange={handleImages} className="w-full border p-3 rounded" />
                <button className="w-full bg-blue-600 text-white py-3 rounded">
                  {loading ? "Submitting..." : "Submit Product"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
