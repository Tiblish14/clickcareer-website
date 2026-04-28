export const CATEGORIES = ["Industry English", "Reasoning", "Excel", "Interview Prep"];

export const COURSES = [
    { id: 1, title: "Excel for GST & Accounting", category: "Excel", target: "B.Tech Students & Freshers", price: 2999, originalPrice: 6000, tags: ["Essential", "Best Seller"] },
    { id: 2, title: "Excel for Data Analytics", category: "Excel", target: "B.Tech Students", price: 3499, originalPrice: 7000, tags: ["Trending"] },
    { id: 3, title: "Industry-specific English for Engineers", category: "Industry English", target: "B.Tech Students", price: 2499, originalPrice: 5000, tags: ["Live Mentor"] },
    { id: 4, title: "How to speak in technical interviews", category: "Industry English", target: "Freshers", price: 1999, originalPrice: 4000, tags: [] },
    { id: 5, title: "Reasoning for Tech Placements", category: "Reasoning", target: "B.Tech Students", price: 3999, originalPrice: 8000, tags: ["TCS, Wipro, Infosys"] },
    { id: 6, title: "Advanced Logical Reasoning", category: "Reasoning", target: "B.Tech Students", price: 2999, originalPrice: 6000, tags: ["Campus Drives"] },
    { id: 7, title: "Complete B.Tech Interview Prep Combo", category: "Interview Prep", target: "B.Tech Students", price: 5999, originalPrice: 14000, isBundle: true, tags: ["Bundle Offer"] },
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
