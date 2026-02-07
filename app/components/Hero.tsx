"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Initial timeline
        const tl = gsap.timeline();

         // Animate words staggered
        tl.fromTo(wordsRef.current, 
            { y: 150, opacity: 0, rotate: 10 },
            { 
                y: 0, 
                opacity: 1, 
                rotate: 0, 
                stagger: 0.1, 
                duration: 1.2, 
                ease: "power4.out" 
            }
        );

        // Background Image Scale
        tl.fromTo(".hero-bg", 
            { scale: 1.2, opacity: 0 }, 
            { scale: 1, opacity: 0.4, duration: 2, ease: "power2.out" },
            "<"
        );
        
        // Scroll Parallax
        if(containerRef.current) {
            gsap.to(textRef.current, {
                yPercent: 50,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                } 
            });
        }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const words = ["IMPULSAMOS", "EL", "FUTURO", "DE", "TU", "NEGOCIO"];

  return (
    <div ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white">
      {/* Background with abstract mesh or image */}
      <div className="absolute inset-0 w-full h-full hero-bg">
        <Image
            src="/Banner1.webp" 
            alt="Background"
            fill
            className="object-cover grayscale opacity-30 invert"
            priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 ref={textRef} className="text-[12vw] leading-[0.85] font-black tracking-tighter text-gray-900 mix-blend-multiply flex flex-wrap justify-center gap-x-8 gap-y-0">
            {words.map((word, i) => (
                <span key={i} className="overflow-hidden inline-block py-4">
                    <span 
                        ref={(el) => { wordsRef.current[i] = el; }}
                        className="inline-block transform origin-bottom-left"
                    >
                        {word}
                    </span>
                </span>
            ))}
        </h1>
        
        <div className="mt-12 flex justify-center gap-6 opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]">
            <a href="#services" className="text-xl font-bold uppercase tracking-widest border-b-2 border-current pb-2 hover:text-mibanco-green transition-colors">
                Descubre Más
            </a>
            <a href="#contact" className="text-xl font-bold uppercase tracking-widest border-b-2 border-current pb-2 hover:text-mibanco-green transition-colors">
                Contáctanos
            </a>
        </div>
      </div>
    </div>
  );
}
