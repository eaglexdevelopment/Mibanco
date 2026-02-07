"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const campaigns = [
  {
    image: "/Banner1.webp",
    title: "Campaña Escolar",
    type: "PRÉSTAMO",
    desc: "Prepara tu negocio para la temporada escolar 2026."
  },
  {
    image: "/banner2.webp",
    title: "Súper Tasa",
    type: "AHORRO",
    desc: "Incrementa tus ahorros con una tasa preferencial."
  },
  {
    image: "/Banner3.webp",
    title: "Capital de Trabajo",
    type: "CRÉDITO",
    desc: "El impulso que necesitas para crecer sin límites."
  }
];

export default function BannerShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.fromTo(cardsRef.current,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-white relative overflow-hidden">
        {/* Background Text */}
        <div className="absolute top-10 left-0 w-full text-center pointer-events-none opacity-[0.03]">
            <span className="text-[20vw] font-black leading-none tracking-tighter">CAMPAIGNS</span>
        </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-end mb-16">
            <div>
                <h2 className="text-5xl font-black mb-4">Campañas Destacadas</h2>
                <p className="text-xl text-gray-500">Descubre las oportunidades vigentes.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 font-bold uppercase tracking-widest border-b-2 border-black pb-2 hover:text-mibanco-green hover:border-mibanco-green transition-colors">
                Ver Todas <FaArrowRight />
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {campaigns.map((camp, index) => (
                <div 
                    key={index}
                    ref={(el) => { cardsRef.current[index] = el; }}
                    className="group relative h-[600px] overflow-hidden rounded-[2rem] cursor-pointer"
                >
                    <Image
                        src={camp.image}
                        alt={camp.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="text-xs font-bold bg-white text-black px-3 py-1 rounded-full mb-4 inline-block tracking-widest">{camp.type}</span>
                        <h3 className="text-3xl font-bold text-white mb-2 leading-tight">{camp.title}</h3>
                        <p className="text-white/80 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed">
                            {camp.desc}
                        </p>
                        <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                            <FaArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
