import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Folder, FileText, FileCode, FileImage, File, Download, Search } from 'lucide-react';
import FilePreviewModal from '../components/ui/FilePreviewModal';

const FileIcon = ({ type }) => {
    switch (type) {
        case 'pdf': return <FileText className="w-8 h-8 text-red-400" />;
        case 'word': return <FileText className="w-8 h-8 text-blue-400" />;
        case 'code': return <FileCode className="w-8 h-8 text-yellow-400" />;
        case 'image': return <FileImage className="w-8 h-8 text-purple-400" />;
        default: return <File className="w-8 h-8 text-gray-400" />;
    }
};

const FilesPage = () => {
    const { id } = useParams();
    const { getFolderById, loading } = useData();
    const [currentFolder, setCurrentFolder] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (!loading) {
            const folder = getFolderById(id);
            setCurrentFolder(folder);
        }
    }, [id, loading, getFolderById]);

    if (loading) return <div>Loading...</div>;
    if (!currentFolder) return <div className="text-white">Folder not found</div>;

    return (
        <div>
            <header className="mb-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">{currentFolder.name}</h1>
                    <p className="text-gray-400 text-sm font-mono flex items-center gap-2">
                        {currentFolder.gdriveUrl ? (
                            <span className="flex items-center gap-1 text-green-400">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                Live GDrive
                            </span>
                        ) : 'Local View'}
                    </p>
                </div>
                {currentFolder.gdriveUrl && (
                    <button
                        onClick={() => window.open(currentFolder.gdriveUrl, '_blank')}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Open in Drive
                    </button>
                )}
            </header>

            {currentFolder.gdriveUrl ? (
                <div className="w-full h-[75vh] rounded-xl overflow-hidden border border-white/10 bg-slate-900/50 shadow-inner relative group">
                    <iframe
                        src={currentFolder.gdriveUrl.replace('/drive/folders/', '/embeddedfolderview?id=').replace('?usp=sharing', '') + '#list'}
                        className="w-full h-full border-0"
                        title="GDrive Embed"
                        allow="autoplay"
                    ></iframe>

                    {/* Fallback Overlay if Embed blocks */}
                    <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
                        <span className="text-gray-300 mb-2">If the preview doesn't load (due to Google permissions), click "Open in Drive" above.</span>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {currentFolder.children?.map((item) => (
                        item.type === 'folder' ? (
                            <Link
                                key={item.id}
                                to={`/dashboard/folder/${item.id}`}
                                className="glass-card p-4 rounded-xl flex flex-col items-center gap-3 text-center group"
                            >
                                <Folder className="w-16 h-16 text-blue-400/80 group-hover:text-blue-400 transition-colors" />
                                <span className="text-sm font-medium text-gray-200 truncate w-full">{item.name}</span>
                            </Link>
                        ) : (
                            <div
                                key={item.id}
                                className="glass-card p-4 rounded-xl flex flex-col items-center gap-3 text-center group relative cursor-pointer hover:bg-white/10"
                                onClick={() => setSelectedFile(item)}
                            >
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        className="p-1.5 hover:bg-white/10 rounded-full"
                                        title="Open in GDrive"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(item.url, '_blank');
                                        }}
                                    >
                                        <Download className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                                <div className="mt-2">
                                    <FileIcon type={item.fileType} />
                                </div>
                                <span className="text-sm font-medium text-gray-200 truncate w-full" title={item.name}>{item.name}</span>
                                <span className="text-xs text-gray-500">
                                    {item.size ? (item.size / 1024).toFixed(1) + ' KB' : 'GDrive Doc'}
                                </span>
                            </div>
                        )
                    ))}

                    {(!currentFolder.children || currentFolder.children.length === 0) && (
                        <div className="col-span-full py-20 text-center text-gray-500">
                            This folder is empty.
                        </div>
                    )}
                </div>
            )}

            {/* File Preview Modal */}
            {selectedFile && (
                <FilePreviewModal
                    file={selectedFile}
                    onClose={() => setSelectedFile(null)}
                />
            )}
        </div>
    );
};

export default FilesPage;
