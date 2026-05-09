import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../shared/components/Navbar';
import { useEditorStore } from '../store/useEditorStore';
import { Link, Settings2, ChevronDown } from 'pixelarticons/react';

type ExportFormat = 'png' | 'jpeg' | 'webp';

export default function ExportPage() {
    const navigate = useNavigate();
    const { previewUrl, canvasDimensions } = useEditorStore();
    const [quality, setQuality] = useState(92);
    const [format, setFormat] = useState<ExportFormat>('png');
    const [isFormatOpen, setIsFormatOpen] = useState(false);

    const formats: { label: string; value: ExportFormat }[] = [
        { label: 'PNG (Lossless)', value: 'png' },
        { label: 'JPEG (Standard)', value: 'jpeg' },
        { label: 'WebP (Modern)', value: 'webp' },
    ];

    const currentFormatLabel = formats.find(f => f.value === format)?.label;

    const handleExport = () => {
        if (!previewUrl) return;
        
        const img = new Image();
        img.src = previewUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = canvasDimensions.width;
            canvas.height = canvasDimensions.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            
            if (format === 'jpeg') {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            
            ctx.drawImage(img, 0, 0);
            const mimeType = `image/${format}`;
            const dataUrl = canvas.toDataURL(mimeType, quality / 100);
            
            const link = document.createElement('a');
            link.download = `sketchshop-export.${format === 'jpeg' ? 'jpg' : format}`;
            link.href = dataUrl;
            link.click();
        };
    };

    const estimatedSize = useMemo(() => {
        if (!previewUrl) return "0 KB";
        // Very rough estimation
        const baseSize = previewUrl.length * 0.75;
        const qualityFactor = quality / 100;
        const formatFactor = format === 'png' ? 1 : format === 'jpeg' ? 0.6 : 0.4;
        const size = (baseSize * qualityFactor * formatFactor) / 1024 / 1024;
        return size.toFixed(1) + " MB";
    }, [previewUrl, quality, format]);

    return (
        <div className="flex flex-col h-dvh bg-[#0e0e0e] text-white">
            <Navbar />
            <div className="flex-1 flex gap-6 p-6 overflow-hidden">
                {/* Left Side: Settings */}
                <div className="w-[320px] flex flex-col gap-6 shrink-0 overflow-y-auto pr-2">
                    {/* Export Settings */}
                    <div className="bg-[#171717] p-6 flex flex-col gap-6 rounded-xl border border-white/5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold font-['Manrope'] tracking-tight">Export Settings</h2>
                            <Settings2 width={18} />
                        </div>

                        {/* File Format */}
                        <div className="flex flex-col gap-2 relative">
                            <label className="text-[10px] text-[#adaaaa] tracking-widest uppercase">File Format</label>
                            <div 
                                onClick={() => setIsFormatOpen(!isFormatOpen)}
                                className="bg-[#262626] rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-[#333] transition-colors border border-white/5"
                            >
                                <span className="text-sm">{currentFormatLabel}</span>
                                <ChevronDown width={16} className={`transition-transform ${isFormatOpen ? 'rotate-180' : ''}`} />
                            </div>
                            
                            {isFormatOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-[#262626] border border-white/10 rounded-lg overflow-hidden z-50 shadow-2xl">
                                    {formats.map((f) => (
                                        <div 
                                            key={f.value}
                                            onClick={() => {
                                                setFormat(f.value);
                                                setIsFormatOpen(false);
                                            }}
                                            className="p-3 text-sm hover:bg-violet-500/20 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                                        >
                                            {f.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Dimensions */}
                        <div className="flex gap-2">
                                <div className="flex flex-col gap-1 flex-1">
                                    <span className="text-sm text-[#adaaaa]">Width</span>
                                    <div className="bg-[#262626] p-3 w-full text-sm text-white/50 border border-white/5 rounded-lg">
                                        {canvasDimensions.width}
                                    </div>
                                </div>
                                <div className="w-5 pb-3 flex items-end justify-center text-[#adaaaa]">
                                    <Link width={16} />
                                </div>

                                <div className="flex flex-col gap-1 flex-1">
                                    <span className="text-sm text-[#adaaaa]">Height</span>
                                    <div className="bg-[#262626] p-3 w-full text-sm text-white/50 border border-white/5 rounded-lg">
                                        {canvasDimensions.height}
                                    </div>
                                </div>
                        </div>

                        {/* Quality Slider */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm text-[#adaaaa] tracking-widest uppercase">Quality</label>
                                <span className="text-xs font-bold text-[#00e3fd]">{quality}%</span>
                            </div>
                            <input 
                                type="range" 
                                min="1" 
                                max="100" 
                                value={quality} 
                                onChange={(e) => setQuality(parseInt(e.target.value))}
                                className="w-full h-1 bg-[#262626] rounded-full appearance-none cursor-pointer accent-[#00e3fd]"
                            />
                            <div className="flex justify-between text-[10px] text-[#767575]">
                                <span>Speed</span>
                                <span>Fidelity</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Side: Preview */}
                <div className="flex-1 flex flex-col gap-6 relative min-w-0">
                    {/* Main Preview Area */}
                    <div className="flex-1 bg-[#262626]/60 backdrop-blur-[10px] rounded-xl overflow-hidden relative flex items-center justify-center p-8 border border-white/5">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                        
                        {previewUrl ? (
                            <img 
                                src={previewUrl} 
                                alt="Export Preview" 
                                className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                                style={{ 
                                    filter: `drop-shadow(0 0 20px rgba(0,0,0,0.5))`,
                                    opacity: quality / 100 
                                }}
                            />
                        ) : (
                            <div className="text-gray-500 flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-2 border-dashed border-gray-600 rounded-full animate-spin border-t-violet-500"></div>
                                <p className="text-sm font-medium">Waiting for canvas data...</p>
                            </div>
                        )}

                        {/* Bottom Overlay Badge */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#00e3fd]"></div>
                                <span className="text-[10px] font-medium text-white/80">{canvasDimensions.width} x {canvasDimensions.height}</span>
                            </div>
                            <div className="w-px h-4 bg-white/20"></div>
                            <span className="text-[10px] font-medium text-white/80 uppercase">{format} PREVIEW</span>
                        </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="bg-[#262626]/60 backdrop-blur-[10px] rounded-xl p-4 flex items-center justify-between shrink-0 border border-white/5">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-[#adaaaa] tracking-tight uppercase">Estimated File Size</span>
                                <span className="text-sm font-bold">{estimatedSize}</span>
                            </div>
                            <div className="w-px h-8 bg-[#484847]/30"></div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-[#adaaaa] tracking-tight uppercase">Format</span>
                                <span className="text-sm font-bold uppercase">{format === 'jpeg' ? 'JPG' : format}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => navigate('/')}
                                className="px-6 py-3 border border-white/10 rounded-lg text-sm font-bold hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleExport}
                                disabled={!previewUrl}
                                className="bg-[#b6a0ff] text-[#340090] px-8 py-3 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#a38cff] transition-all shadow-[0_4px_14px_rgba(182,160,255,0.25)] hover:shadow-[0_6px_20px_rgba(182,160,255,0.4)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                Export Now
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    );
}
