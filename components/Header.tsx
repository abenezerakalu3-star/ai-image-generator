import React from 'react';
import { Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-6 border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Lumina AI
            </h1>
            <p className="text-xs text-gray-500 tracking-wider uppercase">Image Synthesis Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Documentation</a>
            <div className="h-4 w-[1px] bg-white/10"></div>
            <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20">System Operational</span>
        </div>
      </div>
    </header>
  );
};
