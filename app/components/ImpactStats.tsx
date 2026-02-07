"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: 2, suffix: "M+", label: "Emprendedores" },
    { value: 98, suffix: "%", label: "Satisfacción" },
    { value: 25, suffix: "Años", label: "Impulsando Perú" },
    { value: 24, suffix: "/7", label: "Soporte Digital" },
];

export default function ImpactStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
        numberRefs.current.forEach((el, index) => {
            const endValue = stats[index].value;
            
            gsap.fromTo(el, 
                { innerText: 0 }, 
                {
                    innerText: endValue,
                    duration: 2,
                    snap: { innerText: 1 },
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    },
                    onUpdate: function() {
                        if(el) el.innerText = Math.ceil(this.targets()[0].innerText).toString();
                    }
                }
            );
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-black text-white overflow-hidden">
        {/* Background Video/Image Placeholder */}
        <div className="absolute inset-0 z-0 opacity-20">
             <Image
                src="/banner2.webp"
                alt="Background"
                fill
                className="object-cover grayscale mix-blend-luminosity"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black"></div>
        </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center group">
                    <div className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500">
                        <span ref={(el) => { numberRefs.current[index] = el; }}>0</span>
                        <span>{stat.suffix}</span>
                    </div>
                    <div className="h-1 w-12 bg-mibanco-gold mb-6 group-hover:w-24 transition-all duration-300"></div>
                    <p className="text-xl font-bold uppercase tracking-widest text-gray-400 group-hover:text-mibanco-green transition-colors">
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
