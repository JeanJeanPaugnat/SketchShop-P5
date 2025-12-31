import { canvasState } from './canvasState.js';

// Fonction pour dessiner au crayon
export function drawPencil(graphics, mouseX, mouseY, pmouseX, pmouseY) {
    graphics.stroke(canvasState.color); 
    graphics.strokeWeight(canvasState.brushSize);
    graphics.line(mouseX, mouseY, pmouseX, pmouseY);
}

// Fonction pour effacer
export function erasePencil(graphics, mouseX, mouseY, pmouseX, pmouseY) {
    graphics.erase();
    graphics.strokeWeight(canvasState.brushSize);
    graphics.line(mouseX, mouseY, pmouseX, pmouseY);
    graphics.noErase();
}

// Fonction pour dessiner un carré
export function drawSquare(graphics, x, y, size) {
    graphics.fill(canvasState.color);
    graphics.rect(x, y, size, size);
}

// Fonction pour effacer
export function clearCanvas(graphics) {
    graphics.clear();
}