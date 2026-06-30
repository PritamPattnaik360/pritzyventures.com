"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const topics = [
  { label: "AI Software", desc: "Intelligent systems at the core of every product we build." },
  { label: "SaaS Platforms", desc: "Scalable, recurring-revenue software built for the long run." },
  { label: "Consumer Products", desc: "Apps that reach millions through elegant, intuitive design." },
  { label: "Enterprise Software", desc: "Mission-critical tools for large organizations." },
  { label: "Robotics", desc: "Physical AI and autonomous systems." },
  { label: "Smart Electronics", desc: "Intelligent hardware and connected devices." },
  { label: "Automation", desc: "End-to-end process intelligence across industries." },
  { label: "Emerging Technologies", desc: "New frontiers we haven't yet named." },
];

export default function VisionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="vision" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-white/30 text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Long-Term Vision
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6"
          >
            Areas we care about.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 text-base max-w-xl mx-auto leading-relaxed"
          >
            We are building software and AI products today, with a long-term interest in
            the technologies and industries below. These are the spaces we are watching,
            learning, and preparing to enter.
          </motion.p>
        </div>

        {/* Topic grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.07, ease: "easeOut" }}
              className="group p-6 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15 transition-all duration-300"
            >
              <p className="text-white font-semibold text-sm mb-2 tracking-tight">
                {topic.label}
              </p>
              <p className="text-white/35 text-xs leading-relaxed group-hover:text-white/50 transition-colors duration-300">
                {topic.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-20 text-center"
        >
          <p className="text-white/20 text-sm font-medium italic max-w-lg mx-auto">
            &quot;The best way to predict the future is to build it.&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
