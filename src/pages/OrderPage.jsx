import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function OrderPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: 'Starter',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (supabase) {
      try {
        const { error } = await supabase
          .from('orders')
          .insert([formData]);
          
        if (error) throw error;
        setIsSuccess(true);
      } catch (error) {
        console.error('Error submitting order:', error.message);
        alert('Terjadi kesalahan saat mengirim pesanan. Pastikan tabel orders sudah dibuat di Supabase.');
      }
    } else {
      // Mock mode
      setTimeout(() => setIsSuccess(true), 1000);
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pesanan Berhasil!</h2>
          <p className="text-gray-600 mb-8">Terima kasih telah mempercayakan pembuatan portofolio Anda kepada Portify.id. Tim kami akan segera menghubungi Anda via WhatsApp/Email.</p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-primary text-white py-3 rounded-full font-medium hover:bg-primary-hover transition-colors"
          >
            Kembali ke Beranda
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate('/')} className="flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Kembali
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-primary px-8 py-10 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">Formulir Pemesanan</h2>
            <p className="text-pink-100">Langkah pertama menuju portofolio profesional Anda</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="Cth: Alwan Farhan" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nomor WhatsApp</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="Cth: 08123456789" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Email</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="Cth: hello@alwan.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Paket</label>
              <select name="package" value={formData.package} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors bg-white">
                <option value="Starter">Paket Starter (Mulai Rp 750rb)</option>
                <option value="Pro">Paket Pro (Mulai Rp 2,5 Jt) - Paling Laris</option>
                <option value="Premium">Paket Solusi Lengkap (Mulai Rp 7,5 Jt)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Detail Kebutuhan (Opsional)</label>
              <textarea name="details" value={formData.details} onChange={handleChange} rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors resize-none" placeholder="Ceritakan sedikit tentang portofolio/website yang ingin Anda buat..."></textarea>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg text-lg ${isSubmitting ? 'bg-gray-400' : 'bg-primary hover:bg-primary-hover hover:shadow-xl'}`}
            >
              {isSubmitting ? 'Memproses Pesanan...' : 'Pesan Sekarang'}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
