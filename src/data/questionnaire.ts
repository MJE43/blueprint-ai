import { QuestionnaireSection } from "@/types/questionnaire";

export const defaultQuestionnaire: QuestionnaireSection[] = [
  {
    id: "project-fundamentals",
    title: "Project Fundamentals",
    description: "Basic information about your project's goals and requirements",
    questions: [
      {
        id: "project-goals",
        text: "What are the main goals of this project?",
        type: "multiline",
        required: true,
      },
      {
        id: "target-audience",
        text: "Who is the target audience?",
        type: "text",
        required: true,
      },
      {
        id: "project-scale",
        text: "What is the expected scale of the project?",
        type: "select",
        options: ["Small (< 1000 users)", "Medium (1000-10000 users)", "Large (10000+ users)"],
        required: true,
      }
    ]
  },
  {
    id: "technical-requirements",
    title: "Technical Requirements",
    description: "Specific technical details and constraints for the project",
    questions: [
      {
        id: "deployment-environment",
        text: "Where will this application be deployed?",
        type: "radio",
        options: ["Cloud (AWS/GCP/Azure)", "On-premise", "Hybrid"],
        required: true,
      },
      {
        id: "tech-stack",
        text: "What is your preferred technology stack?",
        type: "multiline",
        required: true,
      },
      {
        id: "integration-requirements",
        text: "Are there any specific integration requirements?",
        type: "multiline",
        required: false,
      }
    ]
  }
];