
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResumeTemplates from "@/components/ResumeTemplates";
import ResumeForm from "@/components/ResumeForm";
import TemplatePreview from "@/components/TemplatePreview";
import { Button } from "@/components/ui/button";

const Builder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [isFullPreviewMode, setIsFullPreviewMode] = useState(false);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    experience: [
      {
        id: Date.now(),
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
      },
    ],
    education: [
      {
        id: Date.now() + 1,
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
      },
    ],
    skills: [
      { id: Date.now() + 2, name: "" },
      { id: Date.now() + 3, name: "" },
      { id: Date.now() + 4, name: "" },
    ],
  });

  // Toggle between form editing and full preview mode
  const toggleFullPreview = () => {
    setIsFullPreviewMode(!isFullPreviewMode);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isFullPreviewMode ? (
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Resume Preview</h2>
              <Button onClick={toggleFullPreview}>
                Back to Editor
              </Button>
            </div>
          ) : null}
          
          <div className={`grid grid-cols-1 ${isFullPreviewMode ? "" : "lg:grid-cols-12"} gap-8`}>
            {!isFullPreviewMode && (
              <>
                {/* Templates Column */}
                <div className="lg:col-span-3">
                  <ResumeTemplates 
                    selectedTemplate={selectedTemplate}
                    onSelectTemplate={setSelectedTemplate}
                  />
                </div>
                
                {/* Form Column */}
                <div className="lg:col-span-5">
                  <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
                </div>
              </>
            )}
            
            {/* Preview Column */}
            <div className={isFullPreviewMode ? "max-w-2xl mx-auto w-full" : "lg:col-span-4"}>
              <TemplatePreview 
                resumeData={resumeData} 
                selectedTemplate={selectedTemplate} 
                isFullPreview={isFullPreviewMode} 
                onTogglePreview={toggleFullPreview}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Builder;
