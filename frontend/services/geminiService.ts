
import { GoogleGenAI } from "@google/genai";

export const getStyleAdvice = async (userPrompt: string, availableCategories: string[]) => {
  // Fix: Initialize GoogleGenAI inside the function and use process.env.API_KEY directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a world-class men's fashion stylist at Elysian Men.
      The store sells: ${availableCategories.join(', ')}.
      The user is asking: "${userPrompt}"
      
      Help them build a complete outfit. For example, pair Selvedge Indigo Denim with a Pique Knit Polo and Heritage Leather Backpack.
      Keep your advice concise, sophisticated, and helpful. Use our elegant brand tone. Maximum 2 sentences.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a recommendation right now. How else can I help you with your style today?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our style assistant is currently offline. Please try again in a moment.";
  }
};
