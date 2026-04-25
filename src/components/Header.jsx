import { useState } from 'react';
import { ChevronDown, User, ShoppingCart, Menu, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, openModal, categories } = useAppContext();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              ClickCareer.
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center font-medium text-sm text-slate-700">
            <div className="relative group cursor-pointer h-16 flex items-center">
              <span className="hover:text-blue-600 flex items-center transition-colors">Courses <ChevronDown className="ml-1 w-4 h-4" /></span>
              <div className="absolute top-16 left-0 w-48 bg-white border border-slate-200 shadow-xl rounded-b-xl py-2 hidden group-hover:block transition-all">
                {categories.map(cat => (
                  <div 
                    key={cat}
                    onClick={() => document.getElementById('courses').scrollIntoView({behavior: 'smooth'})} 
                    className="px-4 py-2 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => scrollToSection('about')} className="hover:text-blue-600 transition-colors">Who Are We</button>
            <button onClick={() => scrollToSection('blogs')} className="hover:text-blue-600 transition-colors">Blogs</button>
            <button onClick={() => openModal('partner')} className="hover:text-blue-600 text-orange-500 font-semibold transition-colors">Partner for Training</button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center text-slate-700 hover:text-blue-600 font-medium text-sm transition-colors">
                  <User className="mr-1.5 w-4 h-4" /> Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8" } }} />
            </SignedIn>
            <button onClick={() => openModal('cart')} className="relative text-slate-700 hover:text-blue-600 transition-colors group">
              <ShoppingCart className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center animate-bounce">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => openModal('cart')} className="relative text-slate-700">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-700 hover:bg-slate-100 p-1 rounded-lg transition-colors">
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className={cn("md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200 py-4 px-4 shadow-lg absolute w-full transition-all duration-300 origin-top", isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none")}>
        <div className="flex flex-col space-y-4 font-medium text-slate-700">
          <button onClick={() => scrollToSection('courses')} className="text-left py-2 border-b border-slate-100">Courses</button>
          <button onClick={() => scrollToSection('about')} className="text-left py-2 border-b border-slate-100">Who Are We</button>
          <button onClick={() => scrollToSection('blogs')} className="text-left py-2 border-b border-slate-100">Blogs</button>
          <SignedOut>
            <SignInButton mode="modal">
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-left flex items-center py-2 text-blue-600 font-semibold">
                <User className="mr-2 w-4 h-4" /> Sign In / Register
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="py-2 flex items-center space-x-3">
              <UserButton /> <span className="text-slate-700 font-semibold">My Account</span>
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
