import { GoogleGenAI, Modality } from "@google/genai";
import { ModelType, AspectRatio } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImage = async (
  prompt: string,
  model: ModelType,
  aspectRatio: AspectRatio
): Promise<string> => {
  try {
    if (model === ModelType.IMAGEN_HQ) {
      // High Quality Imagen Model
      const response = await ai.models.generateImages({
        model: model,
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: aspectRatio,
        },
      });

      const base64ImageBytes = response.generatedImages?.[0]?.image?.imageBytes;
      if (!base64ImageBytes) {
        throw new Error("No image data returned from Imagen.");
      }
      return `data:image/jpeg;base64,${base64ImageBytes}`;

    } else {
      // Gemini Flash Image (General/Fast)
      // Note: Flash Image model strictly supports only responseModalities in config for generation according to guidelines.
      // Aspect ratio is not directly supported in config for this model, so we rely on the prompt or crop later (simplified here to just generation).
      const response = await ai.models.generateContent({
        model: model,
        contents: {
          parts: [
            { text: prompt },
          ],
        },
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });

      const part = response.candidates?.[0]?.content?.parts?.[0];
      if (part && part.inlineData && part.inlineData.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      } else {
         throw new Error("No image data returned from Flash model.");
      }
    }
  } catch (error: any) {
    console.error("Image generation failed:", error);
    throw new Error(error.message || "Failed to generate image");
  }
};
