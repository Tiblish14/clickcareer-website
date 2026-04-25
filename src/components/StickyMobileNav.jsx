import { useAppContext } from '../context/AppContext';

export default function StickyMobileNav() {
  const { cart, openModal, categories } = useAppContext();

  return (
    <div className="md:hidden fixed bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 flex px-4 py-3 justify-between items-center pb-safe">
      <select 
        onChange={(e) => {
            // Can be extended to update a global active tab if needed
            document.getElementById('courses').scrollIntoView({behavior: 'smooth'})
        }} 
        className="bg-slate-100 border-none rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-blue-600 max-w-[50%] outline-none"
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button 
        onClick={() => openModal('cart')} 
        className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-md flex items-center active:scale-95 transition-transform"
      >
        GO TO CART {cart.length > 0 && <span className="ml-1 bg-white/20 px-1.5 rounded-md">({cart.length})</span>}
      </button>
    </div>
  );
}
