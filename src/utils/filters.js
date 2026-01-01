import { canvasState } from './canvasState.js';

export function applyThresholdFilter(graphics, threshold) {
    const ctx = graphics.canvas.getContext('2d');
    const w = graphics.canvas.width;  // Vraie dimension du canvas
    const h = graphics.canvas.height; // Vraie dimension du canvas
    
    
    // Lire les données directement du canvas
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;
    
    // Traiter chaque pixel
    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        let gray = 0.299*r + 0.587*g + 0.114*b;
        
        if (gray < threshold) {
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
        } else {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
        }
    }
    
    // Réécrire les pixels modifiés
    ctx.putImageData(imageData, 0, 0);
}

export function applyPixelateFilter(graphics, pixelSize) {
    const ctx = graphics.canvas.getContext('2d');
    const w = graphics.canvas.width;
    const h = graphics.canvas.height;
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;

    for (let y = 0; y < h; y += pixelSize) {
        for (let x = 0; x < w; x += pixelSize) {
            let red = 0, green = 0, blue = 0, alpha = 0, count = 0;
            
            // Calculer la moyenne incluant l'alpha
            for (let py = 0; py < pixelSize; py++) {
                for (let px = 0; px < pixelSize; px++) {
                    let posX = x + px;
                    let posY = y + py;
                    if (posX < w && posY < h) {
                        let index = (posY * w + posX) * 4;
                        let a = data[index + 3];
                        
                        // Ne compter que les pixels non transparents
                        if (a > 0) {
                            red += data[index];
                            green += data[index + 1];
                            blue += data[index + 2];
                            alpha += a;
                            count++;
                        }
                    }
                }
            }
            
            // Si le bloc contient des pixels visibles
            if (count > 0) {
                red = red / count;
                green = green / count;
                blue = blue / count;
                alpha = alpha / count;
                
                // Appliquer la couleur moyenne au bloc
                for (let py = 0; py < pixelSize; py++) {
                    for (let px = 0; px < pixelSize; px++) {
                        let posX = x + px;
                        let posY = y + py;
                        if (posX < w && posY < h) {
                            let index = (posY * w + posX) * 4;
                            data[index] = red;
                            data[index + 1] = green;
                            data[index + 2] = blue;
                            data[index + 3] = alpha;
                        }
                    }
                }
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

let densityChars = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '@'];

export function applyAsciiFilter(graphics, scale) {
    const ctx = graphics.canvas.getContext('2d');
    const w = graphics.canvas.width;
    const h = graphics.canvas.height;
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;

    // Effacer le canvas avant de dessiner le texte
    // ctx.fillStyle = 'white';
    // ctx.fillRect(0, 0, w, h);
    
    ctx.fillStyle = 'black';
    ctx.font = `${scale}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let y = 0; y < h; y += scale) {
        for (let x = 0; x < w; x += scale) {
            let red = 0, green = 0, blue = 0, count = 0;
            
            // Calculer la moyenne RGB du bloc
            for (let py = 0; py < scale; py++) {
                for (let px = 0; px < scale; px++) {
                    let posX = x + px;
                    let posY = y + py;
                    if (posX < w && posY < h) {
                        let index = (posY * w + posX) * 4;
                        red += data[index];
                        green += data[index + 1];
                        blue += data[index + 2];
                        count++;
                    }
                }
            }
            
            // Moyenne des couleurs
            red = red / count;
            green = green / count;
            blue = blue / count;
            
            // Calculer la luminosité (brightness)
            let brightness = 0.299 * red + 0.587 * green + 0.114 * blue;
            
            // Mapper la luminosité à un caractère ASCII
            // Plus c'est sombre (0), plus on va vers '@'
            // Plus c'est clair (255), plus on va vers ' '
            let charIndex = Math.floor((brightness / 255) * (densityChars.length - 1));
            charIndex = densityChars.length - 1 - charIndex; // Inverser
            let asciiChar = densityChars[charIndex];
            
            // Dessiner le caractère
            ctx.fillText(asciiChar, x + scale/2, y + scale/2);
        }
    }
}