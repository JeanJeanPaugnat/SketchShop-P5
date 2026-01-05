import p5 from "p5";
import { canvasState, setColor, setTool } from '../utils/canvasState.js';
import { drawPencil, erasePencil, drawRectangle, clearCanvas } from '../utils/drawing.js';
import { applyThresholdFilter, applyPixelateFilter, applyAsciiFilter } from '../utils/filters.js'

import { C as exportP } from '../exportPage/export.js';
import { C as uploadP } from '../UploadPage/import.js';


let pInstance = null;
let calque2 = null;
let startX = 0;
let startY = 0;
let baseImage = null;

let calques = [];
let activeCalqueIndex = 0;

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

            p.setup = async () => {
                
                const canvas = p.createCanvas(width, height);

                canvas.drop(handleFileDrop);

                addNewLayer('calque1'); // Ajouter un calque initial
                
                calques[0].graphics.background(0); // Fond blanc pour le calque de base
                // Activer la lecture fréquente des pixels pour les filtres
                if (calques[0].graphics.canvas) {
                    const ctx = calques[0].graphics.canvas.getContext('2d');
                    if (ctx) ctx.willReadFrequently = true;
                } 
            };

            p.draw = () => {

                p.background(255);

                for (let i = 0; i < calques.length; i++) {
                    let layer = calques[i];
                    if (layer.visible) {
                    p.image(layer.graphics, 0, 0);
                    }
                }
                
                if (canvasState.tool === 'pencil' && p.mouseIsPressed) {
                    drawPencil(calques[activeCalqueIndex].graphics, p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
                }
                
                if (canvasState.tool === 'eraser' && p.mouseIsPressed) {
                    erasePencil(calques[activeCalqueIndex].graphics, p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
                }

                if (canvasState.tool === 'square' && canvasState.rectangleStart && p.mouseIsPressed) {
                    // Aperçu en temps réel (juste le contour, pas de remplissage)
                    p.push();
                    p.stroke(canvasState.color);
                    p.strokeWeight(2);
                    p.noFill();
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
                    // Dessiner le rectangle final REMPLI sur le calque
                    calques[activeCalqueIndex].graphics.push();
                    calques[activeCalqueIndex].graphics.fill(canvasState.color);
                    calques[activeCalqueIndex].graphics.noStroke();
                    calques[activeCalqueIndex].graphics.rect(
                        canvasState.rectangleStart.x,
                        canvasState.rectangleStart.y,
                        p.mouseX - canvasState.rectangleStart.x,
                        p.mouseY - canvasState.rectangleStart.y
                    );
                    calques[activeCalqueIndex].graphics.pop();
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

// Gestion du drop p5 (fichier image)
function handleFileDrop(file) {
    if (file && file.type === 'image') {
        // file.data est une DataURL prête à être chargée
        const dataURL = file.data;
        const p = pInstance;
        if (!p || !calque2) return;

        p.loadImage(dataURL, (loadedImg) => {
            baseImage = loadedImg; // garde une référence si besoin plus tard
            calque2.image(loadedImg, 0, 0);
        });
    }
}

function addNewLayer(name) {
    const p = pInstance;
    if (!p) return;
    const newCalque = p.createGraphics(canvasState.width, canvasState.height);

    let layerObj = {
        graphics: newCalque,
        name: name || `Calque ${calques.length + 1}`,
        visible: true
    };
    calques.push(layerObj);
    calque2 = newCalque;
    activeCalqueIndex = calques.length - 1;
    updateLayerUI();
}

function setActiveLayer(index) {
  activeCalqueIndex = index;
  updateLayerUI();
}

function updateLayerUI() {
    let list = document.querySelector('.layers');
    list.innerHTML = '';
    for (let i = calques.length - 1; i >= 0; i--) {
        let li = document.createElement('li');

        if (i === activeCalqueIndex) {
        li.style.backgroundColor = '#0c3e69ff';
        } else {
        li.style.backgroundColor = '#575757ff';
        }

        li.addEventListener('click', () => setActiveLayer(i));
        let spanName = document.createElement('span');
        spanName.textContent = calques[i].name;
        // Bouton Toggle Visibilité (petit bonus)
        let btnEye = document.createElement('button');
        btnEye.textContent = calques[i].visible ? '👁️' : '🚫';
        btnEye.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêche de sélectionner le calque quand on clique l'oeil
            toggleVisibility(i);
        });
        
        li.appendChild(spanName);
        li.appendChild(btnEye);
        list.appendChild(li);

    }
}





function toggleVisibility(index) {
  calques[index].visible = !calques[index].visible;
  updateLayerUI();
}


    function attachButtonListeners(p) {

    const layerBtn = document.getElementById("new-layer");
    const layerNameInput = document.getElementById("layer-name");
    if (layerBtn) {
        layerBtn.addEventListener("click", () => {
            addNewLayer(layerNameInput.value);
            console.log("Nouveau calque ajouté. Total calques:", calques.length);
        });
    }

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
            exportP.init(pInstance);
        });
    }


    //need to fix upload button
    const uploadBtn = document.getElementById("upload");
    if (uploadBtn) {
        uploadBtn.addEventListener("click", () => {
            console.log("Upload button clicked");
                uploadP.init(pInstance, calque2);
            // let appToModify = document.getElementById("appToModify");
            // let existingSection = document.getElementById("upload-section");
            // if (existingSection) {
            //     existingSection.remove(); // Supprimer l'ancienne section
            // }
            // V.renderUpload(appToModify);
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
            let appToModify = document.getElementById("appToModify");
            let sectionPixelate = '<input type="number" id="pixelSizeInput" value="10" min="1" max="100"/><button id="applyPixelateBtn">Apply Pixelate</button>';
            if (!document.getElementById("applyPixelateBtn")) {
                appToModify.insertAdjacentHTML('beforeend', sectionPixelate);
            }
            let applyPixelateBtn = document.getElementById("applyPixelateBtn");
            let pixelSizeInput = document.getElementById("pixelSizeInput");
            applyPixelateBtn.addEventListener("click", () => {
                let pixelSize = parseInt(pixelSizeInput.value, 10);
                applyPixelateFilter(calque2, pixelSize);
            });
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

    const asciiBtn = document.querySelector(".filter-ascii");
    if (asciiBtn) {
        asciiBtn.addEventListener("click", () => {
            // Appliquer le filtre ASCII ici
            applyAsciiFilter(calque2, 10);
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