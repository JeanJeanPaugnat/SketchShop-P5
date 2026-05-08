import Navbar from "../shared/components/Navbar";
import { useNavigate } from "react-router";
import { useEditorStore } from "../store/useEditorStore";

const PRESETS = [
    {
        id: 'print-a4',
        name: 'Print A4',
        width: 2480,
        height: 3508,
        description: '210 × 297 mm • 300 DPI',
        icon: (
            <div className="w-16 h-20 bg-gray-800 rounded flex items-center justify-center border border-gray-700">
                <span className="text-[10px] font-bold text-gray-500">A4</span>
            </div>
        )
    },
    {
        id: 'web-hd',
        name: 'Web HD',
        width: 1920,
        height: 1080,
        description: '1920 × 1080 px • 72 DPI',
        icon: (
            <div className="w-24 h-14 bg-gray-800 rounded flex items-center justify-center border border-gray-700">
                <span className="text-[10px] font-bold text-gray-500">1080P</span>
            </div>
        )
    },
    {
        id: 'mobile',
        name: 'Mobile',
        width: 1170,
        height: 2532,
        description: '1170 × 2532 px • Portrait',
        icon: (
            <div className="w-10 h-20 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 relative">
                <div className="w-1 h-1 bg-gray-700 rounded-full absolute top-2"></div>
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
                            className="bg-[#111111] border border-gray-900 rounded-xl p-8 flex flex-col items-center justify-between hover:border-purple-500/50 hover:bg-[#151515] transition-all group text-center aspect-square md:aspect-auto md:h-80"
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
                        className="bg-[#1a1a24] border border-purple-500/20 border-dashed rounded-xl p-8 flex flex-col items-center justify-between hover:border-purple-500/50 hover:bg-[#1e1e2d] transition-all group text-center md:h-80"
                    >
                        <div className="flex-1 flex items-center justify-center">
                            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="font-bold text-lg mb-1 text-purple-300">Create your own size</h3>
                            <p className="text-gray-500 text-xs uppercase tracking-widest">PSD, AI, SKP, PNG, JPG</p>
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