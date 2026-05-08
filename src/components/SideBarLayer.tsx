import LayerCard from "./ui/LayerCard";
import type { Layer } from "../types";
import { PlusBox } from 'pixelarticons/react';
import { Reorder } from "motion/react";

interface SideBarLayerProps {
  layers: Layer[];
  setLayers: (layers: Layer[]) => void;
  toggleVisibility: (id: string) => void;
  toggleLock: (id: string) => void;
  setActiveLayer: (id: string) => void;
  addLayer: () => void;
  deleteActiveLayer: () => void;
}

export default function SideBarLayer({ 
  layers, 
  setLayers,
  toggleVisibility, 
  toggleLock, 
  setActiveLayer,
  addLayer,
  deleteActiveLayer
}: SideBarLayerProps) {
  const reversedLayers = [...layers].reverse();

  const handleReorder = (newOrder: Layer[]) => {
    setLayers([...newOrder].reverse());
  };

  return (
    <aside className="flex flex-col right-0 absolute h-fill-available m-6 bg-[#171717] z-10">
      <div className="flex flex-row gap-1">
        
      </div>
      <Reorder.Group 
        axis="y" 
        values={reversedLayers} 
        onReorder={handleReorder}
        className="flex flex-1 flex-col py-2 px-2 gap-1 overflow-y-auto scrollbar-thin"
      >
        {reversedLayers.map((layer) => (
          <Reorder.Item 
            key={layer.id} 
            value={layer}
            className="relative"
          >
            <LayerCard
              title={layer.name}
              subtitle={layer.isActive ? "Active" : "Standard Layer"}
              isActive={layer.isActive}
              isVisible={layer.isVisible}
              isLocked={layer.isLocked}
              thumbnail={null}
              onToggleVisibility={() => toggleVisibility(layer.id)}
              onToggleLock={() => toggleLock(layer.id)}
              onClick={() => setActiveLayer(layer.id)}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <div className=" bg-[#252525] text-[#ADAAAA] flex items-center justify-center gap-4 p-3  ">
        <PlusBox onClick={addLayer} className="cursor-pointer transition-colors hover:text-[#8354E0]" width={18} height={18} />

        <svg 
          onClick={deleteActiveLayer}
          className={`transition-colors cursor-pointer hover:text-red-500 ${layers.length <= 1 ? 'opacity-30 cursor-not-allowed' : ''}`} 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 22H4V20H18V22ZM4 20H2V6H0V4H6V2H8V4H14V2H16V4H22V6H20V20H18V6H4V20ZM9 17H7V8H9V17ZM15 17H13V8H15V17ZM14 2H8V0H14V2Z" fill="currentColor"/>
        </svg>
      </div>
    </aside>
  );
}
