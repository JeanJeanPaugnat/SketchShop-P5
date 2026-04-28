import React from 'react';
import { P5Canvas } from '@p5-wrapper/react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

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
    <TransformWrapper
      limitToBounds={false}
      minScale={0.1}
      maxScale={5}
      initialScale={1}
    >
      <TransformComponent
        wrapperStyle={{ width: '100%', height: '100vh' }}
      >
        <div style={{ width: '2000px', height: '2000px', background: '#f5f5f5', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <P5Canvas sketch={sketch} />
          </div>
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default Canvas;