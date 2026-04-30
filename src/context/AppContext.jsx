import { createContext, useContext, useState, useEffect } from 'react';
import { client } from '../lib/sanityClient';
import { BLOGS, CATEGORIES, COURSES } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('clickcareer_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [modals, setModals] = useState({
    cart: false,
    auth: false,
    demo: false,
    partner: false,
    blog: false
  });
  const [activeBlogId, setActiveBlogId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [siteSettings, setSiteSettings] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cats, crs, blgs, settings] = await Promise.all([
          client.fetch(`*[_type == "category"]{_id, title, description}`),
          client.fetch(`*[_type == "course"]{_id, title, slug, price, "category": category->title, isPremium, targetAudience, features}`),
          client.fetch(`*[_type == "blog"]{_id, title, slug, "category": category->title, author, date, readTime, content, seoTitle, seoDescription}`),
          client.fetch(`*[_type == "siteSettings"][0]`)
        ]);
        setCategories(cats.length ? cats.map(c => c.title) : CATEGORIES);
        setCourses(crs.length ? crs.map(c => ({...c, id: c._id})) : COURSES);
        setBlogs(blgs.length ? blgs.map(b => ({...b, id: b._id})) : BLOGS);
        setSiteSettings(settings);
      } catch (err) {
        console.error("Error fetching Sanity data:", err);
        setCategories(CATEGORIES);
        setCourses(COURSES);
        setBlogs(BLOGS);
      } finally {
        setDataLoading(false);
      }
    }
    fetchData();
  }, []);

    // Cart initialization moved to state declaration

  useEffect(() => {
    localStorage.setItem('clickcareer_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (course) => {
    setCart(prev => {
      if (prev.find(item => item.id === course.id)) return prev;
      return [...prev, course];
    });
  };

  const removeFromCart = (courseId) => {
    setCart(prev => prev.filter(c => c.id !== courseId));
  };

  const clearCart = () => setCart([]);

  const openModal = (modalName) => setModals(prev => ({ ...prev, [modalName]: true }));
  const closeModal = (modalName) => setModals(prev => ({ ...prev, [modalName]: false }));

  const openBlog = (id) => {
    setActiveBlogId(id);
    openModal('blog');
  };

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, clearCart,
      modals, openModal, closeModal,
      activeBlogId, openBlog,
      categories, courses, blogs, siteSettings, dataLoading
    }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  return useContext(AppContext);
}
