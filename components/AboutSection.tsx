"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 40 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  });

  return (
    <section id="about" className="py-32 bg-black relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div ref={ref} className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.p
          {...fadeIn(0)}
          className="text-white/30 text-xs font-semibold tracking-[0.2em] uppercase mb-6"
        >
          About Pritzy Ventures
        </motion.p>

        <motion.h2
          {...fadeIn(0.12)}
          className="text-4xl sm:text-5xl font-black leading-tight tracking-tight text-white mb-10"
        >
          Software is just{" "}
          <span className="text-white/40">the beginning.</span>
        </motion.h2>

        <motion.div
          {...fadeIn(0.24)}
          className="space-y-6 text-white/50 text-base leading-relaxed"
        >
          <p>
            Pritzy Ventures LLC is a modern technology holding company that begins with a
            singular focus: building exceptional AI-powered software and digital products.
            We create tools that are intelligent, elegant, and built to last.
          </p>
          <p>
            But software is only the foundation. As the company matures, our ambitions
            extend far beyond the screen — into robotics, intelligent electronics,
            automation systems, next-generation mobility, and advanced manufacturing.
          </p>
          <p>
            We think in decades. Every product we build, every investment we make, and
            every venture we launch is guided by a simple conviction: the technologies
            of tomorrow are being built today.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
