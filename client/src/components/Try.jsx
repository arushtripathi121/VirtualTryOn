import React, { useEffect, useState } from 'react';

const Try = () => {
    const [imageA, setImageA] = useState(null);
    const [imageB, setImageB] = useState(null);
    const [previewA, setPreviewA] = useState(null);
    const [previewB, setPreviewB] = useState(null);
    const [maskType, setMaskType] = useState('overall');

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

    const handleCreateImage = () => {
        if (!imageA || !imageB) {
            alert('Please upload both images before creating your image.');
            return;
        }
        alert(`Generating your ${maskType} masked image...`);
    };

    return (
        <div className="space-y-10">
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent tracking-tight">
                Create Your Image
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="group border border-gray-700/60 rounded-2xl p-6 bg-[#101010] hover:bg-[#181818] transition flex flex-col items-center justify-center cursor-pointer min-h-64">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setImageA(e.target.files?.[0] || null)}
                    />
                    {previewA ? (
                        <img
                            src={previewA}
                            alt="First"
                            className="max-h-80 w-auto rounded-xl object-contain shadow-md"
                        />
                    ) : (
                        <div className="text-center">
                            <div className="text-sm text-gray-300">Upload Image A</div>
                            <div className="mt-2 text-xs text-gray-500">PNG, JPG, JPEG</div>
                            <div className="mt-4 px-4 py-2 rounded-xl bg-gray-800/40 group-hover:bg-gray-700/50 inline-block">
                                Choose file
                            </div>
                        </div>
                    )}
                </label>

                <label className="group border border-gray-700/60 rounded-2xl p-6 bg-[#101010] hover:bg-[#181818] transition flex flex-col items-center justify-center cursor-pointer min-h-64">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setImageB(e.target.files?.[0] || null)}
                    />
                    {previewB ? (
                        <img
                            src={previewB}
                            alt="Second"
                            className="max-h-80 w-auto rounded-xl object-contain shadow-md"
                        />
                    ) : (
                        <div className="text-center">
                            <div className="text-sm text-gray-300">Upload Image B</div>
                            <div className="mt-2 text-xs text-gray-500">PNG, JPG, JPEG</div>
                            <div className="mt-4 px-4 py-2 rounded-xl bg-gray-800/40 group-hover:bg-gray-700/50 inline-block">
                                Choose file
                            </div>
                        </div>
                    )}
                </label>
            </div>

            <div className="space-y-3">
                <div className="text-sm text-gray-400">Mask Type</div>
                <div className="inline-flex rounded-2xl border border-gray-700/60 bg-[#101010] overflow-hidden">
                    {[
                        { key: 'overall', label: 'Overall' },
                        { key: 'upper', label: 'Upper' },
                        { key: 'lower', label: 'Lower' },
                    ].map((opt) => (
                        <button
                            key={opt.key}
                            onClick={() => setMaskType(opt.key)}
                            className={`px-4 py-2 text-sm transition ${maskType === opt.key
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'text-gray-300 hover:bg-gray-800/50'
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
                <button
                    onClick={handleCreateImage}
                    className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-medium shadow-md hover:shadow-lg transition transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                >
                    Create Your Image
                </button>

                <button
                    onClick={() => {
                        setImageA(null);
                        setImageB(null);
                    }}
                    className="px-5 py-2.5 rounded-xl border border-gray-700/60 bg-[#101010] hover:bg-[#181818] transition text-gray-300"
                >
                    Clear Images
                </button>
            </div>
        </div>
    );
};

export default Try;
