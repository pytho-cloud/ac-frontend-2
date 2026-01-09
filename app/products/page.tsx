'use client'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const products = [
    { id: 1, name: "Samsung 1.5 Inverter AC", price: 38999, brand: "Samsung", type: "new", image: "/images/ac1.png" },
    { id: 2, name: "LG 1 Ton Split AC", price: 29499, brand: "LG", type: "new", image: "/images/ac2.png" },
    { id: 3, name: "Daikin 2 Ton Smart AC", price: 52999, brand: "Daikin", type: "refurbished", image: "/images/ac3.png" },
    { id: 4, name: "Voltas Window AC", price: 24999, brand: "Voltas", type: "refurbished", image: "/images/ac4.png" },
    { id: 5, name: "LG 1.5 Ton Inverter AC", price: 35999, brand: "LG", type: "new", image: "/images/ac2.png" },
];

export default function ProductsPage() {
    const [brand, setBrand] = useState("all");
    const [type, setType] = useState("all");
    const [maxPrice, setMaxPrice] = useState(60000);

    const filteredProducts = products.filter(p =>
        (brand === "all" || p.brand === brand) &&
        (type === "all" || p.type === type) &&
        p.price <= maxPrice
    );

    return (
        <section className="py-16 bg-blue-50">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[260px_1fr] gap-8">

                {/* Sidebar */}
                <div className="bg-white p-6 rounded-xl shadow h-fit sticky top-24">
                    <h3 className="font-bold text-blue-900 mb-4">Filters</h3>

                    {/* Brand */}
                    <div className="mb-6">
                        <p className="font-semibold mb-2">Brand</p>
                        {["all", "Samsung", "LG", "Daikin", "Voltas"].map(b => (
                            <button
                                key={b}
                                onClick={() => setBrand(b)}
                                className={`block w-full text-left px-3 py-2 rounded mb-1 text-sm
                  ${brand === b ? "bg-blue-600 text-white" : "hover:bg-blue-100"}
                `}
                            >
                                {b === "all" ? "All Brands" : b}
                            </button>
                        ))}
                    </div>

                    {/* Type */}
                    <div className="mb-6">
                        <p className="font-semibold mb-2">Condition</p>
                        {["all", "new", "refurbished"].map(t => (
                            <button
                                key={t}
                                onClick={() => setType(t)}
                                className={`block w-full text-left px-3 py-2 rounded mb-1 text-sm capitalize
                  ${type === t ? "bg-green-600 text-white" : "hover:bg-green-100"}
                `}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* Price */}
                    <div>
                        <p className="font-semibold mb-2">Max Price: ₹{maxPrice}</p>
                        <input
                            type="range"
                            min={20000}
                            max={60000}
                            step={1000}
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Products */}
                <div>
                    <h1 className="text-3xl font-bold text-blue-900 mb-8">
                        AC Products
                    </h1>

                    {filteredProducts.length === 0 && (
                        <p>No products found.</p>
                    )}

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

                        {filteredProducts.map(product => (
                            <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition hover:-translate-y-2"
                            >
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={300}
                                    height={300}
                                    className="mx-auto"
                                />

                                <h3 className="mt-4 font-semibold text-blue-900">
                                    {product.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {product.brand} • {product.type}
                                </p>

                                <p className="text-blue-700 font-bold mt-2">
                                    ₹{product.price.toLocaleString()}
                                </p>
                            </Link>
                        ))}

                    </div>
                </div>

            </div>
        </section>
    );
}
