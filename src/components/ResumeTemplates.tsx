
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Layout } from "lucide-react";
import { cn } from "@/lib/utils";

// Resume template options
const templates = [
  {
    id: "professional",
    name: "Professional",
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Clean and professional design suitable for most industries",
  },
  {
    id: "modern",
    name: "Modern",
    thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Contemporary design with creative elements",
  },
  {
    id: "minimal",
    name: "Minimal",
    thumbnail: "https://images.unsplash.com/photo-1516383274235-5f42d6c6412d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Simple, clean design focusing on content",
  },
  {
    id: "executive",
    name: "Executive",
    thumbnail: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Premium design for senior professionals",
  },
];

interface ResumeTemplatesProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

const ResumeTemplates = ({ selectedTemplate, onSelectTemplate }: ResumeTemplatesProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-100 resume-shadow h-full">
      <div className="flex items-center mb-6">
        <Layout className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-xl font-semibold">Choose a Template</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={cn(
              "border rounded-lg overflow-hidden cursor-pointer transition-all duration-200",
              selectedTemplate === template.id
                ? "border-primary ring-2 ring-primary/20"
                : "border-gray-200 hover:border-gray-300"
            )}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="aspect-[3/4] relative">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
                <h3 className="text-white font-medium">{template.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeTemplates;
