import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../public/textures');
const RENDERS_DIR = path.join(__dirname, '../public/renders');

// Ensure directories exist
if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
}
if (!fs.existsSync(RENDERS_DIR)) {
    fs.mkdirSync(RENDERS_DIR, { recursive: true });
}

const TEXTURE_BASE_URL = 'https://www.solarsystemscope.com/textures/download';
// Using a consistent source for "iconic" renders. 
// 'nineplanets.org' has good transparent ones, but direct scraping might be blocked.
// 'space-facts.com' offers 800x800 transparent PNGs.
// Let's try to fetch from a reliable source of "transparent solar system planets".
// Wikimedia Commons is often a good source for public domain NASA renders.
// However, for simplicity and speed, I will try a known direct file list or reliable CDN if possible.
// Since I cannot browse to find exact URLs, I will use a set of likely URLs from a public GitHub repo or similar if I can't find them.
// BUT, I found 'space-facts.com' in search result 4 has transparent PNGs.
// URLs are likely: https://space-facts.com/wp-content/uploads/mercury-transparent.png, etc.
// Let's try that pattern first.

const RENDER_FILES = [
    { name: 'sun.png', url: 'https://space-facts.com/wp-content/uploads/sun-transparent.png' },
    { name: 'mercury.png', url: 'https://space-facts.com/wp-content/uploads/mercury-transparent.png' },
    { name: 'venus.png', url: 'https://space-facts.com/wp-content/uploads/venus-transparent.png' },
    { name: 'earth.png', url: 'https://space-facts.com/wp-content/uploads/earth-transparent.png' },
    { name: 'mars.png', url: 'https://space-facts.com/wp-content/uploads/mars-transparent.png' },
    { name: 'jupiter.png', url: 'https://space-facts.com/wp-content/uploads/jupiter-transparent.png' },
    { name: 'saturn.png', url: 'https://space-facts.com/wp-content/uploads/saturn-transparent.png' },
    { name: 'uranus.png', url: 'https://space-facts.com/wp-content/uploads/uranus-transparent.png' },
    { name: 'neptune.png', url: 'https://space-facts.com/wp-content/uploads/neptune-transparent.png' },
    { name: 'pluto.png', url: 'https://space-facts.com/wp-content/uploads/pluto-transparent.png' }
];

const ADDITIONAL_TEXTURES = [
    { name: '2k_pluto.jpg', url: 'https://www.solarsystemscope.com/textures/download/2k_haumea_fictional.jpg' } // Using Haumea or Moon as placeholder if Pluto not found, but wait, solarsystemscope doesn't have pluto in standard list?
    // Actually, let's try to find a real Pluto texture url. 
    // If not, I will use a generic rocky texture.
];
// Note: Pluto texture on SolarSystemScope is sometimes not direct.
// I will try a known alternative for Pluto:
// https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Pluto_in_True_Color_-_High-Res.jpg/1024px-Pluto_in_True_Color_-_High-Res.jpg
// But that's an image, not a cylindrical map.
// Let's stick to downloading the renders first, and I will use a "Moon" texture copy for Pluto if I can't find a map, 
// OR I'll just use the Moon texture I already have as a fallback in the code.
// Actually, I'll try to download a specific Pluto map.
const PLUTO_MAP_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Pluto_Map_ Mercator_Projection.jpg/1024px-Pluto_Map_Mercator_Projection.jpg';


const downloadFile = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        const request = https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`✓ Downloaded ${path.basename(filepath)}`);
                    resolve();
                });
            } else if (response.statusCode === 301 || response.statusCode === 302) {
                // Follow redirect
                downloadFile(response.headers.location, filepath).then(resolve).catch(reject);
            } else {
                fs.unlink(filepath, () => {});
                reject(new Error(`Failed to download ${url}: Status Code ${response.statusCode}`));
            }
        });
        request.on('error', (err) => {
            fs.unlink(filepath, () => {});
            reject(err);
        });
    });
};

const run = async () => {
    console.log('Starting render downloads...');
    
    // Download Renders
    for (const item of RENDER_FILES) {
        try {
            await downloadFile(item.url, path.join(RENDERS_DIR, item.name));
        } catch (e) {
            console.error(`✗ Failed to download ${item.name}: ${e.message}`);
            // Fallback for Pluto if transparent one fails?
        }
    }

    // Download Extra Textures
    console.log('Downloading extra textures...');
    try {
        // Try to get a Pluto Map. Wikimedia requires User-Agent sometimes.
        // Let's just use a copy of the Moon texture for Pluto for now to ensure "texture" exists, 
        // or try to fetch a simple one.
        // Actually, let's try to download the Moon texture again and save as Pluto if we can't get a real one easily without complex headers.
        // But I'll try one attempt at a pluto map from a different source.
        // Planetary Society? 
        // I will just use the Moon texture as a fallback in the code if 2k_pluto.jpg is missing.
        // But I'll create a copy of 2k_moon.jpg as 2k_pluto.jpg so the code works.
        const moonPath = path.join(ASSETS_DIR, '2k_moon.jpg');
        const plutoPath = path.join(ASSETS_DIR, '2k_pluto.jpg');
        if (fs.existsSync(moonPath) && !fs.existsSync(plutoPath)) {
            fs.copyFileSync(moonPath, plutoPath);
            console.log('✓ Created 2k_pluto.jpg (from Moon texture placeholder)');
        }
    } catch (e) {
        console.error(e);
    }

    console.log('Done.');
};

run();
