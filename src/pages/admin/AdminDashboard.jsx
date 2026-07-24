import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [orders, setOrders] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'comments'
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check Auth
    const checkSession = async () => {
      if (!supabase) return;
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin');
      } else {
        setSession(session);
        fetchData();
      }
    };
    checkSession();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    // Fetch Orders
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (ordersData) setOrders(ordersData);
    if (ordersError) console.error(ordersError);

    // Fetch Comments
    const { data: commentsData, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (commentsData) setComments(commentsData);
    if (commentsError) console.error(commentsError);

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const updateOrderStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'selesai' : 'pending';
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id);
    
    if (!error) {
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    } else {
      alert('Gagal mengupdate status: ' + error.message);
    }
  };

  const approveComment = async (id) => {
    const { error } = await supabase
      .from('comments')
      .update({ is_approved: true })
      .eq('id', id);
      
    if (!error) {
      setComments(comments.map(c => c.id === id ? { ...c, is_approved: true } : c));
    } else {
      alert('Gagal menyetujui komentar: ' + error.message);
    }
  };

  const deleteComment = async (id) => {
    if (!window.confirm('Yakin ingin menghapus komentar ini?')) return;
    
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);
      
    if (!error) {
      setComments(comments.filter(c => c.id !== id));
    } else {
      alert('Gagal menghapus komentar: ' + error.message);
    }
  };

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar Admin */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary">Portify.id Admin</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-4">{session.user.email}</span>
              <button onClick={handleLogout} className="text-sm font-medium text-red-600 hover:text-red-800">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'orders' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Pesanan Masuk ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'comments' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Moderasi Komentar ({comments.filter(c => !c.is_approved).length} Pending)
            </button>
          </nav>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Memuat data...</div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            
            {activeTab === 'orders' && (
              <ul className="divide-y divide-gray-200">
                {orders.length === 0 ? <li className="p-6 text-center text-gray-500">Belum ada pesanan.</li> : null}
                {orders.map((order) => (
                  <li key={order.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-primary">{order.name}</h3>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'selesai' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {order.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex flex-col text-sm text-gray-500 space-y-1">
                            <p><strong>Paket:</strong> {order.package}</p>
                            <p><strong>WA:</strong> {order.phone}</p>
                            <p><strong>Email:</strong> {order.email}</p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p>{new Date(order.created_at).toLocaleDateString('id-ID')}</p>
                          </div>
                        </div>
                        {order.details && (
                          <div className="mt-3 text-sm text-gray-700 bg-gray-50 p-3 rounded border">
                            <strong>Detail:</strong> {order.details}
                          </div>
                        )}
                        <div className="mt-4">
                          <button
                            onClick={() => updateOrderStatus(order.id, order.status)}
                            className={`text-sm font-medium px-3 py-1 rounded border ${order.status === 'selesai' ? 'border-gray-300 text-gray-600 hover:bg-gray-100' : 'bg-primary text-white hover:bg-primary-hover border-transparent'}`}
                          >
                            {order.status === 'selesai' ? 'Tandai Pending' : 'Tandai Selesai'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'comments' && (
              <ul className="divide-y divide-gray-200">
                {comments.length === 0 ? <li className="p-6 text-center text-gray-500">Belum ada komentar.</li> : null}
                {comments.map((comment) => (
                  <li key={comment.id} className={`p-6 flex items-start justify-between ${comment.is_approved ? 'bg-white' : 'bg-yellow-50'}`}>
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-sm font-bold text-gray-900">{comment.name}</h4>
                        {!comment.is_approved && (
                          <span className="px-2 py-0.5 text-xs bg-yellow-200 text-yellow-800 rounded">Pending Approval</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{new Date(comment.created_at).toLocaleString('id-ID')}</p>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {!comment.is_approved && (
                        <button
                          onClick={() => approveComment(comment.id)}
                          className="text-green-600 hover:text-green-800 text-sm font-medium ml-4 bg-green-50 px-3 py-1 rounded"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => deleteComment(comment.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium ml-4 bg-red-50 px-3 py-1 rounded"
                      >
                        Hapus
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            
          </div>
        )}
      </div>
    </div>
  );
}
