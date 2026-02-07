"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { FaWhatsapp, FaCheck, FaSortDown } from "react-icons/fa";

const tabs = [
  { id: "benefits", label: "Beneficios de Mibanco por WhatsApp", color: "bg-mibanco-green" },
  { id: "what", label: "¿Qué puedes hacer?", color: "bg-mibanco-gold", textColor: "text-mibanco-green" }, // Gold bg usually needs dark text
  { id: "how", label: "¿Cómo empezar?", color: "bg-mibanco-green" },
];

const content = {
  benefits: {
    title: "Mibanco Benefits via WhatsApp",
    subtitle: "La misma confianza de siempre, ahora en WhatsApp.",
    items: [
      { highlight: "Mibanco Support", text: "Atención rápida y personalizada." },
      { highlight: "Seguro", text: "Usamos solo nuestros números oficiales y verificados (+51 952 678 500)." },
      { highlight: "Rápido y simple", text: "Sin colas, sin viajes, todo desde tu celular." },
      { highlight: "Cercano", text: "Estamos contigo en el canal donde ya hablas con tus amigos y familia." },
    ]
  },
  what: {
    title: "What can you do?",
    subtitle: "Abre la cuenta de ahorros que más te convenga.",
    items: [
      { highlight: "Consultas", text: "Revisa los saldos de tus cuentas Mibanco." },
      { highlight: "Soporte 24/7", text: "Resuelve tus dudas en cualquier momento." },
      { highlight: "Negocios", text: "Consultoría especializada para tu emprendimiento." },
    ]
  },
  how: {
    title: "How to get started?",
    subtitle: "Es muy fácil, solo sigue estos 3 pasos:",
    items: [
      { highlight: "Guarda", text: "Agrega nuestro número +51 952 678 500 a tus contactos." },
      { highlight: "Escribe", text: 'Inicia la conversación con un "Hola" en WhatsApp.' },
      { highlight: "Empieza", text: "Disfruta de Mibanco desde tu chat de confianza." },
    ]
  }
};

export default function WhatsAppExperience() {
  const [activeTab, setActiveTab] = useState<"benefits" | "what" | "how">("benefits");
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tabId: "benefits" | "what" | "how") => {
    if (tabId === activeTab) return;

    // Out animation
    gsap.to(textRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            setActiveTab(tabId);
            // In animation
            gsap.fromTo(textRef.current,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.2)" }
            );
        }
    });
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as any)}
              className={`relative px-8 py-4 rounded-t-2xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-md
                ${activeTab === tab.id 
                    ? `scale-110 z-10 ${tab.color} ${tab.textColor || 'text-white'}` 
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }
              `}
            >
              {tab.label}
              {activeTab === tab.id && (
                  <div className={`absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 ${tab.color}`}></div>
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div ref={contentRef} className="max-w-4xl mx-auto">
            <div ref={textRef} className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-100 relative">
                {/* Decorative Blob */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-mibanco-gold/20 rounded-bl-[100%] rounded-tr-[2rem]"></div>
                
                <h2 className={`text-4xl md:text-5xl font-black mb-4 ${activeTab === 'what' ? 'text-mibanco-gold' : 'text-mibanco-orange'}`}>
                    {content[activeTab].title}
                </h2>
                
                <p className="text-xl text-gray-600 mb-10 font-medium">
                    {content[activeTab].subtitle}
                </p>

                <div className="space-y-6">
                    {content[activeTab].items.map((item, index) => (
                        <div key={index} className="flex items-start gap-4 group">
                            <span className={`mt-1 flex-shrink-0 text-xl transform group-hover:scale-125 transition-transform ${activeTab === 'what' ? 'text-mibanco-gold' : 'text-mibanco-gold'}`}>
                                ▶
                            </span>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                <span className="font-bold text-gray-900">{item.highlight}:</span> {item.text}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center md:text-left">
                     <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all hover:shadow-green-500/30 flex items-center gap-3 mx-auto md:mx-0">
                        <FaWhatsapp size={24} />
                        <span>Chatea ahora</span>
                     </button>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
}
