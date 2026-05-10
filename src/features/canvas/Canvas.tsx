import { P5Canvas } from "@p5-wrapper/react";
import type { Sketch } from "@p5-wrapper/react";
import type { Tool, Layer, DrawingSettings } from '../../core/types';
import { useEditorStore } from "../../store/useEditorStore";
import { applyThreshold, applyPixelate, applyASCII } from "./filters";

interface CanvasProps {
  activeTool: Tool;
  layers: Layer[];
  settings: DrawingSettings;
  canvasDimensions: { width: number; height: number };
  canvasBackground: string;
  applyFilter?: { type: 'threshold' | 'pixelate' | 'ascii', timestamp: number };
  layerData?: Map<string, string>;
  onUpdateCanvas?: (dataUrl: string) => void;
  onUpdateLayer?: (id: string, dataUrl: string) => void;
  [key: string]: any;
}

const sketch: Sketch<CanvasProps> = (p5) => {
  let activeTool: Tool = 'brush';
  let layersData: Layer[] = [];
  let canvasDimensions: { width: number; height: number } = { width: 1200, height: 800 };
  let canvasBackground: string = '#ffffff';
  let settingsData: DrawingSettings = {
    color: '#000000',
    brushSize: 5,
    opacity: 100,
    isDynamicBrush: false,
    pixelSize: 10,
    threshold: 128,
    asciiScale: 10,
  };

  const layerGraphics = new Map<string, any>();
  let rectangleStart: { x: number, y: number } | null = null;
  let speedHistory: number[] = [];
  const SPEED_HISTORY_SIZE = 5;
  let lastFilterTimestamp = 0;
  let onUpdateCanvas: ((dataUrl: string) => void) | undefined;
  let onUpdateLayer: ((id: string, dataUrl: string) => void) | undefined;
  let lastSyncTime = 0;
  let needsSync = false;

  let localMouse = { x: 0, y: 0 };
  let prevLocalMouse = { x: 0, y: 0 };

  function updateLocalMouse() {
    prevLocalMouse = { ...localMouse };
    const canvasElement = (p5 as any).canvas;
    if (canvasElement) {
      const rect = canvasElement.getBoundingClientRect();
      const scaleX = canvasDimensions.width / rect.width;
      const scaleY = canvasDimensions.height / rect.height;
      localMouse.x = (p5.winMouseX - rect.left) * scaleX;
      localMouse.y = (p5.winMouseY - rect.top) * scaleY;
    }
  }

  p5.updateWithProps = (props) => {
    activeTool = props.activeTool;
    layersData = props.layers;
    settingsData = props.settings;
    onUpdateCanvas = props.onUpdateCanvas;
    onUpdateLayer = props.onUpdateLayer;
    canvasBackground = props.canvasBackground;
    
    if (props.canvasDimensions.width !== canvasDimensions.width || props.canvasDimensions.height !== canvasDimensions.height) {
        canvasDimensions = props.canvasDimensions;
        p5.resizeCanvas(canvasDimensions.width, canvasDimensions.height);
        layerGraphics.forEach((g) => g.resizeCanvas(canvasDimensions.width, canvasDimensions.height));
    }

    layersData.forEach(layer => {
      if (!layerGraphics.has(layer.id)) {
        const g = p5.createGraphics(canvasDimensions.width, canvasDimensions.height);
        // Restore from store if data exists
        if (props.layerData && props.layerData.has(layer.id)) {
          const dataUrl = props.layerData.get(layer.id);
          if (dataUrl) {
            p5.loadImage(dataUrl, (img) => {
              g.image(img, 0, 0);
            });
          }
        }
        layerGraphics.set(layer.id, g);
      }
    });

    if (props.applyFilter && props.applyFilter.timestamp > lastFilterTimestamp) {
      lastFilterTimestamp = props.applyFilter.timestamp;
      const activeLayer = layersData.find(l => l.isActive);
      if (activeLayer) {
        const g = layerGraphics.get(activeLayer.id);
        if (g) {
          applyFilterEffect(g, props.applyFilter.type);
          needsSync = true;
        }
      }
    }
  };

  function applyFilterEffect(g: any, type: string) {
    switch (type) {
      case 'threshold':
        applyThreshold(g, settingsData);
        break;
      case 'pixelate':
        applyPixelate(g, settingsData);
        break;
      case 'ascii':
        applyASCII(g, settingsData);
        break;
    }
  }

  p5.setup = () => {
    const canvas = p5.createCanvas(canvasDimensions.width, canvasDimensions.height);
    if (canvasBackground === 'transparent') {
        p5.clear();
    } else {
        p5.background(canvasBackground);
    }
    canvas.drop(handleFileDrop);
  };

  function handleFileDrop(file: any) {
    if (file.type === 'image') {
      p5.loadImage(file.data, (img) => {
        const activeLayer = layersData.find(l => l.isActive);
        if (activeLayer) {
          const g = layerGraphics.get(activeLayer.id);
          if (g) {
            g.image(img, 0, 0);
            needsSync = true;
          }
        }
      });
    }
  }

  p5.draw = () => {
    updateLocalMouse();
    if (canvasBackground === 'transparent') {
        p5.clear();
    } else {
        p5.background(canvasBackground);
    }
    updateCursor();

    layersData.forEach(layer => {
      const g = layerGraphics.get(layer.id);
      if (g && layer.isVisible) {
        p5.tint(255, (layer.opacity / 100) * 255);
        p5.image(g, 0, 0);
      }
    });

    if (p5.mouseIsPressed) {
      const activeLayer = layersData.find(l => l.isActive);
      if (activeLayer && !activeLayer.isLocked) {
        const g = layerGraphics.get(activeLayer.id);
        if (g) {
          handleDrawing(g);
          needsSync = true;
        }
      }
    }

    if (activeTool === 'square' && rectangleStart && p5.mouseIsPressed) {
      p5.push();
      p5.stroke(settingsData.color);
      p5.strokeWeight(2);
      p5.noFill();
      p5.rect(
        rectangleStart.x,
        rectangleStart.y,
        localMouse.x - rectangleStart.x,
        localMouse.y - rectangleStart.y
      );
      p5.pop();
    }

    // Periodically sync canvas to store for preview
    if (needsSync && p5.millis() - lastSyncTime > 500) {
        syncToStore();
    }
  };

  function syncToStore() {
    if (onUpdateCanvas) {
        onUpdateCanvas((p5 as any).canvas.toDataURL());
    }
    const activeLayer = layersData.find(l => l.isActive);
    if (activeLayer && onUpdateLayer) {
        const g = layerGraphics.get(activeLayer.id);
        if (g) {
            onUpdateLayer(activeLayer.id, (g as any).canvas.toDataURL());
        }
    }
    lastSyncTime = p5.millis();
    needsSync = false;
  }

  p5.mousePressed = () => {
    updateLocalMouse();
    if (activeTool === 'square') {
      rectangleStart = { x: localMouse.x, y: localMouse.y };
    }
  };

  p5.mouseReleased = () => {
    updateLocalMouse();
    if (activeTool === 'square' && rectangleStart) {
      const activeLayer = layersData.find(l => l.isActive);
      if (activeLayer && !activeLayer.isLocked) {
        const g = layerGraphics.get(activeLayer.id);
        if (g) {
          g.push();
          g.fill(settingsData.color);
          g.noStroke();
          g.rect(
            rectangleStart.x,
            rectangleStart.y,
            localMouse.x - rectangleStart.x,
            localMouse.y - rectangleStart.y
          );
          g.pop();
          needsSync = true;
          syncToStore();
        }
      }
      rectangleStart = null;
    }
  };

  function updateCursor() {
    switch (activeTool) {
      case 'brush':
      case 'eraser':
        p5.cursor(p5.CROSS);
        break;
      case 'move':
        p5.cursor(p5.HAND);
        break;
      case 'select':
        p5.cursor(p5.ARROW);
        break;
      default:
        p5.cursor(p5.CROSS);
    }
  }

  function handleDrawing(g: any) {
    if (activeTool === 'brush') {
      const c = p5.color(settingsData.color);
      c.setAlpha((settingsData.opacity / 100) * 255);
      g.stroke(c);

      let sw = settingsData.brushSize;
      if (settingsData.isDynamicBrush) {
        sw = calculateDynamicStrokeWeight(localMouse.x, localMouse.y, prevLocalMouse.x, prevLocalMouse.y);
      }

      g.strokeWeight(sw);
      g.line(prevLocalMouse.x, prevLocalMouse.y, localMouse.x, localMouse.y);
    } else if (activeTool === 'eraser') {
      g.erase();
      g.strokeWeight(settingsData.brushSize);
      g.line(prevLocalMouse.x, prevLocalMouse.y, localMouse.x, localMouse.y);
      g.noErase();
    } else if (activeTool === 'shapes') {
      g.noStroke();
      const c = p5.color(settingsData.color);
      c.setAlpha((settingsData.opacity / 100) * 50);
      g.fill(c);
      g.ellipse(localMouse.x, localMouse.y, settingsData.brushSize * 2, settingsData.brushSize * 2);
    }
  }

  function calculateDynamicStrokeWeight(x: number, y: number, px: number, py: number) {
    const dx = x - px;
    const dy = y - py;
    const speed = Math.sqrt(dx * dx + dy * dy);
    
    speedHistory.push(speed);
    if (speedHistory.length > SPEED_HISTORY_SIZE) {
      speedHistory.shift();
    }
    
    const averageSpeed = speedHistory.reduce((a, b) => a + b, 0) / speedHistory.length;
    const maxSpeed = 80;
    const normalizedSpeed = Math.min(averageSpeed, maxSpeed) / maxSpeed;
    
    let easedSpeed;
    if (normalizedSpeed < 0.5) {
      easedSpeed = 4 * normalizedSpeed * normalizedSpeed * normalizedSpeed;
    } else {
      const val = 2 * normalizedSpeed - 2;
      easedSpeed = 0.5 * val * val * val + 1;
    }
    
    const maxWeight = settingsData.brushSize;
    const minWeight = settingsData.brushSize * 0.30;
    const dynamicWeight = maxWeight - (easedSpeed * (maxWeight - minWeight));
    
    return Math.max(minWeight, dynamicWeight);
  }
};

export function Canvas() {
  const { activeTool, layers, settings, applyFilter, canvasDimensions, canvasBackground, setPreviewUrl, layerData, setLayerData } = useEditorStore();
  
  // We don't have direct access to the p5 instance here, 
  // but the sketch itself handles periodic syncing.
  // To ensure a sync on unmount, we'd need to expose a way from the sketch.
  // For now, the 500ms periodic sync + sync on mouseRelease should be enough.

  return (
    <P5Canvas 
      sketch={sketch} 
      activeTool={activeTool} 
      layers={layers} 
      settings={settings} 
      applyFilter={applyFilter} 
      canvasDimensions={canvasDimensions}
      canvasBackground={canvasBackground}
      layerData={layerData}
      onUpdateCanvas={setPreviewUrl}
      onUpdateLayer={setLayerData}
    />
  );
}
