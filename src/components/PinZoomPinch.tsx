import React from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


export default function PinZoomPinch () {
  return (
    <div className="flex-1 bg-gray-100 overflow-hidden">
          <TransformWrapper
            initialScale={0.45}
            minScale={0.1}
            maxScale={4}
            limitToBounds={false}
            wheel={{
              activationKeys: (keys) =>
                ["Meta", "Ctrl"].some((key) => keys.includes(key)),
            }}
            trackPadPanning={{
              disabled: false,
              activationKeys: (keys) =>
                !["Meta", "Ctrl"].some((key) => keys.includes(key)),
            }}
            
          >
            <TransformComponent
              wrapperClass="w-full h-full rounded-none border-none overflow-hidden "
              contentClass="h-full w-full"
              infinite
            >
              <img className="" src="./Jean.jpg" alt="" />
            </TransformComponent>
          </TransformWrapper>
    </div>
  );
  
};
