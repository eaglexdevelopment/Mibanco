"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Data with your actual banner colors for the glow effect
const slides = [
  {
    id: 1,
    image: "/Banner1.webp",
    category: "Emprendedores",
    title: "Impulsa tu Negocio",
    subtitle: "¿Necesitas capital? Tenemos la solución perfecta y rápida.",
    color: "#00C853", // Green Glow
  },
  {
    id: 2,
    image: "/banner2.webp",
    category: "Ahorros",
    title: "Haz Crecer tu Dinero",
    subtitle: "Asegura tu futuro con las mejores tasas del mercado.",
    color: "#FFD600", // Gold Glow
  },
  {
    id: 3,
    image: "/Banner3.webp",
    category: "Banca Digital",
    title: "Ilimitado & Móvil",
    subtitle: "El control total de tus finanzas en la palma de tu mano.",
    color: "#FF6D00", // Orange Glow
  },
  {
    id: 4,
    image: "/Banner4.webp",
    category: "Seguros",
    title: "Protección 360°",
    subtitle: "Tranquilidad garantizada para ti y tu familia.",
    color: "#2962FF", // Blue Glow
  }
];

export default function FixedHero() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [index, animating]);

  const runAnimation = (nextIndex: number) => {
    setAnimating(true);

    const currentSlide = imageRefs.current[index];
    const nextSlide = imageRefs.current[nextIndex];

    // 1. Text Animation (Quick Fade Out/In)
    gsap.to(contentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
            setIndex(nextIndex);
            gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.5 });
        }
    });

    // 2. Glow Color Transition
    if (glowRef.current) {
        gsap.to(glowRef.current, {
            backgroundColor: slides[nextIndex].color,
            duration: 1,
        });
    }

    // 3. Image Transition (Slide & Parallax)
    // Place next slide to the right
    gsap.set(nextSlide, { xPercent: 100, zIndex: 20, visibility: 'visible' });
    gsap.set(currentSlide, { zIndex: 10 });

    const tl = gsap.timeline({
        onComplete: () => setAnimating(false)
    });

    // Move Next In
    tl.to(nextSlide, {
        xPercent: 0,
        duration: 1.2,
        ease: "power4.inOut"
    });

    // Move Current Out (Slightly slower for parallax)
    tl.to(currentSlide, {
        xPercent: -20,
        duration: 1.2,
        ease: "power4.inOut"
    }, "<");

    // Scale Effect (Breathing)
    tl.fromTo(nextSlide?.querySelector("img"), 
        { scale: 1.1 }, 
        { scale: 1, duration: 1.5, ease: "power2.out" }, 
        "<"
    );
  };

  const nextSlide = () => {
    if (animating) return;
    const nextIndex = (index + 1) % slides.length;
    runAnimation(nextIndex);
  };

  const prevSlide = () => {
    if (animating) return;
    const nextIndex = (index - 1 + slides.length) % slides.length;
    runAnimation(nextIndex);
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center bg-[#F8F9FA] overflow-hidden">
      
      {/* Background Grid Pattern (Subtle Tech Feel) */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">
        
        {/* --- LEFT: TEXT CONTENT (Span 5 cols) --- */}
        <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
            <div ref={contentRef} className="will-change-transform">
                <div className="flex items-center gap-3 mb-6">
                    <span className="h-[2px] w-10 bg-black"></span>
                    <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
                        {slides[index].category}
                    </span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight mb-6">
                    {slides[index].title}
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-md">
                    {slides[index].subtitle}
                </p>

                <div className="flex flex-wrap gap-4">
                    <button className="px-8 py-4 bg-black text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                        Descubrir
                    </button>
                    <button className="px-8 py-4 bg-white border border-gray-200 text-black rounded-full font-bold text-sm tracking-widest uppercase hover:border-black transition-all">
                        Ver Video
                    </button>
                </div>
            </div>

            {/* Controls (Bottom Left) */}
            <div className="mt-16 flex items-center gap-4">
                <button onClick={prevSlide} className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all">
                    <FaChevronLeft size={14} />
                </button>
                <button onClick={nextSlide} className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all">
                    <FaChevronRight size={14} />
                </button>
                <div className="ml-4 h-[2px] w-24 bg-gray-200 relative overflow-hidden rounded-full">
                    <div className="absolute top-0 left-0 h-full bg-black transition-all duration-500"
                         style={{ width: `${((index + 1) / slides.length) * 100}%` }}>
                    </div>
                </div>
            </div>
        </div>

        {/* --- RIGHT: BANNER (Span 7 cols) --- */}
        {/* This is the Rectangular "Screen" */}
        <div className="lg:col-span-7 relative order-1 lg:order-2">
            
            {/* 1. Ambient Glow Behind (Matching Brand Color) */}
            <div 
                ref={glowRef}
                className="absolute -inset-4 blur-[60px] opacity-40 transition-colors duration-1000 rounded-[3rem]"
                style={{ backgroundColor: slides[index].color }}
            ></div>

            {/* 2. The Container - WIDE ASPECT RATIO (16:9) */}
            <div className="relative w-full aspect-[16/9] rounded-2xl shadow-2xl overflow-hidden bg-white ring-1 ring-black/5">
                
                {/* Slides */}
                {slides.map((slide, i) => (
                    <div 
                        key={slide.id}
                        ref={(el) => { imageRefs.current[i] = el; }}
                        className="absolute inset-0 w-full h-full will-change-transform"
                        style={{ 
                            zIndex: i === 0 ? 10 : 0,
                            visibility: i === 0 ? 'visible' : 'hidden' // GSAP handles visibility
                        }}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover" // Ensures it fills the rectangle
                            priority={i === 0}
                        />
                    </div>
                ))}

                {/* 3. Glass Reflection Overlay (The "Premium Screen" look) */}
                <div className="absolute inset-0 pointer-events-none z-30 bg-gradient-to-tr from-white/10 via-transparent to-black/5 mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 z-30 pointer-events-none"></div>

            </div>
        </div>

      </div>
    </section>
  );
}