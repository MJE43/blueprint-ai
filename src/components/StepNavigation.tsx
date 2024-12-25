import { Step } from '@/types/documentation';
import { cn } from '@/lib/utils';

interface StepNavigationProps {
  steps: Step[];
  currentStep: string;
  onStepClick: (stepId: string) => void;
}

export function StepNavigation({
  steps,
  currentStep,
  onStepClick,
}: StepNavigationProps) {
  return (
    <div className="flex w-64 flex-col space-y-2 border-r bg-sidebar p-4">
      {steps.map((step, index) => (
        <button
          key={step.id}
          onClick={() => onStepClick(step.id)}
          className={cn(
            'flex items-center space-x-3 rounded-lg p-3 transition-colors',
            'hover:bg-sidebar-accent',
            currentStep === step.id &&
              'bg-sidebar-accent text-sidebar-accent-foreground'
          )}
        >
          <div
            className={cn(
              'flex h-6 w-6 items-center justify-center rounded-full text-sm',
              currentStep === step.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'
            )}
          >
            {index + 1}
          </div>
          <span>{step.title}</span>
        </button>
      ))}
    </div>
  );
}
