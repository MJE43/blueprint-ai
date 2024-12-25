import { GoogleGenerativeAI } from '@google/generative-ai';

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

export class GeminiService {
  private model;

  constructor(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({
      model: 'gemini-pro',
      generationConfig,
    });
  }

  async generatePRD(projectDetails: any, prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating document:', error);
      throw new Error('Failed to generate document. Please try again.');
    }
  }
}
