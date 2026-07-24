import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <img src="/logo P.png" alt="Portify.id Logo" className="h-8 w-auto" />
            <span className="font-bold text-xl text-gray-900 tracking-tight">Portify.id</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-600 hover:text-primary transition-colors">Tentang Kami</a>
            <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Paket Harga</a>
            <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">Kontak</a>
          </div>
          <div className="hidden md:flex">
            <a href="#contact" className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-primary-hover transition-colors shadow-sm">
              Konsultasi Gratis
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
