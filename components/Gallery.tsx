import React from 'react';
import { GeneratedImage } from '../types';
import { Clock } from 'lucide-react';

interface GalleryProps {
  images: GeneratedImage[];
  onSelect: (image: GeneratedImage) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ images, onSelect }) => {
  if (images.length === 0) return null;

  return (
    <div className="mt-12 w-full">
      <div className="flex items-center gap-2 mb-4 text-gray-400 px-1">
        <Clock className="w-4 h-4" />
        <span className="text-sm font-medium uppercase tracking-wider">Recent Generations</span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.slice().reverse().map((img) => (
            <button 
                key={img.id}
                onClick={() => onSelect(img)}
                className="group relative aspect-square rounded-xl overflow-hidden border border-white/5 bg-[#18181b] hover:border-purple-500/50 transition-all"
            >
                <img 
                    src={img.url} 
                    alt={img.prompt} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <p className="text-xs text-white line-clamp-1 text-left">{img.prompt}</p>
                </div>
            </button>
        ))}
      </div>
    </div>
  );
};
