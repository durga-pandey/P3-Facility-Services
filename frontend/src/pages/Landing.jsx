import { Link } from "react-router-dom";
import {
  Shield,
  CheckCircle,
  Target,
  Users,
  Clock,
  Award,
  ArrowRight,
  Star,
  Globe,
} from "lucide-react";
import CountUp from "../components/CountUp";
import ImageSlider from "../components/ImageSlider";
import ServicesSection from "../components/ServicesSection";
import ClientsSection from "../components/ClientsSection";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

// Feature icons mapping
const featureIcons = {
  quality: <CheckCircle className="h-8 w-8" />,
  strategy: <Target className="h-8 w-8" />,
  support: <Users className="h-8 w-8" />,
  monitoring: <Clock className="h-8 w-8" />,
  team: <Award className="h-8 w-8" />,
};

// Stats data
const stats = [
  { value: "110", label: "Happy Clients" },
  { value: "11", label: "Year Experience" },
  { value: "1150", label: "Our Employees" },
];

// Hero Section Component
const HeroSection = () => {
  const words = ["Your", "Safety,", "Our", "Priority"];
  const [index, setIndex] = useState(0);
  const [displayedWords, setDisplayedWords] = useState([]);
  const [fade, setFade] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (heroRef.current) observer.observe(heroRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

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
  }, [index, isVisible]);

  return (
    <section className="relative min-h-screen mt-12  flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-600 via-indigo-300 to-gray-500 dark:from-gray-950 dark:via-slate-900 dark:to-indigo-950 ">
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.01] bg-grid-16"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400 dark:bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-purple-400 dark:bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-[400px] h-[400px] bg-pink-400 dark:bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent dark:from-black/70"></div>
      </div>

      {/* Main content */}
      <div
        ref={heroRef}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16"
      >
        {/* Pre-heading */}
        <div className="mb-8 animate-fade-in-up">
          <span className="inline-block px-4 py-2 bg-indigo-500/20 dark:bg-indigo-500/30 backdrop-blur-sm rounded-full border border-indigo-400/30 dark:border-indigo-400/40 text-indigo-300 dark:text-indigo-200 text-sm font-medium">
            🛡️ Licensed & Certified Security Agency
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-6xl md:text-8xl uppercase lg:text-9xl font-black text-white dark:text-gray-100 mb-8 leading-[0.9] tracking-tight">
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

        {/* Subheading */}
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white/90 dark:text-gray-100 mb-6 animate-fade-in-up animation-delay-400">
          Global Security Services
        </h2>

        {/* Enhanced description */}
        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 dark:text-gray-200 mb-16 max-w-5xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600">
          Premier security solutions in Bangalore with{" "}
          <span className="text-yellow-400 dark:text-yellow-300 font-semibold">
            11+ years
          </span>{" "}
          of excellence. Professional security personnel, cutting-edge
          technology, and unwavering commitment to protect what matters most.
        </p>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up animation-delay-800">
          <Link
            to="/contact"
            className="group px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 text-gray-900 dark:text-gray-900 font-bold text-lg rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 flex items-center justify-center relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Get Protected Today
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link
            to="/about"
            className="px-10 py-5 bg-transparent border-2 border-white dark:border-gray-100 text-white dark:text-gray-100 font-bold text-lg rounded-xl hover:bg-white dark:hover:bg-gray-100 hover:text-gray-900 dark:hover:text-gray-900 transition-all duration-500 flex items-center justify-center backdrop-blur-sm"
          >
            <Globe className="mr-3 w-6 h-6" />
            Explore Our Services
          </Link>
        </div>

        {/* Enhanced stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-1000 ">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 dark:text-yellow-300 mb-2">
              <CountUp end={110} duration={1400} suffix="+" />
            </div>
            <div className="text-sm md:text-base text-gray-400 dark:text-gray-300">
              Happy Clients
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-400 dark:text-green-300 mb-2">
              <CountUp end={11} duration={1200} suffix="+" />
            </div>
            <div className="text-sm md:text-base text-gray-400 dark:text-gray-300">
              Years Experience
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-400 dark:text-blue-300 mb-2">
              <CountUp end={1150} duration={1600} suffix="+" />
            </div>
            <div className="text-sm md:text-base text-gray-400 dark:text-gray-300">
              Security Personnel
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400 dark:text-purple-300 mb-2">
              <CountUp end={24} duration={1000} suffix="/7" />
            </div>
            <div className="text-sm md:text-base text-gray-400 dark:text-gray-300">
              Emergency Response
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-16 animate-fade-in-up animation-delay-1200 mb-12">
          <div className="flex items-center text-white/80 dark:text-gray-200">
            <Star className="w-5 h-5 text-yellow-400 dark:text-yellow-300 mr-2" />
            <span className="font-medium">4.9/5 Customer Rating</span>
          </div>
          <div className="flex items-center text-white/80 dark:text-gray-200">
            <CheckCircle className="w-5 h-5 text-green-400 dark:text-green-300 mr-2" />
            <span className="font-medium">ISO 9001:2015 Certified</span>
          </div>
          <div className="flex items-center text-white/80 dark:text-gray-200">
            <Shield className="w-5 h-5 text-blue-400 dark:text-blue-300 mr-2" />
            <span className="font-medium">Government Approved</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-100 dark:bg-indigo-900 rounded-full opacity-30 blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-100 dark:bg-pink-900 rounded-full opacity-30 blur-3xl animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4 animate-fade-in-up">
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">
              About Us
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 animate-fade-in-up animation-delay-200">
            Excellence in Security Services
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
            Global Security Services adopts a unique approach for client
            requirements, ensuring top-tier professionalism and sustained
            excellence across sectors and industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <Target className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
              ),
              title: "Mission Driven",
              bg: "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20",
            },
            {
              icon: (
                <Award className="w-10 h-10 text-green-600 dark:text-green-400 mx-auto mb-3" />
              ),
              title: "Award Winning",
              bg: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
            },
            {
              icon: (
                <Users className="w-10 h-10 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
              ),
              title: "Client Focused",
              bg: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`text-center p-6 rounded-xl bg-gradient-to-br ${item.bg} shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 animate-fade-in-up`}
              style={{ animationDelay: `${idx * 200}ms` }}
            >
              {item.icon}
              <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                {item.title}
              </h4>
            </div>
          ))}
        </div>

        {/* Optional CTA */}
        <div className="mt-12 text-center animate-fade-in-up animation-delay-600">
          <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

// Why Choose Section Component
const WhyChooseSection = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/pageContent/all`
        );
        if (data.success) {
          setPages(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPages();
  }, []);
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full mb-6">
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            Why Choose Global
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Global Security Services Incorporates Efficient Methodologies To
            Bring A Flawless Security Solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pages.map((page, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {page.icon && (
                  <img src={page.icon} alt={page.title} className="h-8 w-8" />
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {page.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {page.description}
              </p>
              <div className="mt-6 flex items-center text-indigo-600 dark:text-indigo-400 font-medium group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                <Link
                  to={{
                    pathname: "/why-choose",
                    search: `?title=${encodeURIComponent(
                      page.title.replace(/\s+/g, "-").toLowerCase()
                    )}`,
                  }}
                  state={{ id: page._id }}
                  className="flex items-center"
                >
                  <span className="text-sm">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-300 via-gray-300 to-blue-400 dark:from-gray-900 dark:via-indigo-900 dark:to-black">
        <div className="absolute inset-0 bg-black/30 dark:bg-black/60"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 dark:bg-white/5 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 dark:bg-white/5 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Many
          </h2>
          <p className="text-xl text-indigo-200 dark:text-indigo-300">
            Our numbers speak for themselves
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/10 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300">
                <div className="text-5xl md:text-7xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  <CountUp
                    end={Number(stat.value)}
                    duration={1400 + index * 200}
                    suffix="+"
                  />
                </div>
                <div className="text-xl text-indigo-200 dark:text-indigo-300 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Image slider carousel */}
      <ImageSlider
        slides={[
          {
            src: "/images/hero-1.svg",
            alt: "Professional Security Services",
            caption: "Your Safety — Our Priority",
          },
          {
            src: "/images/hero-2.svg",
            alt: "Secure Your Business",
            caption: "Corporate Security & Risk Assessments",
          },
          {
            src: "/images/hero-3.svg",
            alt: "Residential Protection",
            caption: "Trusted Guards & 24/7 Support",
          },
        ]}
        autoPlay={true}
        autoPlayInterval={4500}
      />
      <HeroSection />
      <AboutSection />
      <WhyChooseSection />
      <ServicesSection />
      <StatsSection />
      <ClientsSection />
    </div>
  );
};

export default LandingPage;
