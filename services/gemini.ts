
import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (prompt: string, context?: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: context || "You are an expert HR assistant at Nexus Corp. Help users with HR policies, drafting performance reviews, or generating job descriptions. Keep answers professional and helpful.",
      temperature: 0.7,
    },
  });

  return response.text;
};

export const generatePerformanceReview = async (employeeName: string, points: string) => {
  const prompt = `Generate a professional and constructive performance review for ${employeeName} based on these bullet points: ${points}. Use a professional tone suitable for a formal appraisal.`;
  return await getGeminiResponse(prompt);
};
