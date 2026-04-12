import {
  Home,
  Building,
  Factory,
  Hotel,
  Car,
  Calendar,
  User,
  Lock,
  ArrowRight,
} from "lucide-react";

const servicesCards = [
  {
    title: "Residential Security Services in Bangalore",
    subtitle: "Residential Services",
    icon: <Home className="h-12 w-12" />,
    id: "residential-security-services",
  },
  {
    title: "Hospital Security Services in Bangalore",
    subtitle: "Hospital Security",
    icon: <Building className="h-12 w-12" />,
    id: "hospital-security-services",
  },
  {
    title: "Industrial Security Services in Bangalore",
    subtitle: "Industrial Security Services",
    icon: <Factory className="h-12 w-12" />,
    id: "industrial-security-services",
  },
  {
    title: "Hotel Security Services in Bangalore",
    subtitle: "Hotel Security",
    icon: <Hotel className="h-12 w-12" />,
    id: "hotel-security-services",
  },
  {
    title: "Parking Lot Maintenance Services in Bangalore",
    subtitle: "Parking Lot Maintenance",
    icon: <Car className="h-12 w-12" />,
    id: "parking-lot-maintenance",
  },
  {
    title: "Event Security Services in Bangalore",
    subtitle: "Event Security Services",
    icon: <Calendar className="h-12 w-12" />,
    id: "event-security-services",
  },
  {
    title: "Gatekeeper Security Services in Bangalore",
    subtitle: "Gate Keeping Services",
    icon: <User className="h-12 w-12" />,
    id: "gatekeeper-security-services",
  },
  {
    title: "Private Security Agency in Bangalore",
    subtitle: "Private Security Services",
    icon: <Lock className="h-12 w-12" />,
    id: "private-security-agency",
  },
];

const detailedServices = [
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

export default function ServicesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 rounded-full mb-6">
            <span className="text-sm font-semibold text-orange-600 dark:text-orange-300">
              Our Expertise
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 dark:from-white dark:to-indigo-300 bg-clip-text text-transparent mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive security solutions tailored to your specific needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          {servicesCards.map((service) => (
            <div
              key={service.title}
              id={service.id}
              className="group bg-white dark:bg-gray-900 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-white">{service.icon}</div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                {service.title}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {service.subtitle}
                </p>
                <ArrowRight className="w-4 h-4 text-orange-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Detailed list */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            All Service Types
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {detailedServices.map((svc) => (
              <div
                key={svc}
                id={slugify(svc)}
                className="p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                  {svc}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Expert {svc} for your business and property protection needs.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
