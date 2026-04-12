import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ApplicationsCards() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/application/all`
        );
        setApplications(res.data.applications);
        setLoading(false);
      } catch (err) {
        const message = err?.response?.data?.message;
        console.log(message);
        setError(message);
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  return (
    <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          Our Clients
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <img
                src={app.profileImage}
                alt={app.fullName}
                className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-indigo-500"
              />
              <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                {app.fullName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                {app.email}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                {app.phone}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {app.address}
              </p>
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">
                {app.position}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                {app.experience} yrs
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                Shift: {app.shift}
              </p>
              {/* <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  app.status === "pending"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200"
                    : app.status === "approved"
                    ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200"
                }`}
              >
                {app.status.toUpperCase()}
              </span> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
