"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setLoading(false);
                document.body.style.overflow = "auto";
            }
        });
        
        // Disable scroll initially
        document.body.style.overflow = "hidden";

        tl.to(textRef.current, {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        })
        .to(textRef.current, {
            opacity: 0,
            duration: 0.5,
            delay: 0.5
        })
        .to(containerRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut"
        });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!loading) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10000] bg-mibanco-green flex items-center justify-center text-white">
        <div ref={textRef} className="opacity-0 font-black text-6xl md:text-9xl tracking-tighter mix-blend-difference">
            MIBANCO
        </div>
    </div>
  );
}
