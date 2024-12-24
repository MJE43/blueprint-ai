import { Step } from "@/types/documentation";
import { cn } from "@/lib/utils";

interface StepNavigationProps {
  steps: Step[];
  currentStep: string;
  onStepClick: (stepId: string) => void;
}

export function StepNavigation({ steps, currentStep, onStepClick }: StepNavigationProps) {
  return (
    <div className="flex flex-col space-y-2 w-64 p-4 bg-sidebar border-r">
      {steps.map((step, index) => (
        <button
          key={step.id}
          onClick={() => onStepClick(step.id)}
          className={cn(
            "flex items-center space-x-3 p-3 rounded-lg transition-colors",
            "hover:bg-sidebar-accent",
            currentStep === step.id && "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
        >
          <div className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center text-sm",
            currentStep === step.id ? "bg-primary text-primary-foreground" : "bg-muted"
          )}>
            {index + 1}
          </div>
          <span>{step.title}</span>
        </button>
      ))}
    </div>
  );
}