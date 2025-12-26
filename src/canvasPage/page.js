import p5 from "p5";

let pInstance = null;
let sizeCanvasWidth = 0;
let sizeCanvasHeight = 0;

function resizeCanvas() {
    let inputWidth = document.querySelector("#custom-width");
    let inputHeight = document.querySelector("#custom-height");
    if (!inputWidth || !inputHeight) {
        console.error("Inputs not found");
        return;
    }
    
    let width = parseInt(inputWidth.value);
    let height = parseInt(inputHeight.value);
    console.log("Resizing canvas to: " + width + "x" + height);
    
    if (pInstance && width > 0 && height > 0) {
        pInstance.resizeCanvas(width, height);
        pInstance.background(220);
        sizeCanvasWidth = width;
        sizeCanvasHeight = height;
    }
}

export function createCanvas(width, height) {
    sizeCanvasWidth = width;
    sizeCanvasHeight = height;
    
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
                p.createCanvas(sizeCanvasWidth, sizeCanvasHeight);
                p.background(220);
            };
        });
    } else {
        console.log("Resizing canvas to: " + width + "x" + height);
        pInstance.resizeCanvas(width, height);
        pInstance.background(220);
    }
    
    // Ajouter l'écouteur pour le bouton de redimensionnement
    attachResizeListener();
}

function attachResizeListener() {
    const resizeButton = document.getElementById("resize");
    if (resizeButton) {
        resizeButton.addEventListener("click", resizeCanvas);
    }
}
