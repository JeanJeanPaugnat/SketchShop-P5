import p5 from "p5";

let windowSizeWidth = window.innerWidth;
let windowSizeHeight = window.innerHeight;
let pencilMode = false; // État du mode crayon (toggle)

// Mode instance : toutes les fonctions p5 doivent être dans cette fonction
new p5((p) => {
  
  p.setup = function() {
    p.createCanvas(windowSizeWidth, windowSizeHeight);
    p.background(220);
    
    // Event listener pour le bouton pencil
    const buttonPencil = document.getElementById("pencil");
    
    let buttonChangeColor = document.querySelector('#colorChange');
    buttonChangeColor.addEventListener('change', changeColor)
    console.log(buttonPencil)
    buttonPencil.addEventListener("click", togglePencilMode);
    const buttonRectangle = document.getElementById("square");
    buttonRectangle.addEventListener("click", toggleRectanggleMode);
  }

  p.draw = function() {
    p.noStroke();
    
    // Dessiner seulement si le mode crayon est actif ET que la souris est pressée
    if (pencilMode && p.mouseIsPressed) {
      console.log("drawing");
      p.circle(p.mouseX, p.mouseY, 20);
    }
  }

  p.windowResized = function() {
    windowSizeWidth = window.innerWidth;
    windowSizeHeight = window.innerHeight;
    console.log(windowSizeHeight, windowSizeWidth);
    p.resizeCanvas(windowSizeWidth, windowSizeHeight);
  }

  p.placeRectangle = function(x, y) {
    p.fill(0);
    p.rect(x, y, 10, 10);
  }

  // Exposer les variables p5 globalement si nécessaire
  window.p5Instance = p;
  console.log(window.p5Instance);
});


function toggleSquareMode() {
  squareMode = !squareMode; // Toggle l'état
  const buttonSquare = document.getElementById("square");
  console.log(buttonSquare)
  console.log(mouseX, mouseY)
  // Optionnel : ajouter une classe CSS pour visuellement montrer l'état actif
  if (squareMode) {
    console.log("Square mode activated");
    buttonSquare.classList.add("active");
  } else {
    console.log("Square mode deactivated");
    buttonSquare.classList.remove("active");
  }
}

function togglePencilMode() {
  pencilMode = !pencilMode; // Toggle l'état
  const buttonPencil = document.getElementById("pencil");
  console.log(buttonPencil)
  console.log(mouseX, mouseY)
  // Optionnel : ajouter une classe CSS pour visuellement montrer l'état actif
  if (pencilMode) {
    console.log("Pencil mode activated");
    buttonPencil.classList.add("active");
  } else {
    console.log("Pencil mode deactivated");
    buttonPencil.classList.remove("active");
  }
}


//add palette complette visuelle pour choisir la couleur en RVB 
function changeColor(ev){
  let colorCurent = ev.target.value;
  console.log(colorCurent)
  const p = window.p5Instance;
  if (colorCurent === 'red'){
    p.fill(255, 0, 0);
  }else if (colorCurent === 'yellow'){
    p.fill(150, 50, 0)
  }else{
    p.fill(255, 255, 255)
  }
}

//il faut que quand j'appelle je puisse placer un rectangle ou carré à l'endroit ou je maintiens au debut en x,y et au relachement x,y
//à ajouter plus tard pour choisir la forme, ellipse, rectangle, (plus dur triangle, star)
// function placeSquare(){
//   if (mouseIsPressed){
//     let X1 = mouseX;
//     let X2 = mouse Y;
//     let test = 
//     rect(mouseX, mouseY, )
//   }
// }


let buttonClar = document.getElementById("clear");
buttonClar.addEventListener("click", clearCanvas);

function placeRectangle(x, y) {
  const p = window.p5Instance;
  p.fill(0);
  p.rect(x, y, 10, 10);
}

function clearCanvas() {
  const p = window.p5Instance;
  p.background(220);
}

console.log(windowSizeWidth, windowSizeHeight);


