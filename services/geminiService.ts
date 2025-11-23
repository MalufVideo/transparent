import { GoogleGenAI, Type } from "@google/genai";
import { AestheticResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAestheticText = async (): Promise<AestheticResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Generate a short, aesthetically pleasing, profound, or poetic sentence, haiku, or quote about light, design, nature, or the human experience. It should be visually evocative. Include an optional author if it is a real quote, otherwise leave author blank.',
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: {
              type: Type.STRING,
              description: 'The poetic or aesthetic text.',
            },
            author: {
              type: Type.STRING,
              description: 'The author of the quote, if applicable.',
              nullable: true,
            },
          },
          required: ['text'],
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No text returned from API");
    }

    return JSON.parse(jsonText) as AestheticResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "Beauty is the illumination of your soul.",
      author: "Lumina"
    };
  }
};