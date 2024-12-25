export type QuestionType =
  | 'text'
  | 'multiline'
  | 'select'
  | 'radio'
  | 'multiselect';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
  description?: string;
}

export interface QuestionnaireSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface QuestionnaireState {
  [questionId: string]: string | string[];
}
