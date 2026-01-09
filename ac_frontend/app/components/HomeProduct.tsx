'use client'
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const products = [
    { id: 1, name: "Samsung 1.5 Inverter AC", price: "₹38,999", image: "/images/ac1.png", type: "new" },
    { id: 2, name: "LG 1 Ton Split AC", price: "₹29,499", image: "/images/ac2.png", type: "new" },
    { id: 3, name: "LG 1 Ton Split AC", price: "₹29,499", image: "/images/ac2.png", type: "new" },
    { id: 4, name: "LG 1 Ton Split AC", price: "₹29,499", image: "/images/ac2.png", type: "refurbished" },
    { id: 5, name: "Daikin 2 Ton Smart AC", price: "₹52,999", image: "/images/ac3.png", type: "refurbished" },
    { id: 6, name: "Voltas Window AC", price: "₹24,999", image: "/images/ac4.png", type: "refurbished" },
    { id: 7, name: "Voltas Window AC", price: "₹24,999", image: "/images/ac4.png", type: "refurbished" },
    { id: 8, name: "Voltas Window AC", price: "₹24,999", image: "/images/ac4.png", type: "new" },
    { id: 9, name: "Voltas Window AC", price: "₹24,999", image: "/images/ac4.png", type: "new" },

];

export default function HomeProducts() {
    const [filter, setFilter] = useState("new");

    const filteredProducts = products.filter(p => p.type === filter);

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-4xl font-bold text-center text-blue-900 mb-4"
                >
                    Our Best AC Products
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-center text-blue-700 mb-12"
                >
                    Choose from top brands with best performance & warranty.
                </motion.p>

                {/* Filter Buttons */}
                <div className="flex gap-4 justify-center mb-12">
                    <button
                        onClick={() => setFilter("new")}
                        className={`px-8 py-2 rounded-xl font-semibold transition
              ${filter === "new"
                                ? "bg-blue-600 text-white"
                                : "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                            }`}
                    >
                        New
                    </button>

                    <button
                        onClick={() => setFilter("refurbished")}
                        className={`px-8 py-2 rounded-xl font-semibold transition
              ${filter === "refurbished"
                                ? "bg-green-600 text-white"
                                : "border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                            }`}
                    >
                        Refurbished
                    </button>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="bg-blue-50 rounded-2xl p-5 shadow hover:shadow-xl transition transform hover:-translate-y-2"
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={300}
                                height={300}
                                className="mx-auto"
                            />

                            <h3 className="mt-4 text-lg font-semibold text-blue-900">
                                {product.name}
                            </h3>

                            <p className="text-blue-700 font-bold mt-2">
                                {product.price}
                            </p>

                            <div className="mt-4 flex gap-3">
                                <button className="w-1/2 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-500 transition text-sm font-semibold">
                                    New
                                </button>

                                <button className="w-1/2 bg-green-600 text-white py-2 rounded-xl hover:bg-green-500 transition text-sm font-semibold">
                                    Refurbished
                                </button>
                            </div>
                        </motion.div>
                    ))}

                </div>

            </div>
        </section>
    );
}
