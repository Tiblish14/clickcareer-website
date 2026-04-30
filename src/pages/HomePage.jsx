import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import CourseCatalog from '../components/CourseCatalog';
import AboutSection from '../components/AboutSection';
import BlogSection from '../components/BlogSection';
import FAQSection from '../components/FAQSection';

export default function HomePage() {
  return (
    <main>
      <Helmet>
        <title>ClickCareer | B.Tech Interview Prep, Industry English, Reasoning & Excel Skills</title>
        <meta name="description" content="ClickCareer helps B.Tech students prepare for interviews with industry-specific English, reasoning, and Excel skills for GST and accounting jobs. Start learning and connect via WhatsApp." />
        <link rel="canonical" href="https://www.clickcareer.in/" />
        <meta property="og:title" content="ClickCareer | B.Tech Interview Prep, Industry English, Reasoning & Excel Skills" />
        <meta property="og:description" content="ClickCareer helps B.Tech students prepare for interviews with industry-specific English, reasoning, and Excel skills for GST and accounting jobs. Start learning and connect via WhatsApp." />
        <meta property="og:url" content="https://www.clickcareer.in/" />
        <meta property="og:image" content="https://www.clickcareer.in/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ClickCareer | B.Tech Interview Prep, Industry English, Reasoning & Excel Skills" />
        <meta name="twitter:description" content="ClickCareer helps B.Tech students prepare for interviews with industry-specific English, reasoning, and Excel skills for GST and accounting jobs. Start learning and connect via WhatsApp." />
        <meta name="twitter:image" content="https://www.clickcareer.in/og-image.jpg" />
      </Helmet>
      <Hero />
      <CourseCatalog />
      <AboutSection />
      <BlogSection />
      <FAQSection />
    </main>
  );
}
