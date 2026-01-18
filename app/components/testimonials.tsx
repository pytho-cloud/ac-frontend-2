'use client'
import { useEffect, useState } from "react";

type Testimonial = {
  name: string;
  text: string;
};

type ReviewForm = {
  name: string;
  product_name: string;
  review: string;
  rating: string;
  image: File | null;
};

const dummyTestimonials: Testimonial[] = [
  { name: "Rahul Sharma", text: "Excellent AC service! Quick installation and very professional team." },
  { name: "Priya Verma", text: "Affordable pricing and great support. My AC is working perfectly now!" },
  { name: "Amit Patel", text: "Very polite technicians and fast service." },
  { name: "Neha Singh", text: "Best AC service provider in the city." }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState<ReviewForm>({
    name: "",
    product_name: "",
    review: "",
    rating: "",
    image: null
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((p) => (p + 1) % dummyTestimonials.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("product_name", form.product_name);
    formData.append("review", form.review);
    formData.append("rating", form.rating);
    if (form.image) formData.append("image", form.image);

    const res = await fetch("http://127.0.0.1:8000/api/reviews/", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Review submitted successfully! Waiting for admin approval.");
      setShowForm(false);
      setForm({
        name: "",
        product_name: "",
        review: "",
        rating: "",
        image: null
      });
    } else {
      alert("Error submitting review");
    }
  };

  return (
    <section className="py-20 bg-white" id="testimonial">
      <div className="max-w-4xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
          What Our Customers Say
        </h2>

        {/* Dummy Slider */}
        <div className="mt-10 bg-blue-50 p-8 rounded-xl shadow">
          <p className="text-blue-800 italic text-lg">
            “{dummyTestimonials[index].text}”
          </p>
          <p className="mt-4 font-semibold text-blue-900">
            — {dummyTestimonials[index].name}
          </p>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {dummyTestimonials.map((_, i) => (
            <span
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                i === index ? "bg-blue-600" : "bg-blue-300"
              }`}
            />
          ))}
        </div>

        {/* Button */}
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-10"
        >
          Add Review
        </button>
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 animate-fadeIn">

          <div className="bg-white w-full max-w-md mt-24 p-6 rounded-xl shadow-xl animate-smoothDrop">

            <h3 className="text-xl font-bold text-center mb-4">
              Submit Review
            </h3>

            <input
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mb-3 px-3 py-2 border rounded"
            />

            <input
              placeholder="Product Name"
              value={form.product_name}
              onChange={(e) => setForm({ ...form, product_name: e.target.value })}
              className="w-full mb-3 px-3 py-2 border rounded"
            />

            <textarea
              placeholder="Your Review"
              value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })}
              className="w-full mb-3 px-3 py-2 border rounded"
            />

            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              className="w-full mb-3 px-3 py-2 border rounded"
            >
              <option value="">Select Rating</option>
              <option value="1">⭐ 1</option>
              <option value="2">⭐ 2</option>
              <option value="3">⭐ 3</option>
              <option value="4">⭐ 4</option>
              <option value="5">⭐ 5</option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files?.[0] || null })
              }
              className="w-full mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="w-1/2 bg-gray-300 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="w-1/2 bg-blue-600 text-white py-2 rounded"
              >
                Submit
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
