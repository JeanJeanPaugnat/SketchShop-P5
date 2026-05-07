import React from 'react';
import type { DrawingSettings, Tool } from '../types';
import { Brush, Minus, } from 'pixelarticons/react';

interface ContextualBarProps {
  activeTool: Tool;
  settings: DrawingSettings;
  setSettings: (settings: DrawingSettings) => void;
}

export default function ContextualBar({ activeTool, settings, setSettings }: ContextualBarProps) {
  const updateSetting = (key: keyof DrawingSettings, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  const isBrushLike = activeTool === 'brush'|| activeTool === 'eraser';

  if (!isBrushLike) return null;

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-6 px-6 py-2 bg-[#171717]/90 backdrop-blur-md text-white z-20 border border-white/10 shadow-2xl rounded-full">
      {/* Tool Indicator */}
      <div className="flex items-center gap-2 pr-4 border-r border-white/10">
        <div className="w-8 h-8 flex items-center justify-center bg-violet-500 rounded-full">
          {activeTool === 'brush' && <Brush width={18} />}
          {activeTool === 'eraser' && <div className="w-4 h-4 bg-white rotate-45" />}
        </div>
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

      {/* Hardness Control */}
      <div className="flex flex-col gap-1 w-24">
        <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase">
          <span>Hardness</span>
          <span>{settings.hardness}%</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={settings.hardness}
          onChange={(e) => updateSetting('hardness', parseInt(e.target.value))}
          className="h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
        />
      </div>

      {/* Color Picker (Compact) */}
      <div className="flex items-center gap-2 pl-4 border-l border-white/10">
        <input 
          type="color" 
          value={settings.color}
          onChange={(e) => updateSetting('color', e.target.value)}
          className="w-6 h-6 rounded-full overflow-hidden bg-transparent border-none cursor-pointer p-0"
        />
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
