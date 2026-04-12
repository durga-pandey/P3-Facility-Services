const EnquiryModal = ({
  loading,
  formData,
  handleChange,
  setEnquiryIsOpen,
  handleSubmit,
}) => {
  return (
    <div>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-auto p-4 h-screen">
        <div
          className="relative w-full max-w-lg mx-auto my-8 rounded-2xl shadow-2xl p-6
                 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100
                 overflow-hidden transform transition-all duration-500 scale-100"
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-all duration-300 text-2xl font-bold"
            onClick={() => setEnquiryIsOpen(false)}
          >
            ✕
          </button>

          {/* Title */}
          <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-600 dark:text-indigo-400">
            Enquiry Form
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Inputs */}
            {["name", "email", "phone", "location"].map((field) => (
              <input
                key={field}
                type={
                  field === "email"
                    ? "email"
                    : field === "phone"
                    ? "tel"
                    : "text"
                }
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                required
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 transition-all duration-300"
              />
            ))}

            {/* Service Type */}
            <select
              name="serviceType"
              required
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition-all duration-300"
            >
              <option value="">Select Service Type</option>
              <option value="guard">Guard</option>
              <option value="cctv">CCTV</option>
              <option value="event-security">Event Security</option>
            </select>

            {/* Start Date */}
            <input
              type="date"
              name="startDate"
              required
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition-all duration-300"
            />

            <button
              type="submit"
              disabled={loading} 
              className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition-all duration-300 flex items-center justify-center
    ${
      loading
        ? "bg-indigo-400 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700"
    }
  `}
            >
              {loading ? (
                <svg
                  className="w-5 h-5 mr-2 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : null}
              {loading ? "Submitting..." : "Submit Enquiry"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
