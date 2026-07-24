import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2 space-y-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Tampil profesional di <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-400">dunia digital</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
              Kami bantu kamu punya portofolio website yang memukau — bukan sekadar ada, tapi benar-benar mencerminkan siapa kamu dan karya terbaikmu.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
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

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-1/2 flex justify-center relative"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute inset-0 bg-primary blur-3xl rounded-full w-3/4 h-3/4 mx-auto"
            ></motion.div>
            <motion.img 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              src="/logo P.png" 
              alt="Portify.id Logo" 
              className="w-48 md:w-64 max-w-sm h-auto object-contain relative z-10 drop-shadow-2xl" 
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
