import p5 from "p5";
import { canvasState, setColor, setTool } from '../utils/canvasState.js';
import { drawPencil, drawSquare, clearCanvas } from '../utils/drawing.js';
import {  } from '../exportPage/export.js';


let pInstance = null;

export function createCanvas(width, height) {
    // 1. Mettre à jour l'état
    canvasState.width = width;
    canvasState.height = height;
    
    let inputWidth = document.querySelector("#custom-width");
    let inputHeight = document.querySelector("#custom-height");

    // Assigner les valeurs aux inputs
    if (inputWidth && inputHeight) {
        inputWidth.value = width;
        inputHeight.value = height;
    }
    console.log("Canvas inputs set to: " + width + "x" + height);

    if (!pInstance) {
        pInstance = new p5((p) => {
            p.setup = () => {
                p.createCanvas(width, height);
                p.background(220);

            };

                        
            // CETTE FONCTION S'APPELLE À CHAQUE FRAME (60x par seconde)
            p.draw = () => {
                // Si on dessine au crayon ET qu'on bouge la souris
                if (canvasState.tool === 'pencil' && p.mouseIsPressed) {
                    drawPencil(p, p.mouseX, p.mouseY);  // appelle le dessin
                }
            };
                        // Quand on lâche la souris
            p.mouseReleased = () => {
                canvasState.isDrawing = false;
            };
                    });
                }
                // 3. Attacher les écouteurs des BOUTONS
            attachButtonListeners(pInstance);
}



    function attachButtonListeners(p) {
    // Bouton PENCIL
    const pencilBtn = document.getElementById("pencil");
    if (pencilBtn) {
        pencilBtn.addEventListener("click", () => {
            setTool('pencil');  // change l'outil dans l'état
            pencilBtn.style.backgroundColor = 'yellow';  // retour visuel
        });
    }
    
    // Bouton SQUARE
    const squareBtn = document.getElementById("square");
    if (squareBtn) {
        squareBtn.addEventListener("click", () => {
            setTool('square');
            squareBtn.style.backgroundColor = 'yellow';
        });
    }
    
    // Sélecteur COULEUR
    const colorSelect = document.getElementById("colorChange");
    if (colorSelect) {
        colorSelect.addEventListener("change", (e) => {
            setColor(e.target.value);  // change la couleur dans l'état
        });
    }
    
    // Bouton CLEAR
    const clearBtn = document.getElementById("clear");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            clearCanvas(p); 
        });
    }

    const exportBtn = document.getElementById("export");
    if (exportBtn) {
        exportBtn.addEventListener("click", () => {
            p.saveCanvas('mini-photoshop', 'png');
        });
    }
    
}



// saveCanvas(selectedCanvas, [filename], [extension])