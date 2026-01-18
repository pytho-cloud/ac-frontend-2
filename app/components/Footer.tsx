'use client'

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-blue-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

                {/* Company */}
                {/* <div>
                    <h3 className="text-xl font-bold mb-4">CoolAir Services</h3>
                    <p className="text-blue-200 text-sm leading-relaxed">
                        Professional AC installation, repair, maintenance and best AC product sales
                        at affordable prices.
                    </p>
                </div> */}

                {/* Links */}
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
                        <li>AC Repair</li>
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

            </div>

            {/* Bottom */}
            <div className="border-t border-blue-700 mt-12 pt-6 text-center text-blue-300 text-sm">
                © {new Date().getFullYear()} Tantratech. All rights reserved.
            </div>

        </footer>
    );
}
