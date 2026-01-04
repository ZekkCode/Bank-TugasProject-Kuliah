import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Home,
    FolderOpen,
    BookOpen,
    Settings,
    ChevronRight,
    ChevronDown,
    Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useData } from '../../context/DataContext';

const Sidebar = () => {
    const { data, loading, stats } = useData();

    if (loading) return null; // Or skeleton

    const semesters = data?.items?.filter(item => item.type === 'folder') || [];

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 border-r border-white/10 bg-[#020617]/80 backdrop-blur-xl z-40 hidden md:flex flex-col">
            <div className="p-6 flex items-center gap-3 flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Database className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h1 className="font-bold text-white tracking-wide">Bank Tugas</h1>
                    <p className="text-[10px] text-gray-400 tracking-wider">PROJECT VAULT</p>
                </div>
            </div>

            <nav className="px-4 space-y-2 mt-4 flex-1 overflow-y-auto custom-scrollbar">
                <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                            ? 'bg-primary/10 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] border border-primary/20'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`
                    }
                >
                    <Home className="w-5 h-5" />
                    <span className="font-medium">Overview</span>
                </NavLink>

                <div className="pt-4 pb-2">
                    <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Collections
                    </p>
                </div>

                {semesters.map((sem) => (
                    <NavLink
                        key={sem.id}
                        to={`/dashboard/folder/${sem.id}`}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-secondary/10 text-white border border-secondary/20'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`
                        }
                    >
                        <FolderOpen className="w-5 h-5" />
                        <span className="font-medium truncate">{sem.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-white/5 flex-shrink-0">
                <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                    <p className="text-xs text-gray-400">Storage Used</p>
                    <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                        <div className="h-full w-[70%] bg-gradient-to-r from-primary to-secondary rounded-full" />
                    </div>
                    <p className="text-right text-[10px] text-gray-500 mt-1">{stats.storageUsed} MB Used</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
