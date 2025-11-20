export enum ModelType {
  IMAGEN_HQ = 'imagen-4.0-generate-001',
  GEMINI_FLASH = 'gemini-2.5-flash-image',
}

export enum AspectRatio {
  SQUARE = '1:1',
  PORTRAIT = '3:4',
  LANDSCAPE = '4:3',
  WIDE = '16:9',
  TALL = '9:16',
}

export interface GeneratedImage {
  id: string;
  url: string; // Data URL
  prompt: string;
  model: ModelType;
  aspectRatio: AspectRatio;
  timestamp: number;
}

export interface GenerationConfig {
  prompt: string;
  model: ModelType;
  aspectRatio: AspectRatio;
}
