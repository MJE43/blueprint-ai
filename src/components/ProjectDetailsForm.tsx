import { useState } from "react";
import { ProjectDetails, ProjectType } from "@/types/documentation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProjectDetailsFormProps {
  onSubmit: (details: ProjectDetails) => void;
}

export function ProjectDetailsForm({ onSubmit }: ProjectDetailsFormProps) {
  const [details, setDetails] = useState<ProjectDetails>({
    name: "",
    description: "",
    type: "web",
    objectives: [""],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  const addObjective = () => {
    setDetails(prev => ({
      ...prev,
      objectives: [...prev.objectives, ""],
    }));
  };

  const updateObjective = (index: number, value: string) => {
    const newObjectives = [...details.objectives];
    newObjectives[index] = value;
    setDetails(prev => ({
      ...prev,
      objectives: newObjectives,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <label className="text-sm font-medium">Project Name</label>
        <Input
          value={details.name}
          onChange={e => setDetails(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter project name"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Project Description</label>
        <Textarea
          value={details.description}
          onChange={e => setDetails(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe your project"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Project Type</label>
        <Select
          value={details.type}
          onValueChange={value => setDetails(prev => ({ ...prev, type: value as ProjectType }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="web">Web Application</SelectItem>
            <SelectItem value="mobile">Mobile Application</SelectItem>
            <SelectItem value="desktop">Desktop Application</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium">Project Objectives</label>
        {details.objectives.map((objective, index) => (
          <Input
            key={index}
            value={objective}
            onChange={e => updateObjective(index, e.target.value)}
            placeholder={`Objective ${index + 1}`}
            required
          />
        ))}
        <Button type="button" variant="outline" onClick={addObjective}>
          Add Objective
        </Button>
      </div>

      <Button type="submit" className="w-full">Continue</Button>
    </form>
  );
}