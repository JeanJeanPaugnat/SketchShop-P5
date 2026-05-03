import React, { useState } from 'react';
import { Settings2, CursorMinimal, Hand, Shapes, Brush } from 'pixelarticons/react';

type Tool = 'select' | 'move' | 'brush' | 'shapes';



export default function ToolBox(){




  return (
    <div className="flex flex-col  py-2 gap-4 absolute h-fill-available m-6 bg-[#171717]">
      <div className="flex flex-col gap-2 px-2">
        <button className=" flex items-center justify-center w-12 h-12 hover:bg-[#8354E0] text-[#737373] hover:text-white">
          <CursorMinimal width={20} className=" hover:text-white" />
        </button>
        <button className=" flex items-center justify-center w-12 h-12    hover:bg-[#8354E0] hover:text-white text-[#737373]">
          <Hand width={20} className=" hover:text-white" />
        </button>
        <button className=" flex items-center justify-center w-12 h-12 hover:bg-[#8354E0] hover:text-white text-[#737373]">
          <Brush width={20} className=" hover:text-white" />
        </button>
        <button className=" flex items-center justify-center w-12 h-12 hover:bg-[#8354E0] hover:text-white text-[#737373]">
          <Shapes width={20} className=" hover:text-white" />
        </button>


      </div>
      <div>
        
      </div>
    </div>
  );
};

