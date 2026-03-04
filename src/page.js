import { navigateTo } from './utils/router.js';

if (!window.canvasSize) {
    window.canvasSize = {
        width: 800,
        height: 600
    };
}

function sizeSelected(ev) {
    const target = ev.currentTarget;
    console.log("Preset size selected: " + target.dataset.width + "x" + target.dataset.height);
    let width = parseInt(target.dataset.width, 10);
    let height = parseInt(target.dataset.height, 10);
    
    // Stocker la taille sélectionnée
    window.canvasSize.width = width;
    window.canvasSize.height = height;
    
    // Naviguer vers la page canvas
    navigateTo('/canvas');
}

function customSizeSelected(width, height) {
    console.log(width, height);
    console.log("Custom size selected: " + width + "x" + height);
    
    // Stocker la taille sélectionnée
    window.canvasSize.width = width;
    window.canvasSize.height = height;
    
    // Naviguer vers la page canvas
    navigateTo('/canvas');
}

function attachEventListeners() {
    let buttonPreset = document.querySelectorAll(".preset-btn");
    buttonPreset.forEach(button => {
        button.addEventListener("click", sizeSelected);
        console.log(button);
    });
    let applyCustom = document.getElementById("apply-custom");
    let inputWidth = document.getElementById("custom-width");
    let inputHeight = document.getElementById("custom-height");
    if (inputWidth && inputHeight && applyCustom) {
        applyCustom.addEventListener("click", function(ev) {
            console.log("Custom size applied");
            let width = parseInt(inputWidth.value);
            let height = parseInt(inputHeight.value);
            
            // Valider les entrées
            if (width > 0 && height > 0) {
                customSizeSelected(width, height);
            } else {
                alert("Veuillez entrer des dimensions valides");
            }
        });
    }
}

export function initHomePage() {
    attachEventListeners();
}


