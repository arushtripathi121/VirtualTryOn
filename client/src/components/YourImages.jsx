import React, { useEffect, useState } from "react";
import api from "../hooks/api";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const YourImages = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.get("/my-images");
        if (res.data.success) setUserData(res.data.user);
        else setError("Failed to load images.");
      } catch (err) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen w-full text-white space-y-10 relative">
      <h2 className="text-3xl font-semibold bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent tracking-tight text-center">
        Your AI-Generated Images
      </h2>

      {loading ? (
        <div className="flex flex-col items-center space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mt-10 px-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gradient-to-r from-gray-800 to-gray-700 blur-sm animate-pulse rounded-2xl"
              ></div>
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="text-center text-red-400">{error}</div>
      ) : (
        userData && (
          <AnimatePresence>
            <motion.div
              className="flex flex-col items-center space-y-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {userData.imageKeys.length === 0 ? (
                <p className="text-gray-400 text-center mt-10">
                  You haven’t generated any try-on images yet.
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 w-full">
                  {userData.imageKeys.map((url, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="relative group rounded-2xl overflow-hidden shadow-md border border-gray-700 cursor-pointer"
                      onClick={() => setFullscreenImage(url)}
                    >
                      <img
                        src={url}
                        alt={`AI Outfit ${index + 1}`}
                        className="w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )
      )}

      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-6 right-6 text-gray-300 hover:text-white transition"
            >
              <X size={28} />
            </button>
            <motion.img
              src={fullscreenImage}
              alt="Full Screen View"
              className="max-w-[90%] max-h-[90vh] rounded-2xl shadow-2xl object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default YourImages;
