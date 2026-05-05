import React from 'react';
import { Eye, EyeOff, Lock, Unlock } from 'pixelarticons/react';

interface LayerCardProps {
  title: string;
  subtitle: string;
  isActive: boolean;
  isVisible: boolean;
  isLocked: boolean;
  thumbnail: string | null;
  onToggleVisibility?: () => void;
  onToggleLock?: () => void;
  onClick?: () => void;
}

export default function LayerCard({
  title,
  subtitle,
  isActive,
  isVisible,
  isLocked,
  thumbnail,
  onToggleVisibility,
  onToggleLock,
  onClick,
}: LayerCardProps) {
  return (
    <div
      onClick={onClick}
      className={`group flex items-center gap-3 p-3 cursor-pointer transition-colors ${
        isActive ? 'bg-[#8354E0] text-white' : 'bg-transparent text-gray-400 hover:bg-[#2A2A2A]'
      }`}
    >
      {/* Visibility Toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleVisibility?.();
        }}
        className={`p-1 hover:text-white transition-colors ${!isVisible && !isActive ? 'text-gray-600' : ''}`}
      >
        {isVisible ? <Eye width={18} /> : <EyeOff width={18} />}
      </button>

      {/* Thumbnail */}
      <div className={`w-10 h-10 bg-[#1A1A1A] border flex-shrink-0 overflow-hidden ${
        isActive ? 'border-purple-400' : 'border-gray-700'
      }`}>
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <div className="w-4 h-4 border border-gray-600 rotate-45"></div>
          </div>
        )}
      </div>

      {/* Texts */}
      <div className="flex-1 min-w-36">
        <h4 className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-gray-200'}`}>
          {title}
        </h4>
        <p className={`text-xs truncate ${isActive ? 'text-purple-200' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      </div>

      {/* Lock Status */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleLock?.();
        }}
        className={`px-1 hover:text-white transition-colors ${
          !isLocked ? 'opacity-0 group-hover:opacity-100' : ''
        } ${isActive ? 'text-white' : ''}`}
      >
        {isLocked ? <Lock width={18} /> : <Unlock width={18} />}
      </button>
    </div>
  );
}