'use client'

import { motion } from 'framer-motion'

export default function FloatingShapes() {
  const shapes = [
    { type: 'cube', top: '10%', left: '5%', delay: 0, duration: 20 },
    { type: 'sphere', top: '60%', left: '80%', delay: 2, duration: 25 },
    { type: 'pyramid', top: '30%', left: '70%', delay: 1, duration: 22 },
    { type: 'torus', top: '80%', left: '20%', delay: 3, duration: 18 },
    { type: 'cube', top: '40%', left: '90%', delay: 1.5, duration: 24 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {shapes.map((shape, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          style={{ top: shape.top, left: shape.left }}
          animate={{
            y: [0, -100, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        >
          <div className={`w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-lg ${
            shape.type === 'sphere' ? 'rounded-full' : ''
          } transform-gpu perspective-1000`}
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: '0 0 40px rgba(99, 102, 241, 0.2)',
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
