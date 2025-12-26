export const canvasState = {
    color: 'red',
    tool: 'pencil',
    width: 800,
    height: 600
};

export function setColor(color) { 
    canvasState.color = color; 
}
export function setTool(tool) { 
    canvasState.tool = tool; 
}