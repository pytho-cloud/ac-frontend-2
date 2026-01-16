'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import ProductSinglePage from "./compo";

type Product = {
    id: number;
    brand: string;
    model_name: string;
    condition: string;
    ac_type: string;
    price: number;
    image?: string;
};

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<any>({});
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [condition, setCondition] = useState("");
    const [acType, setAcType] = useState("");
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Load filters dynamically
    useEffect(() => {
        fetch("http://13.127.148.32/api/ac-filter-list/")
            .then(res => res.json())
            .then(data => setFilters(data))
            .catch(err => console.error(err));
    }, []);

    // Load products with 2-second delay
    useEffect(() => {
        const params = new URLSearchParams();
        if (brand) params.append("brand", brand);
        if (model) params.append("model_name", model);
        if (condition) params.append("condition", condition);
        if (acType) params.append("ac_type", acType);

        setLoading(true);

        fetch(`http://192.168.0.162/api/acs/?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                // 2-second artificial delay
                setTimeout(() => {
                    setProducts(data);
                    setLoading(false);
                }, 2000);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [brand, model, condition, acType]);

    if (selectedProduct) {
        return (
            <ProductSinglePage
                product={selectedProduct}
                onBack={() => setSelectedProduct(null)}
            />
        );
    }

    return (

        <section className="py-10 bg-blue-50">
            <div className="max-w-7xl mx-auto grid grid-cols-[260px_1fr] gap-6 px-6">

                {/* FILTERS */}
                <div className="bg-white p-6 rounded-xl shadow space-y-6 sticky top-24 h-fit">
                    <h3 className="text-xl font-bold text-blue-900">Filters </h3>

                    {/* Brand */}
                    <div>
                        <p className="font-semibold mb-2">Brand</p>
                        <div className="flex flex-wrap gap-2">
                            {[""].concat(filters.brand || []).map((b: string, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => setBrand(b)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition
                  ${brand === b ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-blue-100"}`}
                                >
                                    {b || "All"}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Model */}
                    <div>
                        <p className="font-semibold mb-2">Model</p>
                        <div className="flex flex-wrap gap-2">
                            {[""].concat(filters.model_name || []).map((m: string, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => setModel(m)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition
                  ${model === m ? "bg-green-600 text-white" : "bg-gray-100 hover:bg-green-100"}`}
                                >
                                    {m || "All"}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Condition */}
                    <div>
                        <p className="font-semibold mb-2">Condition</p>
                        <div className="flex flex-wrap gap-2">
                            {[""].concat(filters.condition || []).map((c: string, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => setCondition(c)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition
                  ${condition === c ? "bg-yellow-600 text-white" : "bg-gray-100 hover:bg-yellow-100"}`}
                                >
                                    {c || "All"}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* AC Type */}
                    <div>
                        <p className="font-semibold mb-2">AC Type</p>
                        <div className="flex flex-wrap gap-2">
                            {[""].concat(filters.ac_type || []).map((a: string, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => setAcType(a)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition
                  ${acType === a ? "bg-purple-600 text-white" : "bg-gray-100 hover:bg-purple-100"}`}
                                >
                                    {a || "All"}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* PRODUCTS */}
                <div>
                    {loading && <p className="text-center text-blue-700 font-semibold mt-10">Loading products...</p>}
                    {!loading && products.length === 0 && <p>No products found.</p>}

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {products.map(p => (
                            <div
                                key={p.id}
                                onClick={() => setSelectedProduct(p)}
                                className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer transition hover:-translate-y-1"
                            >
                                <Image
                                    src={p.image || "/no-image.png"}
                                    alt={p.model_name}
                                    width={300}
                                    height={300}
                                    className="rounded object-cover"
                                />
                                <h3 className="font-bold mt-2">{p.model_name}</h3>
                                <p className="text-gray-600">{p.brand}</p>
                                <p className="text-gray-500">{p.condition} • {p.ac_type}</p>
                                <p className="font-bold text-blue-600">₹{p.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
