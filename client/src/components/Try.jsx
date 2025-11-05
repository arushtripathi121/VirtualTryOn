import React, { useEffect, useState } from "react";
import api from "../hooks/api";
import { motion, AnimatePresence } from "framer-motion";

const Try = () => {
    const [imageA, setImageA] = useState(null);
    const [imageB, setImageB] = useState(null);
    const [previewA, setPreviewA] = useState(null);
    const [previewB, setPreviewB] = useState(null);
    const [maskType, setMaskType] = useState("overall");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [generatedImage, setGeneratedImage] = useState(null);

    useEffect(() => {
        if (imageA) {
            const url = URL.createObjectURL(imageA);
            setPreviewA(url);
            return () => URL.revokeObjectURL(url);
        } else setPreviewA(null);
    }, [imageA]);

    useEffect(() => {
        if (imageB) {
            const url = URL.createObjectURL(imageB);
            setPreviewB(url);
            return () => URL.revokeObjectURL(url);
        } else setPreviewB(null);
    }, [imageB]);

    const handleCreateImage = async () => {
        if (!imageA || !imageB) {
            alert("Please upload both images before creating your image.");
            return;
        }

        try {
            setGeneratedImage(null);
            setLoading(true);
            setProgress(0);

            const fakeProgress = setInterval(() => {
                setProgress((prev) => (prev < 95 ? prev + 2 : prev));
            }, 200);

            const formData = new FormData();
            formData.append("media", imageA);
            formData.append("garment", imageB);
            formData.append("mask_type", maskType);

            const response = await api.post("/generate", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            clearInterval(fakeProgress);
            setProgress(100);

            if (response.data.success) {
                setTimeout(() => {
                    setGeneratedImage(response.data.finalImageUrl);
                    setLoading(false);
                }, 800);
            } else {
                alert(response.data.message || "Something went wrong.");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to generate image.");
            setLoading(false);
        }
    };

    const resetAll = () => {
        setImageA(null);
        setImageB(null);
        setGeneratedImage(null);
        setProgress(0);
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-start space-y-10 text-white pt-6">
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent tracking-tight">
                AI Outfit Try-On
            </h2>

            <div
                className={`w-full max-w-4xl transition-all duration-500 ${loading ? "blur-sm pointer-events-none opacity-60" : ""
                    }`}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[{ file: imageA, set: setImageA, preview: previewA, label: "Upload Your Photo" },
                    { file: imageB, set: setImageB, preview: previewB, label: "Upload Outfit Image" }]
                        .map((img, idx) => (
                            <label
                                key={idx}
                                className="group border border-gray-700/60 rounded-2xl p-6 bg-[#101010] hover:bg-[#181818] transition flex flex-col items-center justify-center cursor-pointer min-h-64"
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => img.set(e.target.files?.[0] || null)}
                                />
                                {img.preview ? (
                                    <img
                                        src={img.preview}
                                        alt={img.label}
                                        className="max-h-80 w-auto rounded-xl object-contain shadow-md"
                                    />
                                ) : (
                                    <div className="text-center">
                                        <div className="text-sm text-gray-300">{img.label}</div>
                                        <div className="mt-2 text-xs text-gray-500">PNG, JPG, JPEG</div>
                                        <div className="mt-4 px-4 py-2 rounded-xl bg-gray-800/40 group-hover:bg-gray-700/50 inline-block">
                                            Choose file
                                        </div>
                                    </div>
                                )}
                            </label>
                        ))}
                </div>

                <div className="space-y-3 text-center mt-6">
                    <div className="text-sm text-gray-400">Mask Type</div>
                    <div className="inline-flex rounded-2xl border border-gray-700/60 bg-[#101010] overflow-hidden">
                        {[
                            { key: "overall", label: "Overall" },
                            { key: "upper", label: "Upper" },
                            { key: "lower", label: "Lower" },
                        ].map((opt) => (
                            <button
                                key={opt.key}
                                onClick={() => setMaskType(opt.key)}
                                className={`px-4 py-2 text-sm transition ${maskType === opt.key
                                        ? "bg-blue-500/20 text-blue-400"
                                        : "text-gray-300 hover:bg-gray-800/50"
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center justify-center mt-6">
                    <button
                        onClick={handleCreateImage}
                        disabled={loading}
                        className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-medium shadow-md hover:shadow-lg transition transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50"
                    >
                        {loading ? "Generating..." : "Generate Try-On"}
                    </button>

                    <button
                        onClick={resetAll}
                        className="px-5 py-2.5 rounded-xl border border-gray-700/60 bg-[#101010] hover:bg-[#181818] transition text-gray-300"
                    >
                        Clear All
                    </button>
                </div>

                <AnimatePresence>
                    {generatedImage && !loading && (
                        <motion.div
                            className="mt-12 flex flex-col items-center space-y-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-xl font-medium mb-4 text-gray-200">
                                Your AI-Generated Try-On
                            </h3>
                            <motion.img
                                src={generatedImage}
                                alt="Generated Try-On"
                                className="max-h-[500px] rounded-2xl shadow-lg object-contain border border-gray-700"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md bg-black/40 z-50">
                    <div className="relative w-64 h-2 bg-gray-800 rounded-full overflow-hidden shadow-lg">
                        <motion.div
                            className="absolute h-full bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600 rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "easeInOut", duration: 0.4 }}
                        />
                    </div>
                    <p className="mt-4 text-sm text-gray-300 tracking-wide">
                        Crafting your AI outfit magic...
                    </p>
                </div>
            )}
        </div>
    );
};

export default Try;
