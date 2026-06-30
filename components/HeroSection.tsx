"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.5 + 0.35,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      // Gradient orbs
      const orbs = [
        { x: canvas.width * 0.2 + Math.sin(time * 0.7) * 60, y: canvas.height * 0.3 + Math.cos(time * 0.5) * 40, r: 350, color: "rgba(255,255,255,0.03)" },
        { x: canvas.width * 0.8 + Math.cos(time * 0.6) * 50, y: canvas.height * 0.6 + Math.sin(time * 0.8) * 50, r: 280, color: "rgba(255,255,255,0.025)" },
        { x: canvas.width * 0.5 + Math.sin(time * 0.4) * 70, y: canvas.height * 0.15 + Math.cos(time * 0.3) * 30, r: 200, color: "rgba(255,255,255,0.02)" },
      ];

      orbs.forEach((orb) => {
        const g = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        g.addColorStop(0, orb.color);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <AnimatedBackground />

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center"
      >
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Badge */}
          <motion.div variants={item} className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-medium tracking-widest uppercase backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
              Technology Holding Company
            </span>
          </motion.div>

          {/* Eyebrow line */}
          <motion.p
            variants={item}
            className="text-white/30 text-sm font-semibold tracking-[0.18em] uppercase mb-6"
          >
            We build software &nbsp;·&nbsp; AI software
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.92] tracking-tight text-white mb-8"
          >
            BUILDING THE{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                NEXT GENERATION
              </span>
            </span>{" "}
            <br className="hidden sm:block" />
            OF AI-POWERED{" "}
            <span className="bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
              SOFTWARE.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={item}
            className="max-w-3xl mx-auto text-white/40 text-sm sm:text-base leading-relaxed tracking-wide font-medium mb-12"
          >
            PRITZY VENTURES LLC CREATES AI-POWERED SOFTWARE AND DIGITAL PRODUCTS. AS THE
            COMPANY GROWS, IT WILL EXPAND INTO EMERGING TECHNOLOGIES AND DIVERSE INDUSTRIES
            THROUGH INNOVATION, STRATEGIC INVESTMENTS, AND NEW BUSINESS VENTURES. OUR
            LONG-TERM VISION IS TO BUILD AND INVEST IN NEW EMERGING MARKETS.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#about"
              className="group inline-flex items-center gap-2 bg-white text-black text-sm font-bold px-7 py-3.5 rounded-xl hover:bg-white/90 transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-white/10"
            >
              Explore Our Vision
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <a
              href="#vision"
              className="inline-flex items-center gap-2 border border-white/15 text-white/70 hover:text-white hover:border-white/30 text-sm font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              Future Ventures
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={item}
            className="flex justify-center mt-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-white/20"
            >
              <span className="text-xs tracking-widest font-medium">SCROLL</span>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
