import { useData } from '../context/DataContext';
import { FileText, Folder, HardDrive, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass-panel p-6 rounded-2xl relative overflow-hidden group"
    >
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
            <Icon className="w-24 h-24" />
        </div>
        <div className="relative z-10">
            <div className={`w-12 h-12 rounded-xl ${color} bg-opacity-20 flex items-center justify-center mb-4 text-white`}>
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
            <p className="text-gray-400 text-sm">{label}</p>
        </div>
    </motion.div>
);

const DashboardPage = () => {
    const { stats, loading } = useData();

    if (loading) {
        return <div className="text-white">Loading vault data...</div>;
    }

    return (
        <div>
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-gray-400">Welcome back, Zakaria. Here is your vault status.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    icon={Folder}
                    label="Total Folders"
                    value={stats.totalFolders}
                    color="bg-blue-500"
                />
                <StatCard
                    icon={FileText}
                    label="Total Files"
                    value={stats.totalFiles}
                    color="bg-purple-500"
                />
                <StatCard
                    icon={HardDrive}
                    label="Storage Used"
                    value={`${stats.storageUsed} MB`}
                    color="bg-emerald-500"
                />
                <StatCard
                    icon={Clock}
                    label="Last Sync"
                    value="Just now"
                    color="bg-orange-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                    <div className="glass-panel rounded-2xl p-6 min-h-[300px] flex items-center justify-center text-gray-500">
                        Chart or Recent File List will go here
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white mb-4">Quick Access</h2>
                    <div className="glass-panel rounded-2xl p-6 min-h-[300px] flex flex-col gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-white font-medium">Assignment_Final.pdf</p>
                                    <p className="text-xs text-gray-500">Updated 2m ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
