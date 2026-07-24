import React from 'react';
import { motion } from 'framer-motion';

export default function PricingCard() {
  const packages = [
    {
      name: "Starter (Basic Portfolio)",
      price: "Mulai Rp 750rb",
      description: "Cocok untuk fresh graduate & freelancer pemula yang butuh presensi online.",
      features: [
        "1 - 3 Halaman (Home, Portofolio, Kontak)",
        "Template Siap Pakai (Warna & Logo Custom)",
        "Mobile Responsive",
        "Integrasi WhatsApp & Media Sosial",
        "Hosting & Domain (.com / .my.id) 1 Tahun",
        "Basic SEO (Title & Meta)",
        "Estimasi Selesai: 3 - 7 Hari"
      ],
      isPopular: false,
      ctaText: "Pilih Starter"
    },
    {
      name: "Pro (Professional Portfolio)",
      price: "Mulai Rp 2,5 Jt",
      description: "Kredibilitas tinggi untuk profesional berpengalaman atau agensi kecil.",
      features: [
        "5 - 10 Halaman Lengkap & Blog",
        "Desain Semi-Custom / Custom",
        "Sistem CMS (Upload Karya Mandiri)",
        "Galeri Advanced (Filter, Slider, Video)",
        "Google Analytics & Search Console",
        "Hosting Premium & Email Bisnis",
        "Estimasi Selesai: 2 - 3 Minggu"
      ],
      isPopular: true,
      ctaText: "Pilih Pro"
    },
    {
      name: "Solusi Lengkap",
      price: "Mulai Rp 7,5 Jt",
      description: "Sistem custom atau E-commerce untuk kreator & bisnis kreatif.",
      features: [
        "Desain 100% Custom (UI/UX dari Figma)",
        "Sistem E-Commerce (Jual Produk/Jasa)",
        "Payment Gateway (Midtrans, Xendit, dll)",
        "Custom: Booking / Client Portal",
        "Server VPS/Cloud & SSL Premium",
        "Garansi Maintenance 1-3 Bulan",
        "Estimasi Selesai: 1 - 2 Bulan"
      ],
      isPopular: false,
      ctaText: "Konsultasi Gratis"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Investasi untuk Personal Brand Anda</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Pilih paket pembuatan website yang paling sesuai dengan kebutuhan karir atau bisnismu saat ini.</p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {packages.map((pkg, index) => (
            <motion.div 
              key={index} 
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              whileHover={{ y: -10 }}
              className={`relative bg-white rounded-2xl p-8 flex flex-col border ${pkg.isPopular ? 'border-primary shadow-xl scale-105 z-10' : 'border-gray-200 shadow-sm'}`}
            >
              {pkg.isPopular && (
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <span className="bg-primary text-white px-4 py-1 text-sm font-semibold rounded-full tracking-wide shadow-md">Recommended</span>
                </motion.div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
              <div className="text-3xl font-extrabold text-gray-900 mb-4">{pkg.price}</div>
              <p className="text-gray-600 mb-6 flex-grow">{pkg.description}</p>
              
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className={`w-5 h-5 mr-3 mt-1 ${pkg.isPopular ? 'text-primary' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={pkg.name === 'Premium' ? '#contact' : '/order'} 
                className={`w-full text-center py-3 px-6 rounded-full font-medium transition-colors ${pkg.isPopular ? 'bg-primary text-white hover:bg-primary-hover shadow-lg' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
              >
                {pkg.ctaText}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
