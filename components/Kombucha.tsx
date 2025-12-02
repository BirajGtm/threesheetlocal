'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { kombuchaItems } from '@/data/kombucha'
import { ArrowDown } from 'lucide-react'

export default function Kombucha() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-90%"])

  return (
    <section id="kombucha" ref={targetRef} className="relative h-[300vh] bg-black text-paper">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">

        <motion.div style={{ x }} className="flex gap-20 pl-10 md:pl-20 items-center">

          {kombuchaItems.map((item) => (
            <div
              key={item.id}
              className="relative flex-shrink-0 flex flex-col justify-center"
            >
              {/* CARD TYPE 1: INTRO (Logo -> Bottles -> Text) */}
              {item.type === 'intro' ? (
                <div className="relative flex items-center w-[85vw] md:w-[1000px]">

                  {/* Text & Logo Background */}
                  <div className="z-0 flex flex-col justify-center space-y-4">
                    <img
                      src={item.image}
                      alt="Bu-Chu Logo"
                      className="w-32 md:w-48 opacity-80"
                    />
                    <h2 className="font-display text-[6rem] md:text-[9rem] uppercase leading-[0.8] text-secondary tracking-tighter">
                      {item.title}<br />
                      <span className="text-paper">{item.subtitle}</span>
                    </h2>
                    <p className="text-lg md:text-xl opacity-80 font-light leading-relaxed max-w-md pt-4">
                      {item.desc}
                    </p>
                    <div className="w-20 h-2 bg-accent mt-8" />
                  </div>

                  {/* Bottles (Layered "In Front") */}
                  <div className="z-10 -ml-20 md:-ml-32 mt-20">
                    <img
                      src={item.secondImage}
                      alt="Bottles"
                      onClick={() => setSelectedImage(item.secondImage)}
                      className="w-[500px] md:w-[700px] max-w-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                    />
                  </div>
                </div>
              ) : (
                /* CARD TYPE 2: PAIRS (Label Top -> Ad Bottom) */
                <div className="group flex flex-col justify-center w-[500px]">

                  {/* The Frame (Constrained Height to fit screen) */}
                  <div className="flex flex-col items-center gap-4 p-6 border-4 border-paper/20 bg-black/20 backdrop-blur-sm rounded-sm">

                    {/* 1. The Label (Top - Landscape) */}
                    <div className="w-full">
                      <img
                        src={item.secondImage}
                        alt="Label Design"
                        onClick={() => setSelectedImage(item.secondImage)}
                        className="w-full h-auto shadow-md border border-paper/10 hover:brightness-110 transition-all cursor-zoom-in"
                      />
                    </div>

                    {/* 2. Magazine Ad (Bottom - Portrait) */}
                    {/* 'max-h-[55vh]' ensures it never gets cut off */}
                    <div className="overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        onClick={() => setSelectedImage(item.image)}
                        className="h-auto max-h-[55vh] w-auto object-contain shadow-xl hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                      />
                    </div>

                  </div>

                  {/* Text Below */}
                  <div className="mt-4 text-center">
                    <h3 className="font-display text-3xl text-accent uppercase tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-paper/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

        </motion.div>

        {/* Scroll Hint Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 z-50"
        >
          <ArrowDown size={48} strokeWidth={3} />
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10 cursor-zoom-out backdrop-blur-sm"
            >
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={selectedImage}
                alt="Full Screen View"
                className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}