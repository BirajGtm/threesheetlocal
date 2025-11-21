'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Wait for animation to finish, then tell the app we are done
    const timer = setTimeout(() => {
      setIsLoaded(true)
      setTimeout(onComplete, 500) // Small buffer for fade out
    }, 2500)
    return () => clearTimeout(timer)
  }, [onComplete])

  if (isLoaded) return null

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-paper flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
    >
      <div className="relative w-64 h-64 md:w-96 md:h-96">
        
        {/* HALF 1: Top-Left Diagonal Cut */}
        <motion.div
          initial={{ x: -100, y: -100, opacity: 0, rotate: -20 }}
          animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="absolute inset-0 w-full h-full"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} // Triangle shape
        >
          <img 
            src="/assets/Logo/ThreeSheetLocal Logo Final.png" 
            alt="Logo Top" 
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* HALF 2: Bottom-Right Diagonal Cut */}
        <motion.div
          initial={{ x: 100, y: 100, opacity: 0, rotate: 20 }}
          animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="absolute inset-0 w-full h-full"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} // Triangle shape
        >
          <img 
            src="/assets/Logo/ThreeSheetLocal Logo Final.png" 
            alt="Logo Bottom" 
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Flash Effect on Impact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 1.4, duration: 0.2 }}
          className="absolute inset-0 bg-white mix-blend-overlay pointer-events-none"
        />
        
      </div>

      {/* Loading Text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-10 font-display uppercase tracking-widest text-primary animate-pulse"
      >
        Building Portfolio...
      </motion.p>

    </motion.div>
  )
}