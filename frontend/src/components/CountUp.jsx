import { useEffect, useRef, useState } from "react";

export default function CountUp({
  end = 0,
  duration = 1500,
  start = 0,
  suffix = "",
  separators = true,
  decimalPlaces = 0,
}) {
  const [value, setValue] = useState(start);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const startedRef = useRef(false);
  const observerRef = useRef(null);
  const nodeRef = useRef(null);

  useEffect(() => {
    setValue(start);
  }, [end]);

  useEffect(() => {
    const element = nodeRef.current;
    if (!element) return;

    const startAnimation = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      startRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      const step = (timestamp) => {
        if (!startRef.current) startRef.current = timestamp;
        const progress = Math.min((timestamp - startRef.current) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * eased;
        if (decimalPlaces > 0) {
          setValue(Number(current.toFixed(decimalPlaces)));
        } else {
          setValue(Math.round(current));
        }
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        }
      };

      rafRef.current = requestAnimationFrame(step);
    };

    if ("IntersectionObserver" in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startAnimation();
              if (observerRef.current) observerRef.current.unobserve(element);
            }
          });
        },
        { threshold: 0.4 }
      );
      observerRef.current.observe(element);
    } else {
      startAnimation();
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [end, duration, start, decimalPlaces]);

  const format = (num) => {
    if (decimalPlaces > 0) return num.toFixed(decimalPlaces);
    if (!separators) return String(num);
    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <span ref={nodeRef} className="inline-block font-bold">
      {format(value)}
      {suffix}
    </span>
  );
}
