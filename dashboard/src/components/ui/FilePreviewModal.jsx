import React from 'react';
import { X, ExternalLink } from 'lucide-react';

const FilePreviewModal = ({ file, onClose }) => {
    if (!file) return null;

    // Function to convert GDrive view URL to preview/embed URL
    const getEmbedUrl = (url) => {
        if (!url) return '';
        // If it's already a preview link
        if (url.includes('/preview')) return url;
        // Handle standard view links
        if (url.includes('/view')) return url.replace('/view', '/preview');
        // Handle docs/sheets/slides links
        if (url.includes('/edit')) return url.replace('/edit', '/preview');

        return url;
    };

    const embedUrl = file.previewUrl || getEmbedUrl(file.url);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-white/10 w-full max-w-6xl h-[90vh] rounded-2xl flex flex-col shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-indigo-500/20`}>
                            <span className="text-indigo-400 font-bold uppercase text-xs">
                                {file.fileType}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-white font-medium truncate max-w-md">{file.name}</h3>
                            <p className="text-xs text-gray-400">Preview Mode</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => window.open(file.url, '_blank')}
                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
                            title="Open in New Tab"
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span className="hidden sm:inline">Open Original</span>
                        </button>
                        <div className="h-6 w-px bg-white/10 mx-2"></div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-red-500/20 hover:text-red-400 text-gray-400 rounded-lg transition-colors"
                            title="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-slate-950 relative overflow-hidden">
                    {embedUrl ? (
                        <iframe
                            src={embedUrl}
                            className="w-full h-full border-0"
                            allow="autoplay"
                            title="File Preview"
                        ></iframe>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <p>Preview not available for this file type.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default FilePreviewModal;
