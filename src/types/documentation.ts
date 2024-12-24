export type ProjectType = 'web' | 'mobile' | 'desktop' | 'other';

export interface ProjectDetails {
  name: string;
  description: string;
  type: ProjectType;
  objectives: string[];
}

export interface QuestionnaireSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'multiline' | 'select' | 'multiselect';
  options?: string[];
  required: boolean;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  sections: string[];
}

export type StepId = 'details' | 'questionnaire' | 'templates' | 'generate';

export interface Step {
  id: StepId;
  title: string;
  description: string;
}