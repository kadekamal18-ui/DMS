'use client';

import React, { useEffect, useRef } from 'react';

export function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let animationId: number;

    // Mouse state
    let mouseX = w / 2;
    let mouseY = h / 2;
    let targetMouseX = w / 2;
    let targetMouseY = h / 2;

    // Stars
    interface Star {
      x: number;
      y: number;
      z: number;
      size: number;
      baseSize: number;
      speed: number;
      opacity: number;
      twinkleSpeed: number;
      twinklePhase: number;
      color: string;
    }

    const starColors = [
      '255, 255, 255',
      '200, 220, 255',
      '255, 200, 150',
      '150, 200, 255',
      '180, 160, 255',
      '100, 220, 255',
    ];

    const STAR_COUNT = 600;
    const stars: Star[] = [];

    for (let i = 0; i < STAR_COUNT; i++) {
      const baseSize = Math.random() * 2.5 + 0.3;
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 3 + 1,
        size: baseSize,
        baseSize,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.03 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // Mouse trail particles
    interface TrailParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;
    }

    const trailParticles: TrailParticle[] = [];
    const trailColors = [
      '0, 200, 255',
      '100, 150, 255',
      '200, 100, 255',
      '0, 255, 200',
      '255, 255, 255',
    ];

    // Shooting stars
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      life: number;
    }
    const shootingStars: ShootingStar[] = [];

    // Nebula blobs
    interface Nebula {
      x: number;
      y: number;
      radius: number;
      color: string;
      opacity: number;
      phase: number;
    }
    const nebulae: Nebula[] = [
      { x: w * 0.2, y: h * 0.3, radius: 200, color: '50, 0, 120', opacity: 0.04, phase: 0 },
      { x: w * 0.8, y: h * 0.6, radius: 250, color: '0, 40, 100', opacity: 0.03, phase: 2 },
      { x: w * 0.5, y: h * 0.8, radius: 180, color: '0, 80, 80', opacity: 0.03, phase: 4 },
    ];

    let frameCount = 0;
    let lastMouseMoveTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      lastMouseMoveTime = frameCount;

      // Spawn trail particles on mouse move
      for (let i = 0; i < 2; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.5;
        trailParticles.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 40 + Math.random() * 30,
          size: Math.random() * 3 + 1,
          color: trailColors[Math.floor(Math.random() * trailColors.length)],
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      frameCount++;
      ctx.clearRect(0, 0, w, h);

      // Deep space background — ultra dark
      const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.8);
      bgGrad.addColorStop(0, '#0a0a14');
      bgGrad.addColorStop(0.5, '#060610');
      bgGrad.addColorStop(1, '#020208');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Draw nebulae (subtle colored clouds)
      nebulae.forEach((neb) => {
        neb.phase += 0.003;
        const pulse = Math.sin(neb.phase) * 0.015 + neb.opacity;
        const grad = ctx.createRadialGradient(neb.x, neb.y, 0, neb.x, neb.y, neb.radius);
        grad.addColorStop(0, `rgba(${neb.color}, ${pulse})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(neb.x - neb.radius, neb.y - neb.radius, neb.radius * 2, neb.radius * 2);
      });

      // Mouse glow — a soft cyan/purple aura around the cursor
      const glowGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 250);
      glowGrad.addColorStop(0, 'rgba(0, 180, 255, 0.06)');
      glowGrad.addColorStop(0.3, 'rgba(100, 50, 255, 0.03)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(mouseX - 250, mouseY - 250, 500, 500);

      // Draw & animate stars
      stars.forEach((star) => {
        // Twinkle
        star.twinklePhase += star.twinkleSpeed;
        star.opacity = 0.3 + Math.sin(star.twinklePhase) * 0.5 + 0.2;

        // Parallax shift based on mouse position (depth via z)
        const parallaxX = ((mouseX - w / 2) / w) * 30 * star.z;
        const parallaxY = ((mouseY - h / 2) / h) * 30 * star.z;

        const drawX = star.x + parallaxX;
        const drawY = star.y + parallaxY;

        // Slow upward drift
        star.y -= star.speed;
        if (star.y < -10) {
          star.y = h + 10;
          star.x = Math.random() * w;
        }

        // Mouse proximity — stars near mouse grow and glow brighter
        const dx = mouseX - drawX;
        const dy = mouseY - drawY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let sizeMod = 1;
        let opacityMod = 0;

        if (dist < 200) {
          const proximity = 1 - dist / 200;
          sizeMod = 1 + proximity * 2;
          opacityMod = proximity * 0.5;
        }

        const finalSize = star.baseSize * sizeMod;
        const finalOpacity = Math.min(1, star.opacity + opacityMod);

        // Draw glow
        if (finalSize > 1.5) {
          const glowRadius = finalSize * 4;
          const starGlow = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, glowRadius);
          starGlow.addColorStop(0, `rgba(${star.color}, ${finalOpacity * 0.3})`);
          starGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = starGlow;
          ctx.fillRect(drawX - glowRadius, drawY - glowRadius, glowRadius * 2, glowRadius * 2);
        }

        // Draw star core
        ctx.fillStyle = `rgba(${star.color}, ${finalOpacity})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, finalSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Trail particles
      for (let i = trailParticles.length - 1; i >= 0; i--) {
        const p = trailParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life++;

        const lifeRatio = 1 - p.life / p.maxLife;
        if (lifeRatio <= 0) {
          trailParticles.splice(i, 1);
          continue;
        }

        const particleGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        particleGlow.addColorStop(0, `rgba(${p.color}, ${lifeRatio * 0.6})`);
        particleGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = particleGlow;
        ctx.fillRect(p.x - p.size * 3, p.y - p.size * 3, p.size * 6, p.size * 6);

        ctx.fillStyle = `rgba(${p.color}, ${lifeRatio})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * lifeRatio, 0, Math.PI * 2);
        ctx.fill();
      }

      // Occasional shooting stars
      if (Math.random() < 0.005) {
        shootingStars.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.3,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 5,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
          opacity: 1,
          life: 0,
        });
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.life++;
        ss.opacity = Math.max(0, 1 - ss.life / 40);

        if (ss.opacity <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, `rgba(255, 255, 255, 0)`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${ss.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        // Head glow
        const headGlow = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 8);
        headGlow.addColorStop(0, `rgba(200, 230, 255, ${ss.opacity})`);
        headGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = headGlow;
        ctx.fillRect(ss.x - 8, ss.y - 8, 16, 16);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      nebulae[0].x = w * 0.2;
      nebulae[0].y = h * 0.3;
      nebulae[1].x = w * 0.8;
      nebulae[1].y = h * 0.6;
      nebulae[2].x = w * 0.5;
      nebulae[2].y = h * 0.8;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'auto' }}
    />
  );
}
