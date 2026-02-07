"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";

const slides = [
  {
    id: 1,
    image: "/Banner1.webp",
    category: "Emprendedores",
    title: "Impulsa tu Negocio",
    subtitle: "¿Necesitas capital? Soluciones rápidas para escalar tu visión.",
    color: "#00C853",
  },
  {
    id: 2,
    image: "/banner2.webp",
    category: "Ahorros",
    title: "Haz Crecer tu Dinero",
    subtitle: "Asegura tu futuro con las tasas más competitivas del mercado.",
    color: "#FFD600",
  },
  {
    id: 3,
    image: "/Banner3.webp",
    category: "Banca Digital",
    title: "Ilimitado & Móvil",
    subtitle: "El control total de tus finanzas en la palma de tu mano.",
    color: "#FF6D00",
  },
  {
    id: 4,
    image: "/Banner4.webp",
    category: "Seguros",
    title: "Protección 360°",
    subtitle: "Tranquilidad garantizada para ti y tu patrimonio.",
    color: "#2962FF",
  }
];

export default function ResponsiveHero() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [index, animating]);

  const runAnimation = (nextIndex: number) => {
    setAnimating(true);
    const currentSlide = imageRefs.current[index];
    const nextSlide = imageRefs.current[nextIndex];

    // 1. Text Refresh
    gsap.fromTo(contentRef.current,
        { y: 0, opacity: 1 },
        { y: -10, opacity: 0, duration: 0.3, onComplete: () => {
            setIndex(nextIndex);
            gsap.to(contentRef.current, { y: 0, opacity: 1, duration: 0.4 });
        }}
    );

    // 2. Glow Update
    if(glowRef.current) {
        gsap.to(glowRef.current, { backgroundColor: slides[nextIndex].color, duration: 1 });
    }

    // 3. Slide Transition
    gsap.set(nextSlide, { xPercent: 100, zIndex: 20, visibility: 'visible' });
    gsap.set(currentSlide, { zIndex: 10 });

    const tl = gsap.timeline({ onComplete: () => setAnimating(false) });

    tl.to(nextSlide, { xPercent: 0, duration: 1, ease: "power3.inOut" })
      .to(currentSlide, { xPercent: -20, duration: 1, ease: "power3.inOut" }, "<")
      .fromTo(nextSlide?.querySelector("img"), { scale: 1.2 }, { scale: 1, duration: 1.2 }, "<");
  };

  const nextSlide = () => {
    if (animating) return;
    runAnimation((index + 1) % slides.length);
  };

  const prevSlide = () => {
    if (animating) return;
    runAnimation((index - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full min-h-[100dvh] lg:h-screen flex items-center bg-[#F8F9FA] overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* Main Container - Adjusted Padding for Mobile Navbar */}
      <div className="container mx-auto px-5 pt-28 pb-10 lg:py-0 lg:px-12 relative z-10 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-16">
        
        {/* --- BANNER AREA (Mobile: Top, Desktop: Right) --- */}
        <div className="w-full lg:w-7/12 order-1 lg:order-2 relative">
             {/* Dynamic Glow */}
             <div ref={glowRef} 
                  className="absolute -inset-4 lg:-inset-8 blur-[40px] lg:blur-[60px] opacity-40 rounded-[2rem] transition-colors duration-1000"
                  style={{ backgroundColor: slides[index].color }}>
             </div>

             {/* Card Container - Enforce Aspect Ratio */}
             <div className="relative w-full aspect-video lg:aspect-[16/9] rounded-xl lg:rounded-2xl shadow-xl overflow-hidden bg-white ring-1 ring-black/5">
                {slides.map((slide, i) => (
                    <div 
                        key={slide.id}
                        ref={(el) => { imageRefs.current[i] = el; }}
                        className="absolute inset-0 w-full h-full"
                        style={{ zIndex: i === 0 ? 10 : 0, visibility: i === 0 ? 'visible' : 'hidden' }}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover" // Ensures image covers the box without distortion
                            priority={i === 0}
                        />
                         {/* Mobile: Subtle darken to make white text pop if needed */}
                         <div className="absolute inset-0 bg-black/5 lg:bg-transparent"></div>
                    </div>
                ))}
                
                {/* Premium Glass Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-30"></div>
             </div>
        </div>


        {/* --- TEXT CONTENT (Mobile: Bottom, Desktop: Left) --- */}
        <div className="w-full lg:w-5/12 order-2 lg:order-1 flex flex-col justify-center text-left">
            <div ref={contentRef} className="will-change-opacity">
                
                {/* Tag */}
                <div className="flex items-center gap-3 mb-4 lg:mb-6">
                    <span className="h-[2px] w-8 lg:w-10 bg-black"></span>
                    <span className="text-xs lg:text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
                        {slides[index].category}
                    </span>
                </div>

                {/* Title - Optimized for Mobile */}
                <h1 className="text-4xl lg:text-7xl font-bold text-gray-900 leading-[1.1] lg:leading-[1.05] tracking-tight mb-4 lg:mb-6">
                    {slides[index].title}
                </h1>

                {/* Subtitle */}
                <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-8 lg:mb-10 max-w-md">
                    {slides[index].subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-full font-bold text-xs lg:text-sm tracking-widest uppercase hover:bg-gray-800 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                        Descubrir <FaArrowRight size={12} />
                    </button>
                    <button className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-black rounded-full font-bold text-xs lg:text-sm tracking-widest uppercase hover:border-black transition-all active:scale-95 flex items-center justify-center gap-2">
                        <FaPlay size={10} /> Ver Video
                    </button>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="mt-8 lg:mt-16 flex items-center justify-between lg:justify-start gap-4 lg:gap-6 w-full">
                
                {/* Arrows */}
                <div className="flex gap-3">
                    <button onClick={prevSlide} className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all active:scale-90">
                        <FaChevronLeft size={12} />
                    </button>
                    <button onClick={nextSlide} className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all active:scale-90">
                        <FaChevronRight size={12} />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="flex-1 lg:flex-none lg:w-32 h-[2px] bg-gray-200 relative rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-black transition-all duration-500 ease-out"
                         style={{ width: `${((index + 1) / slides.length) * 100}%` }}>
                    </div>
                </div>
                
                {/* Counter (Mobile only, helps balance) */}
                <span className="lg:hidden text-xs font-mono text-gray-400">
                    0{index + 1}/0{slides.length}
                </span>

            </div>
        </div>

      </div>
    </section>
  );
}