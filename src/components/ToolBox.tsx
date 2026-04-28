import React, { useState } from 'react';
import { Settings2, CursorMinimal, Hand, Shapes, Brush } from 'pixelarticons/react';

type Tool = 'select' | 'move' | 'brush' | 'shapes';

interface ToolBoxProps {
  onToolChange?: (tool: Tool) => void;
}

export const ToolBox: React.FC<ToolBoxProps> = ({ onToolChange }) => {
  const [activeTool, setActiveTool] = useState<Tool>('select');

  const tools: { id: Tool; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
    { id: 'select', label: 'Select', icon: CursorMinimal },
    { id: 'move', label: 'Move', icon: Hand },
    { id: 'brush', label: 'Brush', icon: Brush },
    { id: 'shapes', label: 'Shapes', icon: Shapes },
  ];

  const handleToolClick = (tool: Tool) => {
    setActiveTool(tool);
    onToolChange?.(tool);
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2 bg-[#171717] backdrop-blur-[2.4px] rounded-lg p-3 border border-[rgba(255,255,255,0.05)]">
      {/* Tools Container */}
      <div className="flex flex-col gap-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => handleToolClick(tool)}
            className={`flex items-center justify-center w-11 h-11 rounded-md transition-all duration-200 ${
              activeTool === tool.id
                ? 'bg-[#8354e0] text-white shadow-lg'
                : 'bg-[#262626] text-[#999] hover:bg-[#333] hover:text-white border border-[rgba(255,255,255,0.1)]'
            }`}
            title={tool.label}
            type="button"
          >
            <tool.icon size={20} />
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-[rgba(255,255,255,0.1)] my-2" />

      {/* Settings Button */}
      <button
        className="flex items-center justify-center w-11 h-11 rounded-md bg-[#262626] text-[#999] hover:bg-[#333] hover:text-white border border-[rgba(255,255,255,0.1)] transition-all duration-200"
        title="Settings"
        type="button"
      >
        <Settings2 width={20} />
      </button>
    </div>
  );
};

export default ToolBox;
