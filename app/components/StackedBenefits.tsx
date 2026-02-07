"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp, FaCheckCircle, FaStar, FaBolt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    title: "GUARDA",
    subtitle: "+51 952 678 500",
    desc: "El primer paso es tenernos en tus contactos. Es el número oficial de Mibanco. Sin trucos.",
    icon: <FaCheckCircle size={60} />,
    color: "bg-mibanco-green text-white"
  },
  {
    title: "ESCRIBE",
    subtitle: '"HOLA"',
    desc: "Inicia la conversación. Nuestro bot inteligente te guiará o te pasará con un asesor humano.",
    icon: <FaWhatsapp size={60} />,
    color: "bg-white text-gray-900 border-4 border-mibanco-green"
  },
  {
    title: "DISFRUTA",
    subtitle: "SIN LÍMITES",
    desc: "Consulta saldos, paga créditos y más. Todo desde la app que usas todos los días.",
    icon: <FaStar size={60} />,
    color: "bg-mibanco-gold text-mibanco-green"
  }
];

export default function StackedBenefits() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, index) => {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    pin: true,
                    pinSpacing: false,
                    endTrigger: containerRef.current,
                    end: "bottom bottom",
                    // markers: true, 
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

  return (
    <section ref={containerRef} className="bg-gray-50 py-24 min-h-[300vh] relative">
      <div className="container mx-auto px-4 sticky top-10 mb-24 z-0 text-center">
            <h2 className="text-5xl md:text-8xl font-black text-gray-900 mb-6">
                EMPIEZA YA
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Tu banco en tu bolsillo en 3 simples pasos.
            </p>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 pb-24">
        {works.map((work, index) => (
            <div 
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`h-screen flex items-center justify-center sticky top-0`}
                style={{ zIndex: index + 1 }}
            >
                 <div className={`w-full max-w-2xl aspect-[4/3] rounded-[3rem] shadow-2xl p-12 flex flex-col justify-between transform transition-transform duration-500 hover:scale-[1.02] ${work.color}`}>
                    <div className="flex justify-between items-start">
                        <span className="text-8xl font-black opacity-20 transform -translate-x-4 -translate-y-4">0{index + 1}</span>
                        <div className="p-4 bg-white/20 rounded-full backdrop-blur-md">
                            {work.icon}
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-6xl md:text-8xl font-black leading-none mb-2">{work.title}</h3>
                        <h4 className="text-2xl md:text-4xl font-bold uppercase tracking-wider mb-8 opacity-80">{work.subtitle}</h4>
                        <p className="text-xl md:text-2xl leading-relaxed opacity-90 font-medium">
                            {work.desc}
                        </p>
                    </div>
                 </div>
            </div>
        ))}
      </div>
    </section>
  );
}
