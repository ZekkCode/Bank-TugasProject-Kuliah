/* 
   GOOGLE APPS SCRIPT - ULTIMATE FOLDER SCANNER
   
   Cara Pakai:
   1. Buka https://script.google.com/home
   2. Buat Project Baru, Paste kode ini.
   3. Ganti 'ROOT_FOLDER_ID' dengan ID folder utama "Bank Tugas" Anda.
   4. Klik "Deploy" -> "New Deployment" -> Select Type: "Web App".
      - Execute as: Me
      - Who has access: Anyone (Supaya dashboard bisa baca)
   5. Copy URL yang dihasilkan (dimulai dengan https://script.google.com/macros/s/...)
   6. Tempel URL tersebut di codingan dashboard Anda.
*/

const ROOT_FOLDER_ID = "GANTI_DENGAN_ID_FOLDER_UTAMA_ANDA"; // Contoh: "1abcde..."

function doGet(e) {
    const data = scanDrive();
    return ContentService.createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
}

function scanDrive() {
    const rootFolder = DriveApp.getFolderById(ROOT_FOLDER_ID);

    const result = {
        generatedAt: new Date().toISOString(),
        rootName: rootFolder.getName(),
        items: getFolderContents(rootFolder)
    };

    return result;
}

function getFolderContents(folder) {
    let items = [];

    // 1. Scan Folders
    const subFolders = folder.getFolders();
    while (subFolders.hasNext()) {
        const subFolder = subFolders.next();
        items.push({
            id: subFolder.getId(),
            name: subFolder.getName(),
            type: 'folder',
            path: subFolder.getUrl(), // Link asli folder
            children: getFolderContents(subFolder) // Recursive!
        });
    }

    // 2. Scan Files
    const files = folder.getFiles();
    while (files.hasNext()) {
        const file = files.next();
        items.push({
            id: file.getId(),
            name: file.getName(),
            type: 'file',
            fileType: getFileType(file.getName(), file.getMimeType()),
            url: file.getUrl(), // Link buka file (Preview)
            downloadUrl: file.getDownloadUrl(),
            size: file.getSize(),
            createdAt: file.getDateCreated()
        });
    }

    return items;
}

function getFileType(filename, mimeType) {
    const ext = filename.split('.').pop().toLowerCase();

    // 1. Video & Links (Priority)
    if (ext === 'url' || filename.toLowerCase().includes('youtube')) return 'video-link';
    if (mimeType.includes('video') || ['mp4', 'mkv', 'avi', 'mov'].includes(ext)) return 'video';

    // 2. Database
    if (['sql', 'db', 'sqlite', 'mdb', 'accdb', 'dump'].includes(ext)) return 'database';

    // 3. Programming & Web
    if (['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'scss', 'json', 'xml', 'yaml', 'yml'].includes(ext)) return 'code-web';
    if (['py', 'java', 'cpp', 'c', 'cs', 'php', 'go', 'rb', 'swift', 'kt', 'rs', 'sh', 'bat', 'ps1'].includes(ext)) return 'code';

    // 4. Documents & Office
    if (mimeType.includes('pdf') || ext === 'pdf') return 'pdf';
    if (mimeType.includes('word') || ['doc', 'docx', 'rtf', 'txt'].includes(ext)) return 'word';
    if (mimeType.includes('presentation') || ['ppt', 'pptx'].includes(ext)) return 'ppt';
    if (mimeType.includes('spreadsheet') || ['xls', 'xlsx', 'csv'].includes(ext)) return 'excel';

    // 5. Assets
    if (mimeType.includes('image') || ['jpg', 'jpeg', 'png', 'gif', 'svg', 'ico', 'webp'].includes(ext)) return 'image';
    if (['zip', 'rar', '7z', 'tar', 'gz', 'iso'].includes(ext)) return 'archive';

    return 'file';
}
