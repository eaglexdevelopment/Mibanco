"use client";

import { FaCcVisa, FaCcMastercard, FaBuilding, FaMobileAlt, FaHandshake } from "react-icons/fa";

// Simulating logos with Icons + Text for now, as I don't have SVGs for BCP/Yape on hand. 
// Can be replaced with <Image> if user provides them.
const PARTNERS = [
    { name: "VISA", icon: <FaCcVisa />, color: "text-blue-600" },
    { name: "MASTERCARD", icon: <FaCcMastercard />, color: "text-red-500" },
    { name: "BCP", icon: <FaBuilding />, color: "text-blue-900" },
    { name: "YAPE", icon: <FaMobileAlt />, color: "text-purple-600" },
    { name: "PLIN", icon: <FaMobileAlt />, color: "text-blue-400" },
    { name: "INTERBANK", icon: <FaBuilding />, color: "text-green-600" },
    { name: "CREDICORP", icon: <FaHandshake />, color: "text-gray-700" },
];

export default function TrustMarquee() {
  return (
    <section className="py-16 bg-white border-y border-gray-100 relative overflow-hidden shadow-sm z-30">
        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
            width: max-content;
          }
        `}</style>

        {/* Title */}
        <div className="container mx-auto px-4 mb-8 text-center">
            <p className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase">
                Respaldado por los líderes
            </p>
        </div>

      <div className="w-full overflow-hidden mask-linear-gradient">
        {/* Double the list for seamless loop */}
        <div className="flex gap-24 items-center pl-24 animate-scroll will-change-transform">
            {/* Set 1 */}
            {PARTNERS.map((partner, index) => (
                <div key={`s1-${index}`} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-default">
                    <span className={`text-5xl ${partner.color}`}>{partner.icon}</span>
                    <span className="text-3xl font-black text-gray-800 tracking-tight">{partner.name}</span>
                </div>
            ))}
            {/* Set 2 */}
            {PARTNERS.map((partner, index) => (
                <div key={`s2-${index}`} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-default">
                    <span className={`text-5xl ${partner.color}`}>{partner.icon}</span>
                    <span className="text-3xl font-black text-gray-800 tracking-tight">{partner.name}</span>
                </div>
            ))}
             {/* Set 3 (Optional extra buffer if screen is huge) */}
             {PARTNERS.map((partner, index) => (
                <div key={`s3-${index}`} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-default">
                     <span className={`text-5xl ${partner.color}`}>{partner.icon}</span>
                     <span className="text-3xl font-black text-gray-800 tracking-tight">{partner.name}</span>
                </div>
            ))}
             {/* Set 4 (Extra extra buffer) */}
             {PARTNERS.map((partner, index) => (
                <div key={`s4-${index}`} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-default">
                     <span className={`text-5xl ${partner.color}`}>{partner.icon}</span>
                     <span className="text-3xl font-black text-gray-800 tracking-tight">{partner.name}</span>
                </div>
            ))}
        </div>
      </div>
      
      {/* Side Fades */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-40"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-40"></div>
    </section>
  );
}
