import LayerCard from "../../shared/components/LayerCard";
import { PlusBox } from 'pixelarticons/react';
import { Reorder } from "motion/react";
import { useEditorStore } from "../../store/useEditorStore";

export default function SideBarLayer() {
  const { 
    layers, 
    setLayers, 
    toggleVisibility, 
    toggleLock, 
    setActiveLayer, 
    addLayer, 
    deleteActiveLayer,
    triggerFilter,
    updateActiveLayerOpacity
  } = useEditorStore();

  const reversedLayers = [...layers].reverse();
  const activeLayer = layers.find(l => l.isActive);

  const handleReorder = (newOrder: any[]) => {
    setLayers([...newOrder].reverse());
  };

  return (
    <aside className="flex flex-col right-0 absolute h-fill-available m-6 bg-[#171717] z-10">
      {/* Layer Settings (Filter & Opacity) */}
      <div className="flex flex-row justify-between p-4">
          <select 
            onChange={(e) => e.target.value !== "none" && triggerFilter(e.target.value as any)}
            className="bg-[#2A2A2A] text-white text-xs py-1 px-2 border-none outline-none cursor-pointer"
            defaultValue="none"
          >
            <option value="none">Normal</option>
            <option value="threshold">Threshold</option>
            <option value="pixelate">Pixelate</option>
            <option value="ascii">ASCII</option>
          </select>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase">
            <span>Opacity</span>
            <span>{activeLayer?.opacity ?? 100}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={activeLayer?.opacity ?? 100}
            onChange={(e) => updateActiveLayerOpacity(parseInt(e.target.value))}
            className="h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
          />
        </div>
      </div>

      {/* Layers List */}
      <Reorder.Group 
        axis="y" 
        values={reversedLayers} 
        onReorder={handleReorder}
        className="flex flex-1 flex-col py-2 px-2 gap-1 overflow-y-auto overflow-x-hidden scrollbar-thin"
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

      {/* Footer Actions */}
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
