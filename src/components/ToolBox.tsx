import React from 'react';
import { CursorMinimal, Hand, Shapes, Brush } from 'pixelarticons/react';
import type { Tool } from '../types';

interface ToolBoxProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
}

export default function ToolBox({ activeTool, setActiveTool }: ToolBoxProps){
  return (
    <div className="flex flex-col py-2 gap-4 absolute h-fill-available m-6 bg-[#171717] z-10">
      <div className="flex flex-col gap-2 px-2">
        <button 
          onClick={() => setActiveTool('select')}
          className={`flex items-center justify-center w-12 h-12 hover:bg-[#8354E0] ${activeTool === 'select' ? 'bg-[#8354E0] text-white' : 'text-[#737373]'} hover:text-white transition-colors`}
        >
          <CursorMinimal width={20} />
        </button>
        <button 
          onClick={() => setActiveTool('move')}
          className={`flex items-center justify-center w-12 h-12 hover:bg-[#8354E0] ${activeTool === 'move' ? 'bg-[#8354E0] text-white' : 'text-[#737373]'} hover:text-white transition-colors`}
        >
          <Hand width={20} />
        </button>
        <button 
          onClick={() => setActiveTool('brush')}
          className={`flex items-center justify-center w-12 h-12 hover:bg-[#8354E0] ${activeTool === 'brush' ? 'bg-[#8354E0] text-white' : 'text-[#737373]'} hover:text-white transition-colors`}
        >
          <Brush width={20} />
        </button>
        <button 
          onClick={() => setActiveTool('shapes')}
          className={`flex items-center justify-center w-12 h-12 hover:bg-[#8354E0] ${activeTool === 'shapes' ? 'bg-[#8354E0] text-white' : 'text-[#737373]'} hover:text-white transition-colors`}
        >
          <Shapes width={20} />
        </button>
      </div>
    </div>
  );
};

