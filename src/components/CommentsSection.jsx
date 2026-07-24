import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

// Data mock jika database belum terhubung
const MOCK_COMMENTS = [
  { id: 1, name: 'Budi Santoso', content: 'Website-nya keren banget! Desainnya sangat modern dan responsif.', created_at: new Date().toISOString() },
  { id: 2, name: 'Siti Aminah', content: 'Proses kerjanya cepat dan hasilnya melebihi ekspektasi. Terima kasih Portify.id!', created_at: new Date().toISOString() }
];

export default function CommentsSection() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Ambil data komentar dari Supabase (atau gunakan mock)
  useEffect(() => {
    const fetchComments = async () => {
      if (!supabase) {
        setComments(MOCK_COMMENTS);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('comments')
          .select('*')
          .eq('is_approved', true)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setComments(data || []);
      } catch (error) {
        console.error('Error fetching comments:', error.message);
        setComments(MOCK_COMMENTS); // Fallback ke mock jika error
      }
    };

    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setIsSubmitting(true);

    const newComment = {
      name,
      content,
      created_at: new Date().toISOString(),
      is_approved: false
    };

    if (supabase) {
      try {
        const { error } = await supabase
          .from('comments')
          .insert([newComment]);
          
        if (error) throw error;
        
        setIsSuccess(true);
        alert("Komentar Anda berhasil dikirim dan menunggu persetujuan dari admin.");
      } catch (error) {
        console.error('Error adding comment:', error.message);
        alert('Gagal mengirim komentar. Pastikan database Supabase sudah diatur.');
      }
    } else {
      // Simulasi sukses jika menggunakan mock
      setTimeout(() => {
        setComments([ { id: Date.now(), ...newComment }, ...comments ]);
        setIsSuccess(true);
      }, 500);
    }

    setIsSubmitting(false);
    setName('');
    setContent('');
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section id="comments" className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Apa Kata Mereka?</h2>
          <p className="text-gray-600">Tinggalkan komentar atau ulasan Anda tentang layanan Portify.id</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Komentar */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 h-fit"
          >
            <h3 className="text-xl font-semibold mb-6">Tulis Komentar</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Komentar</label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors resize-none"
                  placeholder="Sangat puas dengan hasilnya..."
                  required
                ></textarea>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg font-medium text-white transition-colors ${isSubmitting ? 'bg-gray-400' : 'bg-primary hover:bg-primary-hover'}`}
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Komentar'}
              </motion.button>
              
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-green-50 text-green-700 text-sm rounded-lg text-center mt-2 border border-green-100"
                >
                  Terima kasih! Komentar Anda berhasil dikirim.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Daftar Komentar */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar"
          >
            {comments.length === 0 ? (
              <div className="text-center text-gray-500 py-10 bg-white rounded-2xl border border-gray-100">
                Belum ada komentar. Jadilah yang pertama!
              </div>
            ) : (
              comments.map((comment, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={comment.id || index} 
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 bg-pink-100 text-primary rounded-full flex items-center justify-center font-bold text-lg">
                      {comment.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                      <p className="text-xs text-gray-500">
                        {new Date(comment.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
