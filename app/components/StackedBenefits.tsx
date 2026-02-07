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
        accent: "text-[#00C853]", // Brand Green
        iconBg: "bg-[#00C853]/10",
        border: "border-[#00C853]/20",
        shadow: "shadow-emerald-900/5"
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
        iconBg: "bg-amber-500/10",
        border: "border-amber-500/20",
        shadow: "shadow-amber-900/5"
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
        iconBg: "bg-orange-500/10",
        border: "border-orange-500/20",
        shadow: "shadow-orange-900/5"
    }
  }
];

export default function ThemedStackingBenefits() {
  return (
    <section className="relative bg-white py-24 md:py-32 overflow-hidden">
      
      {/* 1. BRAND BACKGROUND: Technical Grid (Matches your screenshots) */}
      <div className="absolute inset-0 pointer-events-none" 
           style={{ 
               backgroundImage: 'linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)', 
               backgroundSize: '40px 40px',
               opacity: 0.4
           }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header - Clean & Corporate */}
        <div className="mb-20 md:mb-28 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00C853]"></span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                Por qué Mibanco
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
            Beneficios diseñados <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C853] to-emerald-700">
                para tu éxito.
            </span>
          </h2>
        </div>

        {/* STACKING CARDS */}
        <div className="flex flex-col items-center">
          {benefits.map((card, index) => (
            <div 
              key={card.id}
              // Sticky behavior creates the stack effect
              className="sticky top-32 w-full max-w-4xl mb-6 md:mb-12 last:mb-0"
              style={{ zIndex: index + 1 }}
            >
              <div className={`
                relative overflow-hidden
                p-8 md:p-12 
                rounded-[2rem] 
                ${card.theme.bg}
                border ${card.theme.border}
                ${card.theme.shadow} shadow-2xl
                flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12
                transition-all duration-500 hover:-translate-y-1
              `}>
                
                {/* Visual Accent Circle (Subtle Background) */}
                <div className={`absolute -right-20 -top-20 w-80 h-80 rounded-full opacity-[0.08] pointer-events-none ${card.theme.iconBg.replace('/10', '')}`}></div>

                {/* Left: Big Icon */}
                <div className="flex-shrink-0">
                    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${card.theme.iconBg} flex items-center justify-center text-4xl ${card.theme.accent}`}>
                        {card.icon}
                    </div>
                </div>

                {/* Right: Content */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold tracking-[0.2em] uppercase ${card.theme.accent}`}>
                            {card.subtitle}
                        </span>
                        <span className="text-4xl font-black text-gray-100 font-serif select-none">
                            {card.id}
                        </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        {card.title}
                    </h3>
                    
                    <p className="text-lg text-gray-500 leading-relaxed max-w-xl mb-8">
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