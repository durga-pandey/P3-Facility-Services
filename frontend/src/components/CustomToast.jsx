import { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ToastContext = createContext();

let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success", duration = 4000) => {
    const id = toastId++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Centered Toast Container */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] flex flex-col gap-3 items-center">
        <AnimatePresence>
          {toasts.map(({ id, message, type }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`
                max-w-md w-full px-6 py-3 rounded-2xl shadow-2xl flex items-center justify-between font-semibold text-white border-l-4
                ${
                  type === "success"
                    ? "bg-gradient-to-r from-emerald-500 via-green-600 to-lime-500 border-emerald-700"
                    : ""
                }
                ${
                  type === "error"
                    ? "bg-gradient-to-r from-red-500 via-red-600 to-rose-500 border-red-700"
                    : ""
                }
                ${
                  type === "info"
                    ? "bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 border-blue-700"
                    : ""
                }
                ${
                  type === "warning"
                    ? "bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 border-yellow-600 text-gray-900"
                    : ""
                }
              `}
            >
              <span className="text-sm md:text-base">{message}</span>
              <button
                className="ml-4 text-lg font-bold hover:scale-110 transition-transform"
                onClick={() => removeToast(id)}
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

// Custom hook
export const useToast = () => useContext(ToastContext);
