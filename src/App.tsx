import { useEffect } from 'react';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import OperationalManifesto from './components/OperationalManifesto';
import Services from './components/Services';
import IndustriesWeServe from './components/IndustriesWeServe';
import WhatsAppReceptionistProduct from './components/WhatsAppReceptionistProduct';
import Showcase from './components/Showcase';
import WhyUs from './components/WhyUs';
import ClientResults from './components/ClientResults';
import CaseStudies from './components/CaseStudies';
import Process from './components/Process';
import Insights from './components/Insights';
import Testimonials from './components/Testimonials';
import TechStack from './components/TechStack';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';

export default function App() {
  useEffect(() => {
    // Elegant viewport scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    // Dynamic Mutation Observer to hook up newly added or changed elements
    const mutationObserver = new MutationObserver(() => {
      const refreshedElements = document.querySelectorAll('.reveal:not(.visible)');
      refreshedElements.forEach((el) => observer.observe(el));
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const seoMap: Record<string, { title: string; desc: string; canonical: string }> = {
      default: {
        title: 'ShelSunTech | AI WhatsApp Receptionist, Business Automation & Website Development',
        desc: 'ShelSunTech builds AI WhatsApp Receptionists, business automation solutions and modern websites',
        canonical: 'https://shelsuntech.com/',
      },
      services: {
        title: 'AI Solutions & Website Development | ShelSunTech',
        desc: 'Scale your business operations with our custom AI development, modern high-performance websites, and intelligent automation pipelines.',
        canonical: 'https://shelsuntech.com/services',
      },
      products: {
        title: 'AI Products | ShelSunTech',
        desc: 'Deploy cutting-edge AI products like our automated WhatsApp receptionist to convert leads, manage queries, and automate workflow 24/7.',
        canonical: 'https://shelsuntech.com/products',
      },
      portfolio: {
        title: 'Our Work | ShelSunTech',
        desc: 'Explore our portfolio of high-performance custom web applications, automation pipelines, and intelligent AI solutions.',
        canonical: 'https://shelsuntech.com/portfolio',
      },
      about: {
        title: 'About ShelSunTech',
        desc: 'ShelSunTech is a top-tier software engineering agency specializing in custom AI systems, automation pipelines, and modern websites.',
        canonical: 'https://shelsuntech.com/about',
      },
      contact: {
        title: 'Contact ShelSunTech',
        desc: 'Get in touch with the ShelSunTech expert engineering team to discuss your custom AI automation, WhatsApp receptionist, or web development project.',
        canonical: 'https://shelsuntech.com/contact',
      },
    };

    const updateSEO = (key: string) => {
      const seo = seoMap[key] || seoMap.default;
      document.title = seo.title;

      // Update meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', seo.desc);
      }

      // Update og:title
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', seo.title);
      }

      // Update og:description
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', seo.desc);
      }

      // Update og:url
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', seo.canonical);
      }

      // Update twitter:title
      const twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) {
        twTitle.setAttribute('content', seo.title);
      }

      // Update twitter:description
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) {
        twDesc.setAttribute('content', seo.desc);
      }

      // Update canonical link
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', seo.canonical);
    };

    // Track active section using IntersectionObserver
    const sections = ['services', 'products', 'cases', 'why', 'contact'];
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'why') {
              updateSEO('about');
            } else if (id === 'cases') {
              updateSEO('portfolio');
            } else if (id === 'products') {
              updateSEO('products');
            } else {
              updateSEO(id);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '-10% 0px -55% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    // Also observe the hero / top of page
    const heroEl = document.getElementById('hero');
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateSEO('default');
          }
        });
      },
      { threshold: 0.1 }
    );
    if (heroEl) heroObserver.observe(heroEl);

    // Initial check from location hash or path
    const hash = window.location.hash.replace('#', '');
    if (hash === 'why' || hash === 'about') {
      updateSEO('about');
    } else if (hash === 'cases' || hash === 'portfolio') {
      updateSEO('portfolio');
    } else if (hash && seoMap[hash]) {
      updateSEO(hash);
    } else {
      updateSEO('default');
    }

    const handleHashChange = () => {
      const h = window.location.hash.replace('#', '');
      if (h === 'why' || h === 'about') {
        updateSEO('about');
      } else if (h === 'cases' || h === 'portfolio') {
        updateSEO('portfolio');
      } else if (h && seoMap[h]) {
        updateSEO(h);
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      sectionObserver.disconnect();
      heroObserver.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B0F14] text-[#F0F4FA] selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Custom Liquid cursor */}
      <Cursor />

      {/* Floating glass header */}
      <Navbar />

      {/* Landing coordinates */}
      <main>
        <Hero />
        <WhatsAppReceptionistProduct />
        <TrustedBy />
        <OperationalManifesto />
        <IndustriesWeServe />
        <Showcase />
        <Services />
        <WhyUs />
        <ClientResults />
        <CaseStudies />
        <Process />
        <Insights />
        <Testimonials />
        <TechStack />
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp chat widget */}
      <WhatsAppFloatingButton />
    </div>
  );
}
