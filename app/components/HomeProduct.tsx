'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
export interface Product {
    id: number;
    ton: string | null;
    brand: string;
    model_name: string;
    condition: "new" | "refurbished";
    ac_type: "split" | "window";
    capacity: number;
    energy_rating: number;
    price: number;
    description: string | null;
    is_available: boolean;
    image: string;
    is_home_active: boolean;
}

export interface HomeProductsResponse {
    data_new: Product[];
    data_refurbish: Product[];
}

export default function HomeProducts() {

    const [newProducts, setNew] = useState<Product[]>([]);
    // const [refurbised, setRefurbised] = useState<Product[]>([]);

    const callHomeProducts = async () => {
        try {
            const API_BASE_URL = "https://api.cooltechservice.net";

            const response = await fetch(`${API_BASE_URL}/api/acs/`);

            const result: HomeProductsResponse = await response.json();

            setNew(result.data_new);
            // setRefurbised(result.data_refurbish);

        } catch (error) {
            console.error("API Error:", error);
        }
    };

    useEffect(() => {
        callHomeProducts();
    }, []);

    return (
        <section id="home" className="py-20 bg-white">

            {/* ================= NEW PRODUCTS ================= */}
            <div className="max-w-7xl mx-auto px-6 mb-20 py-8">

                <h2 className="text-3xl font-bold text-blue-900 mb-8">
                    New AC Products
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                    {newProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-blue-50 rounded-2xl p-5 shadow hover:shadow-xl transition hover:-translate-y-2"
                        >
                            <img
                            src={product.image}  // now this is full URL like http://13.126.245.180/media/ac/ac1.jpg
                            alt={product.model_name}
                            className="mx-auto w-60 h-60 object-contain rounded-xl"
                            />

                            <h3 className="mt-4 text-lg font-semibold text-blue-900">
                                {product.brand} {product.model_name}
                            </h3>

                            {/* <p className="text-blue-700 font-bold mt-2">
                                ₹{product.price}
                            </p> */}

                            <div className="mt-4 flex gap-3">
                                <a
                                    href="tel:+919702556529"
                                    className="w-1/2 bg-blue-600 text-white py-2 rounded-xl text-sm text-center"
                                >
                                    Call
                                </a>

                                {/* Desktop hover */}
                                <span className="hidden md:block absolute -top-10 left-1/2 -translate-x-1/2
                                    bg-black text-white text-xs px-3 py-1 rounded-lg">
                                    +91 9702556529
                                </span>

                                {/* Mobile always visible */}
                                {/* <span className="block md:hidden mt-1 text-xs text-blue-700">
                                    +91 99999 99999
                                </span> */}


                                <a
                                    href={`https://wa.me/919702556529?text=Hi, I am interested in ${product.brand} ${product.model_name}`}
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
