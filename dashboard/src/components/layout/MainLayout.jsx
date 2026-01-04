import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell, Search, User } from 'lucide-react';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-primary selection:text-white">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="md:ml-64 min-h-screen relative">
                {/* Header / Top Bar */}
                <header className="sticky top-0 z-30 px-8 py-5 flex items-center justify-between backdrop-blur-md bg-[#020617]/50 border-b border-white/5">
                    {/* Search Bar - hidden on mobile for now */}
                    <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 w-96 focus-within:bg-white/10 focus-within:border-primary/50 transition-all">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search files, projects..."
                            className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500"
                        />
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary p-[1px]">
                            <div className="w-full h-full rounded-full bg-[#020667] flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
