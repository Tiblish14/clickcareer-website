import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyMobileNav from './components/StickyMobileNav';
import Modals from './components/Modals';

import HomePage from './pages/HomePage';
import BlogListingPage from './pages/BlogListingPage';
import BlogDetailPage from './pages/BlogDetailPage';
import CourseListingPage from './pages/CourseListingPage';
import CourseDetailPage from './pages/CourseDetailPage';
import DashboardPage from './pages/DashboardPage';
import SyncUser from './components/SyncUser';

function App() {
  return (
    <AppProvider>
      <SyncUser />
      <div className="bg-slate-50 font-sans text-slate-900 pb-16 md:pb-0 overflow-x-hidden min-h-screen">
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogListingPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />
          <Route path="/courses" element={<CourseListingPage />} />
          <Route path="/courses/:slug" element={<CourseDetailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>

        <Footer />
        <StickyMobileNav />
        <Modals />
      </div>
    </AppProvider>
  );
}

export default App;
