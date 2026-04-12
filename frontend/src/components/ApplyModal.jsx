const ApplyModal = ({
  loading,
  applyForm,
  setApplyForm,
  setApplyIsOpen,
  handleApplySubmit,
  handleApplyChange,
}) => {
  return (
    <div>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-auto p-4 h-screen">
        <div className="relative w-full max-w-3xl mx-auto my-8 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 sm:p-10 transform transition-all duration-500 scale-100">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-all duration-300 text-2xl font-bold"
            onClick={() => setApplyIsOpen(false)}
          >
            ✕
          </button>

          {/* Title */}
          <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-600 dark:text-indigo-400">
            Apply Now
          </h2>

          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            onSubmit={handleApplySubmit}
          >
            {/* Full Name */}
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              value={applyForm.fullName}
              onChange={handleApplyChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 transition-all duration-300"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={applyForm.email}
              onChange={handleApplyChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 transition-all duration-300"
            />

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              value={applyForm.phone}
              onChange={handleApplyChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 transition-all duration-300"
            />

            {/* Address */}
            <input
              type="text"
              name="address"
              placeholder="Address / City"
              required
              value={applyForm.address}
              onChange={handleApplyChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 transition-all duration-300"
            />

            {/* Position Applying For */}
            <select
              name="position"
              required
              value={applyForm.position}
              onChange={handleApplyChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition-all duration-300"
            >
              <option value="">Position Applying For</option>
              <option value="guard">Guard</option>
              <option value="supervisor">Supervisor</option>
              <option value="driver">Driver</option>
            </select>

            {/* Experience */}
            <input
              type="number"
              name="experience"
              placeholder="Experience (Years)"
              min={0}
              required
              value={applyForm.experience}
              onChange={handleApplyChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 transition-all duration-300"
            />

            {/* Shift Preference */}
            <select
              name="shift"
              required
              value={applyForm.shift}
              onChange={handleApplyChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition-all duration-300"
            >
              <option value="">Shift Preference</option>
              <option value="day">Day</option>
              <option value="night">Night</option>
              <option value="24hr">24-hour</option>
            </select>

            {/* Profile Image Upload */}
            <div className="sm:col-span-2">
              <label className="flex flex-col items-center justify-center w-full h-20 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all duration-300 overflow-hidden">
                {applyForm.profileImage &&
                applyForm.profileImage.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(applyForm.profileImage)}
                    alt="Preview"
                    className="w-16 h-16 object-contain mb-1 rounded-md"
                  />
                ) : (
                  <svg
                    className="w-8 h-8 mb-1 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0-8l-3 3m3-3l3 3"
                    />
                  </svg>
                )}

                <span className="text-gray-600 dark:text-gray-300 font-medium text-center text-sm">
                  {applyForm.profileImage
                    ? applyForm.profileImage.name
                    : "Click to upload your profile image (JPG, PNG)"}
                </span>

                <input
                  type="file"
                  name="profileImage"
                  accept=".jpg,.jpeg,.png"
                  required
                  onChange={(e) =>
                    setApplyForm((prev) => ({
                      ...prev,
                      profileImage: e.target.files[0],
                    }))
                  }
                  className="hidden"
                />
              </label>
            </div>

            {/* Resume Upload */}
            <div className="sm:col-span-2">
              <label className="flex flex-col items-center justify-center w-full h-20 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all duration-300 overflow-hidden">
                {applyForm.resume &&
                applyForm.resume.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(applyForm.resume)}
                    alt="Preview"
                    className="w-16 h-16 object-contain mb-1 rounded-md"
                  />
                ) : (
                  <svg
                    className="w-8 h-8 mb-1 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0-8l-3 3m3-3l3 3"
                    />
                  </svg>
                )}

                <span className="text-gray-600 dark:text-gray-300 font-medium text-center text-sm">
                  {applyForm.resume
                    ? applyForm.resume.name
                    : "Click to upload your document (Aadhar, PDF, DOC, Image)"}
                </span>

                <input
                  type="file"
                  name="document"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  required
                  onChange={(e) =>
                    setApplyForm((prev) => ({
                      ...prev,
                      resume: e.target.files[0],
                    }))
                  }
                  className="hidden"
                />
              </label>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={loading} // disable while loading
                className={`w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition-all duration-300 flex items-center justify-center gap-3
      ${loading ? "cursor-not-allowed opacity-70" : ""}
    `}
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3h-4z"
                    ></path>
                  </svg>
                )}
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
