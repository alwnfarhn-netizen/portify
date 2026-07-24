import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  const features = [
    { title: "HTML & CSS", subtitle: "Struktur & Kode Bersih" },
    { title: "Desain UI Modern", subtitle: "Tampilan Estetis & Interaktif" },
    { title: "Mobile-first Responsive", subtitle: "Sempurna di Semua Layar" },
    { title: "SEO Dasar Dioptimalkan", subtitle: "Mudah Ditemukan di Google" },
    { title: "Fast Delivery", subtitle: "Pengerjaan Cepat & Tepat" },
    { title: "Revisi Fleksibel", subtitle: "Kepuasan Hasil Terjamin" }
  ];

  // Triplikasi array untuk efek seamless infinite loop ticker
  const duplicatedFeatures = [...features, ...features, ...features];

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Website yang bicara lebih keras dari CV</h2>
          <div className="space-y-4 text-lg text-gray-600">
            <p>
              Kami percaya setiap orang punya karya yang layak dilihat dunia. Masalahnya, tidak semua orang tahu cara menampilkannya dengan baik di internet.
            </p>
            <p>
              Di Portify.id, kami bukan sekadar bikin website — kami bantu kamu ceritakan siapa kamu dan kenapa orang harus memilihmu, lewat desain yang bersih, cepat, dan berkesan.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Infinite Horizontal Carousel / Marquee Auto-Scroll */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Gradient Mask Fading Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <motion.div 
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity
          }}
        >
          {duplicatedFeatures.map((feature, index) => (
            <motion.div 
              key={index} 
              whileHover={{ scale: 1.04, y: -4 }}
              className="flex items-center gap-4 bg-gray-50/90 hover:bg-white rounded-2xl px-6 py-5 border border-gray-100 shadow-sm hover:shadow-md transition-all shrink-0 cursor-pointer min-w-[280px] sm:min-w-[320px]"
            >
              <div className="w-12 h-12 bg-pink-100 text-primary rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base">{feature.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{feature.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

