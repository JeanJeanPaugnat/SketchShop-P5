import p5 from "p5";
import { canvasState, setColor, setTool } from '../utils/canvasState.js';
import { drawPencil, erasePencil, drawRectangle, clearCanvas } from '../utils/drawing.js';
import { applyThresholdFilter, applyPixelateFilter } from '../utils/filters.js'

import { C } from '../exportPage/export.js';


let pInstance = null;
let calque2 = null;
let startX = 0;
let startY = 0;

export function createCanvas(width, height) {

    canvasState.width = width;
    canvasState.height = height;
    
    let inputWidth = document.querySelector("#custom-width");
    let inputHeight = document.querySelector("#custom-height");


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

                calque2 = p.createGraphics(width, height);
                calque2.clear();
                
                // Activer la lecture fréquente des pixels pour les filtres
                if (calque2.canvas) {
                    const ctx = calque2.canvas.getContext('2d');
                    if (ctx) ctx.willReadFrequently = true;
                } 
            };

            p.draw = () => {

                p.background(220);
                p.image(calque2, 0, 0);
                
                if (canvasState.tool === 'pencil' && p.mouseIsPressed) {
                    drawPencil(calque2, p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
                }
                
                if (canvasState.tool === 'eraser' && p.mouseIsPressed) {
                    erasePencil(calque2, p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
                }

                if (canvasState.tool === 'square' && canvasState.rectangleStart && p.mouseIsPressed) {
                    p.push();
                    p.fill(canvasState.color);
                    p.noStroke();
                    p.rect(
                        canvasState.rectangleStart.x, 
                        canvasState.rectangleStart.y,
                        p.mouseX - canvasState.rectangleStart.x,
                        p.mouseY - canvasState.rectangleStart.y
                    );
                    p.pop();
                }
            };

            p.mousePressed = () => {
                if (canvasState.tool === 'square') {
                        canvasState.rectangleStart = { x: p.mouseX, y: p.mouseY };
                        console.log("Début rectangle:", canvasState.rectangleStart);

                }
            };

            p.mouseReleased = () => {
                if (canvasState.tool === 'square' && canvasState.rectangleStart) {
                    // Dessiner le rectangle final sur le calque
                    drawRectangle(
                        calque2,
                        canvasState.rectangleStart.x,
                        canvasState.rectangleStart.y,
                        p.mouseX,
                        p.mouseY
                    );
                    console.log("Rectangle dessiné");
                    // Reset
                    canvasState.rectangleStart = null;
                }
            };
        });
    }
    // Attacher les écouteurs des BOUTONS
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
    // Bouton ERASER
    const eraserBtn = document.getElementById("eraser");
    if (eraserBtn) {
        eraserBtn.addEventListener("click", () => {
            setTool('eraser');
            eraserBtn.style.backgroundColor = 'yellow';
        });
    }
    
    // // Bouton SQUARE
    // const squareBtn = document.getElementById("square");
    // if (squareBtn) {
    //     squareBtn.addEventListener("click", () => {
    //         setTool('square');
    //         squareBtn.style.backgroundColor = 'yellow';
    //     });
    // }

    const brushSizeInput = document.getElementById("brush-size");
    if (brushSizeInput) {
        brushSizeInput.addEventListener("input", (e) => {
            canvasState.brushSize = parseInt(e.target.value, 10);
        });
    }
    
    // Sélecteur COULEUR
    const colorPicker = document.getElementById("colorPicker");
    if (colorPicker) {
        colorPicker.addEventListener("change", (e) => {
            setColor(e.target.value); 
        });
    }
    
    // Bouton CLEAR
    const clearBtn = document.getElementById("clear");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            clearCanvas(calque2); 
        });
    }

    const exportBtn = document.getElementById("export");
    if (exportBtn) {
        exportBtn.addEventListener("click", () => {
            C.init(pInstance);
        });
    }

    const squareBtn = document.getElementById("shape-square");
    if (squareBtn) {
        squareBtn.addEventListener("click", () => {
            setTool('square');
            squareBtn.style.backgroundColor = 'yellow';
            console.log("Outil rectangle activé");
        });
    }

    const pixelateBtn = document.querySelector(".filter-pixelate");
    if (pixelateBtn) {
        pixelateBtn.addEventListener("click", () => {
            // Appliquer le filtre pixelate ici
            applyPixelateFilter(calque2, 10);
            console.log("Filtre pixelate appliqué");
        });
    }

    const filterThresholdBtn = document.querySelector(".filter-threshold");
    if (filterThresholdBtn) {
        filterThresholdBtn.addEventListener("click", () => {
            // Appliquer le filtre de seuil ici
            applyThresholdFilter(calque2, 128);
            console.log("Filtre de seuil appliqué");
        });
    }

    // function mousePressed() {
    //     startX = p.mouseX;
    //     startY = p.mouseY;
    // }

    // function mouseDragged() {
    //     if (canvasState.tool === 'square') {
    //         let mouseX = p.mouseX;
    //         let mouseY = p.mouseY;
    //         drawRectangle(calque2, startX, startY, mouseX, mouseY);
    //     }
    // }


}