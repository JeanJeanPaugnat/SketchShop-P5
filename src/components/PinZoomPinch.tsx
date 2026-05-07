import React, { useState } from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Canvas } from "./Canvas";
import ToolBox from "./ToolBox";
import SideBarLayer from "./SideBarLayer";
import type { Tool, Layer, DrawingSettings } from "../types";

export default function PinZoomPinch () {
  const [activeTool, setActiveTool] = useState<Tool>('brush');
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: '1',
      name: "Calque 1",
      isVisible: true,
      isLocked: false,
      isActive: true,
      opacity: 100,
    }
  ]);

  const [settings, setSettings] = useState<DrawingSettings>({
    color: '#000000',
    brushSize: 5,
    isDynamicBrush: false,
    pixelSize: 10,
    threshold: 128,
    asciiScale: 10,
  });

  const toggleVisibility = (id: string) => {
    setLayers(layers.map(l => l.id === id ? { ...l, isVisible: !l.isVisible } : l));
  };

  const toggleLock = (id: string) => {
    setLayers(layers.map(l => l.id === id ? { ...l, isLocked: !l.isLocked } : l));
  };

  const setActiveLayer = (id: string) => {
    setLayers(layers.map(l => ({ ...l, isActive: l.id === id })));
  };

  const addLayer = () => {
    const newLayer: Layer = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Calque ${layers.length + 1}`,
      isVisible: true,
      isLocked: false,
      isActive: true,
      opacity: 100,
    };
    setLayers([...layers.map(l => ({ ...l, isActive: false })), newLayer]);
  };

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
                  <Canvas 
                    activeTool={activeTool} 
                    layers={layers} 
                    settings={settings}
                  />
                </div>
            </TransformComponent>
          </TransformWrapper>
          <ToolBox activeTool={activeTool} setActiveTool={setActiveTool} />
          <SideBarLayer 
            layers={layers} 
            toggleVisibility={toggleVisibility} 
            toggleLock={toggleLock} 
            setActiveLayer={setActiveLayer}
            addLayer={addLayer}
          />
    </div>
  );
};

