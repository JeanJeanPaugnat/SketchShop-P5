import { useEditorStore } from '../../store/useEditorStore';
import { Undo, Redo } from 'pixelarticons/react';

export default function ContextualBar() {
  const { activeTool, settings, updateSetting, undo, redo, historyIndex, history } = useEditorStore();

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

      {/* History Controls */}
      <div className="flex items-center pl-4 gap-1 border-l border-white/10 ml-auto">
        <button
          onClick={undo}
          disabled={historyIndex <= 0}
          title="Undo (Ctrl+Z)"
          className="flex items-center justify-center p-1 hover:bg-[#2A2A2A] text-gray-300 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <Undo width={18} height={18} />
        </button>
        <button
          onClick={redo}
          disabled={historyIndex >= history.length - 1}
          title="Redo (Ctrl+Shift+Z)"
          className="flex items-center justify-center p-1 hover:bg-[#2A2A2A] text-gray-300 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <Redo width={18} height={18} />
        </button>
      </div>
    </div>
  );
}
