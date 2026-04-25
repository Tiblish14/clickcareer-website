import { FAQS } from '../data/mockData';

export default function FAQSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <details key={i} className="group bg-slate-50 rounded-2xl border border-slate-200 [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-slate-900 font-semibold focus:outline-none rounded-2xl focus:ring-2 focus:ring-blue-500">
                <h2 className="font-medium text-lg">{faq.q}</h2>
                <span className="shrink-0 rounded-full bg-white p-1.5 text-slate-900 sm:p-3 shadow-sm group-open:-rotate-45 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-600 leading-relaxed animate-in fade-in slide-in-from-top-4 duration-300">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
