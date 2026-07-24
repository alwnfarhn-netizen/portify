import React from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Siap Memulai Proyekmu?</h2>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Hubungi <strong>Alwan Farhan</strong> sekarang untuk konsultasi gratis. Kami siap membantu mewujudkan portofolio digital impianmu.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 flex-wrap">
          <motion.a 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/6285128071828" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-medium shadow-md"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
            WhatsApp
          </motion.a>
          
          <motion.a 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            href="https://instagram.com/alwnfarhn" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white px-8 py-4 rounded-full font-medium shadow-md"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            Instagram
          </motion.a>

          <motion.a 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            href="https://threads.net/@alwnfarhn" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-full font-medium shadow-md"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.28 11.13c-.028-.203-.07-.406-.118-.61-.314-1.34-1.12-2.29-2.316-2.583-.432-.106-.88-.135-1.32-.136-2.023-.005-3.629 1.157-4.14 2.87-.223.753-.222 1.55-.001 2.305.419 1.42 1.696 2.502 3.23 2.666 1.17.126 2.222-.191 3.013-1.047.054-.058.112-.116.166-.174.195.04.385.093.57.16.536.195 1.002.5 1.347.965.41.554.542 1.258.468 1.94-.099.914-.582 1.644-1.306 2.146-1.077.747-2.368 1.054-3.666 1.01-1.61-.055-3.044-.658-4.137-1.782-1.224-1.257-1.854-2.884-1.92-4.664-.067-1.784.453-3.461 1.557-4.807 1.334-1.625 3.125-2.548 5.213-2.616 1.968-.063 3.702.661 5.068 2.062 1.272 1.305 1.895 2.951 1.95 4.793.006.183.003.366 0 .549-.033.432-.44.757-.866.757h-6.282c-.083-.002-.152-.061-.17-.14-.067-.323-.092-.652-.075-.98.016-.307.288-.543.593-.543h5.275c-.065-2.036-1.129-3.79-2.92-4.524m-3.649.33c-1.391.026-2.502 1.109-2.569 2.504-.007.135-.008.271 0 .407.039.775.641 1.455 1.43 1.53.805.076 1.564-.326 1.914-1.037.16-.324.238-.686.23-1.053-.021-1.309-1.023-2.31-2.336-2.348" /></svg>
            Threads
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
