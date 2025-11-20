import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { ImageResult } from './components/ImageResult';
import { Gallery } from './components/Gallery';
import { generateImage } from './services/geminiService';
import { AspectRatio, GeneratedImage, ModelType } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState<ModelType>(ModelType.IMAGEN_HQ);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.SQUARE);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const imageUrl = await generateImage(prompt, model, aspectRatio);
      
      const newImage: GeneratedImage = {
        id: crypto.randomUUID(),
        url: imageUrl,
        prompt,
        model,
        aspectRatio,
        timestamp: Date.now(),
      };

      setCurrentImage(newImage);
      setHistory(prev => [...prev, newImage]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong during generation.');
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, model, aspectRatio]);

  const handleSelectHistory = (image: GeneratedImage) => {
    setCurrentImage(image);
    // Optionally set prompt/settings to match history item
    setPrompt(image.prompt);
    setModel(image.model);
    setAspectRatio(image.aspectRatio);
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Controls */}
        <section className="w-full lg:w-1/3 flex-shrink-0 space-y-6">
           <div className="lg:sticky lg:top-28">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-white mb-1">Create</h2>
                <p className="text-gray-400 text-sm">Turn your words into visual reality.</p>
              </div>
              
              <Controls
                prompt={prompt}
                setPrompt={setPrompt}
                aspectRatio={aspectRatio}
                setAspectRatio={setAspectRatio}
                model={model}
                setModel={setModel}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />

              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-2">
                  <span className="font-bold">Error:</span> {error}
                </div>
              )}
           </div>
        </section>

        {/* Right Column: Result & Gallery */}
        <section className="w-full lg:w-2/3 flex flex-col min-w-0">
           <ImageResult 
             image={currentImage} 
             isGenerating={isGenerating} 
           />

           <Gallery 
             images={history} 
             onSelect={handleSelectHistory} 
           />
        </section>

      </main>
      
      <footer className="py-8 border-t border-white/5 text-center text-gray-600 text-xs">
         <p>© {new Date().getFullYear()} Lumina AI. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
