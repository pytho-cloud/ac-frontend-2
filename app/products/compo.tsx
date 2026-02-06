'use client'

import { useState } from "react";
import Loading from "./loading";

type ProductImage = {
  image: string;
};

type Product = {
  id: number;
  brand: string;
  model_name: string;
  condition: string;
  ac_type: string;
  price: number;
  image?: string;
  images?: ProductImage[];
  description?: string;
};

interface Props {
  product: Product;
  onBack: () => void;
}

export default function ProductSinglePage({ product, onBack }: Props) {

  const images =
    product.images && product.images.length > 0
      ? product.images.map(img => img.image)
      : product.image
      ? [product.image]
      : [];

  const [current, setCurrent] = useState(0);

  const prevImage = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextImage = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  return (
    <section className="py-20 bg-gray-50">
      {/* <Loading /> */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">

        {/* IMAGE SLIDER */}
        <div className="bg-white p-6 rounded-xl shadow">
          {images.length > 0 && (
            <>
              <div className="relative">
                <img
                  src={`https://api.cooltechservice.net/${images[current]}`}
                  alt={product.model_name}
                  className="w-full h-72 object-cover rounded-xl"
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-1 rounded-full shadow text-xl"
                    >
                      ‹
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-1 rounded-full shadow text-xl"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* THUMBNAILS */}
              {images.length > 1 && (
                <div className="flex gap-3 mt-4 justify-center">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={`https://api.cooltechservice.net/${img}`}
                      onClick={() => setCurrent(index)}
                      className={`w-16 h-16 object-cover rounded cursor-pointer border-2 transition
                        ${
                          current === index
                            ? "border-blue-600"
                            : "border-transparent"
                        }`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* INFO */}
        <div>
          <button
            className="mb-4 text-blue-600 hover:underline"
            onClick={onBack}
          >
            ← Back to Products
          </button>

          <h1 className="text-3xl font-bold text-blue-900">
            {product.model_name}
          </h1>

          <p className="mt-1 text-gray-700">{product.brand}</p>
          <p className="text-gray-600">
            {product.condition} • {product.ac_type}
          </p>

          {product.description && (
            <p className="mt-4 text-gray-700">
              {product.description}
            </p>
          )}

          <div className="flex gap-4 mt-6">
            <a
              href="tel:+919702556529"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-500 transition"
            >
              📞 Call
            </a>

            <a
              href="https://wa.me/9702556529?text=Hi%20I%20am%20interested%20in%20your%20AC"
              target="_blank"
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-500 transition"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
