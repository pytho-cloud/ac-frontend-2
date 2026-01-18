'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    const goToSection = (id: string) => {
        setOpen(false)

        // If already on home page → smooth scroll
        if (pathname === '/') {
            const el = document.getElementById(id)
            if (!el) return

            const y = el.getBoundingClientRect().top + window.scrollY - 80
            window.scrollTo({ top: y, behavior: 'smooth' })
        }
        // Else → redirect to home with hash
        else {
            router.push(`/#${id}`)
        }
    }

    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">

                    <Link href="/" className="text-white text-2xl font-bold">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="h-16 w-auto"
                            style={{ filter: "drop-shadow(0 0 2px white)" }}

                        />

                    </Link>

                    {/* Desktop */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <button onClick={() => goToSection("home")} className="nav-link">Home</button>
                        <button onClick={() => goToSection("about")} className="nav-link">About</button>
                        <button onClick={() => goToSection("services")} className="nav-link">Services</button>
                        <button onClick={() => goToSection("testimonial")} className="nav-link">Testimonials</button>

                        <Link
                            href="/products"
                            className="bg-sky-400 text-blue-900 px-4 py-2 rounded-lg font-semibold"
                        >
                            Products
                        </Link>
                    </div>

                    {/* Mobile */}
                    <button onClick={() => setOpen(!open)} className="md:hidden text-white">
                        {open ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="md:hidden bg-blue-600 px-6 py-4 space-y-4">
                    <button onClick={() => goToSection("home")} className="block text-white">Home</button>
                    <button onClick={() => goToSection("about")} className="block text-white">About</button>
                    <button onClick={() => goToSection("services")} className="block text-white">Services</button>
                    <button onClick={() => goToSection("testimonial")} className="block text-white">Testimonials</button>

                    <Link
                        href="/products"
                        onClick={() => setOpen(false)}
                        className="block bg-sky-400 text-blue-900 px-4 py-2 rounded-lg text-center"
                    >
                        Products
                    </Link>
                </div>
            )}
        </nav>
    )
}
