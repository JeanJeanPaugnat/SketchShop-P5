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
    const [customSize, setCustomSize] = useState({ width: 1920, height: 1080 });
    const [backgroundType, setBackgroundType] = useState<'white' | 'transparent' | 'custom'>('white');
    const [customBgColor, setCustomBgColor] = useState('#ffffff');
    const [projectName, setProjectName] = useState('');

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

    const toggleOrientation = () => {
        setCustomSize(prev => ({
            width: prev.height,
            height: prev.width
        }));
    };

    return (
        <div className="flex-1 bg-[#0a0a0a] text-white p-12 overflow-y-auto">
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
                    <div className="bg-[#111111] border border-[#222] w-4xl">
                        <div className="flex justify-between items-start m-8">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-bold">Create New Masterpiece</h2>
                                <p className="text-gray-500 text-sm">Configure your workspace for a new creative journey.</p>

                            </div>
                            
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                                <svg width="16" height="16" viewBox="0 0 9 9" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 9H0V8H1V9ZM9 9H8V8H9V9ZM2 8H1V7H2V8ZM8 8H7V7H8V8ZM3 7H2V6H3V7ZM7 7H6V6H7V7ZM4 6H3V5H4V6ZM6 6H5V5H6V6ZM5 5H4V4H5V5ZM4 4H3V3H4V4ZM6 4H5V3H6V4ZM3 3H2V2H3V3ZM7 3H6V2H7V3ZM2 2H1V1H2V2ZM8 2H7V1H8V2ZM1 1H0V0H1V1ZM9 1H8V0H9V1Z" fill="currentColor"/>
                                </svg>

                            </button>
                        </div>

                        <div className="space-y-6 m-8">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="projectName" className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Project Name</label>
                                <input 
                                    type="text" 
                                    id="projectName"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    className="w-full bg-[#1a1a1a] px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="width" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Width (px)</label>
                                    <input 
                                        type="number" 
                                        id="width"
                                        value={customSize.width}
                                        onChange={(e) => setCustomSize(prev => ({ ...prev, width: parseInt(e.target.value) || 0 }))}
                                        className="w-full bg-[#1a1a1a] px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="height" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Height (px)</label>
                                    <input 
                                        type="number" 
                                        id="height"
                                        value={customSize.height}
                                        onChange={(e) => setCustomSize(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                                        className="w-full bg-[#1a1a1a] px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 ">

                                <div className="">
                                    <label htmlFor="" className="">Orientation</label>
                                    <div className=""></div>
                                </div>
                                <button 
                                    onClick={toggleOrientation}
                                    className="w-full bg-[#1a1a1a] px-4 py-3 flex items-center justify-center gap-3 hover:bg-[#222] transition-colors group"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 group-hover:rotate-90 transition-transform duration-300">
                                        <path d="M17 2.1l4 4-4 4"></path>
                                        <path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8"></path>
                                        <path d="M7 21.9l-4-4 4-4"></path>
                                        <path d="M21 11.8v2a4 4 0 0 1-4 4H4.2"></path>
                                    </svg>
                                    <span className="font-medium">Swap Orientation</span>
                                </button>

                                <div className="space-y-4">
                                    <label htmlFor="background" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Background</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <button 
                                            onClick={() => setBackgroundType('white')}
                                            className={`px-3 py-2 rounded-lg border text-sm transition-all ${backgroundType === 'white' ? 'bg-white text-black border-white' : 'bg-[#1a1a1a] border-[#333] text-gray-400 hover:border-gray-500'}`}
                                        >
                                            White
                                        </button>
                                        <button 
                                            onClick={() => setBackgroundType('transparent')}
                                            className={`px-3 py-2 rounded-lg border text-sm transition-all ${backgroundType === 'transparent' ? 'bg-purple-500 border-purple-500 text-white' : 'bg-[#1a1a1a] border-[#333] text-gray-400 hover:border-gray-500'}`}
                                        >
                                            Transparent
                                        </button>
                                        <button 
                                            onClick={() => setBackgroundType('custom')}
                                            className={`px-3 py-2 rounded-lg border text-sm transition-all ${backgroundType === 'custom' ? 'bg-[#333] border-purple-500 text-white' : 'bg-[#1a1a1a] border-[#333] text-gray-400 hover:border-gray-500'}`}
                                        >
                                            Custom
                                        </button>
                                    </div>

                                    {backgroundType === 'custom' && (
                                        <div className="flex items-center gap-3 bg-[#1a1a1a] p-3 rounded-lg border border-[#333]">
                                            <input 
                                                type="color" 
                                                id="customBackground"
                                                value={customBgColor}
                                                onChange={(e) => setCustomBgColor(e.target.value)}
                                                className="w-10 h-10 rounded cursor-pointer bg-transparent border-none"
                                            />
                                            <input 
                                                type="text" 
                                                value={customBgColor}
                                                onChange={(e) => setCustomBgColor(e.target.value)}
                                                className="bg-transparent text-sm font-mono focus:outline-none w-24"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            

                            


                        </div>
                    <div className="bg-[#20201F] p-4 flex items-center justify-between ">
                       <p className="text-gray-400">Reset Values</p>
                        <div className="flex items-center gap-3.5">
                            <button onClick={() => setIsModalOpen(false)} className="py-2.5 px-5 bg-[#333] hover:bg-[#444] text-gray-400 font-medium focus:outline-none">Cancel</button>
                            <button onClick={handleCreateCustom} className="py-2.5 px-5 bg-purple-600 hover:bg-purple-500 text-white font-medium focus:outline-none">Create Project</button>
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