'use client'

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface Product {
    id: number;
    brand: string;
    model_name: string;
    image: string; // full URL like http://127.0.0.1:8000/media/ac/ac1.jpg
    price?: number;
}

export interface HomeProductsResponse {
    data_refurbish: Product[];
}

export default function HomeProduct2() {
    const [refurbishedProducts, setRefurbished] = useState<Product[]>([]);

    const callRefurbishedProducts = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/acs/");
            const result: HomeProductsResponse = await response.json();

            setRefurbished(result.data_refurbish);
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    useEffect(() => {
        callRefurbishedProducts();
    }, []);

    return (
        <section className="py-8 px-8 bg-blue-50">
            <div className="max-w-7xl mx-auto px-6 mb-20 py-8">
                <h2 className="text-3xl font-bold text-green-700 mb-8">
                    Refurbished AC Products
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {refurbishedProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-5 shadow hover:shadow-xl transition hover:-translate-y-2"
                        >
                            <img
                                src={product.image}
                                alt={product.model_name}
                                className="mx-auto w-60 h-60 object-contain rounded-xl"
                            />

                            <h3 className="mt-4 text-lg font-semibold text-green-900">
                                {product.brand} {product.model_name}
                            </h3>

                            {product.price && (
                                <p className="text-green-700 font-bold mt-2">
                                    ₹{product.price}
                                </p>
                            )}

                            <div className="mt-4 flex gap-3">
                                <a
                                    href="tel:+919999999999"
                                    className="w-1/2 bg-blue-600 text-white py-2 rounded-xl text-sm text-center"
                                >
                                    Call
                                </a>
                                <a
                                    href={`https://wa.me/919999999999?text=Hi, I am interested in ${product.brand} ${product.model_name}`}
                                    target="_blank"
                                    className="w-1/2 bg-green-600 text-white py-2 rounded-xl text-sm text-center"
                                >
                                    WhatsApp
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
