"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaMoneyBillWave, FaPiggyBank, FaShieldAlt, FaLaptop } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <FaMoneyBillWave size={40} />,
    title: "Préstamos",
    description: "Impulsa tu negocio con nuestros créditos a tu medida.",
    color: "text-mibanco-green",
    bg: "group-hover:bg-mibanco-green",
    border: "border-mibanco-green",
    shadow: "shadow-green-200",
  },
  {
    icon: <FaPiggyBank size={40} />,
    title: "Ahorros",
    description: "Haz crecer tu dinero con nuestras tasas competitivas.",
    color: "text-mibanco-gold",
    bg: "group-hover:bg-mibanco-gold",
    border: "border-mibanco-gold",
    shadow: "shadow-yellow-200",
  },
  {
    icon: <FaShieldAlt size={40} />,
    title: "Seguros",
    description: "Protege lo que más quieres con nuestros seguros especializados.",
    color: "text-mibanco-orange",
    bg: "group-hover:bg-mibanco-orange",
    border: "border-mibanco-orange",
    shadow: "shadow-orange-200",
  },
  {
    icon: <FaLaptop size={40} />,
    title: "Canales Digitales",
    description: "Realiza tus operaciones desde donde estés, fácil y seguro.",
    color: "text-blue-600",
    bg: "group-hover:bg-blue-600",
    border: "border-blue-600",
    shadow: "shadow-blue-200",
  },
];

export default function ServiceGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Entrance Animation
        gsap.fromTo(cardsRef.current,
            { y: 100, opacity: 0, rotateX: -15 },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                }
            }
        );

        // 3D Tilt Effect on Hover
        cardsRef.current.forEach((card) => {
            if (!card) return;
            
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
                const rotateY = ((x - centerX) / centerX) * 10;

                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    scale: 1.05,
                    duration: 0.4,
                    ease: "power2.out",
                    transformPerspective: 1000
                });
            });

            card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.5)"
                });
            });
        });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-mibanco-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-mibanco-green/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="text-mibanco-green font-bold tracking-wider uppercase text-sm mb-2 block">Nuestros Servicios</span>
          <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Todo lo que necesitas <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mibanco-green to-mibanco-gold">para crecer</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
            Soluciones financieras diseñadas para impulsar el éxito de tu emprendimiento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`group relative p-10 rounded-3xl bg-white transition-all duration-300 border border-gray-100 flex flex-col items-center text-center cursor-pointer overflow-hidden ${service.shadow} shadow-xl hover:shadow-2xl`}
            >
              {/* Background fill animation */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-current ${service.color}`}></div>
              
              <div className={`relative mb-8 p-5 rounded-2xl bg-gray-50 group-hover:text-white transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 shadow-sm ${service.color} ${service.bg}`}>
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-mibanco-green transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
                {service.description}
              </p>

              <div className="mt-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <span className={`text-sm font-bold uppercase tracking-wide border-b-2 border-current pb-1 ${service.color}`}>Ver más</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
