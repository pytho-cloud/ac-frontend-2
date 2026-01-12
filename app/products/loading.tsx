'use client'

import React, { useEffect, useState } from 'react'

export default function Loading() {
    const [show, setShow] = useState(false)

    // Wait 2 seconds before showing the loader
    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 20000)
        return () => clearTimeout(timer)
    }, [])

    if (!show) return null

    return (
        <div className="flex flex-col items-center justify-center h-[60vh]">
            {/* Spinner */}
            <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mb-6"></div>

            {/* Loading text */}
            <p className="text-blue-900 text-lg font-semibold animate-pulse">
                Loading products...
            </p>

            {/* Bouncing dots */}
            <div className="flex space-x-2 mt-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-300"></span>
            </div>
        </div>
    )
}
