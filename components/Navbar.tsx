'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Navbar() {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)

  const links = [
    { name: "Kombucha", target: "kombucha" },
    { name: "The Vault", target: "vault" },
    { name: "Motocross", target: "moto" },
    { name: "4SZN Beer", target: "beer" },
    { name: "Contact", target: "contact" },
  ]

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 2.5, duration: 1, type: "spring", stiffness: 50 }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-8 pointer-events-none"
    >

      {/* 1. LOGO ISLAND */}
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setHoveredTab('logo')}
        onMouseLeave={() => setHoveredTab(null)}
        className="pointer-events-auto relative group flex items-center gap-3 px-5 py-2 rounded-full overflow-hidden transition-all duration-500
          bg-black/20 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-2xl"
      >
        {/* Glass Pill (Logo) */}
        {hoveredTab === 'logo' && (
          <motion.div
            layoutId="glass-pill-logo"
            className="absolute inset-0 bg-white/20 backdrop-blur-lg border border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}

        <div className="relative z-10 flex items-center gap-3">
          <img
            src="/assets/Logo/ThreeSheetLocal Logo Final.png"
            alt="Logo"
            className="h-6 w-auto object-contain group-hover:rotate-12 transition-transform duration-300"
          />
          <span className="font-display font-bold text-lg tracking-tighter text-white/90 group-hover:text-white transition-colors duration-300">
            THREESHEET
          </span>
        </div>
      </button>

      {/* 2. LINKS ISLAND */}
      <div
        onMouseLeave={() => setHoveredTab(null)}
        className="pointer-events-auto hidden md:flex items-center gap-1 p-1.5 rounded-full 
          bg-black/20 backdrop-blur-xl border border-white/10 shadow-lg"
      >
        {links.map((link) => (
          <button
            key={link.target}
            onClick={() => scrollTo(link.target)}
            onMouseEnter={() => setHoveredTab(link.target)}
            className="relative px-5 py-2 rounded-full transition-all duration-300"
          >
            {/* 
               TRUE GLASS PILL
               - bg-white/20: Keeps it subtle
               - inset shadow: Adds the "lens" reflection
            */}
            {hoveredTab === link.target && (
              <motion.div
                layoutId="glass-pill-nav"
                className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]"
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              />
            )}

            {/* Text: White -> Brighter White on Hover */}
            <span className={`relative z-10 text-sm font-bold uppercase tracking-wider transition-colors duration-200 
              ${hoveredTab === link.target ? 'text-white shadow-white drop-shadow-md' : 'text-white/80'}`}
            >
              {link.name}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden pointer-events-auto p-2.5 bg-black/20 backdrop-blur-xl rounded-full border border-white/10">
        <div className="w-5 h-5 flex flex-col justify-center gap-1 items-center">
          <div className="w-4 h-0.5 bg-white"></div>
          <div className="w-4 h-0.5 bg-white"></div>
          <div className="w-4 h-0.5 bg-white"></div>
        </div>
      </div>

    </motion.nav>
  )
}