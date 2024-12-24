import { useState } from "react";
import { ProjectDetails, Step } from "@/types/documentation";
import { StepNavigation } from "@/components/StepNavigation";
import { ProjectDetailsForm } from "@/components/ProjectDetailsForm";
import { useToast } from "@/components/ui/use-toast";

const steps: Step[] = [
  {
    id: "details",
    title: "Project Details",
    description: "Basic information about your project",
  },
  {
    id: "questionnaire",
    title: "Questionnaire",
    description: "Detailed questions about your project",
  },
  {
    id: "templates",
    title: "Document Templates",
    description: "Select documents to generate",
  },
  {
    id: "generate",
    title: "Generate",
    description: "Generate your documentation",
  },
];

export default function Index() {
  const [currentStep, setCurrentStep] = useState<string>("details");
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null);
  const { toast } = useToast();

  const handleStepClick = (stepId: string) => {
    if (!projectDetails && stepId !== "details") {
      toast({
        title: "Complete Project Details",
        description: "Please complete the project details before proceeding.",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep(stepId);
  };

  const handleProjectDetailsSubmit = (details: ProjectDetails) => {
    setProjectDetails(details);
    setCurrentStep("questionnaire");
    toast({
      title: "Project Details Saved",
      description: "Your project details have been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen flex">
      <StepNavigation
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {currentStep === "details" && (
            <>
              <h1 className="text-3xl font-bold mb-2">Project Details</h1>
              <p className="text-muted-foreground mb-8">
                Let's start by gathering some basic information about your project.
              </p>
              <ProjectDetailsForm onSubmit={handleProjectDetailsSubmit} />
            </>
          )}
          {/* Other steps will be implemented in subsequent iterations */}
        </div>
      </main>
    </div>
  );
}
