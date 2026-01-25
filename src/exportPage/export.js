import template from './export.html?raw';
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

    let existingSection = document.getElementById("export-section");
    if (existingSection) {
        existingSection.remove(); // Supprimer l'ancienne section
    }

    V.render(appToModify);
    C.attachListeners();
}

C.attachListeners = function () {
    let buttonsExport = document.querySelectorAll('button[id^="download"]');
    buttonsExport.forEach(button => {
        button.addEventListener("click", () => {
            let format = button.getAttribute("data-format");
            let filename = document.querySelector('#filename').value;
            V.exportCanvas(filename, format);
        }
    );

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