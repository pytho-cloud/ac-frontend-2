'use client'

import Image from "next/image";
import { useState } from "react";

type Product = {
    id: number;
    brand: string;
    model_name: string;
    condition: string;
    ac_type: string;
    price: number;
    image?: string;
    description?: string
};

interface Props {
    product: Product;
    onBack: () => void;
}

export default function ProductSinglePage({ product, onBack }: Props) {
    const [qty, setQty] = useState(1);

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">

                {/* IMAGE */}
                <div className="bg-white p-6 rounded-xl shadow flex justify-center">
                    <img
                        src={product.image}
                        alt={product.model_name}
                        className="w-full h-72 object-cover rounded"
                    />
                </div>

                {/* INFO */}
                <div>
                    <button
                        className="mb-4 text-blue-600 hover:underline"
                        onClick={onBack}
                    >
                        ← Back to Products
                    </button>

                    <h1 className="text-3xl font-bold text-blue-900">{product.model_name}</h1>
                    <p>{product.brand}</p>
                    <p>{product.condition} • {product.ac_type}</p>
                    <p>{product.description}</p>

                    <p className="font-bold text-green-600">₹{product.price}</p>

                    {/* Quantity */}
                    {/* <div className="mt-6 flex items-center gap-4">
                        <button
                            className="px-3 py-1 border rounded"
                            onClick={() => setQty(Math.max(1, qty - 1))}
                        >-</button>
                        <span className="font-semibold">{qty}</span>
                        <button
                            className="px-3 py-1 border rounded"
                            onClick={() => setQty(qty + 1)}
                        >+</button>
                    </div> */}

                    <div className="mt-8 flex gap-4">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-500 transition">
                            Add to Cart
                        </button>
                        <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-500 transition">
                            Enquiry
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
