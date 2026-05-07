export type Tool = 'select' | 'move' | 'brush'  | 'eraser' | 'shapes' | 'square' | 'pixelate' | 'threshold' | 'ascii';

export interface Layer {
  id: string;
  name: string;
  isVisible: boolean;
  isLocked: boolean;
  isActive: boolean;
  opacity: number;
}

export interface DrawingSettings {
  color: string;
  brushSize: number;
  isDynamicBrush: boolean;
  pixelSize: number;
  threshold: number;
  asciiScale: number;
}
