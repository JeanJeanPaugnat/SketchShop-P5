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
    </div>
  );
};



// import React, { useState } from "react";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import { Canvas } from "./Canvas";
// import ToolBox from "./ToolBox";
// import type { Tool } from "../types";

// export default function PinZoomPinch () {
//   const [activeTool, setActiveTool] = useState<Tool>('brush');

//   return (
//     <div className="flex-1 relative bg-gray-100 overflow-hidden w-full h-full">
//           <TransformWrapper
//             initialScale={1}
//             minScale={1}
//             maxScale={1}
//             disabled={true}
//           >
//             <TransformComponent
//               wrapperClass="!w-full !h-full !max-w-none !max-h-none flex items-center justify-center"
//               contentClass="!w-full !h-full flex items-center justify-center"
//             >
//                 <Canvas />
//             </TransformComponent>
//           </TransformWrapper>
//           <ToolBox activeTool={activeTool} setActiveTool={setActiveTool} />
//     </div>
//   );
  
// };

