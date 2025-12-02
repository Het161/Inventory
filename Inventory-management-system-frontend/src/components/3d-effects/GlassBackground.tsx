'use client'

import { motion } from 'framer-motion'

export default function GlassBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Layered glass panels */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(45deg) rotateZ(45deg)',
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 backdrop-blur-3xl rounded-3xl border border-indigo-500/20"
        animate={{
          rotate: [360, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateY(45deg) rotateZ(-45deg)',
        }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
    </div>
  )
}
