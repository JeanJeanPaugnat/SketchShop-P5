1. User clique "Pencil"
   └─> page.js entend l'événement
       └─> setTool('pencil') change canvasState.tool
           └─> canvasState.tool = 'pencil' ✓

2. User bouge la souris sur le canvas
   └─> p.draw() s'exécute (chaque frame)
       └─> if (canvasState.tool === 'pencil' && mousePressed)
           └─> drawPencil(p, mouseX, mouseY) 
               └─> p.stroke(canvasState.color) ← lit la couleur
               └─> p.line(...) ← dessine

3. User change la couleur
   └─> page.js entend le "change"
       └─> setColor('blue') change canvasState.color
           └─> canvasState.color = 'blue' ✓
           
4. User dessine de nouveau
   └─> drawPencil() utilise la NOUVELLE couleur 'blue' ✓