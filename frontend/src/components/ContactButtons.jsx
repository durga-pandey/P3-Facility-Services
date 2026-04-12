import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const ContactButtons = () => {
  return (
    <div>
      <div className="fixed bottom-6 right-6 flex flex-col gap-8 z-[9999]">
        {/* Call Button */}
        <a
          href="tel:+919123456789"
          className="bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 animate-zoomPulse hover:bg-green-700"
          title="Call Us"
        >
          <FaPhoneAlt size={24} />
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919123456789"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 animate-zoomPulse hover:bg-green-600"
          title="WhatsApp Us"
        >
          <FaWhatsapp size={24} />
        </a>
      </div>
    </div>
  );
};

export default ContactButtons;
