'use client'

import { useEffect, useState } from "react"
import ProductSinglePage from "./compo"

type Product = {
  id: number
  brand: string
  model_name: string
  condition: string
  ac_type: string
  price: number
  image?: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filters, setFilters] = useState<any>({})
  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")
  const [condition, setCondition] = useState("")
  const [acType, setAcType] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const API_BASE_URL = "https://api.cooltechservice.net";
  const [showFilters, setShowFilters] = useState(false)

  // Load filters
  // Load filters
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/ac-filter-list/`)
      .then(res => res.json())
      .then(data => setFilters(data))
      .catch(console.error)
  }, [])

  // Load products
  useEffect(() => {
    const params = new URLSearchParams()
    if (brand) params.append("brand", brand)
    if (model) params.append("model_name", model)
    if (condition) params.append("condition", condition)
    if (acType) params.append("ac_type", acType)

    setLoading(true)

    fetch(`${API_BASE_URL}/api/products-acs/?${params}`)
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setProducts(data)
          setLoading(false)
        }, 800)
      })
      .catch(() => setLoading(false))
  }, [brand, model, condition, acType])

  if (selectedProduct) {
    return (
      <ProductSinglePage
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    )
  }

  return (
    <section className="py-10 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* MOBILE FILTER TOGGLE */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden mb-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        <div className="grid md:grid-cols-[260px_1fr] gap-6">

          {/* FILTERS */}
          <div
            className={`bg-white p-5 rounded-xl shadow space-y-6
              ${showFilters ? "block" : "hidden"} md:block
              md:sticky md:top-24 h-fit`}
          >
            <h3 className="text-xl font-bold text-blue-900">Filters</h3>

            {/* Brand */}
            <FilterGroup
              title="Brand"
              options={filters.brand}
              value={brand}
              onChange={setBrand}
              activeClass="bg-blue-600 text-white"
              hoverClass="hover:bg-blue-100"
            />

            {/* Model */}
            <FilterGroup
              title="Model"
              options={filters.model_name}
              value={model}
              onChange={setModel}
              activeClass="bg-green-600 text-white"
              hoverClass="hover:bg-green-100"
            />

            {/* Condition */}
            <FilterGroup
              title="Condition"
              options={filters.condition}
              value={condition}
              onChange={setCondition}
              activeClass="bg-yellow-600 text-white"
              hoverClass="hover:bg-yellow-100"
            />

            {/* AC Type */}
            <FilterGroup
              title="AC Type"
              options={filters.ac_type}
              value={acType}
              onChange={setAcType}
              activeClass="bg-purple-600 text-white"
              hoverClass="hover:bg-purple-100"
            />
          </div>

          {/* PRODUCTS */}
          <div>
            {loading && (
              <p className="text-center text-blue-700 font-semibold mt-10">
                Loading products...
              </p>
            )}

            {!loading && products.length === 0 && (
              <p className="text-center text-gray-600">
                No products found.
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map(p => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer transition hover:-translate-y-1"
                >
                  <img
                    src={`https://api.cooltechservice.net/${p.image}`}
                    alt={p.model_name}
                    className="w-full h-48 object-cover rounded"
                  />

                  <h3 className="font-bold mt-3">{p.model_name}</h3>
                  <p className="text-gray-600">{p.brand}</p>
                  <p className="text-gray-500 text-sm">
                    {p.condition} • {p.ac_type}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ---------------- FILTER GROUP COMPONENT ---------------- */

function FilterGroup({
  title,
  options = [],
  value,
  onChange,
  activeClass,
  hoverClass
}: any) {
  return (
    <div>
      <p className="font-semibold mb-2">{title}</p>
      <div className="flex flex-wrap gap-2">
        {[""].concat(options).map((opt: string, i: number) => (
          <button
            key={i}
            onClick={() => onChange(opt)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition
              ${value === opt ? activeClass : `bg-gray-100 ${hoverClass}`}`}
          >
            {opt || "All"}
          </button>
        ))}
      </div>
    </div>
  )
}
