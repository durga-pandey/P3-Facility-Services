import React from "react";
import { motion } from "framer-motion";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useLocation } from "react-router-dom";
import axios from "axios";

const WhyChoose = () => {
  const location = useLocation();
  const { id } = location.state || {};

  const [pageData, setPageData] = useState(null);

  // Hero animation states
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [displayedWords, setDisplayedWords] = useState([]);
  const [fade, setFade] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const heroRef = useRef(null);

  useEffect(() => {
    const fetchSingle = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/pageContent/${id}`
        );

        const data = res.data.data;
        setPageData(data);

        const heroWords = data.sections.find((s) => s.type === "hero")?.hero
          ?.animatedWords;
        setWords(
          heroWords && heroWords.length
            ? heroWords
            : ["Quality", "Assured", "Security", "Service"]
        );
      } catch (err) {
        console.log("Single API Error:", err);
        setWords(["Quality", "Assured", "Security", "Service"]);
      }
    };

    if (id) fetchSingle();
  }, [id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);

    return () => heroRef.current && observer.unobserve(heroRef.current);
  }, []);

  useEffect(() => {
    if (!isVisible || words.length === 0) return;

    let timeout;
    if (index < words.length) {
      timeout = setTimeout(() => {
        setDisplayedWords((prev) => [...prev, words[index]]);
        setIndex((prev) => prev + 1);
      }, 1000);
    } else {
      timeout = setTimeout(() => {
        setFade(false);
        setTimeout(() => {
          setDisplayedWords([]);
          setIndex(0);
          setFade(true);
        }, 500);
      }, 1500);
    }

    return () => clearTimeout(timeout);
  }, [index, isVisible, words]);

  if (!pageData) return <div>Loading...</div>;

  // Sections
  const heroSection = pageData.sections.find((s) => s.type === "hero")?.hero;
  const descSection = pageData.sections.find(
    (s) => s.type === "description"
  )?.description;
  const trustSection = pageData.sections.find((s) => s.type === "trust")?.trust;

  // Use features, testimonials, badges safely
  const features = descSection?.features || [];
  const columns = descSection?.columns || [];
  const testimonials = trustSection?.testimonials || [];
  const stats = trustSection?.stats || [];
  const badges = trustSection?.badges || [];
  return (
    <div>
      <section
        ref={heroRef}
        className="relative w-full h-[75vh] md:h-[85vh] flex items-center justify-center overflow-hidden shadow-2xl bg-black"
      >
        <div className="absolute inset-0">
          <img
            src={
              heroSection?.backgroundImage?.secure_url ||
              "/images/security-sqaure.png"
            }
            alt="security-bg"
            className="w-full h-full object-cover opacity-70"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto text-center px-6"
        >
          <h1 className="text-xl md:text-3xl uppercase lg:text-5xl font-black text-white dark:text-gray-100 mb-8 leading-[0.9] tracking-tight">
            <span
              className={`block mb-2 transition-opacity duration-500 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              {displayedWords.slice(0, 2).join(" ")}
            </span>
            <span
              className={`bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 dark:from-yellow-300 dark:via-orange-300 dark:to-red-300 bg-clip-text text-transparent transition-opacity duration-500 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              {displayedWords.slice(2).join(" ")}
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            {heroSection?.tagline}
          </p>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button className="px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/40 hover:-translate-y-1">
              Get a Quote
            </button>

            <button className="px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold border border-white/40 text-white hover:bg-white/10 backdrop-blur-md transition-all hover:-translate-y-1">
              Contact Us
            </button>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />
      </section>

      {/* DESCRIPTION SECTION */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
              {descSection?.heading}
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
              {descSection?.subheading}
            </p>
          </motion.div>

          {/* Columns */}
          <div className="mt-16 flex flex-col gap-12">
            {columns.map((col, i) => (
              <motion.div
                key={col._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  i % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Description */}
                <div className="md:w-1/2">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {col.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {col.content}
                  </p>
                </div>

                {/* Image */}
                <div className="md:w-1/2 w-full h-full">
                  {col.image?.secure_url && (
                    <img
                      src={col.image.secure_url}
                      alt={col.title}
                      className="w-full h-[320px] object-cover rounded-3xl shadow-2xl"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-200/50 dark:border-gray-700/40"
              >
                {item.icon?.secure_url && (
                  <img
                    src={item.icon.secure_url}
                    alt={item.title}
                    className="w-12 h-12 mb-4"
                  />
                )}
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              {trustSection?.heading}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              {trustSection?.subheading}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16 text-center">
            {stats.map((stat) => (
              <div key={stat._id}>
                <div
                  className={`text-4xl md:text-5xl font-bold text-yellow-400`}
                >
                  <CountUp end={stat.value} duration={2} />
                  {stat.suffix}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {testimonials.map((t) => (
              <div
                key={t._id}
                className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all"
              >
                <p className="text-gray-700 dark:text-gray-300 italic">
                  “{t.quote}”
                </p>
                <div className="mt-6 flex items-center gap-4">
                  {t.avatar?.secure_url && (
                    <img
                      src={t.avatar.secure_url}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {t.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-6">
            {badges.map((b) => (
              <div
                key={b._id}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full shadow-md text-gray-800 dark:text-gray-200"
              >
                {b.icon?.secure_url && (
                  <img
                    src={b.icon.secure_url}
                    alt={b.text}
                    className="w-6 h-6"
                  />
                )}
                <span className="text-sm font-medium">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChoose;
