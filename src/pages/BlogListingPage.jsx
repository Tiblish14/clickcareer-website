import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function BlogListingPage() {
  const { blogs } = useAppContext();

  return (
    <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Helmet>
        <title>Blogs & Career Insights | ClickCareer</title>
        <meta name="description" content="Read our latest articles on B.Tech placements, interview preparation, and technical skill development." />
        <link rel="canonical" href="https://www.clickcareer.in/blogs" />
        <meta property="og:title" content="Blogs & Career Insights | ClickCareer" />
        <meta property="og:description" content="Read our latest articles on B.Tech placements, interview preparation, and technical skill development." />
        <meta property="og:url" content="https://www.clickcareer.in/blogs" />
        <meta property="og:image" content="https://www.clickcareer.in/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
          Career Insights & <span className="text-blue-600">Resources</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Read our latest articles on B.Tech placements, interview preparation, and technical skill development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link 
            key={blog.id} 
            to={`/blogs/${blog.slug?.current || blog.id}`}
            onClick={() => {
              if (window.gtag) {
                window.gtag('event', 'blog_click', {
                  blog_title: blog.title,
                  blog_id: blog.id
                });
              }
            }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
          >
            <div className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
              {blog.category}
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
              {blog.title}
            </h3>
            
            <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-grow">
              {blog.content ? blog.content.substring(0, 120) : ""}...
            </p>
            
            <div className="flex items-center text-xs text-slate-500 gap-4 mb-4">
              <span className="flex items-center"><User className="w-3 h-3 mr-1" /> {blog.author || 'ClickCareer'}</span>
              <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {blog.date || new Date().toLocaleDateString()}</span>
            </div>
            
            <div className="mt-auto flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
              Read Article <ArrowRight className="ml-1 w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
