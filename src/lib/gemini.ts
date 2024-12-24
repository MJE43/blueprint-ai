import { GoogleGenerativeAI } from "@google/generative-ai";

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
    this.model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig });
  }

  async generatePRD(projectDetails: any, answers: any): Promise<string> {
    const prompt = `Generate a comprehensive Product Requirements Document (PRD) for the following project:
    
    Project Details:
    ${JSON.stringify(projectDetails, null, 2)}
    
    Questionnaire Answers:
    ${JSON.stringify(answers, null, 2)}
    
    Please format the PRD with clear sections, bullet points, and proper markdown formatting.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating PRD:', error);
      throw new Error('Failed to generate PRD. Please try again.');
    }
  }
}