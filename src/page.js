import { createCanvas} from './canvasPage/page.js';


function sizeSelected(ev) {
 console.log("Preset size selected: " + ev.target.dataset.width + "x" + ev.target.dataset.height);

}

function customSizeSelected(width, height) {
    console.log(width, height);
    console.log("Custom size selected: " + width + "x" + height);
    createCanvas(width, height);
}


function attachEventListeners() {
    let buttonPreset = document.querySelectorAll(".preset-btn");
    buttonPreset.forEach(button => {
        button.addEventListener("click", sizeSelected);
    });
    let applyCustom = document.getElementById("apply-custom");
    let inputWidth = document.getElementById("custom-width");
    let inputHeight = document.getElementById("custom-height");
    if (inputWidth && inputHeight) {
        applyCustom.addEventListener("click", function(ev) {
            console.log("Custom size applied");
            let width = parseInt(inputWidth.value);
            let height = parseInt(inputHeight.value);
            customSizeSelected(width, height);
        });
    }
    
}

attachEventListeners();


