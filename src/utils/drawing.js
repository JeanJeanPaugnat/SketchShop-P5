import { canvasState } from './canvasState.js';

// Variables globales pour stocker la vitesse lissée
let lastSmoothedSpeed = 0;

// Calcule la vitesse de la souris et retourne un strokeWeight adapté avec transition fluide
function calculateDynamicStrokeWeight(mouseX, mouseY, pmouseX, pmouseY) {
    // Calculer la distance parcourue (vitesse)
    const dx = mouseX - pmouseX;
    const dy = mouseY - pmouseY;
    const speed = Math.sqrt(dx * dx + dy * dy);
    
    // Lissage exponentiel pour une transition douce
    // Plus la valeur de smoothing est proche de 1, plus la transition est lisse
    const smoothing = 0.3;
    lastSmoothedSpeed = lastSmoothedSpeed * (1 - smoothing) + speed * smoothing;
    
    // Mapper la vitesse lissée à un strokeWeight
    // Vitesse lente (faible distance) = trait épais
    // Vitesse rapide (grande distance) = trait fin
    
    // Augmenter maxSpeed pour une transition plus progressive
    const maxSpeed = 50;
    const normalizedSpeed = Math.min(lastSmoothedSpeed, maxSpeed) / maxSpeed;
    
    // Utiliser une courbe ease-in-out pour une transition plus naturelle
    // Au lieu d'une transition linéaire
    const easedSpeed = normalizedSpeed * normalizedSpeed * (3 - 2 * normalizedSpeed);
    
    // Inverser: faible vitesse = gros weight, vitesse rapide = petit weight
    const minWeight = 1;
    const maxWeight = canvasState.brushSize;
    const dynamicWeight = maxWeight - (easedSpeed * (maxWeight - minWeight));
    
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