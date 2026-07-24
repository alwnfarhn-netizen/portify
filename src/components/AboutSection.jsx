import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  const features = [
    "HTML & CSS",
    "Desain UI Modern",
    "Mobile-first Responsive",
    "SEO Dasar Dioptimalkan",
    "Fast Delivery",
    "Revisi Fleksibel"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="about" className="py-20 bg-white">
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

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)" }}
              className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100 cursor-pointer"
            >
              <div className="w-10 h-10 mx-auto bg-pink-100 text-primary rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="font-semibold text-gray-900">{feature}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
