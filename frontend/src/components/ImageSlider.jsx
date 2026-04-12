import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ImageSlider = ({ slides = [], autoPlay = true, autoPlayInterval = 4500 }) => {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const intervalRef = useRef(null);

  if (!Array.isArray(slides) || slides.length === 0) return null;

  const prev = () => setIndex((s) => (s - 1 + slides.length) % slides.length);
  const next = () => setIndex((s) => (s + 1) % slides.length);
  const goTo = (i) => setIndex(i % slides.length);

  // Auto-play logic
  useEffect(() => {
    if (!playing) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((s) => (s + 1) % slides.length);
    }, autoPlayInterval);
    return () => clearInterval(intervalRef.current);
  }, [playing, slides.length, autoPlayInterval]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === " ") setPlaying((p) => !p);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="w-full relative m-0">
      <div
        className="relative overflow-hidden rounded-3xl shadow-2xl bg-gray-100 dark:bg-gray-800"
        onMouseEnter={() => setPlaying(false)}
        onMouseLeave={() => setPlaying(autoPlay)}
      >
        {/* Slides container */}
        <div
          className="w-full aspect-[16/9] md:aspect-[16/10] lg:aspect-[21/9] grid grid-flow-col auto-cols-[100%] transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
            >
              <img
                src={slide.src}
                alt={slide.alt || `slide-${i}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
              {/* Theme-aware overlay */}
              <div
                className={`absolute inset-0 transition-all duration-500 ${
                  theme === "dark" ? "bg-black/40" : "bg-white/20"
                }`}
              ></div>
              {/* Caption */}
              {slide.caption && (
                <div className="absolute left-6 bottom-6 p-4 rounded-xl bg-black/30 dark:bg-gray-900/30 backdrop-blur-sm text-white font-semibold text-sm md:text-lg">
                  {slide.caption}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-full shadow hover:scale-105 transition-transform duration-200 text-gray-900 dark:text-white"
          onClick={prev}
        >
          <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
        </button>
        <button
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-full shadow hover:scale-105 transition-transform duration-200 text-gray-900 dark:text-white"
          onClick={next}
        >
          <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
        </button>

        {/* Play/Pause toggle */}
        <button
          aria-label="Toggle play"
          className="absolute right-4 bottom-4 z-20 p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-full shadow hover:scale-105 transition-transform duration-200 text-gray-900 dark:text-white"
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? (
            <Pause className="w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <Play className="w-5 h-5 md:w-6 md:h-6" />
          )}
        </button>

        {/* Indicators */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-200 ${
                i === index
                  ? "bg-white dark:bg-white scale-110"
                  : "bg-white/60 dark:bg-white/20"
              }`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
