import React from 'react';
import { Eye, EyeOff, Lock, Unlock } from 'pixelarticons/react';
import { useState } from 'react';

interface LayerCardProps {
  title: string;
  subtitle: string;
    isActive: boolean;
    isVisible: boolean;
    isLocked: boolean;
    thumbnail: string | null;
}

export default function LayerCard({ title, subtitle, isActive, isVisible, isLocked, thumbnail }: LayerCardProps) {


  return (
    <div className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
      isActive ? 'bg-[#8354E0] text-white' : 'bg-transparent text-gray-400 hover:bg-[#2A2A2A]'
    }`}>
      {/* Visibility Toggle */}
      <button className="p-1">
        {isVisible ? <Eye width={18} /> : <EyeOff width={18} className="opacity-50" />}
      </button>

      {/* Thumbnail */}
      <div className="w-10 h-10 bg-[#1A1A1A] border border-gray-700 flex-shrink-0 overflow-hidden">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            {/* Placeholder icon or pattern */}
            <div className="w-4 h-4 border border-gray-600 rotate-45"></div>
          </div>
        )}
      </div>

      {/* Texts */}
      <div className="flex-1 w-36">
        <h4 className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-gray-200'}`}>
          {title}
        </h4>
        <p className={`text-xs truncate ${isActive ? 'text-purple-200' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      </div>

      {/* Lock Status */}
      <div className="px-1">
        {isLocked ? <Lock width={18} /> : <Unlock width={18} className="opacity-0 group-hover:opacity-100" />}
      </div>
    </div>
  );
};