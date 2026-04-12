import { motion } from "framer-motion";
import { Shield, Camera, User, Cpu, BookOpen } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const particles = Array.from({ length: 20 });

const featuredArticles = [
  {
    id: 1,
    title: "Advanced Security Strategies in 2025",
    image: "/images/security-profile-2.jpg",
    category: "Strategy",
    excerpt: "Learn the latest techniques to secure your premises effectively.",
    points: [
      "Risk assessment techniques",
      "New surveillance tools",
      "Emergency response plans",
    ],
  },
  {
    id: 2,
    title: "Guard Profiles: Best Practices",
    image: "/images/security-profile.webp",
    category: "Profile",
    excerpt: "Explore top security guard profiles and their training insights.",
    points: [
      "Training programs overview",
      "Skills & certifications",
      "On-site responsibilities",
    ],
  },
  {
    id: 3,
    title: "Tech Innovations in Surveillance",
    image: "/images/security-sqaure.png",
    category: "Technology",
    excerpt: "Discover how AI and IoT are revolutionizing security monitoring.",
    points: [
      "AI-powered cameras",
      "IoT-enabled monitoring",
      "Predictive analytics",
    ],
  },
];

const categories = [
  { id: 1, name: "Security Tips", icon: Shield, color: "bg-blue-500" },
  { id: 2, name: "Guard Profiles", icon: User, color: "bg-green-500" },
  { id: 3, name: "Technology in Security", icon: Cpu, color: "bg-purple-500" },
  { id: 4, name: "Case Studies", icon: BookOpen, color: "bg-yellow-500" },
];

const latestArticles = [
  {
    id: 1,
    title: "How to Train Security Guards Effectively",
    image: "/images/training.webp",
    category: "Training",
    excerpt:
      "Discover the key techniques and modules for modern security training.",
  },
  {
    id: 2,
    title: "Smart Surveillance Systems Explained",
    image: "/images/Smart.png",
    category: "Technology",
    excerpt:
      "A complete guide to integrating AI-driven surveillance in security.",
  },
  {
    id: 3,
    title: "Real-Life Security Case Studies",
    image: "/images/case-studies.jpg",
    category: "Case Study",
    excerpt: "Learn from past events and how top firms responded effectively.",
  },
  {
    id: 4,
    title: "Essential Safety Tips for Businesses",
    image: "/images/safety.webp",
    category: "Safety",
    excerpt: "Practical tips to enhance safety in corporate environments.",
  },
];

const floatingCurves = Array.from({ length: 15 });

const Blog = () => {
  return (
    <div>
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "linear-gradient(135deg, rgba(75,85,99,0.2), rgba(30,41,59,0.2))",
            backgroundSize: "200% 200%",
            mixBlendMode: "overlay",
          }}
        />

        <motion.div
          className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-10"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 300, repeat: Infinity, ease: "linear" }}
        />

        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20 + Math.random() * 40, 0],
              x: [0, -10 + Math.random() * 20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 8 + Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="absolute inset-0 flex justify-around items-center opacity-50 pointer-events-none">
          <motion.div
            className="w-24 h-24"
            animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <Shield className="w-full h-full text-blue-400 drop-shadow-lg" />
          </motion.div>
          <motion.div
            className="w-24 h-24"
            animate={{
              y: [0, -15, 0],
              x: [0, -10, 0],
              rotate: [0, -10, 10, 0],
            }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <Camera className="w-full h-full text-green-400 drop-shadow-lg" />
          </motion.div>
          <motion.div
            className="w-24 h-24"
            animate={{ y: [0, -25, 0], x: [0, 15, 0], rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          >
            <User className="w-full h-full text-purple-400 drop-shadow-lg" />
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            Insights on Security & Safety
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.2 }}
          >
            Stay informed with the latest security strategies, guard profiles,
            and safety tips.
          </motion.p>
          <motion.a
            href="#blog-feed"
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-8 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-2xl hover:bg-blue-500 transition-all"
          >
            Read Latest Articles
          </motion.a>
        </motion.div>
      </section>

      <section className="relative py-20 px-6 md:px-12 bg-white overflow-hidden">
        {/* Subtle floating particles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gray-200 rounded-full opacity-20"
            style={{
              width: Math.random() * 3 + 2,
              height: Math.random() * 3 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10 + Math.random() * 20, 0],
              x: [0, -5 + Math.random() * 10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              repeat: Infinity,
              duration: 10 + Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}

        <h2 className="relative z-10 text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-12">
          Featured Articles
        </h2>

        <div className="relative z-10 grid md:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <motion.div
              key={article.id}
              className="relative rounded-xl overflow-hidden shadow-lg bg-gray-50 hover:shadow-2xl cursor-pointer transition-transform duration-300"
              whileHover={{ scale: 1.04 }}
            >
              {/* Image */}
              <motion.img
                src={article.image}
                alt={article.title}
                className="w-full h-56 md:h-64 lg:h-72 object-cover object-top rounded-t-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />

              {/* Text */}
              <div className="p-5">
                <motion.p
                  className="text-xs font-semibold text-blue-500 mb-2 uppercase"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.3 }}
                >
                  {article.category}
                </motion.p>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-700 text-sm mb-3">{article.excerpt}</p>

                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  {article.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Hover border glow */}
              <motion.div
                className="absolute inset-0 border-2 border-transparent rounded-xl pointer-events-none"
                whileHover={{
                  borderColor: "#3b82f6",
                  boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)",
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          Explore by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                className="flex flex-col items-center cursor-pointer"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 150 }}
              >
                <motion.div
                  className={`w-24 h-24 flex items-center justify-center rounded-full text-white ${cat.color} shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.3, ease: "linear" }}
                >
                  <Icon className="w-12 h-12" />
                </motion.div>

                <p className="mt-4 text-gray-900 font-semibold text-center">
                  {cat.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="relative py-24 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
        {/* Animated Background Curves */}
        {floatingCurves.map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-300/30 to-purple-300/20"
            style={{
              width: `${50 + Math.random() * 150}px`,
              height: `${10 + Math.random() * 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              borderRadius: "50% / 50%",
              filter: "blur(10px)",
            }}
            animate={{
              x: [0, 30 * (Math.random() - 0.5), 0],
              y: [0, 30 * (Math.random() - 0.5), 0],
              rotate: [0, Math.random() * 180, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 25 + Math.random() * 10,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating Wave Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-100/20 to-transparent pointer-events-none"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        />

        {/* Section Title */}
        <h2 className="relative z-10 text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-12">
          Latest Insights
        </h2>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1.5}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          speed={2000}
          pagination={{
            clickable: true,
            bulletClass:
              "swiper-pagination-bullet bg-white/50 w-4 h-4 rounded-full mx-1 transition-all",
            bulletActiveClass: "bg-[#1B98F5] w-5 h-5 scale-110",
          }}
          className="relative z-10 py-12"
        >
          {latestArticles.map((article) => (
            <SwiperSlide key={article.id}>
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer bg-white"
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                {/* Straight Image Card */}
                <div className="relative overflow-hidden rounded-3xl">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-72 md:h-80 object-cover rounded-3xl"
                  />
                  {/* Text overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                    <p className="text-xs font-semibold uppercase text-blue-400 mb-1">
                      {article.category}
                    </p>
                    <h3 className="text-lg md:text-xl font-bold">
                      {article.title}
                    </h3>
                    <p className="text-sm line-clamp-2">{article.excerpt}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Blog;
