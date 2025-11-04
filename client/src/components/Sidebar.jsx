import React from 'react';
import { FaFlask, FaImages, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ onSelect }) => {
    const listItems = [
        { name: 'Try', icon: <FaFlask /> },
        { name: 'Your Images', icon: <FaImages /> },
        { name: 'Settings', icon: <FaCog /> },
        { name: 'Logout', icon: <FaSignOutAlt /> },
    ];

    return (
        <div className="h-screen w-64 bg-black/40 backdrop-blur-xl border-r border-gray-800 flex flex-col justify-between p-6">
            <div>
                <h1 className="text-2xl font-bold text-white mb-10 tracking-wide">
                    Tryelle
                </h1>

                <ul className="space-y-4">
                    {listItems.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => onSelect(item.name)}
                            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-xl cursor-pointer transition-all duration-300"
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-base">{item.name}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="text-sm text-gray-500 text-center">© 2025 Tryelle</div>
        </div>
    );
};

export default Sidebar;
