// 'use client'

// import { useEffect, useRef } from 'react'

// export default function FloatingParticles() {
//   const canvasRef = useRef<HTMLCanvasElement>(null)

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext('2d')
//     if (!ctx) return

//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight

//     const particles: Array<{
//       x: number
//       y: number
//       z: number
//       vx: number
//       vy: number
//       vz: number
//       size: number
//       color: string
//     }> = []

//     for (let i = 0; i < 100; i++) {
//       particles.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         z: Math.random() * 1000,
//         vx: (Math.random() - 0.5) * 0.5,
//         vy: (Math.random() - 0.5) * 0.5,
//         vz: (Math.random() - 0.5) * 2,
//         size: Math.random() * 3 + 1,
//         color: `hsla(${Math.random() * 60 + 200}, 70%, 60%, 0.6)`,
//       })
//     }

//     function animate() {
//       if (!ctx || !canvas) return

//       ctx.clearRect(0, 0, canvas.width, canvas.height)

//       particles.forEach((particle, i) => {
//         particle.x += particle.vx
//         particle.y += particle.vy
//         particle.z += particle.vz

//         if (particle.x < 0) particle.x = canvas.width
//         if (particle.x > canvas.width) particle.x = 0
//         if (particle.y < 0) particle.y = canvas.height
//         if (particle.y > canvas.height) particle.y = 0
//         if (particle.z < 0) particle.z = 1000
//         if (particle.z > 1000) particle.z = 0

//         const scale = 1000 / (1000 + particle.z)
//         const x2d = particle.x * scale + canvas.width / 2 * (1 - scale)
//         const y2d = particle.y * scale + canvas.height / 2 * (1 - scale)
//         const size = particle.size * scale

//         ctx.beginPath()
//         ctx.arc(x2d, y2d, size, 0, Math.PI * 2)
//         ctx.fillStyle = particle.color
//         ctx.fill()

//         particles.slice(i + 1).forEach(otherParticle => {
//           const dx = particle.x - otherParticle.x
//           const dy = particle.y - otherParticle.y
//           const distance = Math.sqrt(dx * dx + dy * dy)

//           if (distance < 150) {
//             ctx.beginPath()
//             ctx.moveTo(x2d, y2d)
//             const otherScale = 1000 / (1000 + otherParticle.z)
//             const otherX = otherParticle.x * otherScale + canvas.width / 2 * (1 - otherScale)
//             const otherY = otherParticle.y * otherScale + canvas.height / 2 * (1 - otherScale)
//             ctx.lineTo(otherX, otherY)
//             ctx.strokeStyle = `hsla(220, 70%, 60%, ${0.2 * (1 - distance / 150)})`
//             ctx.lineWidth = 0.5
//             ctx.stroke()
//           }
//         })
//       })

//       requestAnimationFrame(animate)
//     }

//     animate()

//     const handleResize = () => {
//       canvas.width = window.innerWidth
//       canvas.height = window.innerHeight
//     }

//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   return (
//     anvas
//       ref={canvasRef}
//       className="fixed inset-0 pointer-events-none z-0"
//       style={{ opacity: 0.3 }}
//     />
//   )
// }

'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  size: number
  color: string
}

const PARTICLE_COUNT = 100
const MAX_DEPTH = 1000

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    const particles: Particle[] = []
    let frameId: number

    const initParticles = () => {
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * MAX_DEPTH,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          color: `hsla(${Math.random() * 60 + 200}, 70%, 60%, 0.6)`,
        })
      }
    }

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight

      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr

      // Make the drawing coordinates use CSS pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resizeCanvas()
    initParticles()

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        // Wrap around edges
        if (particle.x < 0) particle.x = width
        if (particle.x > width) particle.x = 0
        if (particle.y < 0) particle.y = height
        if (particle.y > height) particle.y = 0
        if (particle.z < 0) particle.z = MAX_DEPTH
        if (particle.z > MAX_DEPTH) particle.z = 0

        const scale = MAX_DEPTH / (MAX_DEPTH + particle.z)
        const x2d = particle.x * scale + (width / 2) * (1 - scale)
        const y2d = particle.y * scale + (height / 2) * (1 - scale)
        const size = particle.size * scale

        ctx.beginPath()
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Lines between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const otherScale = MAX_DEPTH / (MAX_DEPTH + other.z)
            const otherX =
              other.x * otherScale + (width / 2) * (1 - otherScale)
            const otherY =
              other.y * otherScale + (height / 2) * (1 - otherScale)

            ctx.beginPath()
            ctx.moveTo(x2d, y2d)
            ctx.lineTo(otherX, otherY)
            ctx.strokeStyle = `hsla(220, 70%, 60%, ${
              0.2 * (1 - distance / 150)
            })`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      frameId = window.requestAnimationFrame(animate)
    }

    frameId = window.requestAnimationFrame(animate)

    const handleResize = () => {
      resizeCanvas()
      initParticles()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3 }}
      aria-hidden="true"
    />
  )
}
