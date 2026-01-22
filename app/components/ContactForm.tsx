'use client'

import { useState } from "react"
import { motion } from "framer-motion"

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setSuccess("")

        try {
            const res = await fetch("http://127.0.0.1:8000/api/contact/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                setSuccess("Your message has been submitted successfully!")
                setFormData({ name: "", email: "", phone: "", message: "" })
            } else {
                const data = await res.json()
                setSuccess("Error: " + JSON.stringify(data))
            }

        } catch (err) {
            console.error(err)
            setSuccess("Something went wrong!")
        }

        setLoading(false)
    }

    return (
        <section className="py-20 bg-gray-50" id="contact">
            <div className="max-w-3xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold text-blue-900 mb-6 text-center"
                >
                    Contact Us
                </motion.h2>

                <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-xl space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md p-2"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md p-2"
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Your Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />

                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md p-2"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>

                    {success && <p className="text-green-600 mt-2 text-center">{success}</p>}
                </form>
            </div>
        </section>
    )
}
