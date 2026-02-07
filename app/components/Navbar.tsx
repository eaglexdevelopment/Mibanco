"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes, FaLock } from "react-icons/fa";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // NavLink Component
  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="relative group py-2">
      <span className={clsx(
        "font-bold text-sm uppercase tracking-wider transition-colors duration-300",
        isScrolled ? "text-gray-700 group-hover:text-mibanco-green" : "text-white group-hover:text-mibanco-gold text-shadow-sm"
      )}>
        {children}
      </span>
      <span className={clsx(
        "absolute bottom-0 left-0 h-0.5 bg-mibanco-gold transition-all duration-300 ease-out w-0 group-hover:w-full",
      )}></span>
    </Link>
  );

  return (
    <>
      <header
        className={twMerge(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full",
          isScrolled 
              ? "bg-white shadow-xl py-3 border-b-4 border-mibanco-gold" 
              : "bg-gradient-to-b from-black/50 to-transparent py-5 border-b border-white/10"
        )}
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          {/* Logo - ORIGINAL COLORS & LARGER */}
          <Link href="/" className="relative z-50 group">
             <div className={clsx("relative transition-all duration-300", isScrolled ? "h-12 w-48" : "h-14 w-56")}>
               <Image
                 src="/logo.webp"
                 alt="Mibanco Logo"
                 fill
                 className="object-contain drop-shadow-md"
                 priority
               />
             </div>
          </Link>
  
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <NavLink href="#">Conócenos</NavLink>
            <NavLink href="#">Para tu negocio</NavLink>
            <NavLink href="#">Para ti</NavLink>
          </nav>
  
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button className={clsx("p-2 transition-colors duration-300 hover:scale-110", isScrolled ? "text-mibanco-green" : "text-white")}>
              <FaSearch size={22} />
            </button>
            
            <Link
              href="#"
              className="group relative overflow-hidden rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
                <div className="absolute inset-0 bg-mibanco-orange group-hover:bg-orange-600 transition-colors"></div>
                {/* Brand Visibility: Gold sheen effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <div className="relative flex items-center gap-3 px-8 py-3 text-white font-bold text-sm tracking-wide">
                    <FaLock size={14} />
                    <span>Banca Internet</span>
                </div>
            </Link>
          </div>
  
          {/* Mobile Toggle */}
          <button
            className={clsx("md:hidden z-50 p-2 transition-colors", isScrolled ? "text-mibanco-green" : "text-white")}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes size={32} /> : <FaBars size={32} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
          className={clsx(
            "fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden",
            isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
          )}
        >
          <div className="absolute top-6 left-6 w-40 h-12 relative">
             <Image src="/logo.webp" alt="Mibanco" fill className="object-contain" />
          </div>

          <Link href="#" className="text-3xl font-black text-gray-800 hover:text-mibanco-green" onClick={toggleMobileMenu}>
            Conócenos
          </Link>
          <Link href="#" className="text-3xl font-black text-gray-800 hover:text-mibanco-green" onClick={toggleMobileMenu}>
            Para tu negocio
          </Link>
          <Link href="#" className="text-3xl font-black text-gray-800 hover:text-mibanco-green" onClick={toggleMobileMenu}>
            Para ti
          </Link>
          
          <div className="mt-8">
             <Link
                href="#"
                className="flex items-center justify-center gap-2 bg-mibanco-orange text-white px-8 py-4 rounded-full font-bold text-xl shadow-xl hover:scale-105 transition-transform"
                onClick={toggleMobileMenu}
              >
                <FaLock /> Banca Internet
              </Link>
          </div>
      </div>
    </>
  );
}
