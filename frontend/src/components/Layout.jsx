import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import ApplyModal from "./ApplyModal";
import EnquiryModal from "./EnquiryModal";
import axios from "axios";
import { useToast } from "./CustomToast";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Clients", to: "/clients" },
  { label: "Blog", to: "/blog" },
];

// const footerNav = [
//   { label: "Programs", to: "/programs" },
//   { label: "Solutions", to: "/solutions" },
//   { label: "Careers", to: "/careers" },
//   { label: "Support", to: "/support" },
//   { label: "Privacy Policy", to: "/privacy" },
//   { label: "Terms of Service", to: "/terms" },
// ];

const socials = [
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M19.633 7.997c.013.18.013.36.013.54 0 5.49-4.18 11.82-11.82 11.82-2.35 0-4.53-.69-6.37-1.88.33.04.64.05.98.05 1.94 0 3.72-.66 5.14-1.78a4.17 4.17 0 01-3.89-2.89c.26.04.52.07.79.07.38 0 .75-.05 1.1-.15a4.16 4.16 0 01-3.34-4.08v-.05c.56.31 1.2.5 1.88.52a4.16 4.16 0 01-1.85-3.47c0-.77.21-1.48.58-2.1a11.82 11.82 0 008.58 4.35 4.7 4.7 0 01-.1-.95 4.16 4.16 0 017.2-2.84 8.2 8.2 0 002.64-1 4.13 4.13 0 01-1.83 2.3 8.4 8.4 0 002.39-.64 8.8 8.8 0 01-2.09 2.17z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.851-3.037-1.853 0-2.136 1.447-2.136 2.941v5.665H9.353V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.604 0 4.27 2.372 4.27 5.459v6.282zM5.337 7.433a2.062 2.062 0 01-2.063-2.063 2.062 2.062 0 112.063 2.063zM6.967 20.452H3.705V9h3.262v11.452z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M21.8 8.001s-.2-1.4-.8-2.01c-.76-.8-1.6-.8-1.99-.85-2.78-.2-6.95-.2-6.95-.2h-.01s-4.17 0-6.95.2c-.39.05-1.23.05-1.99.85-.6.61-.8 2.01-.8 2.01S3 9.6 3 11.2v1.59c0 1.6.2 3.2.2 3.2s.2 1.4.8 2.01c.76.8 1.76.77 2.2.86 1.6.15 6.8.2 6.8.2s4.18-.01 6.96-.21c.39-.05 1.23-.05 1.99-.85.6-.61.8-2.01.8-2.01s.2-1.6.2-3.2v-1.59c0-1.6-.2-3.2-.2-3.2zM10 14.5v-5l4.67 2.5L10 14.5z" />
      </svg>
    ),
  },
];

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [enquiryIsOpen, setEnquiryIsOpen] = useState(false);
  const [applyIsOpen, setApplyIsOpen] = useState(false);
  const [applyForm, setApplyForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    position: "",
    experience: "",
    shift: "",
    resume: null,
    profileImage: null,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    location: "",
    startDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/enquiry/create`,
        formData
      );
      if (response.data.success) {
        addToast(response.data.message, "success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceType: "",
          location: "",
          startDate: "",
        });
        setEnquiryIsOpen(false);
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || "Something went wrong!";
      addToast(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleEnquiryForm = () => {
    setEnquiryIsOpen(true);
  };

  const handleApplyChange = (e) => {
    const { name, value } = e.target;
    setApplyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", applyForm.fullName);
      formDataToSend.append("email", applyForm.email);
      formDataToSend.append("phone", applyForm.phone);
      formDataToSend.append("address", applyForm.address);
      formDataToSend.append("position", applyForm.position);
      formDataToSend.append("experience", applyForm.experience);
      formDataToSend.append("shift", applyForm.shift);

      if (applyForm.resume) {
        formDataToSend.append("resume", applyForm.resume);
      }

      if (applyForm.profileImage) {
        formDataToSend.append("profileImage", applyForm.profileImage);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/application/create`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        addToast(response.data.message, "success");

        setApplyForm({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          position: "",
          experience: "",
          shift: "",
          resume: null,
          profileImage: null,
        });

        setApplyIsOpen(false);
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || "Something went wrong!";
      addToast(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyForm = () => {
    setApplyIsOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (
      location.pathname === "/about" ||
      location.pathname === "/services" ||
      location.pathname === "/clients" ||
      location.pathname === "/blog"
    ) {
      setEnquiryIsOpen(true);
    }
  }, [location.pathname]);

  const closeSidebar = () => setSidebarOpen(false);

  const filteredLinks = navLinks.filter((link) => {
    if (link.authOnly === true) return isAuthenticated;
    if (link.authOnly === false) return !isAuthenticated;
    return true;
  });

  // Service submenu items
  const servicesMenu = [
    "Security Guard",
    "Bouncer And Bodyguard",
    "Escort Guard",
    "Female Security Guard",
    "Cash Management",
    "Dog Squads Service",
    "Event Security",
    "Tourist Security",
    "Office Security",
    "Building Security",
    "Bank Security",
    "Industrial Security",
    "Retail Security",
    "Hospital Security",
    "Property Security",
    "School Security",
  ];

  const slugify = (s) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50"
            : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/30 dark:border-gray-700/30"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 group"
              onClick={closeSidebar}
            >
              {/* Logo Container - Can easily replace with actual logo */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                  </svg>
                </div>
                {/* Logo glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </div>

              {/* Company Name */}
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 dark:from-indigo-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent leading-tight">
                  P3 FACILITY SERVICES
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  & PARKING SERVICE
                </p>
              </div>

              {/* Mobile company name */}
              <div className="sm:hidden">
                <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                  P3 SERVICES
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {filteredLinks.map((link) => {
                if (link.to === "/services") {
                  return (
                    <div
                      key={link.to}
                      className="relative group"
                      onMouseEnter={() => setDesktopServicesOpen(true)}
                      onMouseLeave={() => setDesktopServicesOpen(false)}
                    >
                      <Link
                        to={link.to}
                        className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                          location.pathname === link.to
                            ? "text-white bg-gradient-to-r from-indigo-600 to-blue-600 shadow-md shadow-indigo-500/25"
                            : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                        }`}
                        onClick={() => {
                          // if already on /services, scroll to top to refresh view
                          if (location.pathname === "/services") {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }}
                        aria-haspopup="true"
                        aria-expanded={desktopServicesOpen}
                        onFocus={() => setDesktopServicesOpen(true)}
                        onBlur={() => setDesktopServicesOpen(false)}
                      >
                        {link.label}
                        {/* Active indicator */}
                        {location.pathname === link.to && (
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl opacity-10"></div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      </Link>

                      {/* Dropdown Menu */}
                      <div
                        className={`absolute left-0 top-full mt-3 w-64 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg transform transition-all duration-200 z-50 ${
                          desktopServicesOpen
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 translate-y-3 pointer-events-none"
                        } group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto`}
                      >
                        <div className="p-3">
                          {servicesMenu.map((svc) => (
                            <Link
                              key={svc}
                              to={`/services#${slugify(svc)}`}
                              className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                              {svc}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                      location.pathname === link.to
                        ? "text-white bg-gradient-to-r from-indigo-600 to-blue-600 shadow-md shadow-indigo-500/25"
                        : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    }`}
                    onClick={() => {
                      if (location.pathname === link.to)
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    {link.label}
                    {/* Active indicator */}
                    {location.pathname === link.to && (
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl opacity-10"></div>
                    )}
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </Link>
                );
              })}
            </nav>

            {/* Apply / Enquiry Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={handleApplyForm}
                className="px-4 py-2 rounded-xl text-white font-semibold text-sm shadow-md transition-all duration-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-[length:400%_400%] animate-gradient"
              >
                Apply Now
              </button>

              <button
                onClick={handleEnquiryForm}
                className="px-4 py-2 rounded-xl text-indigo-600 font-semibold text-sm border-2 border-transparent bg-white relative overflow-hidden"
              >
                Enquiry Now
                <span className="absolute inset-0 rounded-xl border-2 border-gradient animate-border-gradient pointer-events-none"></span>
              </button>
            </div>

            {enquiryIsOpen && (
              <EnquiryModal
                loading={loading}
                formData={formData}
                handleChange={handleChange}
                setEnquiryIsOpen={setEnquiryIsOpen}
                handleSubmit={handleSubmit}
              />
            )}

            {applyIsOpen && (
              <ApplyModal
                loading={loading}
                applyForm={applyForm}
                setApplyForm={setApplyForm}
                setApplyIsOpen={setApplyIsOpen}
                handleApplySubmit={handleApplySubmit}
                handleApplyChange={handleApplyChange}
              />
            )}

            {/* Right side controls */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                <ThemeToggle />
              </div>

              {/* Mobile menu button */}
              <button
                type="button"
                className="lg:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {sidebarOpen ? (
                  <svg
                    className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu with enhanced design */}
        {sidebarOpen && (
          <div className="lg:hidden">
            <div className="px-4 pt-4 pb-6 space-y-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50">
              {filteredLinks.map((link) => {
                if (link.to === "/services") {
                  return (
                    <div key={link.to} className="space-y-1">
                      <button
                        className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 flex items-center justify-between ${
                          location.pathname === link.to
                            ? "text-white bg-gradient-to-r from-indigo-600 to-blue-600 shadow-md"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400"
                        }`}
                        onClick={() => setMobileServicesOpen((s) => !s)}
                        aria-expanded={mobileServicesOpen}
                      >
                        {link.label}
                        <svg
                          className={`h-5 w-5 transition-transform duration-200 ${
                            mobileServicesOpen ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 6a1 1 0 01.707.293l4 4a1 1 0 01-1.414 1.414L10 8.414 6.707 11.707A1 1 0 015.293 10.293l4-4A1 1 0 0110 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      {mobileServicesOpen && (
                        <div className="pl-6 pr-4">
                          {servicesMenu.map((svc) => (
                            <Link
                              key={svc}
                              to={`/services#${slugify(svc)}`}
                              className="block px-4 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                              onClick={closeSidebar}
                            >
                              {svc}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                      location.pathname === link.to
                        ? "text-white bg-gradient-to-r from-indigo-600 to-blue-600 shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}
                    onClick={closeSidebar}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* ------------- NOW BUTTONS BELOW LINKS ---------------- */}
              <div className="flex flex-col gap-3 pt-4 px-2">
                <button className="w-full py-3 rounded-xl text-white font-semibold text-base shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-[length:400%_400%] animate-gradient transition">
                  Apply Now
                </button>

                <button className="w-full py-3 rounded-xl text-indigo-600 font-semibold text-base border-2 border-transparent relative overflow-hidden transition">
                  Enquiry Now
                  <span className="absolute inset-0 rounded-xl border-2 border-gradient animate-border-gradient pointer-events-none"></span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="">
        <div className="bg-white dark:bg-gray-800/50 shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden">
          <div className="relative">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] opacity-30"></div>
            {/* Page content */}
            <div className="relative">{children}</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    P3 FACILITY SERVICES
                  </span>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    & PARKING SERVICE
                  </div>
                </div>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Professional security and parking solutions with comprehensive
                facility management services. Trusted partner for all your
                security needs.
              </p>
              <div className="flex space-x-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                    aria-label={social.label}
                  >
                    <span className="sr-only">{social.label}</span>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Popular Services
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {servicesMenu.slice(0, 8).map((svc) => (
                  <Link
                    key={svc}
                    to={`/services#${slugify(svc)}`}
                    className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                  >
                    {svc}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/partners"
                    className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                  >
                    Partners
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Subscribe
                </h4>
                <form
                  className="flex"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thanks for subscribing (demo)");
                  }}
                >
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-3 py-2 rounded-l-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 focus:outline-none"
                    aria-label="Email"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-500 transition-colors text-sm"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Contact Info
              </h3>
              <address className="mt-4 not-italic text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <div className="font-semibold text-gray-900 dark:text-white">
                  P3 FACILITY SERVICES
                </div>
                <div>& PARKING SERVICE</div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700"></div>
                <div>SUKUMAR APARTMENT</div>
                <div>GROUND FLOOR</div>
                <div>SUBHAS PALLY, BENACHITY</div>
                <div>DURGAPUR – 713213</div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700"></div>
                <div className="font-medium">UDYAM-WB-23-0002303</div>
                <div className="font-medium">GSTIN/UIN: 19AAQFP0656F1ZY</div>
                <div className="font-medium">State: West Bengal, Code: 19</div>
                <div className="pt-2">
                  <a
                    href="mailto:info@p3facility.com"
                    className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                  >
                    info@p3facility.com
                  </a>
                </div>
              </address>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} P3 Facility Services & Parking
                Service. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0 flex space-x-6">
                <Link
                  to="/privacy"
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
