import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { blogs } = useAppContext();
  
  // Try matching Sanity slug first, then fallback to ID
  const blog = blogs.find(b => (b.slug && b.slug.current === slug) || b.id.toString() === slug);
  const blogUrl = `https://www.clickcareer.in/blogs/${slug}`;

  if (!blog) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog not found</h1>
        <Link to="/blogs" className="text-blue-600 hover:underline">Return to Blogs</Link>
      </div>
    );
  }

  return (
    <article className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <Helmet>
        <title>{blog.seoTitle || blog.title} | ClickCareer</title>
        <meta name="description" content={blog.seoDescription || `Read ${blog.title} by ${blog.author} on ClickCareer.`} />
        <link rel="canonical" href={blogUrl} />
        <meta property="og:title" content={`${blog.seoTitle || blog.title} | ClickCareer`} />
        <meta property="og:description" content={blog.seoDescription || `Read ${blog.title} by ${blog.author} on ClickCareer.`} />
        <meta property="og:url" content={blogUrl} />
        <meta property="og:image" content="https://www.clickcareer.in/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Link to="/blogs" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
      </Link>
      
      <div className="bg-blue-50 text-blue-700 text-sm font-bold px-3 py-1 rounded-full w-fit mb-6">
        {blog.category}
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
        {blog.title}
      </h1>
      
      <div className="flex flex-wrap items-center gap-6 text-slate-500 mb-10 pb-10 border-b border-slate-200">
        <div className="flex items-center">
          <User className="w-5 h-5 mr-2" />
          <span className="font-medium text-slate-700">{blog.author}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          <span>{blog.date}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          <span>{blog.readTime}</span>
        </div>
      </div>
      
      <div className="prose prose-lg prose-blue max-w-none text-slate-700">
        {/* Simulating Markdown rendering */}
        {blog.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="mb-6">{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
