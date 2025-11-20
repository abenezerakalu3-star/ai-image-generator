import React, { useState, useEffect } from 'react';
import { GeneratedImage } from '../types';
import { Download, Maximize2, Share2, Check } from 'lucide-react';

interface ImageResultProps {
  image: GeneratedImage | null;
  isGenerating: boolean;
}

export const ImageResult: React.FC<ImageResultProps> = ({ image, isGenerating }) => {
  const [isCopied, setIsCopied] = useState(false);

  // Reset copy state when image changes
  useEffect(() => {
    setIsCopied(false);
  }, [image]);

  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `lumina-${image.id}-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = async () => {
      if(!image) return;
      // Just simulating copy action visual feedback, 
      // in a real app we might copy the blob to clipboard if supported
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
  };

  if (isGenerating) {
    return (
      <div className="w-full aspect-square md:aspect-video bg-[#131316] border border-white/5 rounded-2xl flex flex-col items-center justify-center text-center p-8 animate-pulse">
        <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 flex items-center justify-center animate-spin-slow">
            <div className="w-8 h-8 rounded-full bg-indigo-500/40 animate-ping" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Dreaming...</h3>
        <p className="text-gray-500 max-w-sm">Our AI is crafting your vision pixel by pixel. This usually takes 5-10 seconds.</p>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="w-full aspect-square md:aspect-video bg-[#131316] border border-white/5 border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-8">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <Maximize2 className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-300 mb-1">No Image Generated</h3>
        <p className="text-gray-500 text-sm">Enter a prompt and hit generate to see magic happen.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
        <div className="relative group w-full bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <img 
            src={image.url} 
            alt={image.prompt}
            className="w-full h-auto max-h-[70vh] object-contain mx-auto"
        />
        
        {/* Overlay Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between">
            <div className="max-w-[70%]">
                <p className="text-white text-sm font-medium line-clamp-2 drop-shadow-md">{image.prompt}</p>
                <div className="flex gap-2 mt-2">
                    <span className="text-[10px] bg-white/20 backdrop-blur text-white px-2 py-0.5 rounded uppercase tracking-wider">
                        {image.model === 'imagen-4.0-generate-001' ? 'IMAGEN 3' : 'FLASH'}
                    </span>
                    <span className="text-[10px] bg-white/20 backdrop-blur text-white px-2 py-0.5 rounded uppercase tracking-wider">
                        {image.aspectRatio}
                    </span>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                 <button 
                    onClick={handleCopy}
                    className="p-2 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 text-white transition-colors"
                    title="Copy to clipboard"
                >
                    {isCopied ? <Check className="w-5 h-5 text-green-400" /> : <Share2 className="w-5 h-5" />}
                </button>
                <button 
                    onClick={handleDownload}
                    className="p-2 rounded-full bg-white text-black hover:bg-gray-200 transition-colors shadow-lg"
                    title="Download"
                >
                    <Download className="w-5 h-5" />
                </button>
            </div>
        </div>
        </div>
    </div>
  );
};
