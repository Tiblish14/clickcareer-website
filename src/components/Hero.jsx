import { CheckCircle, Shield, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Hero() {
  const { siteSettings } = useAppContext();

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
      <div className="lg:w-1/2 space-y-8 pr-0 lg:pr-12 text-center lg:text-left">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-4 border border-blue-100 shadow-sm">
          <span className="animate-pulse h-2 w-2 bg-blue-600 rounded-full mr-2"></span>
          Next Live Batch in 3 Days
        </div>
        <h1 className="text-5xl lg:text-6xl font-black leading-tight text-slate-900 tracking-tight">
          Accelerate your Career. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Master Skills
          </span>
          <span className="animate-ping text-blue-600 font-normal">|</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
          {siteSettings?.heroText || "India's most premium, outcome-driven learning platform. Join the elite 1% who learn directly from industry professionals."}
        </p>

        {/* Value Props */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <div className="flex items-center bg-white border border-slate-200 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <CheckCircle className="text-green-500 mr-3 w-6 h-6" />
            <div className="text-left text-sm font-semibold">B.Tech Students<br /><span className="text-xs text-slate-500 font-normal">Placement prep</span></div>
          </div>
          <div className="flex items-center bg-white border border-slate-200 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <Shield className="text-blue-500 mr-3 w-6 h-6" />
            <div className="text-left text-sm font-semibold">Job-Ready Skills<br /><span className="text-xs text-slate-500 font-normal">Practical learning</span></div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
          <button onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transform hover:-translate-y-0.5">
            Explore Courses
          </button>
          <button onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-slate-800 border-2 border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center transform hover:-translate-y-0.5">
            Start Learning
          </button>
        </div>
      </div>

      {/* Hero Visual */}
      <div className="lg:w-1/2 mt-16 lg:mt-0 relative group">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-orange-100 rounded-[3rem] transform rotate-3 scale-105 transition-transform group-hover:rotate-6 duration-500"></div>
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Students Learning" className="relative rounded-[3rem] shadow-2xl object-cover h-[500px] w-full border-8 border-white transition-transform duration-500 group-hover:scale-[1.02]" />

        {/* Trust Badge overlay */}
        <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center animate-bounce" style={{ animationDuration: '3s' }}>
          <Star className="text-yellow-400 fill-yellow-400 h-10 w-10 mr-3" />
          <div>
            <p className="font-bold text-slate-900">4.9/5 Rating</p>
            <p className="text-xs text-slate-500">from 10,000+ students</p>
          </div>
        </div>
      </div>
    </section>
  );
}
