import { useRef, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import type { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { Canvas } from "../features/canvas/Canvas";
import ToolBox from "../features/toolbar/ToolBox";
import SideBarLayer from "../features/layers/SideBarLayer";
import ContextualBar from "../features/toolbar/ContextualBar";
import { useEditorStore } from "../store/useEditorStore";

export default function PinZoomPinch () {
  const { activeTool, canvasDimensions, canvasBackground } = useEditorStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<ReactZoomPanPinchRef>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // If Ctrl key is pressed, let react-zoom-pan-pinch handle the zoom
      if (e.ctrlKey || e.metaKey) {
        return;
      }

      if (transformRef.current) {
        e.preventDefault();
        const { positionX, positionY, scale } = transformRef.current.state;
        const speed = 1.0;

        if (e.shiftKey) {
          // Shift + Wheel -> Horizontal scroll
          const newX = positionX - e.deltaY * speed;
          transformRef.current.setTransform(newX, positionY, scale, 0);
        } else {
          // Wheel -> Vertical scroll
          const newY = positionY - e.deltaY * speed;
          transformRef.current.setTransform(positionX, newY, scale, 0);
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
    <ContextualBar />
    <div ref={containerRef} className="flex-1 flex overflow-hidden relative">
          <TransformWrapper
            ref={transformRef}
            initialScale={0.45}
            minScale={0.1}
            maxScale={4}
            limitToBounds={false}
            centerOnInit={true}
            panning={{
              disabled: activeTool !== 'move',
              activationKeys: [],
            }}
            wheel={{
              activationKeys: ["Control"],
              step: 0.001,
            }}
            pinch={{
              step: 5,
            }}
            trackPadPanning={{
              disabled: activeTool !== 'move',
            }}
          >
            <TransformComponent
              wrapperClass="!w-full !h-full !max-w-none !max-h-none rounded-none border-none custom-pattern overflow-hidden "
              contentClass="!w-full !h-full flex items-center justify-center"
            >
                <div 
                  className={canvasBackground === 'transparent' ? 'bg-checkerboard' : 'bg-white'}
                  style={{ width: `${canvasDimensions.width}px`, height: `${canvasDimensions.height}px` }}
                >
                  <Canvas />
                </div>
            </TransformComponent>
          </TransformWrapper>
          <ToolBox />
          <SideBarLayer />
    </div>
    </>
  );
};

