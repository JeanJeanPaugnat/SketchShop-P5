import React from 'react';
import { CursorMinimal, Hand, Shapes, Brush} from 'pixelarticons/react';
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
          title="Select"
        >
          <CursorMinimal width={20} />
        </button>
        <button 
          onClick={() => setActiveTool('move')}
          className={`flex items-center justify-center w-12 h-12 hover:bg-[#8354E0] ${activeTool === 'move' ? 'bg-[#8354E0] text-white' : 'text-[#737373]'} hover:text-white transition-colors`}
          title="Move"
        >
          <Hand width={20} />
        </button>
        <button 
          onClick={() => setActiveTool('brush')}
          className={`flex items-center justify-center w-12 h-12 hover:bg-[#8354E0] ${activeTool === 'brush' ? 'bg-[#8354E0] text-white' : 'text-[#737373]'} hover:text-white transition-colors`}
          title="Brush"
        >
          <Brush width={20} />
        </button>
        <button 
          onClick={() => setActiveTool('eraser')}
          className={`flex items-center justify-center w-12 h-12 hover:bg-[#8354E0] ${activeTool === 'eraser' ? 'bg-[#8354E0] text-white' : 'text-[#737373]'} hover:text-white transition-colors`}
          title="Eraser"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 20H7L3 16C2 15 2 13 3 12L13 2L22 11L20 20Z"></path>
            <path d="M17 7L20 10"></path>
          </svg>
        </button>
        <button 
          onClick={() => setActiveTool('square')}
          className={`flex items-center justify-center w-12 h-12 hover:bg-[#8354E0] ${activeTool === 'square' ? 'bg-[#8354E0] text-white' : 'text-[#737373]'} hover:text-white transition-colors`}
          title="Square"
        >
          <div className="w-4 h-4 border-2 border-current"></div>
        </button>
        <button 
          onClick={() => setActiveTool('shapes')}
          className={`flex items-center justify-center w-12 h-12 hover:bg-[#8354E0] ${activeTool === 'shapes' ? 'bg-[#8354E0] text-white' : 'text-[#737373]'} hover:text-white transition-colors`}
          title="Circle"
        >
          <Shapes width={20} />
        </button>
      </div>
    </div>
  );
};

