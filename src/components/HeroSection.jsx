import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="pt-28 pb-20 bg-gradient-to-b from-secondary to-white overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Logo P - Posisi Paling Atas sebelum Headline */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full w-28 h-28 mx-auto"></div>
            <img 
              src="/logo-p.png" 
              alt="Portify.id Logo" 
              className="w-28 sm:w-36 md:w-44 h-auto object-contain relative z-10 drop-shadow-lg" 
            />
          </div>
        </motion.div>

        {/* Headline & Deskripsi */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Tampil profesional di <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-400">dunia digital</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Kami bantu kamu punya portofolio website yang memukau — bukan sekadar ada, tapi benar-benar mencerminkan siapa kamu dan karya terbaikmu.
          </p>
          
          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
            <motion.a 
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(253, 24, 67, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              href="#pricing" 
              className="px-8 py-3.5 border border-transparent text-base font-medium rounded-full shadow-md text-white bg-primary hover:bg-primary-hover transition-colors text-center"
            >
              Lihat Paket Harga
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              className="px-8 py-3.5 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors text-center"
            >
              Hubungi Kami
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

