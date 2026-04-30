import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Navigate } from 'react-router-dom';
import { BookOpen, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user, profile, isSignedIn, loading: authLoading, signOut } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching leads:", error);
      } else {
        setLeads(data || []);
      }
      setLoading(false);
    };

    if (isSignedIn) {
      fetchLeads();
    } else if (!authLoading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
    }
  }, [user, isSignedIn, authLoading]);

  if (authLoading) {
    return <div className="pt-32 pb-16 text-center min-h-[60vh]">Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/" />;
  }

  return (
    <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-[70vh]">
      <div className="flex justify-between items-center mb-10 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">My Dashboard</h1>
          <p className="text-slate-500">Welcome back, {profile?.full_name || user.email}</p>
        </div>
        <button 
          onClick={signOut}
          className="text-slate-500 hover:text-red-500 font-semibold px-4 py-2 border border-slate-200 rounded-lg hover:border-red-200 hover:bg-red-50 transition-colors"
        >
          Sign Out
        </button>
      </div>

      <h2 className="text-xl font-bold mb-6 flex items-center">
        <BookOpen className="w-5 h-5 mr-2 text-blue-600" /> My Requested Courses
      </h2>

      {loading ? (
        <div className="text-center py-12">
          <span className="animate-pulse bg-slate-200 h-8 w-8 rounded-full inline-block mb-4"></span>
          <p className="text-slate-500">Loading your requests...</p>
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-700 mb-2">No courses requested yet</h3>
          <p className="text-slate-500 mb-6">Explore our catalog to find the best course for you.</p>
          <a href="/courses" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors shadow-md">
            Browse Courses
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {leads.map(lead => (
            <div key={lead.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{lead.course_title}</h3>
                <p className="text-sm text-slate-500">Requested on: {new Date(lead.created_at).toLocaleDateString()}</p>
                <p className="text-xs text-slate-400 mt-1 font-mono">Lead ID: {lead.id}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center ${
                  lead.status === 'pending' ? 'bg-orange-100 text-orange-600' : 
                  lead.status === 'approved' ? 'bg-green-100 text-green-600' : 
                  'bg-slate-100 text-slate-600'
                }`}>
                  {lead.status === 'pending' ? <Clock className="w-3 h-3 mr-1" /> : <CheckCircle className="w-3 h-3 mr-1" />}
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
