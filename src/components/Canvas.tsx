import * as React from "react";
import { P5Canvas } from "@p5-wrapper/react";
import type { Sketch } from "@p5-wrapper/react";
import type { Tool } from '../types';

interface CanvasProps {
  activeTool: Tool;
  [key: string]: unknown;
}


const sketch: Sketch<CanvasProps> = (p5) => {
  let activeTool: Tool = 'brush';

  p5.updateWithProps = (props) => {
    activeTool = props.activeTool;
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(1200, 800);
    p5.background(255);
    // Ensure the canvas style is handled correctly for high-DPI displays
    // and doesn't conflict with parent scaling

  };

p5.draw = () => {
    if (activeTool === 'brush') {
      p5.cursor(p5.CROSS);
    } else if (activeTool === 'move') {
      p5.cursor(p5.HAND);
    } else if (activeTool === 'select') {
      p5.cursor(p5.ARROW);
    } else {
      p5.cursor(p5.CROSS);
    }

    if (p5.mouseIsPressed) {
      if (activeTool === 'brush') {
        p5.stroke(0);
        p5.strokeWeight(4);
        p5.line(p5.pmouseX, p5.pmouseY, p5.mouseX, p5.mouseY);
      }
      
      if (activeTool === 'shapes') {
        p5.noStroke();
        p5.fill(131, 84, 224, 50); // Semi-transparent purple
        p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);
      }
    }
  };
};

export function Canvas({ activeTool }: CanvasProps) {
  return <P5Canvas sketch={sketch} activeTool={activeTool} />;
}

