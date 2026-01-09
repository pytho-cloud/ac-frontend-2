'use client'

import Image from "next/image";
import { useState } from "react";

export default function ProductSinglePage() {
    const product = {
        name: "Samsung 1.5 Ton Inverter AC",
        price: "₹38,999",
        oldPrice: "₹42,999",
        image: "/images/ac1.png",
        rating: 4.6,
        reviews: 124,
        description:
            "Energy efficient Samsung inverter AC with fast cooling, low noise and long lasting performance.",
        features: [
            "1.5 Ton Inverter Technology",
            "5 Star Energy Rating",
            "Copper Condenser",
            "Fast Cooling Mode",
            "1 Year Warranty"
        ],
    };

    const [qty, setQty] = useState(1);

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">

                {/* Image */}
                <div className="bg-white p-6 rounded-xl shadow flex justify-center">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={420}
                        height={420}
                        className="object-contain"
                    />
                </div>

                {/* Product Info */}
                <div>

                    <h1 className="text-3xl font-bold text-blue-900">
                        {product.name}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-yellow-500 text-lg">⭐⭐⭐⭐⭐</span>
                        <span className="text-sm text-gray-600">
                            {product.rating} ({product.reviews} reviews)
                        </span>
                    </div>

                    {/* Price */}
                    <div className="mt-4 flex items-center gap-4">
                        <span className="text-3xl font-bold text-green-600">
                            {product.price}
                        </span>
                        <span className="line-through text-gray-400">
                            {product.oldPrice}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        {product.description}
                    </p>

                    {/* Features */}
                    <ul className="mt-4 space-y-2">
                        {product.features.map((f, i) => (
                            <li key={i} className="text-gray-700 flex gap-2">
                                ✔ <span>{f}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Quantity */}
                    <div className="mt-6 flex items-center gap-4">
                        <button
                            className="px-3 py-1 border rounded"
                            onClick={() => setQty(Math.max(1, qty - 1))}
                        >
                            -
                        </button>
                        <span className="font-semibold">{qty}</span>
                        <button
                            className="px-3 py-1 border rounded"
                            onClick={() => setQty(qty + 1)}
                        >
                            +
                        </button>
                    </div>

                    {/* Buttons */}
                    <div className="mt-8 flex gap-4">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-500 transition">
                            Add to Cart
                        </button>

                        <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-500 transition">
                            Buy Now
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
