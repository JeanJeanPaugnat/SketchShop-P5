import { canvasState } from './canvasState.js';

// Calcule la vitesse de la souris et retourne un strokeWeight adapté
function calculateDynamicStrokeWeight(mouseX, mouseY, pmouseX, pmouseY) {
    // Calculer la distance parcourue (vitesse)
    const dx = mouseX - pmouseX;
    const dy = mouseY - pmouseY;
    const speed = Math.sqrt(dx * dx + dy * dy);
    
    // Mapper la vitesse à un strokeWeight
    // Vitesse lente (faible distance) = trait épais
    // Vitesse rapide (grande distance) = trait fin
    
    // Limiter la vitesse entre 0 et une valeur max
    const maxSpeed = 30;
    const normalizedSpeed = Math.min(speed, maxSpeed) / maxSpeed;
    
    // Inverser: faible vitesse = gros weight, vitesse rapide = petit weight
    const minWeight = 1;
    const maxWeight = canvasState.brushSize;
    const dynamicWeight = maxWeight - (normalizedSpeed * (maxWeight - minWeight));
    
    return Math.max(minWeight, dynamicWeight);
}

// Fonction pour dessiner au crayon avec épaisseur dynamique
export function drawPencil(graphics, mouseX, mouseY, pmouseX, pmouseY) {
    graphics.stroke(canvasState.color);
    
    // Utiliser l'épaisseur dynamique seulement si activée
    let strokeW = canvasState.brushSize;
    if (canvasState.dynamicBrush) {
        strokeW = calculateDynamicStrokeWeight(mouseX, mouseY, pmouseX, pmouseY);
    }
    graphics.strokeWeight(strokeW);
    
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

// dessiner un rectangle
export function drawRectangle(graphics, x1, y1, x2, y2) {
    graphics.fill(canvasState.color);
    graphics.noStroke();
    graphics.rect(x1, y1, x2 - x1, y2 - y1);
}