import React from 'react';
import { P5Canvas } from '@p5-wrapper/react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import ToolBox from './ToolBox';

type Tool = 'select' | 'move' | 'brush' | 'shapes';

const sketch = (p5: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  p5.setup = () => {
    p5.createCanvas(800, 600);
    p5.background(255);
  };

  p5.draw = () => {
    if (p5.mouseIsPressed) {
      p5.stroke(0);
      p5.strokeWeight(5);
      p5.line(p5.pmouseX, p5.pmouseY, p5.mouseX, p5.mouseY);
    }
  };
};

const Canvas: React.FC = () => {

  return (
    <P5Canvas sketch={sketch} />

  );
};

export default Canvas;