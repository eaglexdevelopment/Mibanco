"use client";

import { FaShieldAlt, FaChartLine, FaMobileAlt, FaArrowRight } from "react-icons/fa";

const benefits = [
  {
    id: "01",
    title: "Seguridad Total",
    subtitle: "Biometría Avanzada",
    description: "Tu dinero protegido con la mejor tecnología biométrica y respaldo financiero sólido.",
    icon: <FaShieldAlt />,
    // Mibanco Green Theme
    theme: {
        bg: "bg-white",
        accent: "text-mibanco-green", // Ensure this color exists in your tailwind config or use #00C853
        iconBg: "bg-green-50",
        border: "border-green-100",
        shadow: "shadow-lg shadow-green-900/5"
    }
  },
  {
    id: "02",
    title: "Crecimiento Real",
    subtitle: "Tasa Preferencial",
    description: "Tasas que hacen crecer tu ahorro de verdad. Sin letras chicas, solo rentabilidad.",
    icon: <FaChartLine />,
    // Brand Gold/Yellow Theme
    theme: {
        bg: "bg-white",
        accent: "text-amber-500",
        iconBg: "bg-amber-50",
        border: "border-amber-100",
        shadow: "shadow-lg shadow-amber-900/5"
    }
  },
  {
    id: "03",
    title: "100% Digital",
    subtitle: "Cero Filas",
    description: "Olvídate de las agencias. Realiza todas tus operaciones desde nuestra App Móvil.",
    icon: <FaMobileAlt />,
    // Brand Orange Theme
    theme: {
        bg: "bg-white",
        accent: "text-orange-500",
        iconBg: "bg-orange-50",
        border: "border-orange-100",
        shadow: "shadow-lg shadow-orange-900/5"
    }
  }
];

export default function ThemedStackingBenefits() {
  return (
    // FIX 1: Removed 'overflow-hidden' from here. This enables sticky behavior.
    <section className="relative bg-[#FAFAFA] py-24 md:py-32">
      
      {/* Background Grid - Applied securely to not interfere with scroll */}
      <div className="absolute inset-0 pointer-events-none z-0" 
           style={{ 
               backgroundImage: 'linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)', 
               backgroundSize: '40px 40px',
               opacity: 0.6
           }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#00C853]"></span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                Por qué elegirnos
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.1]">
            Beneficios diseñados <br/>
            <span className="text-[#00C853]">
                para tu éxito.
            </span>
          </h2>
        </div>

        {/* STACKING CARDS CONTAINER */}
        <div className="flex flex-col items-center w-full">
          {benefits.map((card, index) => (
            <div 
              key={card.id}
              // FIX 2: Sticky needs a top value. 'top-32' (128px) usually clears the navbar.
              // We add a huge bottom margin to the first cards so the scrolling has space to happen.
              className="sticky top-32 w-full max-w-4xl mb-24 last:mb-0"
              style={{ zIndex: index + 1 }}
            >
              <div className={`
                relative overflow-hidden
                p-8 md:p-12 
                rounded-[2.5rem] 
                ${card.theme.bg}
                border ${card.theme.border}
                ${card.theme.shadow}
                flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12
                transition-all duration-300
              `}>
                
                {/* Decorative Number Background */}
                <span className="absolute -right-4 -bottom-12 text-[10rem] font-bold text-gray-50 opacity-50 pointer-events-none select-none font-serif">
                    {card.id}
                </span>

                {/* Left: Icon Box */}
                <div className="flex-shrink-0 z-10">
                    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${card.theme.iconBg} flex items-center justify-center text-4xl ${card.theme.accent}`}>
                        {card.icon}
                    </div>
                </div>

                {/* Right: Content */}
                <div className="flex-1 z-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`h-[2px] w-6 ${card.theme.iconBg.replace('bg-', 'bg-')}`}></div>
                        <span className={`text-xs font-bold tracking-[0.2em] uppercase ${card.theme.accent}`}>
                            {card.subtitle}
                        </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        {card.title}
                    </h3>
                    
                    <p className="text-lg text-gray-500 leading-relaxed max-w-xl mb-8 font-light">
                        {card.description}
                    </p>

                    <button className="group flex items-center gap-3 text-gray-900 text-sm font-bold tracking-widest uppercase hover:text-[#00C853] transition-colors">
                        Descubrir
                        <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#00C853] group-hover:border-[#00C853] group-hover:text-white transition-all">
                             <FaArrowRight size={10} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                        </div>
                    </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}