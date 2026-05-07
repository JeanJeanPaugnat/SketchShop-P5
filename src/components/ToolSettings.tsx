import React from 'react';
import type { DrawingSettings } from '../types';

interface ToolSettingsProps {
  settings: DrawingSettings;
  setSettings: (settings: DrawingSettings) => void;
  onApplyFilter: (type: 'threshold' | 'pixelate' | 'ascii') => void;
}

export default function ToolSettings({ settings, setSettings, onApplyFilter }: ToolSettingsProps) {
  return (
    <div className="absolute top-24 left-6 flex flex-col gap-4 p-4 bg-[#171717] text-white z-10 w-48 border border-white/10 shadow-xl">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Color</label>
        <input 
          type="color" 
          value={settings.color}
          onChange={(e) => setSettings({ ...settings, color: e.target.value })}
          className="w-full h-8 bg-transparent border-none cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex justify-between">
          Size <span>{settings.brushSize}px</span>
        </label>
        <input 
          type="range" 
          min="1" 
          max="100" 
          value={settings.brushSize}
          onChange={(e) => setSettings({ ...settings, brushSize: parseInt(e.target.value) })}
          className="w-full accent-violet-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          id="dynamicBrush"
          checked={settings.isDynamicBrush}
          onChange={(e) => setSettings({ ...settings, isDynamicBrush: e.target.checked })}
          className="w-4 h-4 accent-violet-500"
        />
        <label htmlFor="dynamicBrush" className="text-xs font-bold uppercase tracking-wider text-gray-400 cursor-pointer">
          Dynamic
        </label>
      </div>

      <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Filters</label>
        <button 
          onClick={() => onApplyFilter('threshold')}
          className="text-left text-xs p-2 hover:bg-[#8354E0] transition-colors rounded"
        >
          Threshold
        </button>
        <button 
          onClick={() => onApplyFilter('pixelate')}
          className="text-left text-xs p-2 hover:bg-[#8354E0] transition-colors rounded"
        >
          Pixelate
        </button>
        <button 
          onClick={() => onApplyFilter('ascii')}
          className="text-left text-xs p-2 hover:bg-[#8354E0] transition-colors rounded"
        >
          ASCII
        </button>
      </div>
    </div>
  );
}
