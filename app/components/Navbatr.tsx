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

    if (pathname === '/') {
      const el = document.getElementById(id)
      if (!el) return
      const y = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    } else {
      router.push(`/#${id}`)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-blue-700 to-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
        <div className="flex justify-center items-center">
            <svg
                className="w-5 h-5 md:w-12 md:h-12"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                >
                {/* OUTER RING */}
                <circle cx="50" cy="50" r="40" fill="none" />

                {/* ROTATING BLADES */}
                <g className="fan-blades">
                    <path
                    d="M50 15
                        C68 22 73 40 63 50
                        C54 58 46 54 48 44 Z"
                    fill="#e0f2fe"
                    />
                    <path
                    d="M85 50
                        C78 68 62 73 50 63
                        C42 54 46 46 58 48 Z"
                    fill="#e0f2fe"
                    />
                    <path
                    d="M50 85
                        C32 78 27 62 37 50
                        C46 42 54 46 52 58 Z"
                    fill="#e0f2fe"
                    />
                    <path
                    d="M15 50
                        C22 32 38 27 50 37
                        C58 46 54 54 42 52 Z"
                    fill="#e0f2fe"
                    />
                </g>

                {/* HUB */}
                <circle cx="50" cy="50" r="7" fill="#0f172a" />
                <circle cx="50" cy="50" r="3" fill="#9ca3af" />

                <style>
                    {`
                    .fan-blades {
                        transform-origin: 50px 50px;
                        animation: spin 1.2s linear infinite;
                    }

                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    `}
                </style>
                </svg>


            <Link href="/" className="flex flex-col items-center ">
            <img
              src="/logo.png"
              alt="CTS Logo"
              className="w-auto h-12 md:h-14 "
              style={{ filter: 'drop-shadow(0 0 2px white)' }}
            />
          </Link>
        </div>
          {/* LOGO + FAN */}
          
                      {/* FAN */}


          {/* DESKTOP MENU */}
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => goToSection('home')} className="nav-link">Home</button>
            <button onClick={() => goToSection('services')} className="nav-link">Services</button>
            <button onClick={() => goToSection('about')} className="nav-link">About</button>
            <button onClick={() => goToSection('testimonial')} className="nav-link">Testimonials</button>

            <Link
              href="/products"
              className="bg-sky-400 text-blue-900 px-4 py-2 rounded-lg font-semibold"
            >
              Products
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-white">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-blue-600 px-6 py-4 space-y-4">
          <button onClick={() => goToSection('home')} className="block text-white">Home</button>
          <button onClick={() => goToSection('services')} className="block text-white">Services</button>
          <button onClick={() => goToSection('about')} className="block text-white">About</button>
          <button onClick={() => goToSection('testimonial')} className="block text-white">Testimonials</button>

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
