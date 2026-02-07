"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const shutterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Master Timeline
    const tl = gsap.timeline({
        onComplete: () => {
            setComplete(true);
            // Optional: reset body overflow if needed, but handled by component unmount usually
        }
    });

    // 1. Logo Entrance & Pulse
    tl.fromTo(logoRef.current, 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }
    );
    
    // Pulse
    tl.to(logoRef.current, { scale: 1.05, duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" });

    // 2. Logo Exit
    tl.to(logoRef.current, { scale: 0.8, opacity: 0, duration: 0.4, ease: "power2.in" }, "+=0.2");

    // 3. Shutter Reveal (Split 4 Columns)
    tl.to(shutterRefs.current, {
        height: 0, // Slide up like blinds
        duration: 1.2,
        stagger: 0.05,
        ease: "power4.inOut"
    }, "-=0.2");

    // 4. Reveal Content Underneath (Optional: If we could access the main content wrapper, we'd scale it from 1.1 to 1)
    // For now, the shutters sliding up creates a strong reveal effect.
    
    // Fade out container just to be safe at the end
    tl.to(containerRef.current, { pointerEvents: "none", duration: 0.1 });

    return () => { tl.kill(); };
  }, []);

  if (complete) return null;

  return (
    <div 
        ref={containerRef} 
        className="fixed inset-0 z-[100] flex flex-row h-screen w-screen"
    >
        {/* Logo Layer (Centered on top of shutters initially) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
             <div ref={logoRef} className="relative w-64 h-32">
                <Image 
                    src="/logo.webp" 
                    alt="Mibanco" 
                    fill 
                    className="object-contain" 
                    priority
                />
             </div>
        </div>

        {/* 4 Shutter Panels for Sexy Reveal */}
        {[0, 1, 2, 3].map((i) => (
            <div 
                key={i}
                ref={(el) => { shutterRefs.current[i] = el; }}
                className="relative h-full flex-1 bg-white border-r border-gray-50 last:border-0 origin-top"
            >
                {/* Optional subtle gradient or pattern on shutters */}
            </div>
        ))}
    </div>
  );
}
