import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Canvas } from "../features/canvas/Canvas";
import ToolBox from "../features/toolbar/ToolBox";
import SideBarLayer from "../features/layers/SideBarLayer";
import ContextualBar from "../features/toolbar/ContextualBar";
import { useEditorStore } from "../store/useEditorStore";

export default function PinZoomPinch () {
  const { activeTool, canvasDimensions, canvasBackground } = useEditorStore();

  return (
    <>
    <ContextualBar />
    <div className="flex-1 flex bg-gray-100 overflow-hidden relative">
          <TransformWrapper
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
              wrapperClass="!w-full !h-full !max-w-none !max-h-none rounded-none border-none overflow-hidden "
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
