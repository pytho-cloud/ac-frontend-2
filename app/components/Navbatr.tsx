'use client'

import Link from 'next/link'

export default function Navbar() {

    const scrollTo = (id: string) => {
        const el = document.getElementById(id)
        if (!el) return

        const y = el.getBoundingClientRect().top + window.scrollY - 80 // navbar height
        window.scrollTo({ top: y }) // ❌ no smooth
    }

    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">

                    <Link href="/" className="text-white text-2xl font-bold tracking-wide">
                        CoolTech<span className="text-sky-300">Services</span>
                    </Link>

                    <div className="hidden md:flex space-x-8">
                        {/* <Link href="/" className="nav-link">Home</Link> */}

                        <button onClick={() => scrollTo('home')} className="nav-link" >
                            Home
                        </button>
                        {/* <Link href="/about" className="nav-link">About</Link> */}

                        <button onClick={() => scrollTo("about")} className="nav-link">
                            About
                        </button>

                        <button onClick={() => scrollTo("services")} className="nav-link">
                            Services
                        </button>

                        {/* <Link href="/contact" className="nav-link">Contact</Link> */}

                        <button onClick={() => scrollTo("testimonial")} className="nav-link">
                            Testimonials

                        </button>
                    </div>

                    <div className="hidden md:block w-50">
                        <Link href="/products" className="nav-link bg-sky-400 text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-sky-300 transition">
                            Product
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    )
}
