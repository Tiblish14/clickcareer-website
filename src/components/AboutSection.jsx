import { Shield, Clock } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Learn from those who actually <span className="text-blue-400">do it.</span></h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              We aren't just teachers; we are industry professionals. Our mentors have 10+ years of active experience in top tech firms, Big 4 auditing companies, and government sectors.
            </p>
            <div className="space-y-6">
              <div className="flex items-start group">
                <div className="bg-blue-600/20 p-3 rounded-xl mr-4 group-hover:bg-blue-600/40 transition-colors"><Shield className="text-blue-400" /></div>
                <div><h4 className="font-bold text-xl">Verified Industry Experts</h4><p className="text-slate-400 mt-1">Every curriculum is vetted by hiring managers.</p></div>
              </div>
              <div className="flex items-start group">
                <div className="bg-orange-500/20 p-3 rounded-xl mr-4 group-hover:bg-orange-500/40 transition-colors"><Clock className="text-orange-400" /></div>
                <div><h4 className="font-bold text-xl">Up-to-Date Syllabi</h4><p className="text-slate-400 mt-1">We teach what's relevant today, not 5 years ago.</p></div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl transform rotate-3 scale-105"></div>
            <div className="relative bg-slate-800/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-700">
              <h3 className="text-2xl font-bold mb-6 text-white border-b border-slate-700 pb-4">Student Success Stories</h3>
              <div className="space-y-6">
                <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600 hover:bg-slate-700 hover:border-slate-500 transition-all transform hover:-translate-x-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-blue-300">Rahul M.</span>
                    <span className="text-xs font-semibold bg-green-500/20 text-green-400 px-2 py-1 rounded-md">Cleared SSC CGL</span>
                  </div>
                  <p className="text-sm text-slate-300 italic">"The Aptitude batches are pure gold. The 15-student limit meant all my doubts were solved instantly."</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600 hover:bg-slate-700 hover:border-slate-500 transition-all transform hover:-translate-x-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-blue-300">Sneha P.</span>
                    <span className="text-xs font-semibold bg-green-500/20 text-green-400 px-2 py-1 rounded-md">Placed as Data Analyst</span>
                  </div>
                  <p className="text-sm text-slate-300 italic">"IT skills course didn't just teach code, it taught problem-solving. Got placed in 3 months!"</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600 hover:bg-slate-700 hover:border-slate-500 transition-all transform hover:-translate-x-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-blue-300">Amit K.</span>
                    <span className="text-xs font-semibold bg-green-500/20 text-green-400 px-2 py-1 rounded-md">CA Inter Student</span>
                  </div>
                  <p className="text-sm text-slate-300 italic">"The GST course is exactly what practical accounting looks like. The Free Excel bonus saved my articleship."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
