'use client'
import { useEffect, useState } from "react";

const testimonials = [
    {
        name: "Rahul Sharma",
        text: "Excellent AC service! Quick installation and very professional team. Highly recommended."
    },
    {
        name: "Priya Verma",
        text: "Affordable pricing and great support. My AC is working perfectly now!"
    },
    {
        name: "Amit Patel",
        text: "Very polite technicians and fast service. Totally satisfied."
    },
    {
        name: "Neha Singh",
        text: "Best AC service provider in the city. Will definitely use again."
    }
];

export default function Testimonials() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 bg-white" id="testimonial">
            <div className="max-w-4xl mx-auto px-6 text-center">

                <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
                    What Our Customers Say
                </h2>

                {/* Slider Card */}
                <div className="mt-10 bg-blue-50 p-8 rounded-xl shadow transition-all duration-700 ease-out">

                    <p className="text-blue-800 italic text-lg">
                        “{testimonials[index].text}”
                    </p>

                    <p className="mt-4 font-semibold text-blue-900">
                        — {testimonials[index].name}
                    </p>

                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-6">
                    {testimonials.map((_, i) => (
                        <span
                            key={i}
                            className={`w-3 h-3 rounded-full cursor-pointer transition
              ${i === index ? "bg-blue-600" : "bg-blue-300"}`}
                            onClick={() => setIndex(i)}
                        ></span>
                    ))}
                </div>

            </div>
        </section>
    );
}
