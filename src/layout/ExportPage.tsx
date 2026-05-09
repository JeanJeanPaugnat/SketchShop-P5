import { useState } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../shared/components/Navbar';
import Button from '../shared/components/Button';
import { motion } from 'motion/react';
import { Link, Settings2 } from 'pixelarticons/react';

export default function ExportPage() {
    const navigate = useNavigate();
    const [quality, setQuality] = useState(92);
    const [colorSpace, setColorSpace] = useState<'sRGB' | 'Display P3'>('sRGB');

    return (
        <div className="flex flex-col h-dvh bg-[#0e0e0e] text-white">
            <Navbar />
            <div className="flex-1 flex gap-6 p-6 overflow-hidden">
                {/* Left Side: Settings */}
                <div className="w-[320px] flex flex-col gap-6 shrink-0 overflow-y-auto pr-2">
                    {/* Export Settings */}
                    <div className="bg-[#171717] p-6 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold font-['Manrope'] tracking-tight">Export Settings</h2>
                            <Settings2 width={18} />
                        </div>

                        {/* File Format */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-[#adaaaa] tracking-widest uppercase">File Format</label>
                            <div className="bg-[#262626] rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-[#333] transition-colors">
                                <span className="text-sm">PNG (Lossless)</span>
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#ADAAAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        {/* Dimensions */}
                        <div className="flex gap-2">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm text-[#adaaaa]">Width</span>
                                    <input type='number' className="bg-[#262626] p-3 w-full flex flex-col gap-1 text-sm text-white focus:outline-none" value={3840} />
                                </div>
                                <div className="w-5 pb-3 flex items-end justify-center text-[#adaaaa]">
                                    <Link width={16} />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-sm text-[#adaaaa]">Height</span>
                                    <input type='number' className="bg-[#262626] p-3 w-full flex flex-col gap-1 text-sm text-white focus:outline-none" value={2160} />
                                </div>
                                
                        </div>

                        {/* Quality Slider */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm text-[#adaaaa] tracking-widest uppercase">Quality</label>
                                <span className="text-xs font-bold text-[#00e3fd]">{quality}%</span>
                            </div>
                            <div className="relative h-1 bg-[#262626] rounded-full my-2">
                                <div className="absolute top-0 left-0 h-full bg-[#00e3fd] rounded-full" style={{ width: `${quality}%` }}></div>
                                <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#00e3fd] rounded-full shadow-[0_0_10px_rgba(0,227,253,0.5)] cursor-pointer" style={{ left: `calc(${quality}% - 8px)` }}></div>
                            </div>
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
                    <div className="flex-1 bg-[#262626]/60 backdrop-blur-[10px] rounded-xl overflow-hidden relative flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 opacity-80 mix-blend-overlay"></div>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-50"></div>
                        
                        {/* Zoom Controls */}
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button className="bg-black/60 backdrop-blur-md p-2 rounded-lg hover:bg-black/80 transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                            </button>
                            <button className="bg-black/60 backdrop-blur-md p-2 rounded-lg hover:bg-black/80 transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                            </button>
                        </div>

                        {/* Bottom Overlay Badge */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#00e3fd]"></div>
                                <span className="text-[10px] font-medium text-white/80">4K PREVIEW</span>
                            </div>
                            <div className="w-px h-4 bg-white/20"></div>
                            <span className="text-[10px] font-medium text-white/80">ZOOM: 100%</span>
                        </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="bg-[#262626]/60 backdrop-blur-[10px] rounded-xl p-4 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-[#adaaaa] tracking-tight uppercase">Estimated File Size</span>
                                <span className="text-sm font-bold">12.4 MB</span>
                            </div>
                            <div className="w-px h-8 bg-[#484847]/30"></div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-[#adaaaa] tracking-tight uppercase">Format</span>
                                <span className="text-sm font-bold">PNG (Transparent)</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => navigate('/')}
                                className="px-6 py-3 border border-white/10 rounded-lg text-sm font-bold hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button className="bg-[#b6a0ff] text-[#340090] px-8 py-3 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#a38cff] transition-all shadow-[0_4px_14px_rgba(182,160,255,0.25)] hover:shadow-[0_6px_20px_rgba(182,160,255,0.4)] hover:-translate-y-0.5">
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
