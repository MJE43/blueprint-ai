import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { DocumentService } from '@/lib/documentService';
import { documentPrompts } from '@/data/documentPrompts';

interface DocumentGenerationProps {
  projectDetails: any;
  questionnaireAnswers: Record<string, any>;
}

export function DocumentGeneration({
  projectDetails,
  questionnaireAnswers,
}: DocumentGenerationProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocs, setGeneratedDocs] = useState<Record<string, string>>(
    {}
  );
  const { toast } = useToast();

  const handleGenerate = async (selectedDocs: string[]) => {
    setIsGenerating(true);
    try {
      const documentService = new DocumentService(
        'YOUR-API-KEY',
        documentPrompts
      );
      documentService.updateContext({
        projectDetails,
        questionnaire: questionnaireAnswers,
        generatedDocs: {},
      });

      const docs = await documentService.generateDocuments(selectedDocs as any);
      setGeneratedDocs(docs);

      toast({
        title: 'Documents Generated',
        description: 'Your documents have been generated successfully',
      });
    } catch (error) {
      toast({
        title: 'Generation Failed',
        description: 'There was an error generating the documents',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <DocumentTemplates onGenerate={handleGenerate} />

      {isGenerating && (
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
          <p className="mt-2 text-sm text-muted-foreground">
            Generating documents...
          </p>
        </div>
      )}

      {Object.entries(generatedDocs).length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Generated Documents</h2>
          {Object.entries(generatedDocs).map(([type, content]) => (
            <div key={type} className="rounded-lg border p-4">
              <h3 className="mb-2 font-medium">
                {documentDescriptions[type].title}
              </h3>
              <div className="prose prose-sm max-w-none">{content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
