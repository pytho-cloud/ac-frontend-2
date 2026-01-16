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
    const [refurbised, setRefurbised] = useState<Product[]>([]);

    const callHomeProducts = async () => {
        try {
            const response = await fetch("http://192.168.0.162:8000/api/acs/");
            const result: HomeProductsResponse = await response.json();

            setNew(result.data_new);
            setRefurbised(result.data_refurbish);

        } catch (error) {
            console.error("API Error:", error);
        }
    };

    useEffect(() => {
        callHomeProducts();
    }, []);

    return (
        <section className="py-20 bg-white">

            {/* ================= NEW PRODUCTS ================= */}
            <div className="max-w-7xl mx-auto px-6 mb-20">

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
                            <Image
                                src={`http://192.168.0.162:8000/${product.image}`}
                                alt={product.model_name}
                                width={300}
                                height={300}
                                className="mx-auto"
                            />

                            <h3 className="mt-4 text-lg font-semibold text-blue-900">
                                {product.brand} {product.model_name}
                            </h3>

                            <p className="text-blue-700 font-bold mt-2">
                                ₹{product.price}
                            </p>

                            <div className="mt-4 flex gap-3">
                                <button className="w-1/2 bg-blue-600 text-white py-2 rounded-xl text-sm">
                                    Call
                                </button>

                                <button className="w-1/2 bg-green-600 text-white py-2 rounded-xl text-sm">
                                    Whatsapp
                                </button>
                            </div>
                        </motion.div>
                    ))}

                </div>
            </div>


            {/* ================= REFURBISHED PRODUCTS ================= */}
            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-3xl font-bold text-green-700 mb-8">
                    Refurbished AC Products
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                    {refurbised.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-green-50 rounded-2xl p-5 shadow hover:shadow-xl transition hover:-translate-y-2"
                        >
                            <Image
                                src={`http://192.168.0.162:8000${product.image}`}
                                alt={product.model_name}
                                width={300}
                                height={300}
                                className="mx-auto"
                            />

                            <h3 className="mt-4 text-lg font-semibold text-green-900">
                                {product.brand} {product.model_name}
                            </h3>

                            <p className="text-green-700 font-bold mt-2">
                                ₹{product.price}
                            </p>

                            <div className="mt-4 flex gap-3">
                                <button className="w-1/2 bg-blue-600 text-white py-2 rounded-xl text-sm">
                                    Call
                                </button>

                                <button className="w-1/2 bg-green-600 text-white py-2 rounded-xl text-sm">
                                    Whatsapp
                                </button>
                            </div>
                        </motion.div>
                    ))}

                </div>
            </div>

        </section>
    );
}
