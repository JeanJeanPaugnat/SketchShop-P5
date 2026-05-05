import React, { useState } from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Canvas } from "./Canvas";
import ToolBox from "./ToolBox";
import type { Tool } from "../types";

export default function PinZoomPinch () {
  const [activeTool, setActiveTool] = useState<Tool>('brush');

  return (
    <div className="flex-1 flex bg-gray-100 overflow-hidden ">
          <TransformWrapper
            initialScale={0.45}
            minScale={0.1}
            maxScale={4}
            limitToBounds={false}
            wheel={{

              activationKeys: ["Control"],
              step: 0.01,
            }}
            trackPadPanning={{
              disabled: false,
              activationKeys: ["Control"],
            }}
            
          >
            <TransformComponent
              wrapperClass="w-full h-full rounded-none border-none overflow-hidden "
              contentClass="h-full w-full "
              infinite
            >
                <Canvas />
            </TransformComponent>
          </TransformWrapper>
          <ToolBox activeTool={activeTool} setActiveTool={setActiveTool} />
    </div>
  );
  
};
