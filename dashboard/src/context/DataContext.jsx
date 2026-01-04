import { createContext, useContext, useState, useEffect } from 'react';
import projectData from '../data/project-data.json';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalFiles: 0,
        totalFolders: 0,
        storageUsed: 0
    });

    useEffect(() => {
        const loadData = async () => {
            // Ganti URL ini dengan URL dari Google Apps Script Deployment Anda nanti
            // Contoh: "https://script.google.com/macros/s/AKfycbx.../exec"
            const CLOUD_API_URL = "";

            try {
                if (CLOUD_API_URL) {
                    const response = await fetch(CLOUD_API_URL);
                    const cloudData = await response.json();

                    if (cloudData && cloudData.items) {
                        processData(cloudData);
                        return;
                    }
                }
            } catch (error) {
                console.warn("Gagal mengambil data dari Cloud, menggunakan data lokal:", error);
            }

            // Fallback: Gunakan data lokal jika Cloud kosong/gagal
            // Simulate async load
            setTimeout(() => {
                processData(projectData);
            }, 500);
        };

        const processData = (rawData) => {
            setData(rawData);

            // Calculate stats
            let files = 0;
            let folders = 0;
            let size = 0;

            const traverse = (items) => {
                items.forEach(item => {
                    if (item.type === 'folder') {
                        folders++;
                        if (item.children) traverse(item.children);
                    } else {
                        files++;
                        size += item.size || 0;
                    }
                });
            };

            if (rawData.items) {
                traverse(rawData.items);
            }

            setStats({
                totalFiles: files,
                totalFolders: folders,
                storageUsed: (size / (1024 * 1024)).toFixed(2) // MB
            });

            setLoading(false);
        };

        loadData();
    }, []);

    const getFolderById = (id, items = data?.items) => {
        if (!items) return null;
        for (const item of items) {
            if (item.id === id) return item;
            if (item.children) {
                const found = getFolderById(id, item.children);
                if (found) return found;
            }
        }
        return null;
    };

    return (
        <DataContext.Provider value={{ data, loading, stats, getFolderById }}>
            {children}
        </DataContext.Provider>
    );
};
