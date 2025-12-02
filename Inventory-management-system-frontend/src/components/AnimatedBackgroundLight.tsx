// 'use client';

// import { useEffect, useRef } from 'react';
// import { useTheme } from '../contexts/ThemeContext';

// export default function AnimatedBackgroundLight() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const { actualTheme } = useTheme();

//   useEffect(() => {
//     if (actualTheme !== 'light') return;

//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     // Set canvas size
//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     resizeCanvas();
//     window.addEventListener('resize', resizeCanvas);

//     // 3D Floating Shapes
//     interface Shape {
//       x: number;
//       y: number;
//       z: number;
//       size: number;
//       rotation: number;
//       rotationSpeed: number;
//       speedX: number;
//       speedY: number;
//       speedZ: number;
//       type: 'cube' | 'sphere' | 'pyramid';
//       color: string;
//     }

//     const shapes: Shape[] = [];
//     const numShapes = 15;
    
//     const colors = [
//       'rgba(99, 102, 241, 0.15)',   // Indigo
//       'rgba(139, 92, 246, 0.15)',   // Purple
//       'rgba(236, 72, 153, 0.15)',   // Pink
//       'rgba(59, 130, 246, 0.15)',   // Blue
//       'rgba(16, 185, 129, 0.15)',   // Green
//     ];

//     // Initialize shapes
//     for (let i = 0; i < numShapes; i++) {
//       shapes.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         z: Math.random() * 500 + 100,
//         size: Math.random() * 80 + 40,
//         rotation: Math.random() * Math.PI * 2,
//         rotationSpeed: (Math.random() - 0.5) * 0.02,
//         speedX: (Math.random() - 0.5) * 0.5,
//         speedY: (Math.random() - 0.5) * 0.5,
//         speedZ: (Math.random() - 0.5) * 0.3,
//         type: ['cube', 'sphere', 'pyramid'][Math.floor(Math.random() * 3)] as 'cube' | 'sphere' | 'pyramid',
//         color: colors[Math.floor(Math.random() * colors.length)],
//       });
//     }

//     // Draw 3D Cube
//     const drawCube = (x: number, y: number, size: number, rotation: number, color: string) => {
//       ctx.save();
//       ctx.translate(x, y);
      
//       const cos = Math.cos(rotation);
//       const sin = Math.sin(rotation);
      
//       // Front face
//       ctx.fillStyle = color;
//       ctx.beginPath();
//       ctx.moveTo(-size * cos, -size);
//       ctx.lineTo(size * cos, -size);
//       ctx.lineTo(size * cos, size);
//       ctx.lineTo(-size * cos, size);
//       ctx.closePath();
//       ctx.fill();
      
//       // Top face
//       ctx.fillStyle = color.replace('0.15', '0.25');
//       ctx.beginPath();
//       ctx.moveTo(-size * cos, -size);
//       ctx.lineTo(0, -size - size * sin);
//       ctx.lineTo(size * cos, -size);
//       ctx.closePath();
//       ctx.fill();
      
//       // Side face
//       ctx.fillStyle = color.replace('0.15', '0.1');
//       ctx.beginPath();
//       ctx.moveTo(size * cos, -size);
//       ctx.lineTo(size * cos + size * sin, 0);
//       ctx.lineTo(size * cos + size * sin, size * 2);
//       ctx.lineTo(size * cos, size);
//       ctx.closePath();
//       ctx.fill();
      
//       ctx.restore();
//     };

//     // Draw 3D Sphere
//     const drawSphere = (x: number, y: number, size: number, color: string) => {
//       const gradient = ctx.createRadialGradient(x - size * 0.3, y - size * 0.3, 0, x, y, size);
//       gradient.addColorStop(0, color.replace('0.15', '0.3'));
//       gradient.addColorStop(0.7, color);
//       gradient.addColorStop(1, color.replace('0.15', '0.05'));
      
//       ctx.fillStyle = gradient;
//       ctx.beginPath();
//       ctx.arc(x, y, size, 0, Math.PI * 2);
//       ctx.fill();
//     };

//     // Draw 3D Pyramid
//     const drawPyramid = (x: number, y: number, size: number, rotation: number, color: string) => {
//       ctx.save();
//       ctx.translate(x, y);
      
//       const cos = Math.cos(rotation);
//       const sin = Math.sin(rotation);
      
//       // Base
//       ctx.fillStyle = color;
//       ctx.beginPath();
//       ctx.moveTo(-size * cos, size);
//       ctx.lineTo(size * cos, size);
//       ctx.lineTo(size * cos + size * sin, size + size * sin);
//       ctx.lineTo(-size * cos + size * sin, size + size * sin);
//       ctx.closePath();
//       ctx.fill();
      
//       // Left face
//       ctx.fillStyle = color.replace('0.15', '0.25');
//       ctx.beginPath();
//       ctx.moveTo(-size * cos, size);
//       ctx.lineTo(0, -size);
//       ctx.lineTo(size * cos, size);
//       ctx.closePath();
//       ctx.fill();
      
//       // Right face
//       ctx.fillStyle = color.replace('0.15', '0.1');
//       ctx.beginPath();
//       ctx.moveTo(size * cos, size);
//       ctx.lineTo(0, -size);
//       ctx.lineTo(size * cos + size * sin, size + size * sin);
//       ctx.closePath();
//       ctx.fill();
      
//       ctx.restore();
//     };

//     // Animation loop
//     let animationId: number;
//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       shapes.forEach((shape) => {
//         // Update position
//         shape.x += shape.speedX;
//         shape.y += shape.speedY;
//         shape.z += shape.speedZ;
//         shape.rotation += shape.rotationSpeed;

//         // Wrap around edges
//         if (shape.x < -100) shape.x = canvas.width + 100;
//         if (shape.x > canvas.width + 100) shape.x = -100;
//         if (shape.y < -100) shape.y = canvas.height + 100;
//         if (shape.y > canvas.height + 100) shape.y = -100;
//         if (shape.z < 50) shape.z = 600;
//         if (shape.z > 600) shape.z = 50;

//         // Calculate depth scale
//         const scale = 600 / shape.z;
//         const scaledSize = shape.size * scale;
//         const opacity = (1 - shape.z / 600) * 0.8;

//         // Draw shape based on type
//         ctx.globalAlpha = opacity;
        
//         if (shape.type === 'cube') {
//           drawCube(shape.x, shape.y, scaledSize, shape.rotation, shape.color);
//         } else if (shape.type === 'sphere') {
//           drawSphere(shape.x, shape.y, scaledSize, shape.color);
//         } else if (shape.type === 'pyramid') {
//           drawPyramid(shape.x, shape.y, scaledSize, shape.rotation, shape.color);
//         }
        
//         ctx.globalAlpha = 1;
//       });

//       animationId = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       window.removeEventListener('resize', resizeCanvas);
//       cancelAnimationFrame(animationId);
//     };
//   }, [actualTheme]);

//   if (actualTheme !== 'light') return null;

//   return (
//     canvas
//       ref={canvasRef}
//       className="fixed inset-0 pointer-events-none z-0"
//       style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}
//     />
//   );
// }

'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function AnimatedBackgroundLight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { actualTheme } = useTheme();

  useEffect(() => {
    if (actualTheme !== 'light') return;

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

    // 3D Floating Shapes
    interface Shape {
      x: number;
      y: number;
      z: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      speedX: number;
      speedY: number;
      speedZ: number;
      type: 'cube' | 'sphere' | 'pyramid';
      color: string;
    }

    const shapes: Shape[] = [];
    const numShapes = 15;
    
    const colors = [
      'rgba(99, 102, 241, 0.15)',   // Indigo
      'rgba(139, 92, 246, 0.15)',   // Purple
      'rgba(236, 72, 153, 0.15)',   // Pink
      'rgba(59, 130, 246, 0.15)',   // Blue
      'rgba(16, 185, 129, 0.15)',   // Green
    ];

    // Initialize shapes
    for (let i = 0; i < numShapes; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 500 + 100,
        size: Math.random() * 80 + 40,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        speedZ: (Math.random() - 0.5) * 0.3,
        type: ['cube', 'sphere', 'pyramid'][Math.floor(Math.random() * 3)] as 'cube' | 'sphere' | 'pyramid',
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Draw 3D Cube
    const drawCube = (x: number, y: number, size: number, rotation: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      
      // Front face
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(-size * cos, -size);
      ctx.lineTo(size * cos, -size);
      ctx.lineTo(size * cos, size);
      ctx.lineTo(-size * cos, size);
      ctx.closePath();
      ctx.fill();
      
      // Top face
      ctx.fillStyle = color.replace('0.15', '0.25');
      ctx.beginPath();
      ctx.moveTo(-size * cos, -size);
      ctx.lineTo(0, -size - size * sin);
      ctx.lineTo(size * cos, -size);
      ctx.closePath();
      ctx.fill();
      
      // Side face
      ctx.fillStyle = color.replace('0.15', '0.1');
      ctx.beginPath();
      ctx.moveTo(size * cos, -size);
      ctx.lineTo(size * cos + size * sin, 0);
      ctx.lineTo(size * cos + size * sin, size * 2);
      ctx.lineTo(size * cos, size);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    };

    // Draw 3D Sphere
    const drawSphere = (x: number, y: number, size: number, color: string) => {
      const gradient = ctx.createRadialGradient(x - size * 0.3, y - size * 0.3, 0, x, y, size);
      gradient.addColorStop(0, color.replace('0.15', '0.3'));
      gradient.addColorStop(0.7, color);
      gradient.addColorStop(1, color.replace('0.15', '0.05'));
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw 3D Pyramid
    const drawPyramid = (x: number, y: number, size: number, rotation: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      
      // Base
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(-size * cos, size);
      ctx.lineTo(size * cos, size);
      ctx.lineTo(size * cos + size * sin, size + size * sin);
      ctx.lineTo(-size * cos + size * sin, size + size * sin);
      ctx.closePath();
      ctx.fill();
      
      // Left face
      ctx.fillStyle = color.replace('0.15', '0.25');
      ctx.beginPath();
      ctx.moveTo(-size * cos, size);
      ctx.lineTo(0, -size);
      ctx.lineTo(size * cos, size);
      ctx.closePath();
      ctx.fill();
      
      // Right face
      ctx.fillStyle = color.replace('0.15', '0.1');
      ctx.beginPath();
      ctx.moveTo(size * cos, size);
      ctx.lineTo(0, -size);
      ctx.lineTo(size * cos + size * sin, size + size * sin);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        // Update position
        shape.x += shape.speedX;
        shape.y += shape.speedY;
        shape.z += shape.speedZ;
        shape.rotation += shape.rotationSpeed;

        // Wrap around edges
        if (shape.x < -100) shape.x = canvas.width + 100;
        if (shape.x > canvas.width + 100) shape.x = -100;
        if (shape.y < -100) shape.y = canvas.height + 100;
        if (shape.y > canvas.height + 100) shape.y = -100;
        if (shape.z < 50) shape.z = 600;
        if (shape.z > 600) shape.z = 50;

        // Calculate depth scale
        const scale = 600 / shape.z;
        const scaledSize = shape.size * scale;
        const opacity = (1 - shape.z / 600) * 0.8;

        // Draw shape based on type
        ctx.globalAlpha = opacity;
        
        if (shape.type === 'cube') {
          drawCube(shape.x, shape.y, scaledSize, shape.rotation, shape.color);
        } else if (shape.type === 'sphere') {
          drawSphere(shape.x, shape.y, scaledSize, shape.color);
        } else if (shape.type === 'pyramid') {
          drawPyramid(shape.x, shape.y, scaledSize, shape.rotation, shape.color);
        }
        
        ctx.globalAlpha = 1;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [actualTheme]);

  if (actualTheme !== 'light') return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}
    />
  );
}
