'use client'

import { useEffect, useRef, useState } from 'react'

type Point = {
    title: string
    description: string
}

export default function WhyChooseUs() {
    const points: Point[] = [
        {
            title: 'Certified AC Technicians',
            description: 'Our team consists of trained and certified professionals with years of hands-on experience.',
        },
        {
            title: 'Same Day Service',
            description: 'We value your time and provide fast, same-day service for most AC issues.',
        },
        {
            title: 'Affordable Pricing',
            description: 'Transparent and competitive pricing with no hidden charges.',
        },
        {
            title: 'Genuine Spare Parts',
            description: 'We use only original and high-quality spare parts for long-lasting performance.',
        },
    ]

    const sectionRef = useRef<HTMLDivElement | null>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.25 }
        )

        if (sectionRef.current) observer.observe(sectionRef.current)

        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="py-20 bg-blue-50 overflow-hidden"  id='about'>
            <div className="max-w-5xl mx-auto px-6 text-center">

                {/* Heading animation */}
                <h2
                    className={`text-3xl md:text-4xl font-bold text-blue-900 transition-all duration-700
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
                >
                    Why Choose Us?
                </h2>

                <p
                    className={`mt-4 text-blue-700 max-w-2xl mx-auto transition-all duration-700 delay-150
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
                >
                    We are committed to providing reliable, affordable, and professional AC services you can trust.
                </p>

                <div className="mt-12 grid md:grid-cols-2 gap-6 text-left">
                    {points.map((point, index) => (
                        <div
                            key={point.title}
                            className={`
                group flex gap-4 bg-white p-6 rounded-xl shadow
                transition-all duration-700 ease-out
                hover:-translate-y-1 hover:shadow-lg
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
                            style={{ transitionDelay: `${index * 180}ms` }}
                        >
                            <span className="text-blue-600 text-2xl font-bold transition-transform duration-300 group-hover:scale-110">
                                ✔
                            </span>

                            <div>
                                <h3 className="text-lg font-semibold text-blue-900">
                                    {point.title}
                                </h3>
                                <p className="mt-1 text-blue-700 text-sm">
                                    {point.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
