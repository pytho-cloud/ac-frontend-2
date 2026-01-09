'use client'
import { useEffect, useState } from "react";

const words = [
    "With Our AC Services",
    "With Trusted Experts",
    "With Affordable Price",
    "With Fast Support"
];

export default function Hero() {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [formVisible, setFormVisible] = useState(false);

    // Typing effect
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

    return (
        <>
            <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden h-screen flex items-center">

                {/* Animated background circles */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute top-1/2 -right-24 w-96 h-96 bg-sky-300 rounded-full opacity-30 animate-pulse"></div>

                <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center h-full">

                    {/* Left */}
                    <div>
                        <h1 className="text-2xl md:text-5xl font-extrabold text-blue-900 leading-tight">
                            Stay Cool & Comfortable <br />
                            <span className="text-blue-600">
                                {text}
                                <span className="animate-pulse">|</span>
                            </span>
                        </h1>

                        <p className="mt-6 text-lg text-blue-700 max-w-xl">
                            We provide professional air conditioning installation, repair, and maintenance services.
                            Plus, get the best AC units for your home or office at affordable prices.
                        </p>

                        <div className="mt-8 flex gap-4 flex-wrap">
                            <button
                                onClick={() => setFormVisible(true)}
                                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-500 transition transform hover:scale-105"
                            >
                                Book Service
                            </button>

                            <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition">
                                Product
                            </button>
                        </div>
                    </div>

                    {/* Right */}
                    <div>
                        <img
                            src="/images/hero-ac.png"
                            alt="AC Services Illustration"
                            className="w-full max-w-md mx-auto drop-shadow-xl"
                        />
                    </div>

                </div>
            </section>

            {/* CONTACT FORM SLIDE-IN MODAL */}
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-300
          ${formVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
                onClick={() => setFormVisible(false)}
            >
                <div
                    className={`bg-white rounded-2xl w-full max-w-md p-8 transform transition-transform duration-300
            ${formVisible ? "translate-y-0" : "translate-y-full"}
          `}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside form
                >
                    <button
                        onClick={() => setFormVisible(false)}
                        className="absolute top-3 right-4 text-xl font-bold text-gray-500 hover:text-black"
                    >
                        ✕
                    </button>

                    <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">
                        Book AC Service
                    </h2>

                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full border p-3 rounded-lg outline-blue-500"
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full border p-3 rounded-lg outline-blue-500"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full border p-3 rounded-lg outline-blue-500"
                        />
                        <textarea
                            placeholder="Service Requirement"
                            rows={3}
                            className="w-full border p-3 rounded-lg outline-blue-500"
                        ></textarea>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-500 transition"
                        >
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
