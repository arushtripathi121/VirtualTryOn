import React, { useState } from "react";
import api from "../hooks/api";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Trash2, ShieldCheck, X } from "lucide-react";

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);
            const res = await api.post("/logout");
            if (res.data.success) {
                localStorage.clear();
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            setLoading(true);
            const res = await api.delete("/delete-account");
            if (res.data.success) {
                localStorage.clear();
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Account deletion failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const settings = [
        {
            id: "security",
            title: "Security",
            description: "Manage your login sessions and access tokens.",
            icon: <ShieldCheck className="text-blue-400" size={22} />,
            button: null,
        },
        {
            id: "logout",
            title: "Logout",
            description: "Sign out of your account safely and securely.",
            icon: <LogOut className="text-sky-400" size={22} />,
            button: (
                <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 text-white text-sm font-medium shadow hover:shadow-md transition disabled:opacity-50"
                >
                    {loading ? "Logging out..." : "Logout"}
                </button>
            ),
        },
        {
            id: "delete",
            title: "Delete Account",
            description:
                "Permanently delete your account and all your generated images. This action cannot be undone.",
            icon: <Trash2 className="text-red-500" size={22} />,
            button: (
                <button
                    onClick={() => setConfirmDelete(true)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm font-medium shadow hover:shadow-md transition"
                >
                    Delete
                </button>
            ),
        },
    ];

    return (
        <div className="min-h-screen w-full text-white space-y-10">
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent tracking-tight text-center">
                Account Settings
            </h2>

            <div className="max-w-3xl mx-auto bg-[#0f0f0f] rounded-2xl border border-gray-800 shadow-lg divide-y divide-gray-800 overflow-hidden">
                {settings.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 hover:bg-[#141414] transition"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-xl bg-[#1a1a1a] border border-gray-700/60">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-base font-medium text-gray-100">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-400 max-w-md">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                        {item.button && (
                            <div className="flex-shrink-0 self-end sm:self-center">
                                {item.button}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {confirmDelete && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-[#111] border border-gray-700 rounded-2xl p-8 text-center max-w-sm w-full shadow-xl relative"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <button
                                onClick={() => setConfirmDelete(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                <X size={22} />
                            </button>

                            <h3 className="text-xl font-semibold text-red-400 mb-4">
                                Confirm Deletion
                            </h3>
                            <p className="text-gray-400 mb-6 text-sm">
                                Are you sure you want to permanently delete your account? This
                                cannot be undone.
                            </p>

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={() => setConfirmDelete(false)}
                                    className="px-5 py-2.5 rounded-xl border border-gray-700 bg-[#1b1b1b] hover:bg-[#222] transition text-gray-300 text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={loading}
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white hover:opacity-90 transition text-sm disabled:opacity-50"
                                >
                                    {loading ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Settings;
