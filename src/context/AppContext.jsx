import { createContext, useContext, useState, useEffect } from 'react';
import { client } from '../lib/sanityClient';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
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
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cats, crs, blgs] = await Promise.all([
          client.fetch(`*[_type == "category"]{_id, title, description}`),
          client.fetch(`*[_type == "course"]{_id, title, slug, price, "category": category->title, isPremium, targetAudience, features}`),
          client.fetch(`*[_type == "blog"]{_id, title, slug, "category": category->title, author, date, readTime, content, seoTitle, seoDescription}`)
        ]);
        setCategories(cats.map(c => c.title));
        setCourses(crs.map(c => ({...c, id: c._id})));
        setBlogs(blgs.map(b => ({...b, id: b._id})));
      } catch (err) {
        console.error("Error fetching Sanity data:", err);
      } finally {
        setDataLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('clickcareer_cart');
      if (saved) setCart(JSON.parse(saved));
    } catch (e) {}
  }, []);

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
      categories, courses, blogs, dataLoading
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
