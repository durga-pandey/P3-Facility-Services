import { useState } from "react";
import { motion } from "framer-motion";

const images = Array.from({ length: 33 }, (_, i) => ({
  id: i + 1,
  src: `/images/images-${i + 1}.jpeg`,
}));

const ITEMS_PER_PAGE = 8;

const Gallery = () => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);

  const paginatedImages = images.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white py-12">
      {/* Container for left-right spacing */}
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Image Gallery</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Clean, responsive and smooth animated gallery with pagination.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]">
          {paginatedImages.map((img) => (
            <motion.div
              key={img.id}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden cursor-pointer rounded-xl shadow-md bg-gray-100 dark:bg-gray-900"
            >
              <img
                src={img.src}
                alt={`gallery-${img.id}`}
                className="w-full h-60 object-cover transition-transform duration-500 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-md text-sm ${
                page === i + 1
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-gray-200 dark:bg-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
