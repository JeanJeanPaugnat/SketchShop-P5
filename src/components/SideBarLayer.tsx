import LayerCard from "./ui/LayerCard";
import type { Layer } from "../types";

interface SideBarLayerProps {
  layers: Layer[];
  toggleVisibility: (id: string) => void;
  toggleLock: (id: string) => void;
  setActiveLayer: (id: string) => void;
  addLayer: () => void;
}

export default function SideBarLayer({ 
  layers, 
  toggleVisibility, 
  toggleLock, 
  setActiveLayer,
  addLayer 
}: SideBarLayerProps) {
  return (
    <aside className="flex flex-col right-0 gap-4 absolute h-fill-available m-6 bg-[#171717] z-10 w-64">
      <div className="flex justify-between items-center p-4 text-white border-b border-[#333]">
        <h2 className="text-sm font-bold uppercase tracking-wider">Layers</h2>
        <button 
          onClick={addLayer}
          className="hover:bg-[#8354E0] p-1 rounded transition-colors"
          title="Add Layer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
      <div className="flex flex-col py-2 px-2 gap-1 overflow-y-auto max-h-[60vh]">
        {[...layers].reverse().map((layer) => (
          <LayerCard
            key={layer.id}
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
        ))}
      </div>

      <div className="flex-1 bg-[#171717]"></div>
    </aside>
  );
}
