import { DocumentPrompts } from "@/types/documentation";
import { formatProjectDetails, summarizeDoc, summarizeAllDocs } from "@/lib/documentService";

export const documentPrompts: DocumentPrompts = {
  projectRequirements: {
    systemPrompt: `You are a senior technical product manager creating a Project Requirements Document for a web application. 
    Focus on providing clear, actionable specifications that can guide AI-assisted development.
    Use markdown formatting with clear hierarchical structure.`,
    
    userPrompt: (context) => `
    Create a comprehensive Project Requirements Document for:

    Project Details:
    ${formatProjectDetails(context.projectDetails)}

    Requirements Context:
    - Goals: ${context.questionnaire.mainGoals}
    - Target Audience: ${context.questionnaire.targetAudience}
    - Scale: ${context.questionnaire.expectedScale}
    - Technical Requirements: ${context.questionnaire.technicalRequirements}

    Organize the document into:
    1. Project Overview
    2. Core Features & Requirements
    3. User Stories
    4. Non-Functional Requirements
    5. Constraints & Dependencies
    6. Success Criteria`
  },
  techStack: {
    systemPrompt: `You are a technical architect creating a Technical Stack Document for a web application. 
    Provide a detailed breakdown of the technologies and tools to be used in the project.`,
    
    userPrompt: (context) => `
    Create a Technical Stack Document for:

    Project Details:
    ${formatProjectDetails(context.projectDetails)}

    Technology Choices:
    - Frontend Framework: ${context.questionnaire.frontendFramework}
    - Backend Framework: ${context.questionnaire.backendFramework}
    - Database: ${context.questionnaire.database}
    - Hosting: ${context.questionnaire.hosting}

    Include:
    1. Overview of the chosen technologies
    2. Rationale for selection
    3. Integration considerations`
  },
  backendStructure: {
    systemPrompt: `You are a backend developer creating a Backend Structure Document for a web application. 
    Outline the architecture and implementation details for the backend.`,
    
    userPrompt: (context) => `
    Create a Backend Structure Document for:

    Project Details:
    ${formatProjectDetails(context.projectDetails)}

    Architecture Overview:
    - API Endpoints: ${context.questionnaire.apiEndpoints}
    - Data Models: ${context.questionnaire.dataModels}
    - Security Measures: ${context.questionnaire.securityMeasures}

    Include:
    1. High-level architecture diagram
    2. Detailed descriptions of each component`
  },
  frontendGuidelines: {
    systemPrompt: `You are a frontend developer creating Frontend Guidelines for a web application. 
    Establish standards and patterns for frontend development.`,
    
    userPrompt: (context) => `
    Create Frontend Guidelines for:

    Project Details:
    ${formatProjectDetails(context.projectDetails)}

    Guidelines:
    - Component Structure: ${context.questionnaire.componentStructure}
    - Styling Conventions: ${context.questionnaire.stylingConventions}
    - Accessibility Standards: ${context.questionnaire.accessibilityStandards}

    Include:
    1. Best practices for component development
    2. Code examples`
  },
  fileStructure: {
    systemPrompt: `You are a project manager creating a File Structure Document for a web application. 
    Define the organization and naming conventions for project files.`,
    
    userPrompt: (context) => `
    Create a File Structure Document for:

    Project Details:
    ${formatProjectDetails(context.projectDetails)}

    File Organization:
    - Directory Structure: ${context.questionnaire.directoryStructure}
    - Naming Conventions: ${context.questionnaire.namingConventions}

    Include:
    1. Overview of the file organization
    2. Examples of file names and structures`
  },
  appFlow: {
    systemPrompt: `You are a UX designer creating an Application Flow Document for a web application. 
    Document user journeys and data flow.`,
    
    userPrompt: (context) => `
    Create an Application Flow Document for:

    Project Details:
    ${formatProjectDetails(context.projectDetails)}

    User Journeys:
    - Key User Flows: ${context.questionnaire.userFlows}
    - Data Flow Diagrams: ${context.questionnaire.dataFlows}

    Include:
    1. Visual representations of user journeys
    2. Descriptions of each flow`
  },
  systemPrompts: {
    systemPrompt: `You are a product manager creating a System Prompts Document for a web application. 
    Outline AI assistance prompts for development guidance.`,
    
    userPrompt: (context) => `
    Create a System Prompts Document for:

    Project Details:
    ${formatProjectDetails(context.projectDetails)}

    AI Assistance Prompts:
    - Development Guidance: ${context.questionnaire.developmentGuidance}
    - User Support: ${context.questionnaire.userSupport}

    Include:
    1. List of prompts for various scenarios
    2. Examples of usage`
  }
};
