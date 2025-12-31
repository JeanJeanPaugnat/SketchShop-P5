import p5 from "p5";
import { canvasState, setColor, setTool } from '../utils/canvasState.js';
import { drawPencil, erasePencil, drawSquare, clearCanvas } from '../utils/drawing.js';
import { C } from '../exportPage/export.js';


let pInstance = null;
let calque2 = null;

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
            };

            p.mouseReleased = () => {
                canvasState.isDrawing = false;
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
    
    // Bouton SQUARE
    const squareBtn = document.getElementById("square");
    if (squareBtn) {
        squareBtn.addEventListener("click", () => {
            setTool('square');
            squareBtn.style.backgroundColor = 'yellow';
        });
    }

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
    
}
