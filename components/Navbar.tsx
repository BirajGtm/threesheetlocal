'use client'

import { motion } from 'framer-motion'

export default function Navbar() {
  const links = [
    { name: "Kombucha", target: "kombucha" },
    { name: "The Vault", target: "vault" },
    { name: "Motocross", target: "moto" },
    { name: "4SZN Beer", target: "beer" },
    { name: "Contact", target: "contact" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 2.5, duration: 1 }} // Waits for loader to finish
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 pointer-events-none"
    >
      {/* Left: Logo Text */}
      <div className="font-display font-bold text-xl tracking-tighter text-primary pointer-events-auto bg-paper/80 backdrop-blur-md px-4 py-2 rounded-sm flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
        <img src="/assets/Logo/ThreeSheetLocal Logo Final.png" alt="Logo" className="h-8 w-auto" />
        THREESHEET
      </div>

      {/* Right: The Menu */}
      <ul className="flex gap-2 pointer-events-auto bg-primary/90 backdrop-blur-md text-paper p-2 rounded-full shadow-lg">
        {links.map((link) => (
          <li key={link.target}>
            <button
              onClick={() => {
                document.getElementById(link.target)?.scrollIntoView({ behavior: 'smooth' })
              }}
              className=" px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-secondary hover:text-primary rounded-full transition-colors duration-300"
            >
              {link.name}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}