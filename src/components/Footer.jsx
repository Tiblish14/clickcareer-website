import { MessageCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Footer() {
  const { openModal } = useAppContext();

  return (
    <>
      <footer className="bg-slate-950 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-black text-white mb-4 block">ClickCareer.</span>
            <p className="text-sm mb-6 leading-relaxed">Empowering students and professionals with high-performance, outcome-based live learning. Build your future today.</p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer flex items-center justify-center font-bold">In</div>
              <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer flex items-center justify-center font-bold">Tw</div>
              <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer flex items-center justify-center font-bold">Fb</div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => document.getElementById('about')?.scrollIntoView()} className="hover:text-blue-400 transition-colors">About Us</button></li>
              <li><button onClick={() => document.getElementById('courses')?.scrollIntoView()} className="hover:text-blue-400 transition-colors">All Courses</button></li>
              <li><button onClick={() => document.getElementById('blogs')?.scrollIntoView()} className="hover:text-blue-400 transition-colors">Blog & Resources</button></li>
              <li><button onClick={() => openModal('partner')} className="hover:text-blue-400 transition-colors">Partner for Training</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Refund Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Join Newsletter</h4>
            <p className="text-sm mb-4">Get the latest career tips and batch updates.</p>
            <div className="flex shadow-lg rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-600">
              <input type="email" placeholder="Your email" className="bg-slate-800 border-none px-4 py-2 w-full focus:outline-none text-white text-sm" />
              <button className="bg-blue-600 text-white px-4 py-2 font-semibold hover:bg-blue-700 text-sm transition-colors">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
          © {new Date().getFullYear()} ClickCareer EdTech Platform. All rights reserved.
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a href="https://wa.me/917903817049" target="_blank" rel="noreferrer" className="fixed bottom-20 md:bottom-6 left-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-40 group flex items-center">
        <MessageCircle className="w-7 h-7" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap ml-0 group-hover:ml-3 font-semibold">Chat with Us</span>
      </a>
    </>
  );
}
