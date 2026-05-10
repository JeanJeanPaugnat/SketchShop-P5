import { create } from 'zustand';
import type { Tool, Layer, DrawingSettings } from '../core/types';

interface EditorState {
  // Canvas State
  canvasDimensions: { width: number; height: number };
  canvasBackground: string;
  setCanvasDimensions: (dimensions: { width: number; height: number }) => void;
  setCanvasBackground: (background: string) => void;

  // Tool State
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
  
  // Settings State
  settings: DrawingSettings;
  setSettings: (settings: DrawingSettings) => void;
  updateSetting: (key: keyof DrawingSettings, value: any) => void;

  // Layers State
  layers: Layer[];
  setLayers: (layers: Layer[]) => void;
  toggleVisibility: (id: string) => void;
  toggleLock: (id: string) => void;
  setActiveLayer: (id: string) => void;
  addLayer: () => void;
  deleteActiveLayer: () => void;
  updateActiveLayerOpacity: (opacity: number) => void;
  resetEditor: (params: { dimensions: { width: number; height: number }, background?: string }) => void;

  // Filter State
  applyFilter: { type: 'threshold' | 'pixelate' | 'ascii', timestamp: number } | undefined;
  triggerFilter: (type: 'threshold' | 'pixelate' | 'ascii') => void;

  // Export & Persistence State
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
  layerData: Map<string, string>; // Maps layer ID to data URL
  setLayerData: (id: string, dataUrl: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  // Canvas State
  canvasDimensions: { width: 1200, height: 800 },
  canvasBackground: '#ffffff',
  setCanvasDimensions: (canvasDimensions) => set({ canvasDimensions }),
  setCanvasBackground: (canvasBackground) => set({ canvasBackground }),

  // Tool State
  activeTool: 'brush',
  setActiveTool: (tool) => set({ activeTool: tool }),

  // Settings State
  settings: {
    color: '#000000',
    brushSize: 5,
    opacity: 100,
    isDynamicBrush: false,
    pixelSize: 10,
    threshold: 128,
    asciiScale: 10,
  },
  setSettings: (settings) => set({ settings }),
  updateSetting: (key, value) => 
    set((state) => ({ settings: { ...state.settings, [key]: value } })),

  // Layers State
  layers: [
    {
      id: '1',
      name: "Calque 1",
      isVisible: true,
      isLocked: false,
      isActive: true,
      opacity: 100,
    }
  ],
  setLayers: (layers) => set({ layers }),
  toggleVisibility: (id) => set((state) => ({
    layers: state.layers.map(l => l.id === id ? { ...l, isVisible: !l.isVisible } : l)
  })),
  toggleLock: (id) => set((state) => ({
    layers: state.layers.map(l => l.id === id ? { ...l, isLocked: !l.isLocked } : l)
  })),
  setActiveLayer: (id) => set((state) => ({
    layers: state.layers.map(l => ({ ...l, isActive: l.id === id }))
  })),
  addLayer: () => set((state) => {
    const newLayer: Layer = {
      id: Math.random().toString(36).substring(2, 9),
      name: `Calque ${state.layers.length + 1}`,
      isVisible: true,
      isLocked: false,
      isActive: true,
      opacity: 100,
    };
    return {
      layers: [...state.layers.map(l => ({ ...l, isActive: false })), newLayer]
    };
  }),
  deleteActiveLayer: () => set((state) => {
    if (state.layers.length <= 1) return state;
    const activeIndex = state.layers.findIndex(l => l.isActive);
    if (activeIndex === -1) return state;

    const newLayers = state.layers.filter((_, i) => i !== activeIndex);
    const nextActiveIndex = Math.max(0, activeIndex - 1);
    newLayers[nextActiveIndex].isActive = true;
    
    return { layers: newLayers };
  }),
  updateActiveLayerOpacity: (opacity) => set((state) => ({
    layers: state.layers.map(l => l.isActive ? { ...l, opacity } : l)
  })),
  resetEditor: ({ dimensions, background = '#ffffff' }) => set({
    canvasDimensions: dimensions,
    canvasBackground: background,
    layers: [
      {
        id: '1',
        name: "Calque 1",
        isVisible: true,
        isLocked: false,
        isActive: true,
        opacity: 100,
      }
    ],
    activeTool: 'brush',
    applyFilter: undefined,
  }),

  // Filter State
  applyFilter: undefined,
  triggerFilter: (type) => set({ applyFilter: { type, timestamp: Date.now() } }),

  // Export & Persistence State
  previewUrl: null,
  setPreviewUrl: (previewUrl) => set({ previewUrl }),
  layerData: new Map(),
  setLayerData: (id, dataUrl) => set((state) => {
    const newLayerData = new Map(state.layerData);
    newLayerData.set(id, dataUrl);
    return { layerData: newLayerData };
  }),
}));
