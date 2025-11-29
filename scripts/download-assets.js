import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../public/textures');
const BASE_URL = 'https://www.solarsystemscope.com/textures/download';

const FILES = [
    '2k_sun.jpg',
    '2k_mercury.jpg',
    '2k_venus_surface.jpg',
    '2k_venus_atmosphere.jpg',
    '2k_earth_daymap.jpg',
    '2k_earth_nightmap.jpg',
    '2k_earth_clouds.jpg',
    '2k_moon.jpg',
    '2k_mars.jpg',
    '2k_jupiter.jpg',
    '2k_saturn.jpg',
    '2k_uranus.jpg',
    '2k_neptune.jpg',
    '2k_stars_milky_way.jpg'
];

// Ensure directory exists
if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

console.log(`Starting download of ${FILES.length} assets to ${ASSETS_DIR}...`);

const downloadFile = (filename) => {
    return new Promise((resolve, reject) => {
        const fileUrl = `${BASE_URL}/${filename}`;
        const filePath = path.join(ASSETS_DIR, filename);
        const file = fs.createWriteStream(filePath);

        console.log(`Downloading ${filename}...`);

        https.get(fileUrl, (response) => {
            if (response.statusCode !== 200) {
                file.close();
                fs.unlink(filePath, () => {}); // Delete partial file
                reject(new Error(`Failed to download ${filename}: Status Code ${response.statusCode}`));
                return;
            }

            response.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(`✓ ${filename} downloaded successfully.`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filePath, () => {}); // Delete partial file
            reject(new Error(`Error downloading ${filename}: ${err.message}`));
        });
    });
};

const run = async () => {
    let successCount = 0;
    let failCount = 0;

    for (const filename of FILES) {
        try {
            await downloadFile(filename);
            successCount++;
        } catch (error) {
            console.error(`✗ ${error.message}`);
            failCount++;
        }
    }

    console.log('\n----------------------------------------');
    console.log(`Download Complete.`);
    console.log(`Success: ${successCount}`);
    console.log(`Failed:  ${failCount}`);
    console.log('----------------------------------------');
};

run();
