import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Hero from './components/Hero';
import CourseCatalog from './components/CourseCatalog';
import AboutSection from './components/AboutSection';
import BlogSection from './components/BlogSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import StickyMobileNav from './components/StickyMobileNav';
import Modals from './components/Modals';

function App() {
  return (
    <AppProvider>
      <div className="bg-slate-50 font-sans text-slate-900 pb-16 md:pb-0 overflow-x-hidden min-h-screen">
        <Header />
        <main>
          <Hero />
          <CourseCatalog />
          <AboutSection />
          <BlogSection />
          <FAQSection />
        </main>
        <Footer />
        <StickyMobileNav />
        <Modals />
      </div>
    </AppProvider>
  );
}

export default App;
