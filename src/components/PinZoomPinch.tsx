import React, { useState } from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Canvas } from "./Canvas";
import ToolBox from "./ToolBox";
import SideBarLayer from "./SideBarLayer";
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
                <div style={{ width: '1200px', height: '800px' }}>
                  <Canvas activeTool={activeTool}/>
                </div>
            </TransformComponent>
          </TransformWrapper>
          <ToolBox activeTool={activeTool} setActiveTool={setActiveTool} />
          <SideBarLayer />
    </div>
  );
};

