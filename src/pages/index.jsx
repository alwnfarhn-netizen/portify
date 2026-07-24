import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import PricingCard from '../components/PricingCard';
import CommentsSection from '../components/CommentsSection';
import ContactSection from '../components/ContactSection';

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <PricingCard />
        <CommentsSection />
        <ContactSection />
      </main>
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p>&copy; {new Date().getFullYear()} Portify.id. All rights reserved.</p>
      </footer>
    </div>
  );
}
