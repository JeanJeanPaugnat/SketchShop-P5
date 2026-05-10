import Navbar from "../shared/components/Navbar";
import { useNavigate } from "react-router";
import { useEditorStore } from "../store/useEditorStore";
import { useState } from "react";

const PRESETS = [
    {
        id: 'print-a4',
        name: 'A4',
        width: 2480,
        height: 3508,
        description: '210 × 297 mm',
        icon: (
            <div className="w-16 h-20 bg-[#1F1D26] rounded flex items-center justify-center border border-[#4C4B52]">
                <span className="text-[10px] font-bold text-[#4C4B52]">A4</span>
            </div>
        )
    },
    {
        id: 'web-hd',
        name: 'Thumbnail',
        width: 1920,
        height: 1080,
        description: '1920 × 1080 px',
        icon: (
            <div className="w-24 h-14 bg-[#1F1D26] rounded flex items-center justify-center border border-[#4C4B52]">
                <span className="text-[10px] font-bold text-[#4C4B52]">1080P</span>
            </div>
        )
    },
    {
        id: 'mobile',
        name: 'Mobile',
        width: 1170,
        height: 2532,
        description: '1170 × 2532 px',
        icon: (
            <div className="w-10 h-20 bg-[#1F1D26] rounded-lg flex items-center justify-center border border-[#4C4B52] relative">
                <div className="w-1 h-1 bg-[#4C4B52] rounded-full absolute top-2"></div>
            </div>
        )
    }
];

function CreateFileContent() {
    const navigate = useNavigate();
    const { resetEditor } = useEditorStore();
    const [isModalOpen, setIsModalOpen] = useState(false);    
    const DEFAULT_SIZE = { width: 1920, height: 1080 };
    const DEFAULT_BG_TYPE = 'white';
    const DEFAULT_BG_COLOR = '#ffffff';
    const DEFAULT_PROJECT_NAME = '';

    const [customSize, setCustomSize] = useState(DEFAULT_SIZE);
    const [backgroundType, setBackgroundType] = useState<'white' | 'transparent' | 'custom'>(DEFAULT_BG_TYPE);
    const [customBgColor, setCustomBgColor] = useState(DEFAULT_BG_COLOR);
    const [projectName, setProjectName] = useState(DEFAULT_PROJECT_NAME);

    const isLandscape = customSize.width >= customSize.height;

    const resetValues = () => {
        setCustomSize(DEFAULT_SIZE);
        setBackgroundType(DEFAULT_BG_TYPE);
        setCustomBgColor(DEFAULT_BG_COLOR);
        setProjectName(DEFAULT_PROJECT_NAME);
    };

    const handleSelectPreset = (width: number, height: number) => {
        resetEditor({ dimensions: { width, height }, background: '#ffffff' });
        navigate('/');
    };

    const handleCreateCustom = () => {
        const background = backgroundType === 'white' ? '#ffffff' : 
                         backgroundType === 'transparent' ? 'transparent' : 
                         customBgColor;
        
        resetEditor({ 
            dimensions: { width: customSize.width, height: customSize.height }, 
            background 
        });
        navigate('/');
    };

    const setOrientation = (type: 'landscape' | 'portrait') => {
        const { width, height } = customSize;
        if (type === 'landscape' && width < height) {
            setCustomSize({ width: height, height: width });
        } else if (type === 'portrait' && width > height) {
            setCustomSize({ width: height, height: width });
        }
    };

    return (
        <div className="flex-1 bg-[#0a0a0a] text-white p-12">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold mb-2 tracking-tight">Welcome back, Creator</h1>
                    <p className="text-gray-500 text-lg">Start a new masterpiece or pick up where you left off.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRESETS.map((preset) => (
                        <button
                            key={preset.id}
                            onClick={() => handleSelectPreset(preset.width, preset.height)}
                            className="bg-[#111111] border border-[#111111] p-8 flex flex-col items-center justify-between hover:border hover:border-purple-500/50 hover:bg-[#151515] transition-all group text-center aspect-square md:aspect-auto md:h-80"
                        >
                            <div className="flex-1 flex items-center justify-center">
                                {preset.icon}
                            </div>
                            <div className="mt-6">
                                <h3 className="font-bold text-lg mb-1 group-hover:text-purple-400 transition-colors">{preset.name}</h3>
                                <p className="text-gray-500 text-xs">{preset.description}</p>
                            </div>
                        </button>
                    ))}

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#1a1a24] border-2 border-purple-500/20 border-dashed p-8 flex flex-col items-center justify-between hover:border-purple-500/50 hover:bg-[#1e1e2d] transition-all group text-center md:h-80"
                    >
                        <div className="flex-1 flex items-center justify-center">
                                <svg width="42" height="42" viewBox="0 0 19 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-purple-500">
                                    <path d="M5 3H14V0H16V3H19V5H16V10H14V5H5V14H10V16H5V19H3V16H0V14H3V5H0V3H3V0H5V3ZM16 14H18V16H16V18H14V16H12V14H14V12H16V14Z" fill="currentColor"/>
                                </svg>
                        </div>
                        <div className="mt-6">
                            <h3 className="font-bold text-lg mb-1 text-purple-300">Custom size</h3>
                            <p className="text-gray-500 text-xs">Create your own dimensions</p>
                        </div>
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#131313]  w-3xl overflow-hidden">
                        {/* Header */}
                        <div className="flex justify-between items-start pt-10 pb-6 px-10">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-3xl font-extrabold text-white tracking-tight">Create New Masterpiece</h2>
                                <p className="text-[#adaaaa] text-sm font-medium">Configure your workspace for a new creative journey.</p>
                            </div>
                            
                            <button onClick={() => setIsModalOpen(false)} className="p-2 transition-colors text-[#adaaaa] hover:text-white">
                                <svg width="16" height="16" viewBox="0 0 9 9" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 9H0V8H1V9ZM9 9H8V8H9V9ZM2 8H1V7H2V8ZM8 8H7V7H8V8ZM3 7H2V6H3V7ZM7 7H6V6H7V7ZM4 6H3V5H4V6ZM6 6H5V5H6V6ZM5 5H4V4H5V5ZM4 4H3V3H4V4ZM6 4H5V3H6V4ZM3 3H2V2H3V3ZM7 3H6V2H7V3ZM2 2H1V1H2V2ZM8 2H7V1H8V2ZM1 1H0V0H1V1ZM9 1H8V0H9V1Z" fill="currentColor"/>
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-10 pb-10 space-y-8">
                            {/* Project Name */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="projectName" className="text-[12px] font-semibold text-[#b6a0ff] uppercase tracking-[1.2px]">Project Name</label>
                                <input 
                                    type="text" 
                                    id="projectName"
                                    placeholder="Untitled Artwork"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    className="w-full bg-[#262626] px-4 py-4 text-white focus:outline-none placeholder:text-[#adaaaa]/40 transition-colors"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                                {/* Dimensions */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="width" className="text-[14px]  text-[#adaaaa] tracking-[1.2px]">Width (px)</label>
                                    <input 
                                        type="number" 
                                        id="width"
                                        value={customSize.width}
                                        onChange={(e) => setCustomSize(prev => ({ ...prev, width: parseInt(e.target.value) || 0 }))}
                                        className="w-full bg-[#262626] px-4 py-3 text-white focus:outline-none transition-colors"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="height" className="text-[14px]  text-[#adaaaa] tracking-[1.2px]">Height (px)</label>
                                    <input 
                                        type="number" 
                                        id="height"
                                        value={customSize.height}
                                        onChange={(e) => setCustomSize(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                                        className="w-full bg-[#262626] px-4 py-3 text-white focus:outline-none transition-colors"
                                    />
                                </div>

                                {/* Orientation */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[14px]  text-[#adaaaa] tracking-[1.2px]">Orientation</label>
                                    <div className="bg-[#262626] p-1.5 flex gap-2 h-[54px]">
                                        <button 
                                            onClick={() => setOrientation('landscape')}
                                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 transition-all ${isLandscape ? 'bg-[#c7aaff] text-[#8354e0]' : 'text-[#adaaaa] hover:text-white'}`}
                                        >
                                            <svg width="23" height="19" viewBox="0 0 22 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 16H14V14H16V16H20V18H2V16H6V14H8V16ZM2 16H0V2H2V16ZM22 16H20V2H22V16ZM14 14H8V12H14V14ZM13 11H9V9H13V11ZM9 9H7V5H9V9ZM15 9H13V5H15V9ZM13 5H9V3H13V5ZM20 2H2V0H20V2Z" fill="currentColor"/>
                                            </svg>
                                            <span className="text-sm font-semibold">Landscape</span>
                                        </button>
                                        <button 
                                            onClick={() => setOrientation('portrait')}
                                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 transition-all ${!isLandscape ? 'bg-[#c7aaff] text-[#8354e0]' : 'text-[#adaaaa] hover:text-white'}`}
                                        >
                                            <svg width="20" height="23" viewBox="0 0 18 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 19H12V15H14V19H16V21H2V19H4V15H6V19ZM2 19H0V2H2V19ZM18 19H16V2H18V19ZM12 15H6V13H12V15ZM11 12H7V10H11V12ZM7 10H5V6H7V10ZM13 10H11V6H13V10ZM11 6H7V4H11V6ZM16 2H2V0H16V2Z" fill="currentColor"/>
                                            </svg>
                                            <span className="text-sm font-semibold">Portrait</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Background Color */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[14px]  text-[#adaaaa] tracking-[1.2px]">Background Color</label>
                                    <div className="flex gap-4">
                                        <button 
                                            onClick={() => setBackgroundType('white')}
                                            className={`w-10 h-10 border transition-all ${backgroundType === 'white' ? 'border-[#c7aaff] ring-1 ring-[#c7aaff]' : 'border-transparent'}`}
                                            title="White"
                                        >
                                            <div className="w-full h-full bg-white"></div>
                                        </button>
                                        <button 
                                            onClick={() => setBackgroundType('transparent')}
                                            className={`w-10 h-10 border transition-all overflow-hidden relative ${backgroundType === 'transparent' ? 'border-[#c7aaff] ring-1 ring-[#c7aaff]' : 'border-[rgba(255,255,255,0.1)]'}`}
                                            title="Transparent"
                                        >
                                            <div className="w-full h-full bg-[#262626] flex items-center justify-center">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 0H7V7H0V0ZM7 7H14V14H7V7Z" fill="#3f3f46"/>
                                                </svg>
                                            </div>
                                        </button>
                                        <button 
                                            onClick={() => setBackgroundType('custom')}
                                            className={`w-10 h-10 border transition-all p-0.5 ${backgroundType === 'custom' ? 'border-[#c7aaff] ring-1 ring-[#c7aaff]' : 'border-transparent'}`}
                                            style={{ backgroundImage: 'linear-gradient(135deg, #b6a0ff 0%, #00e3fd 100%)' }}
                                            title="Custom Color"
                                        >
                                            <div className="w-full h-full bg-[#262626] flex items-center justify-center">
                                                <input 
                                                    type="color" 
                                                    value={customBgColor}
                                                    onChange={(e) => {
                                                        setCustomBgColor(e.target.value);
                                                        setBackgroundType('custom');
                                                    }}
                                                    className="w-full h-full cursor-pointer bg-transparent border-none p-0 "
                                                />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-[#20201f] px-10 py-4 flex items-center justify-between">
                            <button 
                                onClick={resetValues}
                                className="flex items-center gap-2 text-[#adaaaa] hover:text-white transition-colors group"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 12V14H4V12H10ZM4 12H2V10H4V12ZM12 12H10V10H12V12ZM2 10H0V4H2V10ZM14 10H12V4H14V10ZM14 2H12V4H10V6H8V0H14V2ZM4 4H2V2H4V4Z" fill="currentColor"/>
                                </svg>
                                <span className="text-sm font-semibold">Reset Values</span>
                            </button>

                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => setIsModalOpen(false)} 
                                    className="py-2.5 px-6 bg-[#333] hover:bg-[#444] text-white text-sm font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleCreateCustom} 
                                    className="py-2.5 px-6 bg-[#8354e0] hover:bg-[#9165e9] text-white text-sm font-medium transition-colors"
                                >
                                    Create Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function CreateFile() {
    return (
        <div className="flex flex-col h-dvh">
            <Navbar />
            <CreateFileContent />
        </div>
    )
}