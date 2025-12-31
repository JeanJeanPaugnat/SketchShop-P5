export const canvasState = {
    color: 'black',
    tool: 'pencil',
    width: 800,
    height: 600,
    brushSize: 5,
};

export function setColor(color) { 
    canvasState.color = color; 
}
export function setTool(tool) { 
    canvasState.tool = tool; 
}