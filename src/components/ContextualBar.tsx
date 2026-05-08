import type { DrawingSettings, Tool } from '../types';

interface ContextualBarProps {
  activeTool: Tool;
  settings: DrawingSettings;
  setSettings: (settings: DrawingSettings) => void;
}

export default function ContextualBar({ 
  activeTool, 
  settings, 
  setSettings, 
}: ContextualBarProps) {
  const updateSetting = (key: keyof DrawingSettings, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="flex items-center gap-6 px-6 py-2 bg-[#131313] text-white">
      {/* Tool Indicator */}
      <div className="flex items-center gap-1 pr-4 border-r border-white/10">
        <span className="text-xs font-bold uppercase tracking-wider">{activeTool}</span>
      </div>

      {/* Size Control */}
      <div className="flex flex-col gap-1 w-24">
        <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase">
          <span>Size</span>
          <span>{settings.brushSize}px</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="100" 
          value={settings.brushSize}
          onChange={(e) => updateSetting('brushSize', parseInt(e.target.value))}
          className="h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
        />
      </div>

      {/* Opacity Control */}
      <div className="flex flex-col gap-1 w-24">
        <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase">
          <span>Opacity</span>
          <span>{settings.opacity}%</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="100" 
          value={settings.opacity}
          onChange={(e) => updateSetting('opacity', parseInt(e.target.value))}
          className="h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
        />
      </div>

      {/* Color Picker (Compact) */}
      <div className="flex items-center gap-2 pl-4 border-l border-white/10">
        <div className="flex items-center gap-2 ml-2">
          <input 
            type="checkbox" 
            id="dynamic"
            checked={settings.isDynamicBrush}
            onChange={(e) => updateSetting('isDynamicBrush', e.target.checked)}
            className="w-3 h-3 accent-violet-500"
          />
          <label htmlFor="dynamic" className="text-[10px] text-gray-400 font-bold uppercase cursor-pointer">Dynamic</label>
        </div>
      </div>
    </div>
  );
}
