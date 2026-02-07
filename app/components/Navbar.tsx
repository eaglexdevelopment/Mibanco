"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaSearch, FaBars, FaTimes, FaLock, FaWhatsapp, FaUser } from "react-icons/fa";
import { clsx } from "clsx";
import gsap from "gsap";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Animation for Mobile Menu
  useEffect(() => {
    if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
            height: "auto",
            opacity: 1,
            duration: 0.5,
            ease: "power3.out"
        });
    } else {
        gsap.to(mobileMenuRef.current, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power3.in"
        });
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className={clsx(
        "relative font-bold text-sm uppercase tracking-wider transition-colors duration-300 group",
        "text-gray-800 hover:text-mibanco-green"
    )}>
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mibanco-green transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );

  return (
    <>
      <header
        className={clsx(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-3xl flex flex-col items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/40",
          isScrolled 
            ? "w-[95%] md:w-auto bg-white/80 backdrop-blur-xl" 
            : "w-[95%] md:w-[900px] bg-white/60 backdrop-blur-md",
          isMobileMenuOpen ? "bg-white !w-[95%]" : "" // Expand width on mobile open
        )}
      >
        <div className="w-full flex items-center justify-between px-6 py-3">
            {/* Logo */}
            <Link href="/" className="relative z-50 group flex-shrink-0 mr-8" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="relative h-8 w-28 md:h-10 md:w-32 transition-all duration-300">
                <Image
                    src="/logo.webp"
                    alt="Mibanco Logo"
                    fill
                    className="object-contain"
                    priority
                />
                </div>
            </Link>
    
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 mr-8">
                <NavLink href="#">Conócenos</NavLink>
                <NavLink href="#">Para tu negocio</NavLink>
                <NavLink href="#">Para ti</NavLink>
            </nav>
    
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
                <button className="p-2 transition-colors duration-300 hover:scale-110 text-gray-600 hover:text-mibanco-green">
                    <FaSearch size={18} />
                </button>
                
                <Link
                href="#"
                className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-lg hover:shadow-green-500/30 hover:bg-mibanco-green transition-all hover:scale-105"
                >
                    <FaLock size={12} />
                    <span>Banca Internet</span>
                </Link>
            </div>
    
            {/* Mobile Toggle */}
            <button
                className="md:hidden z-50 p-2 text-gray-800 focus:outline-none"
                onClick={toggleMobileMenu}
            >
                {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
        </div>

        {/* Mobile Menu - "Dynamic Island" Expansion */}
        <div 
            ref={mobileMenuRef} 
            className="w-full overflow-hidden flex flex-col gap-4 px-6 h-0 opacity-0 md:hidden"
        >
             <div className="py-4 flex flex-col gap-6 text-center border-t border-gray-100">
                <Link href="#" className="text-xl font-bold text-gray-800" onClick={toggleMobileMenu}>Conócenos</Link>
                <Link href="#" className="text-xl font-bold text-gray-800" onClick={toggleMobileMenu}>Para tu negocio</Link>
                <Link href="#" className="text-xl font-bold text-gray-800" onClick={toggleMobileMenu}>Para ti</Link>
                
                <div className="flex flex-col gap-3 mt-4">
                    <Link
                        href="#"
                        className="flex items-center justify-center gap-2 bg-mibanco-green text-white w-full py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
                        onClick={toggleMobileMenu}
                    >
                        <FaLock /> Banca Internet
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 w-full py-4 rounded-xl font-bold text-lg active:scale-95 transition-transform"
                        onClick={toggleMobileMenu}
                    >
                        <FaWhatsapp className="text-green-500" /> WhatsApp
                    </Link>
                </div>
             </div>
        </div>
      </header>
    </>
  );
}
