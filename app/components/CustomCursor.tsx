"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        gsap.to(cursor, {
            x: mouseX,
            y: mouseY,
            duration: 0.1
        });
        
        gsap.to(follower, {
            x: mouseX,
            y: mouseY,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Hover effect
    const interactiveElements = document.querySelectorAll("a, button, .pointer-events-auto");
    
    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            gsap.to(cursor, { scale: 0, duration: 0.2 });
            gsap.to(follower, { scale: 3, backgroundColor: "rgba(255, 209, 0, 0.4)", mixBlendMode: "difference", duration: 0.3 });
        });
        el.addEventListener("mouseleave", () => {
            gsap.to(cursor, { scale: 1, duration: 0.2 });
            gsap.to(follower, { scale: 1, backgroundColor: "transparent", mixBlendMode: "normal", duration: 0.3 });
        });
    });

    return () => {
        window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-mibanco-green rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"></div>
      <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-mibanco-green rounded-full pointer-events-none z-[9998] hidden md:block transition-colors duration-300"></div>
    </>
  );
}
