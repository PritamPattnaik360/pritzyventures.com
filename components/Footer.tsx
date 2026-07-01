"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const links = [
    { label: "About", href: "#about" },
    { label: "Ventures", href: "#focus" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-black border-t border-white/8 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10"
        >
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:bg-white/90 transition-colors">
                <span className="text-black font-bold text-xs tracking-tight">PV</span>
              </div>
              <span className="text-white font-bold text-base tracking-tight">
                Pritzy Ventures LLC
              </span>
            </a>
            <p className="text-white/30 text-sm font-medium italic text-center md:text-left">
              &quot;Building technology that shapes tomorrow.&quot;
            </p>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/40 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/20 text-xs"
        >
          <p>Copyright © {new Date().getFullYear()} Pritzy Ventures - All Rights Reserved.</p>
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Technology Holding Company</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>United States</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
