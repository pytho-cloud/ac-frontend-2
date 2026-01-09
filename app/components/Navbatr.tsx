'use client'

import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-white text-2xl font-bold tracking-wide"
                    >
                        CoolTech<span className="text-sky-300">Services</span>
                    </Link>

                    {/* Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="/" className="nav-link">
                            Home
                        </Link>
                        <Link href="/about" className="nav-link">
                            About
                        </Link>
                        <Link href="/services" className="nav-link">
                            Services
                        </Link>
                        <Link href="/contact" className="nav-link">
                            Contact
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block w-50">
                        <button className="bg-sky-400 text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-sky-300 transition">
                            Product
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
