export type ProjectType = 'web' | 'mobile' | 'desktop' | 'other';

export interface ProjectDetails {
  name: string;
  description: string;
  type: ProjectType;
  objectives: string[];
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'multiline' | 'select' | 'radio' | 'multiselect';
  options?: string[];
  required: boolean;
}

export interface QuestionnaireSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export type StepId = 'details' | 'questionnaire' | 'templates' | 'generate';

export interface Step {
  id: StepId;
  title: string;
  description: string;
}

export interface DocumentContext {
  projectDetails: ProjectDetails;
  questionnaire: Record<string, any>;
  generatedDocs: Record<string, string>;
}

export interface DocumentPrompt {
  systemPrompt: string;
  userPrompt: (context: DocumentContext) => string;
}

export interface DocumentPrompts {
  [key: string]: DocumentPrompt;
}

export const documentOrder = [
  'projectRequirements',
  'techStack',
  'backendStructure',
  'frontendGuidelines',
  'fileStructure',
  'appFlow',
  'systemPrompts'
] as const;

export type DocumentType = typeof documentOrder[number];