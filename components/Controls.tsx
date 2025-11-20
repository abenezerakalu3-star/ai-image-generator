import React, { useCallback } from 'react';
import { AspectRatio, ModelType } from '../types';
import { Ratio, BoxSelect, Zap, Star, Loader2, Sparkles } from 'lucide-react';

interface ControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  model: ModelType;
  setModel: (model: ModelType) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  prompt,
  setPrompt,
  aspectRatio,
  setAspectRatio,
  model,
  setModel,
  onGenerate,
  isGenerating
}) => {

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
          if (prompt.trim() && !isGenerating) {
              onGenerate();
          }
      }
  }, [onGenerate, prompt, isGenerating]);

  return (
    <div className="bg-[#131316] border border-white/5 rounded-2xl p-6 flex flex-col gap-6 shadow-xl h-fit">
      
      {/* Prompt Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 ml-1">Prompt</label>
        <div className="relative">
            <textarea
                className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none text-lg leading-relaxed transition-all"
                placeholder="Describe the image you want to generate in detail..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isGenerating}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-600">
                CMD+ENTER to run
            </div>
        </div>
      </div>

      {/* Model Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 ml-1 flex items-center gap-2">
            <BoxSelect className="w-4 h-4" /> Model
        </label>
        <div className="grid grid-cols-2 gap-2">
            <button
                onClick={() => setModel(ModelType.IMAGEN_HQ)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    model === ModelType.IMAGEN_HQ 
                    ? 'bg-purple-500/10 border-purple-500/50 text-purple-200' 
                    : 'bg-black/20 border-white/5 text-gray-400 hover:bg-white/5'
                }`}
            >
                <Star className={`w-5 h-5 mb-1 ${model === ModelType.IMAGEN_HQ ? 'text-purple-400' : 'text-gray-500'}`} />
                <span className="text-sm font-medium">Imagen 3 HQ</span>
                <span className="text-[10px] opacity-60">Best Quality</span>
            </button>
            <button
                onClick={() => setModel(ModelType.GEMINI_FLASH)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    model === ModelType.GEMINI_FLASH 
                    ? 'bg-amber-500/10 border-amber-500/50 text-amber-200' 
                    : 'bg-black/20 border-white/5 text-gray-400 hover:bg-white/5'
                }`}
            >
                <Zap className={`w-5 h-5 mb-1 ${model === ModelType.GEMINI_FLASH ? 'text-amber-400' : 'text-gray-500'}`} />
                <span className="text-sm font-medium">Flash Image</span>
                <span className="text-[10px] opacity-60">Fastest</span>
            </button>
        </div>
      </div>

      {/* Aspect Ratio */}
      <div className={`space-y-2 transition-opacity duration-300 ${model === ModelType.GEMINI_FLASH ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'}`}>
         <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300 ml-1 flex items-center gap-2">
                <Ratio className="w-4 h-4" /> Aspect Ratio
            </label>
            {model === ModelType.GEMINI_FLASH && <span className="text-xs text-amber-500/80">Not available in Flash</span>}
         </div>
         <div className="grid grid-cols-5 gap-2">
            {Object.values(AspectRatio).map((ratio) => (
                <button
                    key={ratio}
                    onClick={() => {
                        setModel(ModelType.IMAGEN_HQ);
                        setAspectRatio(ratio);
                    }}
                    className={`p-2 rounded-lg border text-xs font-medium transition-all flex items-center justify-center ${
                        aspectRatio === ratio 
                        ? 'bg-white/10 border-white/40 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]' 
                        : 'bg-black/20 border-white/5 text-gray-500 hover:bg-white/5 hover:text-gray-300'
                    }`}
                >
                    {ratio}
                </button>
            ))}
         </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={!prompt.trim() || isGenerating}
        className={`mt-2 w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] ${
            !prompt.trim() || isGenerating
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-purple-900/20'
        }`}
      >
        {isGenerating ? (
            <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
            </>
        ) : (
            <>
                <Sparkles className="w-5 h-5" />
                Generate Image
            </>
        )}
      </button>
    </div>
  );
};