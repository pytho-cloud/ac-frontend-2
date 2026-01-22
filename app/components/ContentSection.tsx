'use client'

import { motion } from "framer-motion"
import Image from "next/image"

export default function ContentSection() {
  return (
    <section className="py-20 bg-blue-200">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        
        {/* Text Content */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm text-blue-600 uppercase mb-2">Our Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Professional AC Solutions
          </h2>
          <p className="text-blue-700 mb-4">
            We provide complete air conditioning services for homes and businesses. 
            From installation to repair, our experts ensure your AC is efficient, reliable, and long-lasting.
          </p>
          <ul className="text-blue-700 list-disc ml-5 space-y-2">
            <li>AC Installation for all types and brands</li>
            <li>Quick & Reliable Repair Services</li>
            <li>Regular Maintenance & Checkups</li>
            <li>Energy-efficient solutions</li>
          </ul>
        </motion.div>

        {/* Image */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/ac-service.jpg"
            alt="AC Service"
            width={500}
            height={400}
            className="rounded-xl shadow-lg object-cover"
          />
        </motion.div>

      </div>
    </section>
  )
}
