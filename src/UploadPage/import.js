import template from './template.html?raw';
import './style.css';


// function getExportContent() {
//     let exportContent = template;
//     console.log(exportContent);
//     return exportContent;
// }

let M = {
    p5Instance: null,
    calque2: null,
};



let C = {};

C.init = function (p5Instance, calque2) {
    M.p5Instance = p5Instance;
    M.calque2 = calque2;
    console.log(M.p5Instance);
    let appToModify = document.getElementById("appToModify");

    let existingSection = document.getElementById("upload-section");
    if (existingSection) {
        existingSection.remove(); // Supprimer l'ancienne section
    }

    V.render(appToModify);
    C.attachListeners();
}

C.attachListeners = function () {
    let fileImg = document.querySelector('#file-input');
    fileImg.addEventListener('change', (event) => {
        // utiliser loadImage de p5 pour charger l'image
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                M.p5Instance.loadImage(e.target.result, (loadedImg) => {
                    // loadedImg est l'image chargée, dessiner sur calque2
                    if (M.calque2) {
                        M.calque2.image(loadedImg, 0, 0);
                    }
                });
            };
            reader.readAsDataURL(file);
        }
    });

}


let V = {};

V.render = function (app) {
    console.log(app);
    app.innerHTML = template;
    return app;
}

V.exportCanvas = function (filename, format) {
    if (M.p5Instance) {
        M.p5Instance.saveCanvas(filename, format);
        console.log(`Canvas sauvegardé: ${filename}.${format}`);

        let exportContainer = document.getElementById("export-section");
        if (exportContainer) {
            exportContainer.remove();
        }
    }

}




export { C };