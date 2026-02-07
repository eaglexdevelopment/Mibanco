"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    image: "/Banner1.webp",
    category: "EMPRENDEDORES",
    title: "IMPULSA TU NEGOCIO",
    subtitle: "¿Necesitas capital? Tenemos la solución perfecta y rápida.",
    color: "bg-mibanco-green",
    textColor: "text-mibanco-green"
  },
  {
    id: 2,
    image: "/banner2.webp",
    category: "AHORROS",
    title: "HAZ CRECER TU DINERO",
    subtitle: "Asegura tu futuro con las mejores tasas del mercado.",
    color: "bg-mibanco-gold",
    textColor: "text-yellow-600"
  },
  {
    id: 3,
    image: "/Banner3.webp",
    category: "DIGITAL",
    title: "ILIMITADO & MÓVIL",
    subtitle: "El control total de tus finanzas en la palma de tu mano.",
    color: "bg-mibanco-orange",
    textColor: "text-mibanco-orange"
  },
  {
    id: 4,
    image: "/Banner4.webp",
    category: "SEGUROS",
    title: "PROTECCIÓN 360°",
    subtitle: "Tranquilidad garantizada para ti y tu familia.",
    color: "bg-blue-600",
    textColor: "text-blue-600"
  }
];

export default function CinematicHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const textContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
        nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    if (isAnimating) return;
    const nextIndex = (currentIndex + 1) % slides.length;
    animateSlide(nextIndex);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    const nextIndex = (currentIndex - 1 + slides.length) % slides.length;
    animateSlide(nextIndex);
  };

  const animateSlide = (index: number) => {
    setIsAnimating(true);
    
    // 1. Image Card Transition (Stack Effect)
    const currentImg = imageRefs.current[currentIndex];
    const nextImg = imageRefs.current[index];
    
    // Prepare next image (off-screen or scaled down)
    gsap.set(nextImg, { 
        xPercent: 100, 
        scale: 0.8, 
        opacity: 0, 
        zIndex: 20 
    });
    
    gsap.set(currentImg, { zIndex: 10 });

    const tl = gsap.timeline({
        onComplete: () => {
            setCurrentIndex(index);
            setIsAnimating(false);
        }
    });

    // Animate Card In
    tl.to(nextImg, { 
        xPercent: 0, 
        scale: 1, 
        opacity: 1, 
        duration: 1, 
        ease: "power3.out" 
    });

    // Animate Current Card Out (Scale down and fade)
    tl.to(currentImg, { 
        xPercent: -20, 
        scale: 0.9, 
        opacity: 0, 
        duration: 0.8, 
        ease: "power2.inOut" 
    }, 0);

    // 2. Text Transition
    tl.to([titleRef.current, subtitleRef.current], { 
        y: -30, 
        opacity: 0, 
        duration: 0.4, 
        stagger: 0.05,
        ease: "power2.in" 
    }, 0);

    tl.call(() => {
        // State update happens midway to change text content before fading in
        // In React, this might cause flicker if we rely purely on state.
        // Better to have separate refs for text but for simplicity in this prompt,
        // we'll rely on the fast fade.
        setCurrentIndex(index); 
    }, undefined, 0.4);

    tl.fromTo([titleRef.current, subtitleRef.current], 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }, 
        0.5
    );

    // 3. Background Color Pulse
    // We can animate the background color of the whole section smoothly
    gsap.to(bgRef.current, {
        backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#ffffff", // Subtle shift to keep it alive
        duration: 1
    });
  };

  const currentSlide = slides[currentIndex];

  return (
    <section ref={bgRef} className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden bg-gray-50 pt-24 md:pt-0">
      
      {/* LEFT: Consistent Typography */}
      <div className="w-full md:w-1/2 px-6 md:px-12 lg:px-24 flex flex-col justify-center z-20 mb-12 md:mb-0">
            <div ref={textContainerRef}>
                {/* Dynamic Category Badge */}
                <div className="mb-6 inline-block overflow-hidden">
                    <span className={`text-xs font-bold tracking-[0.2em] uppercase px-3 py-1 rounded border border-current ${currentSlide.textColor} bg-opacity-10`}>
                        {currentSlide.category}
                    </span>
                </div>

                {/* Massive Title */}
                <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tighter text-gray-900">
                    {currentSlide.title}
                </h1>

                {/* Readable Subtitle */}
                <p ref={subtitleRef} className="text-lg md:text-2xl font-light text-gray-600 mb-10 max-w-lg leading-relaxed">
                    {currentSlide.subtitle}
                </p>

                {/* Buttons */}
                <div className="flex gap-6">
                    <button className="px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 transform">
                        Descubrir
                    </button>
                    <button className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                        <FaArrowRight className="-rotate-45 group-hover:rotate-0" />
                    </button>
                </div>
            </div>
      </div>

      {/* RIGHT: High-End 3D Card Stack */}
      <div className="w-full md:w-1/2 md:h-screen relative flex items-center justify-center p-8 md:p-0">
         {/* Background Glow */}
         <div className={`absolute w-[80%] h-[80%] rounded-full opacity-30 blur-[120px] transition-colors duration-1000 ${currentSlide.color}`}></div>

         {/* Stacking Cards Container */}
         <div className="relative w-full max-w-[650px] aspect-[16/10] z-10 perspective-[1200px]">
             {slides.map((slide, index) => {
                 // Determine position relative to current
                 let offset = index - currentIndex;
                 if (offset < 0) offset += slides.length; // Loop logic for visual stack if needed, 
                 // but for simple stack: 
                 const isCurrent = index === currentIndex;
                 const isNext = index === (currentIndex + 1) % slides.length;
                 const isNextNext = index === (currentIndex + 2) % slides.length;
                 
                 // We only render Current and Next visually for the stack effect
                 // Actually, let's keep it simple: Current is Front, Next is Back Right
                 
                 return (
                    <div
                        key={slide.id}
                        ref={(el) => { imageRefs.current[index] = el; }}
                        className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl origin-bottom-right transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                        style={{ 
                            zIndex: isCurrent ? 20 : isNext ? 10 : 0,
                            opacity: isCurrent ? 1 : isNext ? 0.6 : 0,
                            transform: isCurrent 
                                ? 'translateX(0) scale(1) rotate(0deg)' 
                                : isNext 
                                    ? 'translateX(40px) scale(0.9) rotate(5deg)' 
                                    : 'translateX(100px) scale(0.8) opacity(0)',
                            filter: isCurrent ? 'none' : 'grayscale(100%) blur(1px)'
                        }}
                    >
                        <div className="relative w-full h-full"> 
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                            {/* Inner Shadow / Glare */}
                            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.2)]"></div>
                        </div>
                    </div>
                 );
             })}

            {/* Premium Navigation Controls */}
            <div className="absolute -bottom-24 right-0 md:left-0 flex items-center gap-6 z-30">
                {/* Custom Progress Button */}
                <button onClick={nextSlide} className="group relative w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-xl transition-transform hover:scale-105 active:scale-95">
                     <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                        <circle cx="32" cy="32" r="30" stroke="#f3f4f6" strokeWidth="2" fill="none" />
                        <circle 
                            ref={(el) => { if(el) gsap.to(el, { strokeDashoffset: 0, duration: 6, ease: "linear", repeat: -1 }); }}
                            cx="32" cy="32" r="30" 
                            stroke="#000" strokeWidth="2" fill="none" 
                            strokeDasharray="188" strokeDashoffset="188" 
                            className="transition-all"
                        />
                     </svg>
                     <FaArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
                </button>
                
                {/* Simple Prev/Next Text */}
                <div className="flex gap-4">
                    <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-gray-200 bg-white hover:bg-black hover:text-white flex items-center justify-center transition-colors">
                        <FaChevronLeft size={14} />
                    </button>
                     <span className="text-xs font-bold tracking-widest text-gray-400 self-center">
                        0{currentIndex + 1} / 0{slides.length}
                    </span>
                </div>
            </div>
         </div>
      </div>

    </section>
  );
}
