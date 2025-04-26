
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { downloadAsPDF, downloadAsDocx, downloadAsTxt } from "@/utils/resumeDownload";

interface TemplatePreviewProps {
  resumeData: any;
  selectedTemplate: string;
  isFullPreview?: boolean;
  onTogglePreview?: () => void;
}

const TemplatePreview = ({ 
  resumeData, 
  selectedTemplate, 
  isFullPreview = false, 
  onTogglePreview 
}: TemplatePreviewProps) => {
  const { toast } = useToast();
  const [downloading, setDownloading] = useState(false);
  
  const handleDownload = async (format: string) => {
    if (downloading) return;
    
    setDownloading(true);
    try {
      switch (format) {
        case "PDF":
          await downloadAsPDF("resume-preview", `${resumeData.personalInfo.name || "resume"}-${selectedTemplate}`);
          break;
        case "DOCX":
          await downloadAsDocx(resumeData, `${resumeData.personalInfo.name || "resume"}-${selectedTemplate}`);
          break;
        case "TXT":
          downloadAsTxt(resumeData, `${resumeData.personalInfo.name || "resume"}-${selectedTemplate}`);
          break;
        default:
          toast({
            title: "Unsupported format",
            description: `${format} format is not supported yet.`,
          });
      }
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: "There was an error generating your resume. Please try again.",
      });
    } finally {
      setDownloading(false);
    }
  };
  
  // Different template styles
  const getTemplateStyles = () => {
    switch (selectedTemplate) {
      case "modern":
        return "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-primary";
      case "minimal":
        return "bg-white";
      case "executive":
        return "bg-gray-50 border-t-4 border-primary";
      case "professional":
      default:
        return "bg-white";
    }
  };
  
  const getHeaderStyles = () => {
    switch (selectedTemplate) {
      case "modern":
        return "bg-gradient-to-r from-primary/10 to-primary/5 p-6";
      case "minimal":
        return "border-b p-6";
      case "executive":
        return "bg-gray-800 text-white p-8";
      case "professional":
      default:
        return "bg-primary text-white p-6";
    }
  };

  // Function to check if the resume has minimum required data
  const hasMinimumData = () => {
    return resumeData.personalInfo.name.trim() !== "" || 
           resumeData.experience.some((exp: any) => exp.company.trim() !== "") ||
           resumeData.education.some((edu: any) => edu.school.trim() !== "");
  };
  
  return (
    <div className={`bg-white p-6 rounded-lg border border-gray-100 resume-shadow h-full flex flex-col ${isFullPreview ? "shadow-lg" : ""}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Preview</h2>
        
        <div className="flex gap-2">
          {!isFullPreview && onTogglePreview && (
            <Button 
              variant="outline" 
              onClick={onTogglePreview}
              disabled={!hasMinimumData()}
              title={!hasMinimumData() ? "Add some content first" : "View full preview"}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button disabled={downloading || !hasMinimumData()}>
                <Download className="h-4 w-4 mr-2" />
                {downloading ? "Processing..." : "Download"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleDownload("PDF")}>
                PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload("DOCX")}>
                Word (DOCX)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload("TXT")}>
                Text (TXT)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className={`flex-grow overflow-auto ${isFullPreview ? "max-h-[calc(100vh-200px)]" : ""}`}>
        <div id="resume-preview" className={`w-full min-h-full shadow-md ${getTemplateStyles()}`}>
          {/* Header */}
          <header className={getHeaderStyles()}>
            <h1 className="text-2xl font-bold mb-1">
              {resumeData.personalInfo.name || "Your Name"}
            </h1>
            <p className="text-lg mb-3">{resumeData.personalInfo.title || "Professional Title"}</p>
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {resumeData.personalInfo.email && (
                <div>{resumeData.personalInfo.email}</div>
              )}
              {resumeData.personalInfo.phone && (
                <div>{resumeData.personalInfo.phone}</div>
              )}
              {resumeData.personalInfo.location && (
                <div>{resumeData.personalInfo.location}</div>
              )}
            </div>
          </header>
          
          {/* Content */}
          <div className="p-6">
            {/* Summary */}
            {resumeData.personalInfo.summary && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2 border-b pb-1">Professional Summary</h2>
                <p>{resumeData.personalInfo.summary}</p>
              </div>
            )}
            
            {/* Work Experience */}
            {resumeData.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2 border-b pb-1">Work Experience</h2>
                {resumeData.experience.map((exp: any) => (
                  <div key={exp.id} className="mb-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{exp.position || "Position"}</h3>
                      <span className="text-sm text-gray-600">
                        {exp.startDate && exp.startDate + " - " + (exp.endDate || "Present")}
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <p>{exp.company || "Company"}</p>
                      <span className="text-sm text-gray-600">{exp.location}</span>
                    </div>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
            
            {/* Education */}
            {resumeData.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2 border-b pb-1">Education</h2>
                {resumeData.education.map((edu: any) => (
                  <div key={edu.id} className="mb-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{edu.school || "School Name"}</h3>
                      <span className="text-sm text-gray-600">
                        {edu.startDate && edu.startDate + " - " + (edu.endDate || "Present")}
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <p>{edu.degree || "Degree"}</p>
                      <span className="text-sm text-gray-600">{edu.location}</span>
                    </div>
                    <p className="text-sm mt-1">{edu.description}</p>
                  </div>
                ))}
              </div>
            )}
            
            {/* Skills */}
            {resumeData.skills.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-2 border-b pb-1">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill: any) => (
                    <span
                      key={skill.id}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedTemplate === "executive"
                          ? "bg-gray-800 text-white"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {skill.name || "Skill"}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
