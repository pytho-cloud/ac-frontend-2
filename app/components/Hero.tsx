'use client'

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

const words = [
  "With Our AC Services",
  "With Trusted Experts",
  "With Affordable Price",
  "With Fast Support"
];

export default function Hero() {
  const router = useRouter();

  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const [showService, setShowService] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [loading, setLoading] = useState(false);

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

  /* typing animation */
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
      const res = await fetch("http://127.0.0.1:8000/api/post-enquiry/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      });

      if (res.ok) {
        alert("Service booked successfully");
        setShowService(false);
        router.push("/#service"); // 🔥 REDIRECTION
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
      const res = await fetch("http://127.0.0.1:8000/api/product-sell-create/", {
        method: "POST",
        body: fd,
      });

      if (res.ok) {
        alert("Product submitted successfully");
        setShowProduct(false);
        router.push("/#products"); // 🔥 REDIRECTION
      }
    } catch {
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <>
      {/* HERO */}
      <section id="home" className="relative bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-blue-900">
              Stay Cool & Comfortable <br />
              <span className="text-blue-600">
                {text}<span className="animate-pulse">|</span>
              </span>
            </h1>

            <p className="mt-6 text-lg text-blue-700">
              Professional AC installation, repair and maintenance.
            </p>

            <div className="mt-8 flex gap-4">
              <button onClick={() => setShowService(true)} className="bg-blue-600 text-white px-6 py-3 rounded-xl">
                Book Service
              </button>

              <button onClick={() => setShowProduct(true)} className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl">
                Sell Product
              </button>
            </div>
          </div>

          <img
            src="/logo.png"
            className="
    w-full max-w-md mx-auto
    transform transition-transform duration-500
    hover:scale-110 hover:-rotate-3 hover:translate-y-1
  "
          />


        </div>
      </section>

      {/* SERVICE MODAL */}
      {showService && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowService(false)}>
          <div className="bg-white p-8 rounded-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Book Service</h2>

            <form className="space-y-4" onSubmit={submitService}>
              <input name="full_name" onChange={handleServiceChange} placeholder="Full Name" className="w-full border p-3 rounded" required />
              <input name="phone_number" onChange={handleServiceChange} placeholder="Phone" className="w-full border p-3 rounded" required />
              <input name="email" onChange={handleServiceChange} placeholder="Email" className="w-full border p-3 rounded" />
              <textarea name="service_requirements" onChange={handleServiceChange} placeholder="Requirement" className="w-full border p-3 rounded" required />

              <button className="w-full bg-blue-600 text-white py-3 rounded">
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {showProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowProduct(false)}>
          <div className="bg-white p-8 rounded-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Sell Product</h2>

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
          </div>
        </div>
      )}
    </>
  );
}
