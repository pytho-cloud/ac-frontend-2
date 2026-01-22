'use client'

import { useEffect, useState } from "react"

export interface Review {
  id: number
  name: string
  product_name: string | null
  review: string
  rating: number
  image: string | null
  is_active: boolean
}

export interface ReviewForm {
  name: string
  product_name: string
  review: string
  rating: string
  image: File | null
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [index, setIndex] = useState(0)
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState<ReviewForm>({
    name: "",
    product_name: "",
    review: "",
    rating: "",
    image: null
  })

  // Fetch reviews from backend
  const fetchReviews = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/reviews/")
      const data = await res.json()
      if (data.status === 200) {
        setReviews(data.data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  // Slider logic
  useEffect(() => {
    if (reviews.length === 0) return
    const interval = setInterval(() => {
      setIndex((p) => (p + 1) % reviews.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [reviews])

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append("name", form.name)
    formData.append("product_name", form.product_name)
    formData.append("review", form.review)
    formData.append("rating", form.rating)
    if (form.image) formData.append("image", form.image)

    try {
      const res = await fetch("http://127.0.0.1:8000/api/reviews/", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        alert("Review submitted successfully! Waiting for admin approval.")
        setShowForm(false)
        setForm({ name: "", product_name: "", review: "", rating: "", image: null })
        fetchReviews() // refresh list
      } else {
        alert("Error submitting review")
      }
    } catch (err) {
      console.error(err)
      alert("Error submitting review")
    }
  }

  return (
    <section className="py-20 bg-blue-50" id="testimonial">
      <div className="max-w-4xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
          What Our Customers Say
        </h2>

        {reviews.length > 0 ? (
          <div className="mt-10 bg-blue-50 p-8 rounded-xl shadow">
            {reviews[index].image && (
              <img
                src={`http://127.0.0.1:8000/${reviews[index].image}`}
                alt={reviews[index].name}
                className="mx-auto w-24 h-24 rounded-full mb-4 object-cover"
              />
            )}
            <p className="text-blue-800 italic text-lg">
              “{reviews[index].review}”
            </p>
            <p className="mt-4 font-semibold text-blue-900">
              — {reviews[index].name} ({reviews[index].product_name || "Product"})
            </p>
          </div>
        ) : (
          <p className="mt-10 text-blue-700">No reviews yet.</p>
        )}

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
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
  )
}
