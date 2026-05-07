import * as React from "react";
import { P5Canvas } from "@p5-wrapper/react";
import type { Sketch } from "@p5-wrapper/react";
import type { Tool, Layer, DrawingSettings } from '../types';

interface CanvasProps {
  activeTool: Tool;
  layers: Layer[];
  settings: DrawingSettings;
  applyFilter?: { type: 'threshold' | 'pixelate' | 'ascii', timestamp: number };
  [key: string]: any;
}

const sketch: Sketch<CanvasProps> = (p5) => {
  let activeTool: Tool = 'brush';
  let layersData: Layer[] = [];
  let settingsData: DrawingSettings = {
    color: '#000000',
    brushSize: 5,
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

  p5.updateWithProps = (props) => {
    activeTool = props.activeTool;
    layersData = props.layers;
    settingsData = props.settings;

    // Create graphics for new layers
    layersData.forEach(layer => {
      if (!layerGraphics.has(layer.id)) {
        const g = p5.createGraphics(1200, 800);
        layerGraphics.set(layer.id, g);
      }
    });

    // Handle filter application
    if (props.applyFilter && props.applyFilter.timestamp > lastFilterTimestamp) {
      lastFilterTimestamp = props.applyFilter.timestamp;
      const activeLayer = layersData.find(l => l.isActive);
      if (activeLayer) {
        const g = layerGraphics.get(activeLayer.id);
        if (g) {
          applyFilter(g, props.applyFilter.type);
        }
      }
    }
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(1200, 800);
    p5.background(255);
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
          }
        }
      });
    }
  }

  p5.draw = () => {
    p5.background(255);
    updateCursor();

    // Render layers in order
    layersData.forEach(layer => {
      const g = layerGraphics.get(layer.id);
      if (g && layer.isVisible) {
        p5.tint(255, (layer.opacity / 100) * 255);
        p5.image(g, 0, 0);
      }
    });

    // Drawing logic
    if (p5.mouseIsPressed) {
      const activeLayer = layersData.find(l => l.isActive);
      if (activeLayer && !activeLayer.isLocked) {
        const g = layerGraphics.get(activeLayer.id);
        if (g) {
          handleDrawing(g);
        }
      }
    }

    // Preview for shapes
    if (activeTool === 'square' && rectangleStart && p5.mouseIsPressed) {
      p5.push();
      p5.stroke(settingsData.color);
      p5.strokeWeight(2);
      p5.noFill();
      p5.rect(
        rectangleStart.x,
        rectangleStart.y,
        p5.mouseX - rectangleStart.x,
        p5.mouseY - rectangleStart.y
      );
      p5.pop();
    }
  };

  p5.mousePressed = () => {
    if (activeTool === 'square') {
      rectangleStart = { x: p5.mouseX, y: p5.mouseY };
    }
  };

  p5.mouseReleased = () => {
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
            p5.mouseX - rectangleStart.x,
            p5.mouseY - rectangleStart.y
          );
          g.pop();
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
      g.stroke(settingsData.color);
      let sw = settingsData.brushSize;
      if (settingsData.isDynamicBrush) {
        sw = calculateDynamicStrokeWeight(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
      }
      g.strokeWeight(sw);
      g.line(p5.pmouseX, p5.pmouseY, p5.mouseX, p5.mouseY);
    } else if (activeTool === 'eraser') {
      g.erase();
      g.strokeWeight(settingsData.brushSize);
      g.line(p5.pmouseX, p5.pmouseY, p5.mouseX, p5.mouseY);
      g.noErase();
    } else if (activeTool === 'shapes') {
      g.noStroke();
      const c = p5.color(settingsData.color);
      c.setAlpha(50);
      g.fill(c);
      g.ellipse(p5.mouseX, p5.mouseY, settingsData.brushSize * 2, settingsData.brushSize * 2);
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

  function applyFilter(g: any, type: string) {
    const ctx = g.canvas.getContext('2d');
    const w = g.canvas.width;
    const h = g.canvas.height;
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;

    if (type === 'threshold') {
      const threshold = settingsData.threshold;
      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        let gray = 0.299 * r + 0.587 * g + 0.114 * b;
        let val = gray < threshold ? 0 : 255;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
      }
      ctx.putImageData(imageData, 0, 0);
    } else if (type === 'pixelate') {
      const pixelSize = settingsData.pixelSize;
      for (let y = 0; y < h; y += pixelSize) {
        for (let x = 0; x < w; x += pixelSize) {
          let red = 0, green = 0, blue = 0, alpha = 0, count = 0;
          for (let py = 0; py < pixelSize; py++) {
            for (let px = 0; px < pixelSize; px++) {
              let posX = x + px;
              let posY = y + py;
              if (posX < w && posY < h) {
                let index = (posY * w + posX) * 4;
                if (data[index + 3] > 0) {
                  red += data[index];
                  green += data[index + 1];
                  blue += data[index + 2];
                  alpha += data[index + 3];
                  count++;
                }
              }
            }
          }
          if (count > 0) {
            red /= count; green /= count; blue /= count; alpha /= count;
            for (let py = 0; py < pixelSize; py++) {
              for (let px = 0; px < pixelSize; px++) {
                let posX = x + px;
                let posY = y + py;
                if (posX < w && posY < h) {
                  let index = (posY * w + posX) * 4;
                  data[index] = red;
                  data[index + 1] = green;
                  data[index + 2] = blue;
                  data[index + 3] = alpha;
                }
              }
            }
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
    } else if (type === 'ascii') {
      const scale = settingsData.asciiScale;
      const densityChars = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '@'];
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = 'black';
      ctx.font = `${scale}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let y = 0; y < h; y += scale) {
        for (let x = 0; x < w; x += scale) {
          let red = 0, green = 0, blue = 0, count = 0;
          for (let py = 0; py < scale; py++) {
            for (let px = 0; px < scale; px++) {
              let posX = x + px;
              let posY = y + py;
              if (posX < w && posY < h) {
                let index = (posY * w + posX) * 4;
                red += data[index];
                green += data[index + 1];
                blue += data[index + 2];
                count++;
              }
            }
          }
          red /= count; green /= count; blue /= count;
          const brightness = 0.299 * red + 0.587 * green + 0.114 * blue;
          let charIndex = Math.floor((brightness / 255) * (densityChars.length - 1));
          charIndex = densityChars.length - 1 - charIndex;
          ctx.fillText(densityChars[charIndex], x + scale / 2, y + scale / 2);
        }
      }
      ctx.restore();
    }
  }
};

export function Canvas({ activeTool, layers, settings, applyFilter }: CanvasProps) {
  return <P5Canvas sketch={sketch} activeTool={activeTool} layers={layers} settings={settings} applyFilter={applyFilter} />;
}

