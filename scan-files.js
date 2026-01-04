const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const OUTPUT_FILE = path.join(ROOT_DIR, 'dashboard', 'src', 'data', 'project-data.json');

const IGNORE_DIRS = ['dashboard', 'node_modules', '.git', '.gemini', '.agent'];
const IGNORE_FILES = ['scan-files.js', 'package-lock.json', 'package.json'];

function getFileIcon(filename) {
    const ext = path.extname(filename).toLowerCase();
    switch (ext) {
        case '.pdf': return 'pdf';
        case '.doc': case '.docx': return 'word';
        case '.ppt': case '.pptx': return 'ppt';
        case '.xls': case '.xlsx': return 'excel';
        case '.jpg': case '.png': case '.jpeg': return 'image';
        case '.cpp': case '.js': case '.py': case '.html': case '.css': return 'code';
        case '.zip': case '.rar': return 'archive';
        default: return 'file';
    }
}

function scanDirectory(dir) {
    const name = path.basename(dir);
    const stats = fs.statSync(dir);

    const item = {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        type: 'folder',
        path: path.relative(ROOT_DIR, dir).replace(/\\/g, '/'),
        size: stats.size, //Folder size is tricky, but keeping it simple
        createdAt: stats.birthtime,
        children: []
    };

    try {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            if (IGNORE_DIRS.includes(file) || IGNORE_FILES.includes(file)) continue;

            const fullPath = path.join(dir, file);
            const fileStats = fs.statSync(fullPath);

            if (fileStats.isDirectory()) {
                item.children.push(scanDirectory(fullPath));
            } else {
                item.children.push({
                    id: Math.random().toString(36).substr(2, 9),
                    name: file,
                    type: 'file',
                    fileType: getFileIcon(file),
                    path: path.relative(ROOT_DIR, fullPath).replace(/\\/g, '/'),
                    size: fileStats.size,
                    createdAt: fileStats.birthtime
                });
            }
        }
    } catch (err) {
        console.error(`Error scanning directory ${dir}:`, err);
    }

    return item;
}

function main() {
    console.log('Scanning directory...');
    const rootChildren = [];

    // Scan only specifically Semester folders to be clean, or scan root?
    // User asked for "Semester-1", etc. Let's scan specific top-level folders if they exist, or just scan everything non-ignored.

    const files = fs.readdirSync(ROOT_DIR);
    for (const file of files) {
        if (IGNORE_DIRS.includes(file) || IGNORE_FILES.includes(file)) continue;
        // Filter primarily for folders like "Semester-..." or just take all folders
        const fullPath = path.join(ROOT_DIR, file);
        if (fs.statSync(fullPath).isDirectory()) {
            rootChildren.push(scanDirectory(fullPath));
        }
    }

    const data = {
        generatedAt: new Date().toISOString(),
        items: rootChildren
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
    console.log(`Scan complete! Data saved to ${OUTPUT_FILE}`);
}

main();
