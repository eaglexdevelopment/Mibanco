"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp, FaCheckCircle, FaStar, FaBolt, FaShieldAlt, FaChartLine, FaMobileAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    title: "SEGURIDAD TOTAL",
    description: "Tu dinero protegido con la mejor tecnología biométrica y respaldo financiero.",
    icon: <FaShieldAlt />,
    color: "bg-gradient-to-br from-mibanco-green to-green-700"
  },
  {
    title: "CRECIMIENTO REAL",
    description: "Tasas preferenciales que hacen que tu ahorro crezca de verdad, sin letras chicas.",
    icon: <FaChartLine />,
    color: "bg-gradient-to-br from-mibanco-gold to-yellow-600"
  },
  {
    title: "TODO DIGITAL",
    description: "Olvídate de las colas. Haz todas tus operaciones desde nuestra app móvil.",
    icon: <FaMobileAlt />,
    color: "bg-gradient-to-br from-mibanco-orange to-red-600"
  }
];

export default function StackedBenefits() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Only apply pinning on desktop to avoid mobile jank
            if (window.innerWidth > 768) {
                cardsRef.current.forEach((card, index) => {
                    ScrollTrigger.create({
                        trigger: card,
                        start: "top center", // Adjusted start point
                        endTrigger: containerRef.current,
                        end: "bottom bottom",
                        pin: true,
                        pinSpacing: false,
                        scrub: 1
                    });
                });
            }
        }, containerRef);
        return () => ctx.revert();
    }, []);

  return (
    <section ref={containerRef} className="py-24 bg-gray-50 relative min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-16 tracking-tighter text-gray-900">
            Beneficios Exclusivos
        </h2>
        
        <div className="flex flex-col gap-8 md:block md:relative md:h-[150vh] pb-24">
            {benefits.map((benefit, index) => (
                <div 
                    key={index}
                    ref={(el) => { cardsRef.current[index] = el; }} 
                    className="sticky top-32 w-full md:max-w-4xl mx-auto mb-8 md:mb-0"
                    style={{ zIndex: index + 1 }}
                >
                    <div className={`p-8 md:p-12 rounded-3xl shadow-2xl ${benefit.color} text-white transform transition-transform duration-500 border border-white/20 backdrop-blur-sm`}>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-center md:text-left">
                                <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-widest mb-4">
                                    0{index + 1} • Ventaja
                                </span>
                                <h3 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                                    {benefit.title}
                                </h3>
                                <p className="text-lg md:text-xl font-medium opacity-90 max-w-lg mx-auto md:mx-0">
                                    {benefit.description}
                                </p>
                            </div>
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-full flex items-center justify-center text-5xl md:text-6xl backdrop-blur-md shadow-inner">
                                {benefit.icon}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
