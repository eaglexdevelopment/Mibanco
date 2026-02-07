"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaComments, FaQuestionCircle } from "react-icons/fa";
import { clsx } from "clsx";

export default function Footer() {
  return (
    <footer className="bg-mibanco-green text-white pt-24 pb-12 rounded-t-[50px] relative overflow-hidden -mt-8 shadow-inner z-20">
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-10 -translate-y-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-mibanco-gold/10 rounded-full blur-3xl -translate-x-10 translate-y-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <h4 className="text-3xl font-black text-white relative inline-block">
                Mibanco
                <span className="absolute -top-2 -right-4 text-mibanco-gold text-4xl">.</span>
            </h4>
            <p className="text-white/80 leading-relaxed font-light">
                Impulsamos el desarrollo de las familias peruanas a través de soluciones financieras inclusivas.
            </p>
            <div className="flex gap-4 pt-4">
              <SocialLink href="#" icon={<FaFacebookF size={18} />} />
              <SocialLink href="#" icon={<FaInstagram size={18} />} />
              <SocialLink href="#" icon={<FaLinkedinIn size={18} />} />
              <SocialLink href="#" icon={<FaYoutube size={18} />} />
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-8">
            <h4 className="text-xl font-bold text-mibanco-gold flex items-center gap-2">
                Nuestra Empresa
                <div className="h-px bg-mibanco-gold/30 flex-1 ml-4"></div>
            </h4>
            <ul className="space-y-4">
              <FooterLink href="#">Quiénes somos</FooterLink>
              <FooterLink href="#">Gobierno Corporativo</FooterLink>
              <FooterLink href="#">Sostenibilidad</FooterLink>
              <FooterLink href="#">Trabaja con nosotros</FooterLink>
            </ul>
          </div>

          {/* Column 3: Help */}
          <div className="space-y-8">
            <h4 className="text-xl font-bold text-mibanco-gold flex items-center gap-2">
                Te Ayudamos
                <div className="h-px bg-mibanco-gold/30 flex-1 ml-4"></div>
            </h4>
            <ul className="space-y-4">
              <FooterLink href="#">Centro de Ayuda</FooterLink>
              <FooterLink href="#">Preguntas Frecuentes</FooterLink>
              <FooterLink href="#">Tasas y Tarifas</FooterLink>
              <FooterLink href="#">Libro de Reclamaciones</FooterLink>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-8">
            <h4 className="text-xl font-bold text-mibanco-gold flex items-center gap-2">
                Contacto
                <div className="h-px bg-mibanco-gold/30 flex-1 ml-4"></div>
            </h4>
            <ul className="space-y-6 text-white/90">
              <li className="flex items-start gap-4">
                  <div className="p-2 bg-white/10 rounded-lg text-mibanco-gold">
                      <FaComments />
                  </div>
                  <div>
                      <span className="block text-xs uppercase opacity-70 mb-1">Banca por Teléfono</span>
                      <span className="font-bold text-lg leading-none">(01) 319-9999</span>
                  </div>
              </li>
              <li className="flex items-start gap-4">
                  <div className="p-2 bg-white/10 rounded-lg text-mibanco-gold">
                      <FaQuestionCircle />
                  </div>
                   <div>
                       <span className="block text-xs uppercase opacity-70 mb-1">Soporte</span>
                        <Link href="#" className="font-medium hover:text-mibanco-gold transition-colors">Atención al Usuario</Link>
                   </div>
              </li>
              <li className="flex items-start gap-4">
                  <div className="p-2 bg-white/10 rounded-lg text-mibanco-gold">
                      <FaMapMarkerAlt />
                  </div>
                   <div>
                        <span className="block text-xs uppercase opacity-70 mb-1">Agencias</span>
                        <Link href="#" className="font-medium hover:text-mibanco-gold transition-colors">Ubícanos</Link>
                   </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
            <p>&copy; {new Date().getFullYear()} Mibanco, Banco de la Microempresa S.A.</p>
            <div className="flex gap-8">
                <Link href="#" className="hover:text-white transition-colors">Políticas de Privacidad</Link>
                <Link href="#" className="hover:text-white transition-colors">Términos y condiciones</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <Link 
            href={href} 
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-mibanco-gold hover:text-mibanco-green transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border border-white/5"
        >
            {icon}
        </Link>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link 
                href={href} 
                className="group flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300"
            >
                <span className="w-1.5 h-1.5 rounded-full bg-mibanco-gold opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="group-hover:translate-x-1 transition-transform">{children}</span>
            </Link>
        </li>
    );
}
