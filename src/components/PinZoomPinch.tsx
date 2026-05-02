import React from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import { normalizeArgs } from "../../utils";

const CANVAS_W = 4800;
const CANVAS_H = 3200;




const miroViewer: React.CSSProperties = {
  width: "100%",
  height: "100%",
  borderRadius: 0,
  border: "none",
  background: "#f5f4f1",
  overflow: "hidden",
};

const shellShadow: React.CSSProperties = {
  overflow: "hidden",
  background: "#fff",
};


export const Example: React.FC<Record<string, unknown>> = (args) => {
  return (

      <div style={shellShadow}>

        <div
          style={{
            height: "clamp(620px, calc(100vh - 280px), 920px)",
            position: "relative",
            background: "#e4e6ea",
          }}
        >

          <div
            style={{
              position: "absolute",
              inset: 0,
            }}
          >
            <TransformWrapper
            //   {...normalizeArgs(args)}
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
                wrapperStyle={miroViewer}
                contentStyle={{
                  width: CANVAS_W,
                  height: CANVAS_H,
                }}
                infinite
              >
                <img className="w-40 h-40" src="./Jean.jpg" alt="" />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </div>
      </div>
  );
};