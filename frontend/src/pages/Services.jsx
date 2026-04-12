import React, { useEffect } from 'react';
import ServicesSection from '../components/ServicesSection';
import { useLocation } from 'react-router-dom';

export default function Services() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  return (
    <div>
      <ServicesSection />
    </div>
  );
}
