// Simple script to create PNG icons from SVG data
import fs from "fs";
import path from "path";

// Create public directory if it doesn't exist
const publicDir = "./public";
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// SVG content for icons
const svg192 = `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192">
  <rect width="192" height="192" fill="#4285f4" rx="20"/>
  <text x="96" y="120" font-size="80" text-anchor="middle" fill="white">📝</text>
</svg>`;

const svg512 = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
  <rect width="512" height="512" fill="#4285f4" rx="50"/>
  <text x="256" y="320" font-size="200" text-anchor="middle" fill="white">📝</text>
</svg>`;

// Write SVG files (browsers can use these as PNG alternatives)
fs.writeFileSync(path.join(publicDir, "pwa-192x192.svg"), svg192);
fs.writeFileSync(path.join(publicDir, "pwa-512x512.svg"), svg512);

// Create a simple HTML file that converts SVG to PNG using canvas
const converterHTML = `<!DOCTYPE html>
<html>
<head>
    <title>Icon Converter</title>
</head>
<body>
    <h3>Converting icons...</h3>
    <canvas id="canvas192" width="192" height="192"></canvas>
    <canvas id="canvas512" width="512" height="512"></canvas>
    
    <script>
        function createIcon(svgString, canvasId, filename) {
            const canvas = document.getElementById(canvasId);
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = function() {
                ctx.drawImage(img, 0, 0);
                canvas.toBlob(function(blob) {
                    const link = document.createElement('a');
                    link.download = filename;
                    link.href = URL.createObjectURL(blob);
                    link.click();
                }, 'image/png');
            };
            
            const blob = new Blob([svgString], {type: 'image/svg+xml'});
            const url = URL.createObjectURL(blob);
            img.src = url;
        }
        
        // Create icons
        createIcon(\`${svg192}\`, 'canvas192', 'pwa-192x192.png');
        setTimeout(() => {
            createIcon(\`${svg512}\`, 'canvas512', 'pwa-512x512.png');
        }, 1000);
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, "icon-converter.html"), converterHTML);

console.log("✅ Icon files created!");
console.log("📁 Files created in public/:");
console.log("   - pwa-192x192.svg");
console.log("   - pwa-512x512.svg");
console.log("   - icon-converter.html");
console.log("");
console.log("🔧 To create PNG versions:");
console.log("   1. Open public/icon-converter.html in your browser");
console.log("   2. It will automatically download PNG files");
console.log("   3. Save them to the public/ directory");
console.log("");
console.log("Or simply update vite.config.js to use the SVG files instead!");
