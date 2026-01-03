import template from './template.html?raw';
import './style.css';


// function getExportContent() {
//     let exportContent = template;
//     console.log(exportContent);
//     return exportContent;
// }

let M = {
    p5Instance: null,
};



let C = {};

C.init = function (p5Instance) {
    M.p5Instance = p5Instance;
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
                const img = M.p5Instance.loadImage(e.target.result, () => {
                    // une fois l'image chargée, la dessiner sur le canvas
                    M.p5Instance.clear();
                    M.p5Instance.resizeCanvas(img.width, img.height);
                    M.p5Instance.image(img, 0, 0);
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