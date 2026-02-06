'use client'

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-blue-900 text-white pt-16 pb-8 relative">
            
            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/919702556529"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    className="w-6 h-6"
                >
                    <path d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.5 2.1 7.9L.5 31.5l7.8-2.1c2.3 1.3 4.9 2 7.7 2 8.6 0 15.5-6.9 15.5-15.5S24.6.5 16 .5zm0 28.3c-2.5 0-4.9-.7-6.9-2l-.5-.3-4.6 1.2 1.2-4.5-.3-.5c-1.4-2.1-2.2-4.6-2.2-7.2 0-7.1 5.8-12.9 12.9-12.9S28.9 8.9 28.9 16 23.1 28.8 16 28.8z"/>
                </svg>
            </a>

            <div className="max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-5">

                {/* Quick Links */}
                <div>
                    <h4 className="font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-blue-200 text-sm">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/products">Products</Link></li>
                        <li><Link href="/services">Services</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h4 className="font-semibold mb-4">Our Services</h4>
                    <ul className="space-y-2 text-blue-200 text-sm">
                        <li>AC Installation</li>
                        <li>AC Service</li>
                        <li>AC Maintenance</li>
                        <li>AMC Plans</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-semibold mb-4">Contact</h4>
                    <p className="text-blue-200 text-sm">📞 +91 97025 56529</p>
                    <p className="text-blue-200 text-sm mt-2">📧 cooltechservice02@gmail.com</p>
                    <p className="text-blue-200 text-sm mt-2">
                        📍 OPP BILDING NO 171 KANNAMWAR NAGAR -2 , VIKHROLI (E) MUMBAI-400083
                    </p>
                </div>

                {/* Map */}
                <div className="md:col-span-2">
                    <h4 className="font-semibold mb-4">Our Location</h4>
                    <div className="w-full h-48 rounded-lg overflow-hidden border border-blue-700">
                    <iframe
                    src="https://www.google.com/maps?q=Opp.%20Building%20No.%20171,%20Kannamwar%20Nagar-2,%20Vikhroli%20East,%20Mumbai%20400083&output=embed"
                    className="w-full h-full"
                    loading="lazy"
                    ></iframe>

                    </div>
                </div>

            </div>

            {/* Bottom */}
            <div className="border-t border-blue-700 mt-12 pt-6 text-center text-blue-300 text-sm">
                © {new Date().getFullYear()} Tantratech. All rights reserved.
            </div>

        </footer>
    );
}
