export const canvasState = {
    color: 'black',
    tool: 'pencil',
    width: 800,
    height: 600,
    brushSize: 5,
    isDrawing: true,
    rectangleStart: null,
    dynamicBrush: false,
};

export function setColor(color) { 
    canvasState.color = color; 
}
export function setTool(tool) { 
    canvasState.tool = tool; 
}

export function toggleDynamicBrush() {
    canvasState.dynamicBrush = !canvasState.dynamicBrush;
}