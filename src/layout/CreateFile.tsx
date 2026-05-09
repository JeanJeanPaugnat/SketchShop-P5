import Navbar from "../shared/components/Navbar";
import { useNavigate } from "react-router";
import { useEditorStore } from "../store/useEditorStore";

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

    const handleSelectPreset = (width: number, height: number) => {
        resetEditor({ width, height });
        navigate('/');
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