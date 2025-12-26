import { canvasState } from './canvasState.js';

// Fonction pour dessiner au crayon
export function drawPencil(p, mouseX, mouseY) {
    p.stroke(canvasState.color); 
    p.strokeWeight(6);
    p.line(mouseX, mouseY, p.pmouseX, p.pmouseY);
}

// Fonction pour dessiner un carré
export function drawSquare(p, x, y, size) {
    p.fill(canvasState.color);
    p.rect(x, y, size, size);
}

// Fonction pour effacer
export function clearCanvas(p) {
    p.background(220);
}