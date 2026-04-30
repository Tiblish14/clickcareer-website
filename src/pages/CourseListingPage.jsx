import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { User, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';

export default function CourseListingPage() {
  const { categories, courses, dataLoading } = useAppContext();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(categories[0]);
    }
  }, [categories, activeTab]);

  const filteredCourses = courses.filter(c => c.category === activeTab);

  return (
    <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
          Explore Our <span className="text-blue-600">Courses</span>
        </h1>
        <p className="text-slate-600 mt-4 text-lg max-w-2xl mx-auto">
          Job-ready courses in English, Reasoning, and Excel to help you crack technical interviews.
        </p>
      </div>

      <div className="flex space-x-2 md:justify-center overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0 mb-10">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={cn(
              "px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-200 transform hover:scale-105",
              activeTab === cat 
                ? "bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-md" 
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {dataLoading ? (
        <div className="text-center py-20 text-slate-500">
          <span className="animate-pulse bg-slate-200 h-8 w-8 rounded-full inline-block mb-4"></span>
          <p>Loading courses...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              New cohorts for {activeTab} launching soon. Stay tuned!
            </div>
          ) : (
            filteredCourses.map(course => (
              <div key={course.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-2xl hover:border-blue-100 transition-all duration-300 group flex flex-col h-full transform hover:-translate-y-1">
                <div className="flex justify-between items-start mb-6">
                  {course.isPremium ? (
                    <span className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full flex items-center">
                      <Star className="w-3 h-3 mr-1 fill-current" /> Premium
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Most Popular</span>
                  )}
                  <span className="text-2xl font-black text-slate-900">₹{course.price.toLocaleString()}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors leading-tight">{course.title}</h3>
                <p className="text-slate-500 text-sm mb-6 flex items-center">
                  <User className="w-4 h-4 mr-2" /> {course.targetAudience || 'B.Tech Students'}
                </p>
                
                <div className="flex-1 space-y-3 mb-8">
                  {course.features?.map((feature, i) => (
                    <div key={i} className="flex items-start text-sm text-slate-600">
                      <CheckCircle className="text-green-500 w-4 h-4 mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  to={`/courses/${course.slug?.current || course.id}`}
                  className="w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all duration-300 bg-slate-900 text-white hover:bg-blue-600 hover:shadow-lg group"
                >
                  View Course Details <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}
