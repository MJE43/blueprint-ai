import { DocumentContext, DocumentPrompts, DocumentType, documentOrder } from "@/types/documentation";
import { GeminiService } from "./gemini";

export class DocumentService {
  private context: DocumentContext;
  private gemini: GeminiService;
  private documentPrompts: DocumentPrompts;

  constructor(apiKey: string, documentPrompts: DocumentPrompts) {
    this.gemini = new GeminiService(apiKey);
    this.documentPrompts = documentPrompts;
    this.context = {
      projectDetails: {} as any,
      questionnaire: {},
      generatedDocs: {},
    };
  }

  updateContext(updates: Partial<DocumentContext>) {
    this.context = {
      ...this.context,
      ...updates,
    };
  }

  private async generateDocument(type: DocumentType): Promise<string> {
    const prompt = this.documentPrompts[type];
    if (!prompt) {
      throw new Error(`No prompt found for document type: ${type}`);
    }

    const fullPrompt = `${prompt.systemPrompt}\n\n${prompt.userPrompt(this.context)}`;
    return await this.gemini.generatePRD(this.context.projectDetails, fullPrompt);
  }

  async generateDocuments(types: DocumentType[] = documentOrder): Promise<Record<string, string>> {
    const results: Record<string, string> = {};

    for (const type of types) {
      try {
        results[type] = await this.generateDocument(type);
        this.context.generatedDocs[type] = results[type];
      } catch (error) {
        console.error(`Error generating ${type} document:`, error);
        throw error;
      }
    }

    return results;
  }

  getContext(): DocumentContext {
    return this.context;
  }
}

export const formatProjectDetails = (details: any): string => {
  return Object.entries(details)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join('\n');
};

export const summarizeDoc = (doc: string): string => {
  return doc ? doc.substring(0, 500) + '...' : '';
};

export const summarizeAllDocs = (docs: Record<string, string>): string => {
  return Object.entries(docs)
    .map(([type, content]) => `${type}:\n${summarizeDoc(content)}`)
    .join('\n\n');
};