import { useState } from 'react';
import { ProjectDetails, Step } from '@/types/documentation';
import { QuestionnaireState } from '@/types/questionnaire';
import { StepNavigation } from '@/components/StepNavigation';
import { ProjectDetailsForm } from '@/components/ProjectDetailsForm';
import { Questionnaire } from '@/components/Questionnaire';
import { defaultQuestionnaire } from '@/data/questionnaire';
import { useToast } from '@/hooks/use-toast';

const steps: Step[] = [
  {
    id: 'details',
    title: 'Project Details',
    description: 'Basic information about your project',
  },
  {
    id: 'questionnaire',
    title: 'Questionnaire',
    description: 'Detailed questions about your project',
  },
  {
    id: 'templates',
    title: 'Document Templates',
    description: 'Select documents to generate',
  },
  {
    id: 'generate',
    title: 'Generate',
    description: 'Generate your documentation',
  },
];

export default function Index() {
  const [currentStep, setCurrentStep] = useState<string>('details');
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(
    null
  );
  const [questionnaireAnswers, setQuestionnaireAnswers] =
    useState<QuestionnaireState | null>(null);
  const { toast } = useToast();

  const handleStepClick = (stepId: string) => {
    if (!projectDetails && stepId !== 'details') {
      toast({
        title: 'Complete Project Details',
        description: 'Please complete the project details before proceeding.',
        variant: 'destructive',
      });
      return;
    }

    if (stepId === 'templates' && !questionnaireAnswers) {
      toast({
        title: 'Complete Questionnaire',
        description: 'Please complete the questionnaire before proceeding.',
        variant: 'destructive',
      });
      return;
    }

    setCurrentStep(stepId);
  };

  const handleProjectDetailsSubmit = (details: ProjectDetails) => {
    setProjectDetails(details);
    setCurrentStep('questionnaire');
    toast({
      title: 'Project Details Saved',
      description: 'Your project details have been saved successfully.',
    });
  };

  const handleQuestionnaireComplete = (answers: QuestionnaireState) => {
    setQuestionnaireAnswers(answers);
    setCurrentStep('templates');
  };

  return (
    <div className="flex min-h-screen">
      <StepNavigation
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-4xl">
          {currentStep === 'details' && (
            <>
              <h1 className="mb-2 text-3xl font-bold">Project Details</h1>
              <p className="mb-8 text-muted-foreground">
                Let's start by gathering some basic information about your
                project.
              </p>
              <ProjectDetailsForm onSubmit={handleProjectDetailsSubmit} />
            </>
          )}
          {currentStep === 'questionnaire' && projectDetails && (
            <>
              <h1 className="mb-2 text-3xl font-bold">Project Questionnaire</h1>
              <p className="mb-8 text-muted-foreground">
                Please answer these questions to help us generate comprehensive
                documentation.
              </p>
              <Questionnaire
                sections={defaultQuestionnaire}
                onComplete={handleQuestionnaireComplete}
              />
            </>
          )}
          {currentStep === 'templates' &&
            projectDetails &&
            questionnaireAnswers && (
              <>
                <h1 className="mb-2 text-3xl font-bold">Document Templates</h1>
                <p className="mb-8 text-muted-foreground">
                  Select which documents you'd like to generate for your
                  project.
                </p>
                <DocumentGeneration
                  projectDetails={projectDetails}
                  questionnaireAnswers={questionnaireAnswers}
                />
              </>
            )}
        </div>
      </main>
    </div>
  );
}
