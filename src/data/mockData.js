export const CATEGORIES = ["IT Skills", "Quantitative Aptitude", "English", "Reasoning", "GST"];

export const COURSES = [
    { id: 1, title: "MS Office Mastery (Word, Excel, PPT)", category: "IT Skills", target: "Students & Professionals", price: 2999, originalPrice: 6000, tags: ["Essential", "Best Seller"] },
    { id: 2, title: "AI Prompt Engineering", category: "IT Skills", target: "Future-Proof Careers", price: 3499, originalPrice: 7000, tags: ["Trending", "Limited Seats"] },
    { id: 8, title: "Digital Marketing & Social Media", category: "IT Skills", target: "Entrepreneurs & Creators", price: 4999, originalPrice: 10000, tags: ["Live Mentor"] },
    { id: 9, title: "Safe Digital Practices & Cyber Security", category: "IT Skills", target: "Everyone", price: 1999, originalPrice: 4000, tags: [] },
    { id: 10, title: "Quant for Campus Placements", category: "Quantitative Aptitude", target: "B.Tech Students", price: 3999, originalPrice: 8000, tags: ["TCS, Wipro, Infosys"] },
    { id: 11, title: "SSC CGL Quant Mastery", category: "Quantitative Aptitude", target: "SSC Aspirants", price: 4999, originalPrice: 10000, tags: ["Taught by AIR 9", "Best Seller"] },
    { id: 12, title: "Logical Reasoning for Tech MNCs", category: "Reasoning", target: "B.Tech Students", price: 2999, originalPrice: 6000, tags: ["Campus Drives"] },
    { id: 13, title: "Target SSC Reasoning Pro", category: "Reasoning", target: "SSC Aspirants", price: 3499, originalPrice: 7000, tags: ["Taught by AIR 9"] },
    { id: 4, title: "Spoken English Pro", category: "English", target: "Professionals & Students", price: 2999, originalPrice: 5000, tags: ["Interactive"] },
    { id: 14, title: "Grammar & Vocab for Exams", category: "English", target: "SSC / Bank PO", price: 2499, originalPrice: 5000, tags: ["Taught by AIR 9"] },
    { id: 15, title: "Advanced Vocab for Professionals", category: "English", target: "Corporate Professionals", price: 3499, originalPrice: 7000, tags: ["Business Focus"] },
    { id: 6, title: "Mastering GST 2026", category: "GST", target: "CA/CS & Accountants", price: 6999, originalPrice: 15000, isPremium: true, bonus: "Free Excel for Audit Module", tags: ["Premium"] },
    { id: 7, title: "B.Tech Campus Placement Combo", category: "Quantitative Aptitude", target: "B.Tech Students", price: 5999, originalPrice: 14000, isBundle: true, tags: ["Bundle Offer"] },
];

export const BLOGS = Array.from({ length: 40 }).map((_, i) => ({
    id: i + 1,
    title: `Ultimate Guide to ${CATEGORIES[i % CATEGORIES.length]} - Part ${Math.floor(i / 5) + 1}`,
    category: CATEGORIES[i % CATEGORIES.length],
    author: "Industry Expert",
    date: "Apr 2026",
    readTime: `${Math.floor(Math.random() * 5) + 3} min read`,
    content: `This is a comprehensive, full-length expert article on ${CATEGORIES[i % CATEGORIES.length]}. It covers advanced techniques, practical applications, and industry secrets gathered from over 10 years of experience. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
}));

export const FAQS = [
    { q: "How do live classes work?", a: "Classes are conducted on our HD platform. You can ask doubts directly using voice or chat. Maximum 15 students per batch." },
    { q: "Do I get lifetime access?", a: "Yes, all recorded sessions and study materials are available to you for a lifetime." },
    { q: "What is the refund policy?", a: "We offer a 7-day money-back guarantee. If you are not satisfied, we refund 100% no questions asked." },
    { q: "Are the mentors real industry professionals?", a: "Absolutely. Our mentors have 10+ years of experience working in top MNCs and Big 4 firms." }
];
