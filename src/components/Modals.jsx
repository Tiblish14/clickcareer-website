import { useState } from 'react';
import { ShoppingCart, X, ArrowRight, Shield, ChevronDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';

export default function Modals() {
  const { modals, closeModal, cart, removeFromCart, clearCart, activeBlogId, blogs, categories } = useAppContext();
  
  
  // Blog Content
  const activeBlog = blogs.find(b => b.id === activeBlogId);

  return (
    <>
      {/* Cart Modal */}
      <div className={cn(
        "fixed inset-0 z-[60] flex justify-end transition-all duration-300",
        modals.cart ? "visible" : "invisible pointer-events-none"
      )}>
        <div className={cn(
          "absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300",
          modals.cart ? "opacity-100" : "opacity-0"
        )} onClick={() => closeModal('cart')}></div>
        <div className={cn(
          "relative h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 flex flex-col",
          modals.cart ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <h2 className="text-2xl font-black flex items-center"><ShoppingCart className="mr-3 text-blue-600 w-6 h-6" /> Your Cart</h2>
            <button onClick={() => closeModal('cart')} className="text-slate-400 hover:text-slate-800 bg-slate-100 rounded-full p-2 transition-colors"><X className="w-5 h-5" /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {cart.length === 0 ? (
              <div className="text-center text-slate-500 mt-20 flex flex-col items-center">
                <ShoppingCart className="text-slate-200 mb-4 w-12 h-12" />
                <p className="text-lg">Your cart is empty.</p>
                <button onClick={() => closeModal('cart')} className="mt-6 text-blue-600 font-bold border border-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition-colors">Browse Courses</button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm animate-in slide-in-from-right-4 fade-in">
                  <div className="pr-4">
                    <h4 className="font-bold text-slate-900 leading-tight">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{item.category}</p>
                    <p className="text-sm font-semibold text-blue-600 mt-2">₹{item.price.toLocaleString()}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 p-2 transition-colors"><X className="w-5 h-5" /></button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-slate-100 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] z-10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-600 font-medium">Subtotal ({cart.length} items)</span>
                <span className="text-2xl font-black text-slate-900">₹{cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</span>
              </div>
              <button onClick={() => {
                const phone = '917903817049';
                let text = 'Hello! I am interested in purchasing the following courses:\n\n';
                cart.forEach(item => {
                  text += `- ${item.title} (₹${item.price.toLocaleString()})\n`;
                });
                text += `\nSubtotal: ₹${cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}\n\n`;
                text += 'Is there any discount available? Please share the payment link so I can complete my purchase.';
                const encodedText = encodeURIComponent(text);
                window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
              }} className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#25D366]/30 transition-all flex justify-center items-center transform hover:-translate-y-0.5">
                Checkout via WhatsApp <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center"><Shield className="mr-1 w-3 h-3" /> SSL Encrypted Payment</p>
            </div>
          )}
        </div>
      </div>



      {/* Demo Modal */}
      <div className={cn(
        "fixed inset-0 z-[70] flex items-center justify-center p-4 transition-all duration-300",
        modals.demo ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
      )}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => closeModal('demo')}></div>
        <div className={cn(
          "bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative transition-transform duration-300",
          modals.demo ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        )}>
          <button onClick={() => closeModal('demo')} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 bg-slate-100 rounded-full p-1"><X className="w-5 h-5" /></button>
          <div className="p-8">
            <h2 className="text-3xl font-black mb-2">Book Free Demo</h2>
            <p className="text-slate-500 mb-6">Schedule your 15-minute free demo session.</p>
            
            <form onSubmit={(e) => { e.preventDefault(); alert('Demo booked successfully!'); closeModal('demo'); }} className="space-y-4">
              <input required type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none" />
              <input required type="tel" placeholder="Mobile Number" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none" />
              <input required type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none" />
              <div className="relative">
                <select required defaultValue="" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-slate-700 bg-white appearance-none">
                  <option value="" disabled>Select Subject for Demo</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
              </div>
              <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl shadow-md shadow-orange-500/20 hover:bg-orange-600 transition-colors mt-4 transform active:scale-[0.98]">
                Request Demo Session
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Partner Modal */}
      <div className={cn(
        "fixed inset-0 z-[70] flex items-center justify-center p-4 transition-all duration-300",
        modals.partner ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
      )}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => closeModal('partner')}></div>
        <div className={cn(
          "bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative transition-transform duration-300",
          modals.partner ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        )}>
          <button onClick={() => closeModal('partner')} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 bg-slate-100 rounded-full p-1"><X className="w-5 h-5" /></button>
          <div className="p-8">
            <h2 className="text-3xl font-black mb-2">Partner with Us</h2>
            <p className="text-slate-500 mb-6">Let's collaborate to upskill your students or team.</p>
            
            <form onSubmit={(e) => { e.preventDefault(); alert('Request submitted successfully!'); closeModal('partner'); }} className="space-y-4">
              <input required type="text" placeholder="Organization/College Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none" />
              <input required type="text" placeholder="Contact Person" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none" />
              <input required type="tel" placeholder="Mobile Number" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none" />
              <input required type="email" placeholder="Official Email Address" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none" />
              <div className="relative">
                <select required defaultValue="" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-slate-700 bg-white appearance-none">
                  <option value="" disabled>Partnership Type</option>
                  <option value="College Training">College Campus Training</option>
                  <option value="Corporate Training">Corporate Team Upskilling</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors mt-4 transform active:scale-[0.98]">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Blog Modal */}
      {activeBlog && (
        <div className={cn(
          "fixed inset-0 z-[80] overflow-y-auto bg-white transition-all duration-300",
          modals.blog ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        )}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative min-h-screen">
            <button onClick={() => closeModal('blog')} className="fixed top-6 right-6 md:absolute md:-right-12 md:top-12 bg-slate-100 p-3 rounded-full hover:bg-slate-200 text-slate-600 z-50 transition-colors">
              <X className="w-6 h-6" />
            </button>
            
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-md mb-6 inline-block">{activeBlog.category}</span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">{activeBlog.title}</h1>
            
            <div className="flex items-center space-x-4 mb-10 pb-10 border-b border-slate-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {activeBlog.author[0]}
              </div>
              <div>
                <p className="font-bold text-slate-900">{activeBlog.author}</p>
                <p className="text-sm text-slate-500">
                  <span>{new Date(activeBlog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span> • <span>{activeBlog.readTime}</span>
                </p>
              </div>
            </div>

            <div className="prose prose-lg prose-blue max-w-none text-slate-700">
              <p className="lead text-xl text-slate-600 font-medium mb-8">This article explores the critical aspects of mastering <span className="lowercase">{activeBlog.category}</span>, offering insights straight from industry trenches.</p>
              
              <div className="mb-6 space-y-6">
                {activeBlog.content.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              
              <h3 className="text-2xl font-bold mt-10 mb-4">Why this matters in 2026</h3>
              <p className="mb-6">The landscape is changing rapidly. What worked five years ago is now obsolete. By adopting these strategies, professionals can ensure they remain at the top of their game. Our dedicated live batches delve even deeper into these concepts.</p>
              
              <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100 mt-12 text-center">
                <h4 className="text-xl font-bold text-slate-900 mb-2">Want to master this live?</h4>
                <p className="text-slate-600 mb-6">Join our upcoming 15-student cohort with expert mentorship.</p>
                <button onClick={() => { closeModal('blog'); document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }); }} className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 transform hover:-translate-y-0.5">
                  View Live Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
