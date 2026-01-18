'use client'
import { useEffect, useState, ChangeEvent, FormEvent } from "react";

const words: string[] = [
  "With Our AC Services",
  "With Trusted Experts",
  "With Affordable Price",
  "With Fast Support"
];

interface FormDataType {
  full_name: string;
  phone_number: string;
  email: string;
  service_requirements: string;
}

interface ProductFormType {
  name: string;
  address: string;
  product_name: string;
  price: string;
  description: string;
  phone_number: string;
}

export default function Hero() {

  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const [formVisible, setFormVisible] = useState(false);
  const [productFormVisible, setProductFormVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    full_name: "",
    phone_number: "",
    email: "",
    service_requirements: ""
  });

  const [productData, setProductData] = useState<ProductFormType>({
    name: "",
    address: "",
    product_name: "",
    price: "",
    description: "",
    phone_number: ""
  });

  const [productImages, setProductImages] = useState<File[]>([]);

  // Typing animation
  useEffect(() => {
    const currentWord = words[wordIndex];

    if (charIndex < currentWord.length) {
      const timeout = setTimeout(() => {
        setText(currentWord.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCharIndex(0);
        setWordIndex((prev) => (prev + 1) % words.length);
        setText("");
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, wordIndex]);

  // Handlers
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProductChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductImages(Array.from(e.target.files));
    }
  };

  // Service submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000//api/post-enquiry/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Service booked successfully!");
        setFormData({
          full_name: "",
          phone_number: "",
          email: "",
          service_requirements: ""
        });
        setFormVisible(false);
      } else {
        alert("Submission failed");
      }
    } catch {
      alert("Server error");
    }

    setLoading(false);
  };

  // Product submit with images
  const handleProductSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("address", productData.address);
      formData.append("product_name", productData.product_name);
      formData.append("price", productData.price);
      formData.append("description", productData.description);
      formData.append("phone_number", productData.phone_number);

      productImages.forEach(img => {
        formData.append("images", img);
      });

      const res = await fetch("http://127.0.0.1:8000//api/product-sell-create/", {
        method: "POST",
        body: formData
      });

      if (res.ok) {
        alert("Product submitted successfully!");
        setProductData({
          name: "",
          address: "",
          product_name: "",
          price: "",
          description: "",
          phone_number: ""
        });
        setProductImages([]);
        setProductFormVisible(false);
      } else {
        alert("Submission failed");
      }
    } catch {
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex items-center">

        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

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
              <button onClick={() => setFormVisible(true)} className="bg-blue-600 text-white px-6 py-3 rounded-xl">
                Book Service
              </button>

              <button onClick={() => setProductFormVisible(true)} className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl">
                Sell Product
              </button>
            </div>
          </div>

          <img src="/images/hero-ac.png" className="w-full max-w-md mx-auto" />

        </div>
      </section>

      {/* SERVICE MODAL */}
      {formVisible && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50" onClick={() => setFormVisible(false)}>
          <div className="bg-white p-8 rounded-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Book Service</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Full Name" className="w-full border p-3 rounded" required />
              <input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone" className="w-full border p-3 rounded" required />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border p-3 rounded" />
              <textarea name="service_requirements" value={formData.service_requirements} onChange={handleChange} placeholder="Requirement" className="w-full border p-3 rounded" required />

              <button className="w-full bg-blue-600 text-white py-3 rounded">
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {productFormVisible && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50" onClick={() => setProductFormVisible(false)}>
          <div className="bg-white p-8 rounded-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Sell Product</h2>

            <form className="space-y-4" onSubmit={handleProductSubmit}>

              <input name="name" value={productData.name} onChange={handleProductChange} placeholder="Your Name" className="w-full border p-3 rounded" required />

              <textarea name="address" value={productData.address} onChange={handleProductChange} placeholder="Your Address" className="w-full border p-3 rounded" required />

              <input name="product_name" value={productData.product_name} onChange={handleProductChange} placeholder="Product Name" className="w-full border p-3 rounded" required />

              <input name="price" value={productData.price} onChange={handleProductChange} placeholder="Price" className="w-full border p-3 rounded" required />

              <textarea name="description" value={productData.description} onChange={handleProductChange} placeholder="Description" className="w-full border p-3 rounded" required />

              <input name="phone_number" value={productData.phone_number} onChange={handleProductChange} placeholder="Phone Number" className="w-full border p-3 rounded" required />

              <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full border p-3 rounded" required />

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
