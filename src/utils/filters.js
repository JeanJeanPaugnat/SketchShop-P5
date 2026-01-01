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


// function turnToSeuillage(img, x, y, threshold) {
//     let index = (x + y * img.width) * 4;
//     let r = img.pixels[index];
//     let g = img.pixels[index + 1];
//     let b = img.pixels[index + 2];
//     let gray =  0.299*r + 0.587*g + 0.114*b;
//     if (gray < threshold) {
//         img.pixels[index] = 0;
//         img.pixels[index + 1] = 0;
//         img.pixels[index + 2] = 0;
//     } else {
//         img.pixels[index] = 255;
//         img.pixels[index + 1] = 255;
//         img.pixels[index + 2] = 255;
//     }
// }
