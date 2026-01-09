'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSnowflake, faTools, faCog } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { motion } from "framer-motion"

type Service = {
    title: string
    description: string
    icon: IconDefinition
}

export default function Services() {
    const services: Service[] = [
        {
            title: 'AC Installation',
            description: 'Professional installation for all types of AC units, ensuring efficiency and safety.',
            icon: faSnowflake,
        },
        {
            title: 'AC Repair',
            description: 'Fast and reliable repair service to fix any AC issue and restore comfort.',
            icon: faTools,
        },
        {
            title: 'AC Maintenance',
            description: 'Regular maintenance packages to keep your AC running smoothly year-round.',
            icon: faCog,
        },
        {
            title: 'AC2 Maintenance',
            description: 'Regular maintenance packages to keep your AC running smoothly year-round.',
            icon: faCog,
        },
        {
            title: 'AC1 Maintenance',
            description: 'Regular maintenance packages to keep your AC running smoothly year-round.',
            icon: faCog,
        },
        {
            title: 'AC3 Maintenance',
            description: 'Regular maintenance packages to keep your AC running smoothly year-round.',
            icon: faCog,
        },
    ]

    return (
        <section className="py-20 bg-blue-50">
            <div className="max-w-7xl mx-auto px-6 text-center">

                {/* Heading animation */}
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-blue-900"
                >
                    Our AC Services
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mt-4 text-blue-700 max-w-2xl mx-auto"
                >
                    We provide professional air conditioning services for homes and businesses.
                </motion.p>

                <div className="mt-12 grid md:grid-cols-3 gap-8">

                    {services.map((service, i) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            viewport={{ once: true }}
                            className="
                group bg-white p-8 rounded-xl shadow-lg
                transform transition-all duration-300 ease-out
                hover:-translate-y-2 hover:scale-105
                hover:shadow-2xl hover:ring-2 hover:ring-blue-400/40
              "
                        >
                            <div className="text-blue-600 text-5xl mb-6 transition-all duration-300 group-hover:text-sky-500 group-hover:rotate-6">
                                <FontAwesomeIcon icon={service.icon} />
                            </div>

                            <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-600 transition">
                                {service.title}
                            </h3>

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
