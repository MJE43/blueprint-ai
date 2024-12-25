import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { documentOrder } from '@/types/documentation';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const documentDescriptions: Record<
  string,
  { title: string; description: string }
> = {
  projectRequirements: {
    title: 'Project Requirements Document',
    description:
      'Comprehensive overview of project specifications and requirements',
  },
  techStack: {
    title: 'Technical Stack Document',
    description: 'Detailed breakdown of technologies and tools to be used',
  },
  backendStructure: {
    title: 'Backend Structure Document',
    description: 'Architecture and implementation details for the backend',
  },
  frontendGuidelines: {
    title: 'Frontend Guidelines',
    description: 'Standards and patterns for frontend development',
  },
  fileStructure: {
    title: 'File Structure Document',
    description: 'Organization and naming conventions for project files',
  },
  appFlow: {
    title: 'Application Flow Document',
    description: 'User journeys and data flow documentation',
  },
  systemPrompts: {
    title: 'System Prompts Document',
    description: 'AI assistance prompts for development guidance',
  },
};

interface DocumentTemplatesProps {
  onGenerate: (selectedDocs: string[]) => void;
}

export function DocumentTemplates({ onGenerate }: DocumentTemplatesProps) {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const { toast } = useToast();

  const handleGenerateClick = () => {
    if (selectedDocs.length === 0) {
      toast({
        title: 'No documents selected',
        description: 'Please select at least one document to generate',
        variant: 'destructive',
      });
      return;
    }
    onGenerate(selectedDocs);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {documentOrder.map((docType) => (
          <Collapsible key={docType} className="rounded-lg border">
            <CollapsibleTrigger className="flex w-full items-center justify-between p-4 hover:bg-accent">
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={selectedDocs.includes(docType)}
                  onCheckedChange={(checked) => {
                    setSelectedDocs(
                      checked
                        ? [...selectedDocs, docType]
                        : selectedDocs.filter((d) => d !== docType)
                    );
                  }}
                />
                <span className="font-medium">
                  {documentDescriptions[docType].title}
                </span>
              </div>
              <ChevronDown className="h-5 w-5" />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 text-sm text-muted-foreground">
              {documentDescriptions[docType].description}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
      <Button onClick={handleGenerateClick} className="w-full">
        Generate Selected Documents
      </Button>
    </div>
  );
}
