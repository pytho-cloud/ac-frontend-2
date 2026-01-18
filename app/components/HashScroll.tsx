'use client'

import { useEffect } from 'react'

export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) return

    const el = document.getElementById(hash)
    if (!el) return

    setTimeout(() => {
      const y = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }, 100)
  }, [])

  return null
}
