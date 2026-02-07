"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaMoneyBillWave, FaPiggyBank, FaShieldAlt, FaLaptop } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <FaMoneyBillWave size={80} />,
    title: "PRÉSTAMOS",
    subtitle: "PARA EMPRENDEDORES",
    desc: "Impulso real para negocios reales.",
    bg: "bg-mibanco-green",
    text: "text-white"
  },
  {
    icon: <FaPiggyBank size={80} />,
    title: "AHORROS",
    subtitle: "ALTO RENDIMIENTO",
    desc: "Tu dinero crece mientras duermes.",
    bg: "bg-mibanco-gold",
    text: "text-mibanco-green"
  },
  {
    icon: <FaShieldAlt size={80} />,
    title: "SEGUROS",
    subtitle: "TRANQUILIDAD TOTAL",
    desc: "Protege a tu familia y tu inversión.",
    bg: "bg-white",
    text: "text-gray-900"
  },
  {
    icon: <FaLaptop size={80} />,
    title: "DIGITAL",
    subtitle: "SIN DISCULPAS",
    desc: "El banco en tu bolsillo, 24/7.",
    bg: "bg-gray-900",
    text: "text-white"
  },
];

export default function HorizontalServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pin = gsap.fromTo(
        sectionRef.current,
        {
          translateX: 0,
        },
        {
          translateX: "-300vw",
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "2000 top",
            scrub: 0.6,
            pin: true,
          },
        }
      );
      return () => {
          pin.kill();
      };
    }, triggerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="overflow-hidden bg-gray-100">
      <div ref={sectionRef} className="flex flex-row w-[400vw] h-screen">
        {services.map((service, index) => (
          <div
            key={index}
            className={`w-screen h-screen flex flex-col justify-center items-center relative ${service.bg} ${service.text} p-8 md:p-24 border-r border-white/10`}
          >
            <div className="absolute top-24 left-12 opacity-20 text-9xl font-black">{index + 1}.</div>
            
            <div className="max-w-4xl w-full">
                <div className="mb-12 opacity-80">{service.icon}</div>
                <h2 className="text-6xl md:text-9xl font-black mb-4 tracking-tighter leading-none">{service.title}</h2>
                <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-widest mb-8 opacity-80 border-b-4 border-current pb-4 inline-block">{service.subtitle}</h3>
                <p className="text-xl md:text-3xl max-w-2xl font-light">{service.desc}</p>
                
                <button className="mt-12 px-8 py-4 rounded-full border-2 border-current hover:bg-white hover:text-black transition-colors font-bold uppercase tracking-wider">
                    Descubrir Más
                </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
