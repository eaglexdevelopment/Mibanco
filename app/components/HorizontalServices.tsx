"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FaMoneyBillWave, FaPiggyBank, FaShieldAlt, FaLaptop } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <FaMoneyBillWave size={80} />,
    title: "PRÉSTAMOS",
    subtitle: "PARA EMPRENDEDORES",
    desc: "Impulso real para negocios reales.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80",
    overlay: "bg-black/30"
  },
  {
    icon: <FaPiggyBank size={80} />,
    title: "AHORROS",
    subtitle: "ALTO RENDIMIENTO",
    desc: "Tu dinero crece mientras duermes.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80",
    overlay: "bg-black/30"
  },
  {
    icon: <FaShieldAlt size={80} />,
    title: "SEGUROS",
    subtitle: "TRANQUILIDAD TOTAL",
    desc: "Protege a tu familia y tu inversión.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
    overlay: "bg-black/30"
  },
  {
    icon: <FaLaptop size={80} />,
    title: "DIGITAL",
    subtitle: "SIN DISCULPAS",
    desc: "El banco en tu bolsillo, 24/7.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80",
    overlay: "bg-black/30"
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
    <section ref={triggerRef} className="overflow-hidden bg-gray-900">
      <div ref={sectionRef} className="flex flex-row w-[400vw] h-screen">
        {services.map((service, index) => (
          <div
            key={index}
            className="w-screen h-screen flex flex-col justify-center items-center relative p-8 md:p-24 border-r border-white/10 group overflow-hidden"
          >
            {/* Background Image with Parallax Effect on Hover */}
            <div className="absolute inset-0 z-0 transform group-hover:scale-110 transition-transform duration-[2s] ease-out">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                />
            </div>
            
            {/* Overlay */}
            <div className={`absolute inset-0 z-10 ${service.overlay} backdrop-blur-sm transition-opacity duration-500 group-hover:backdrop-blur-none group-hover:opacity-90`}></div>

            <div className="absolute top-24 left-12 z-20 opacity-20 text-white text-9xl font-black">{index + 1}.</div>
            
            <div className="max-w-4xl w-full relative z-20 text-white mix-blend-screen bg-black/30 p-12 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:bg-black/50">
                <div className="mb-12 opacity-80">{service.icon}</div>
                <h2 className="text-6xl md:text-9xl font-black mb-4 tracking-tighter leading-none">{service.title}</h2>
                <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-widest mb-8 opacity-80 border-b-4 border-current pb-4 inline-block">{service.subtitle}</h3>
                <p className="text-xl md:text-3xl max-w-2xl font-light">{service.desc}</p>
                
                <button className="mt-12 px-8 py-4 rounded-full border-2 border-white hover:bg-white hover:text-black transition-colors font-bold uppercase tracking-wider">
                    Descubrir Más
                </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
