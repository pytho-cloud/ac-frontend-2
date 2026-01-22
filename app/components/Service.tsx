'use client'

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSnowflake, faTools, faCog } from "@fortawesome/free-solid-svg-icons"

const iconMap: Record<string, any> = {
  faSnowflake,
  faTools,
  faCog,
}

type Service = {
  id: number
  title: string
  description: string
  icon: string
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    fetch("http://localhost:8000/api/get-maintainence/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch")
        }
        return res.json()
      })
      .then((data) => {
        setServices(data.data)
      })
      .catch((err) => {
        console.error("Fetch error:", err)
      })
  }, [])

  return (
    <section className="py-20 bg-blue-50" id="services">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-blue-900"
        >
          Our AC Services
        </motion.h2>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="group bg-white p-8 rounded-xl shadow-lg hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-blue-400/40"
            >
              {/* Icon */}
              <div className="text-blue-600 text-5xl mb-6 transition-all duration-300 group-hover:text-sky-500 group-hover:rotate-6">
                {iconMap[service.icon] ? (
                  <FontAwesomeIcon icon={iconMap[service.icon]} />
                ) : (
                  <span className="text-4xl font-bold">
                    {service.icon}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-600 transition">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-blue-700">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
