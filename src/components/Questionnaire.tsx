import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  QuestionnaireSection,
  QuestionnaireState,
} from '@/types/questionnaire';
import { useForm } from 'react-hook-form';

interface QuestionnaireProps {
  sections: QuestionnaireSection[];
  onComplete: (answers: QuestionnaireState) => void;
}

export function Questionnaire({ sections, onComplete }: QuestionnaireProps) {
  const { toast } = useToast();
  const form = useForm<QuestionnaireState>();
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id);

  const handleSubmit = (data: QuestionnaireState) => {
    // Validate required fields
    const missingFields = sections
      .flatMap((section) => section.questions)
      .filter((q) => q.required && !data[q.id])
      .map((q) => q.text);

    if (missingFields.length > 0) {
      toast({
        title: 'Missing Required Fields',
        description: `Please fill in all required fields: ${missingFields.join(', ')}`,
        variant: 'destructive',
      });
      return;
    }

    onComplete(data);
    toast({
      title: 'Questionnaire Completed',
      description: 'Your answers have been saved successfully.',
    });
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'text':
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {question.text} {question.required && '*'}
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your answer" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'multiline':
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {question.text} {question.required && '*'}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter your detailed response"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'select':
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {question.text} {question.required && '*'}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {question.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'radio':
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {question.text} {question.required && '*'}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {question.options?.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option}
                          id={`${question.id}-${option}`}
                        />
                        <label htmlFor={`${question.id}-${option}`}>
                          {option}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Accordion
          type="single"
          collapsible
          value={activeSection}
          onValueChange={setActiveSection}
          className="w-full"
        >
          {sections.map((section) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="text-lg font-semibold">
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p className="mb-4 text-muted-foreground">
                  {section.description}
                </p>
                {section.questions.map((question) => (
                  <div key={question.id} className="mb-6">
                    {renderQuestion(question)}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </form>
    </Form>
  );
}
