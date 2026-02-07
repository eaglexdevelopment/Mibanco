"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const campaigns = [
  {
    id: 1,
    image: "/Banner1.webp",
    category: "Campaña Escolar",
    title: "Impulsa tu Negocio",
    desc: "Capital estratégico para la temporada 2026."
  },
  {
    id: 2,
    image: "/banner2.webp",
    category: "Ahorro Plus",
    title: "Súper Tasa 8.5%",
    desc: "Rentabilidad superior para tu futuro."
  },
  {
    id: 3,
    image: "/Banner3.webp",
    category: "Crédito Negocio",
    title: "Capital de Trabajo",
    desc: "Expansión sin límites para emprendedores."
  }
];

export default function PremiumShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Animation
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

      // 2. Subtle Parallax (Adjusted for landscape images)
      // We use a smaller scale (1.1) so we don't crop the banner text too much
      cardsRef.current.forEach((card, i) => {
        if (imagesRef.current[i]) {
          gsap.fromTo(imagesRef.current[i], 
            { scale: 1.1, yPercent: -5 }, 
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-28 bg-[#F8F9FA] text-gray-900 overflow-hidden relative">
      
      {/* Decorative Background Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-3 block">
              Nuestras Campañas
            </span>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight text-gray-900">
              Oportunidades <span className="font-serif italic text-gray-500">Vigentes</span>
            </h2>
          </div>
          
          <button className="hidden md:flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-full hover:border-black hover:shadow-lg transition-all duration-300 group">
            <span className="font-bold text-xs tracking-widest uppercase">Ver Todas</span>
            <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Cards Grid - Now Rectangular (16:9) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {campaigns.map((item, index) => (
            <div 
              key={item.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              // CHANGED: aspect-[16/9] fixes the "rectangle" issue
              className="group relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 bg-gray-100"
            >
              {/* Image Wrapper for Parallax */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  ref={(el) => { imagesRef.current[index] = el; }}
                  src={item.image}
                  alt={item.title}
                  fill
                  // object-cover is safe now because container matches image ratio
                  className="object-cover will-change-transform" 
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                {/* Gradient Overlay - Only darkens bottom for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              </div>

              {/* Content Card */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                
                {/* Category Tag */}
                <div className="mb-2 opacity-100 transform translate-y-0 transition-transform duration-500">
                   <span className="inline-block px-2 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-[10px] font-bold tracking-widest text-white uppercase">
                      {item.category}
                   </span>
                </div>

                {/* Title & Desc */}
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 leading-tight">
                    {item.title}
                  </h3>
                  
                  {/* Expandable Description */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                    <div className="overflow-hidden">
                      <p className="text-gray-300 text-sm font-light mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Corner Arrow Icon */}
                <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                   <FaArrowRight size={10} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}