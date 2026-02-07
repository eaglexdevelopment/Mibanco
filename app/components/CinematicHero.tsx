"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { FaArrowRight, FaWhatsapp, FaPlay } from "react-icons/fa";

const slides = [
  {
    image: "/Banner1.webp",
    title: "IMPULSA TU NEGOCIO",
    subtitle: "¿Necesitas capital? Tenemos la solución perfecta.",
    cta: "Solicitar ahora",
    color: "from-mibanco-green"
  },
  {
    image: "/banner2.webp",
    title: "AHORRA CON GARRA",
    subtitle: "Haz crecer tu dinero con las mejores tasas.",
    cta: "Empieza hoy",
    color: "from-mibanco-gold"
  },
  {
    image: "/Banner3.webp",
    title: "MÁS QUE UN BANCO",
    subtitle: "Somos tu socio estratégico en cada paso.",
    cta: "Conoce más",
    color: "from-mibanco-green"
  },
   {
    image: "/Banner4.webp",
    title: "PROTECCIÓN TOTAL",
    subtitle: "Seguros diseñados para tu tranquilidad.",
    cta: "Ver seguros",
    color: "from-mibanco-orange"
  }
];

export default function CinematicHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
    //   nextSlide();
    }, 6000); // Auto-play disabled for dev, usually enabled
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    
    const direction = index > currentIndex ? 1 : -1;
    const nextImage = imageRefs.current[index];
    const currentImage = imageRefs.current[currentIndex];
    const nextText = textRefs.current[index];
    const currentText = textRefs.current[currentIndex];

    if (!nextImage || !currentImage || !nextText || !currentText) return;

    const tl = gsap.timeline();

    // Image Transition (Parallax Slide)
    tl.set(nextImage, { xPercent: 100 * direction, zIndex: 10 })
      .set(nextText, { yPercent: 50, opacity: 0, zIndex: 10 })
      .to(currentImage, { xPercent: -50 * direction, duration: 1.2, ease: "power3.inOut" }, 0)
      .to(nextImage, { xPercent: 0, duration: 1.2, ease: "power3.inOut" }, 0)
      .to(currentText, { yPercent: -50, opacity: 0, duration: 0.8 }, 0)
      .to(nextText, { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.4);

    setCurrentIndex(index);
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Slides Container */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            ref={(el) => { imageRefs.current[index] = el; }}
            className={`absolute inset-0 w-full h-full ${index === 0 ? 'z-10' : 'z-0'}`}
            style={{ transform: index === 0 ? 'none' : 'translateX(100%)' }}
          >
            <div className="relative w-full h-full">
                <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover transition-transform duration-[10s] hover:scale-110 ease-linear"
                priority={index === 0}
                />
                
                {/* Advanced Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r ${slide.color}/90 via-black/40 to-transparent mix-blend-multiply`}></div>
                <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Text Container */}
      <div className="absolute inset-0 container mx-auto px-4 z-20 flex flex-col justify-center pointer-events-none">
        {slides.map((slide, index) => (
            <div 
                key={index}
                ref={(el) => { textRefs.current[index] = el; }}
                className={`absolute w-full max-w-4xl opacity-0 pointer-events-auto pl-4 md:pl-0`}
                style={{ opacity: index === 0 ? 1 : 0 }}
            >
                <div className="overflow-hidden mb-4">
                    <h2 className="text-sm md:text-lg font-bold tracking-[0.3em] uppercase text-white/80 border-l-4 border-white pl-4 mb-2 animate-pulse">
                        Mibanco • {index + 1}/4
                    </h2>
                </div>
                
                <h1 className="text-5xl md:text-8xl font-black leading-tight mb-6 drop-shadow-2xl">
                    {slide.title}
                </h1>
                
                <p className="text-xl md:text-3xl mb-10 max-w-2xl font-light text-white/90 drop-shadow-lg leading-relaxed">
                    {slide.subtitle}
                </p>
                
                <div className="flex gap-6">
                    <button className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest overflow-hidden transform hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-white/20">
                        <span className="relative z-10 flex items-center gap-3">
                            {slide.cta} <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-mibanco-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
                    </button>
                    
                    <button className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300 group">
                        <FaPlay size={14} className="ml-1 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-12 right-12 z-30 flex gap-4">
        {slides.map((_, index) => (
            <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    currentIndex === index ? 'bg-white w-12' : 'bg-white/30 hover:bg-white/60'
                }`}
            />
        ))}
      </div>
    </section>
  );
}
