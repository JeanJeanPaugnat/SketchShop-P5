import { canvasState } from './canvasState.js';

// Variables globales pour stocker l'historique des vitesses pour lissage avancé
let speedHistory = [];
const SPEED_HISTORY_SIZE = 5; // Garder les 5 derniers calculs de vitesse

// Calcule la vitesse de la souris et retourne un strokeWeight adapté avec transition ultra-fluide
function calculateDynamicStrokeWeight(mouseX, mouseY, pmouseX, pmouseY) {
    // Calculer la distance parcourue (vitesse)
    const dx = mouseX - pmouseX;
    const dy = mouseY - pmouseY;
    const speed = Math.sqrt(dx * dx + dy * dy);
    
    // Ajouter à l'historique de vitesse
    speedHistory.push(speed);
    if (speedHistory.length > SPEED_HISTORY_SIZE) {
        speedHistory.shift();
    }
    
    // Calculer la moyenne mobile pour un lissage ultra-progressif
    const averageSpeed = speedHistory.reduce((a, b) => a + b, 0) / speedHistory.length;
    
    // Plage de vitesse augmentée pour une transition très progressive
    const maxSpeed = 80;
    const normalizedSpeed = Math.min(averageSpeed, maxSpeed) / maxSpeed;
    
    // Courbe d'easing plus douce (cubic ease-in-out)
    let easedSpeed;
    if (normalizedSpeed < 0.5) {
        easedSpeed = 4 * normalizedSpeed * normalizedSpeed * normalizedSpeed;
    } else {
        const x = 2 * normalizedSpeed - 2;
        easedSpeed = 0.5 * x * x * x + 1;
    }
    
    // Utiliser des pourcentages de la brush size actuelle
    // À vitesse rapide, le trait devient 30% de la taille de la brush
    // À vitesse lente, c'est 100% de la taille de la brush
    const maxWeight = canvasState.brushSize;
    const minWeight = canvasState.brushSize * 0.30; // 30% de la brush size
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