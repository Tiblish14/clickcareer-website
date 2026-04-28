import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, CheckCircle, Shield, Play } from 'lucide-react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { supabase } from '../supabase';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function CourseDetailPage() {
  const { slug } = useParams();
  const { courses } = useAppContext();
  const { user, isSignedIn } = useUser();
  const clerk = useClerk();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // For now, using ID as slug from mockData
  const course = courses.find(c => c.id.toString() === slug || (c.slug && c.slug.current === slug));

  if (!course) {
    return (
      <div className="pt-32 pb-16 text-center min-h-[60vh]">
        <h1 className="text-3xl font-bold mb-4">Course not found</h1>
        <Link to="/courses" className="text-blue-600 hover:underline">Return to Courses</Link>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!isSignedIn) {
      if (window.gtag) {
        window.gtag('event', 'login_triggered', {
          course_title: course.title,
          course_id: course.id
        });
      }
      clerk.openSignIn();
    } else {
      setIsProcessing(true);
      const leadId = 'LID' + Math.floor(1000 + Math.random() * 9000);
      
      // Store lead in Supabase
      const { error } = await supabase.from('leads').insert({
        id: leadId,
        user_id: user.id,
        course_id: course.id.toString(),
        course_title: course.title,
        status: 'pending'
      });

      if (error) {
        console.error("Error creating lead:", error);
        // Continue anyway so the user can checkout
      }

      setIsProcessing(false);
      
      // Track event
      if (window.gtag) {
        window.gtag('event', 'checkout_click', {
          course_title: course.title,
          course_id: course.id,
          lead_id: leadId
        });
      }

      // Open WhatsApp
      const text = encodeURIComponent(`Hi, I found this course on ClickCareer and want to enroll in ${course.title}. My Lead ID is ${leadId}. Please guide me.`);
      window.open(`https://wa.me/917903817049?text=${text}`, '_blank');
    }
  };

  return (
    <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <Helmet>
        <title>{course.title} | ClickCareer</title>
        <meta name="description" content={`Enroll in ${course.title} and crack your technical interviews with ClickCareer.`} />
        <meta property="og:title" content={`${course.title} | ClickCareer`} />
        <meta property="og:description" content={`Enroll in ${course.title} and crack your technical interviews with ClickCareer.`} />
      </Helmet>
      <Link to="/courses" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to all courses
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="bg-blue-50 text-blue-700 text-sm font-bold px-3 py-1 rounded-full w-fit mb-6">
            {course.category}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            {course.title}
          </h1>
          
          <p className="text-xl text-slate-600 mb-8">
            Master the skills required to crack your next technical interview with this comprehensive, industry-focused course.
          </p>

          <div className="bg-slate-50 rounded-2xl p-6 mb-10 border border-slate-200">
            <h3 className="font-bold text-lg mb-4">What you'll learn:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {course.features?.map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircle className="text-green-500 w-5 h-5 mr-3 shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </div>
              )) || (
                <>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-3 shrink-0" />
                    <span className="text-slate-700">Practical application of concepts</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-3 shrink-0" />
                    <span className="text-slate-700">Interview preparation techniques</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Checkout Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 sticky top-24">
            <div className="mb-6">
              <span className="text-4xl font-black text-slate-900">₹{course.price.toLocaleString()}</span>
              {course.originalPrice && (
                <span className="text-lg text-slate-400 line-through ml-3">₹{course.originalPrice.toLocaleString()}</span>
              )}
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-600/30 transform hover:-translate-y-0.5 mb-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
            </button>
            
            <p className="text-xs text-center text-slate-500 mb-6">
              Secure checkout via WhatsApp. 100% money-back guarantee.
            </p>
            
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex items-center text-sm text-slate-600">
                <Shield className="w-5 h-5 text-blue-500 mr-3" /> Secure payment processing
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <Play className="w-5 h-5 text-orange-500 mr-3" /> Lifetime access to recordings
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
