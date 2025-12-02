'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { actualTheme } = useTheme();

  useEffect(() => {
    if (actualTheme !== 'dark') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star properties
    interface Star {
      x: number;
      y: number;
      z: number;
      size: number;
      speed: number;
    }

    const stars: Star[] = [];
    const numStars = 200;

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach((star) => {
        // Move star
        star.z -= star.speed;

        // Reset star if it goes past
        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
        }

        // Project 3D position to 2D
        const k = 128 / star.z;
        const px = star.x * k + centerX;
        const py = star.y * k + centerY;

        // Size based on distance
        const size = (1 - star.z / canvas.width) * star.size;

        // Draw star with glow
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, size * 2);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.5, 'rgba(138, 147, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(138, 147, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();

        // Draw trail
        const trailLength = 3;
        const prevK = 128 / (star.z + star.speed * trailLength);
        const prevPx = star.x * prevK + centerX;
        const prevPy = star.y * prevK + centerY;

        ctx.strokeStyle = `rgba(138, 147, 255, ${0.3 * (1 - star.z / canvas.width)})`;
        ctx.lineWidth = size / 2;
        ctx.beginPath();
        ctx.moveTo(prevPx, prevPy);
        ctx.lineTo(px, py);
        ctx.stroke();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [actualTheme]);

  if (actualTheme !== 'dark') return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: '#0a0a0a' }}
    />
  );
}
