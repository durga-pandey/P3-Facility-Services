import React, { useEffect } from "react";
import ClientsSection from "../components/ClientsSection";
import { useLocation } from "react-router-dom";

export default function Clients() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  return (
    <div>
      <ClientsSection />
    </div>
  );
}
