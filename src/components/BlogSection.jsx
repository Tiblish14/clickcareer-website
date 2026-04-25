import { useState } from 'react';
import { Search, ArrowRight, Clock, Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function BlogSection() {
  const [query, setQuery] = useState('');
  const { openBlog, blogs, dataLoading } = useAppContext();

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(query.toLowerCase()) || 
    b.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section id="blogs" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Expert Resources</h2>
            <p className="text-slate-600 mt-2 text-lg">Explore our library of expert articles.</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              id="blog-search" 
              placeholder="Search topics..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" 
            />
          </div>
        </div>

        {dataLoading ? (
          <div className="text-center py-10 text-slate-500">
            <span className="animate-pulse bg-slate-200 h-8 w-8 rounded-full inline-block mb-4"></span>
            <p>Loading blogs...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => (
              <div 
                key={blog.id} 
                className="bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-2xl transition-all cursor-pointer group flex flex-col h-full transform hover:-translate-y-2 hover:border-blue-100"
                onClick={() => openBlog(blog.id)}
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">{blog.category}</span>
                  <span className="text-xs text-slate-400 flex items-center font-medium"><Clock className="w-3 h-3 mr-1" /> {blog.readTime}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors leading-snug">{blog.title}</h3>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                  <span className="text-sm font-medium text-slate-500 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                    {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-blue-600 font-bold group-hover:translate-x-2 transition-transform flex items-center text-sm">
                    Read Article <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
