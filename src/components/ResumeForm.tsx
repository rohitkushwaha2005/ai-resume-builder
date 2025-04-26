
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X } from "lucide-react";

interface ResumeFormProps {
  resumeData: any;
  setResumeData: (data: any) => void;
}

const ResumeForm = ({ resumeData, setResumeData }: ResumeFormProps) => {
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value,
      },
    });
  };

  const handleAddExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
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
    });
  };

  const handleExperienceChange = (id: number, field: string, value: string) => {
    const updatedExperience = resumeData.experience.map((exp: any) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setResumeData({ ...resumeData, experience: updatedExperience });
  };

  const handleRemoveExperience = (id: number) => {
    const updatedExperience = resumeData.experience.filter((exp: any) => exp.id !== id);
    setResumeData({ ...resumeData, experience: updatedExperience });
  };

  const handleAddEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: Date.now(),
          school: "",
          degree: "",
          startDate: "",
          endDate: "",
          location: "",
          description: "",
        },
      ],
    });
  };

  const handleEducationChange = (id: number, field: string, value: string) => {
    const updatedEducation = resumeData.education.map((edu: any) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setResumeData({ ...resumeData, education: updatedEducation });
  };

  const handleRemoveEducation = (id: number) => {
    const updatedEducation = resumeData.education.filter((edu: any) => edu.id !== id);
    setResumeData({ ...resumeData, education: updatedEducation });
  };

  const handleAddSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, { id: Date.now(), name: "" }],
    });
  };

  const handleSkillChange = (id: number, value: string) => {
    const updatedSkills = resumeData.skills.map((skill: any) =>
      skill.id === id ? { ...skill, name: value } : skill
    );
    setResumeData({ ...resumeData, skills: updatedSkills });
  };

  const handleRemoveSkill = (id: number) => {
    const updatedSkills = resumeData.skills.filter((skill: any) => skill.id !== id);
    setResumeData({ ...resumeData, skills: updatedSkills });
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-100 resume-shadow h-full">
      <h2 className="text-xl font-semibold mb-6">Resume Information</h2>
      
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={resumeData.personalInfo.name}
                onChange={handlePersonalInfoChange}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                name="title"
                value={resumeData.personalInfo.title}
                onChange={handlePersonalInfoChange}
                placeholder="Software Engineer"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={resumeData.personalInfo.email}
                onChange={handlePersonalInfoChange}
                placeholder="john.doe@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={resumeData.personalInfo.phone}
                onChange={handlePersonalInfoChange}
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={resumeData.personalInfo.location}
              onChange={handlePersonalInfoChange}
              placeholder="New York, NY"
            />
          </div>
          
          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              rows={4}
              value={resumeData.personalInfo.summary}
              onChange={handlePersonalInfoChange}
              placeholder="Write a brief summary of your professional background and goals..."
            />
          </div>
        </TabsContent>
        
        <TabsContent value="experience" className="space-y-6">
          {resumeData.experience.map((exp: any) => (
            <div key={exp.id} className="p-4 border rounded-lg relative">
              <button
                type="button"
                onClick={() => handleRemoveExperience(exp.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`company-${exp.id}`}>Company</Label>
                  <Input
                    id={`company-${exp.id}`}
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <Label htmlFor={`position-${exp.id}`}>Position</Label>
                  <Input
                    id={`position-${exp.id}`}
                    value={exp.position}
                    onChange={(e) => handleExperienceChange(exp.id, "position", e.target.value)}
                    placeholder="Job Title"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${exp.id}`}
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange(exp.id, "startDate", e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div>
                  <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${exp.id}`}
                    value={exp.endDate}
                    onChange={(e) => handleExperienceChange(exp.id, "endDate", e.target.value)}
                    placeholder="MM/YYYY or Present"
                  />
                </div>
                <div>
                  <Label htmlFor={`location-${exp.id}`}>Location</Label>
                  <Input
                    id={`location-${exp.id}`}
                    value={exp.location}
                    onChange={(e) => handleExperienceChange(exp.id, "location", e.target.value)}
                    placeholder="City, State"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor={`description-${exp.id}`}>Description</Label>
                <Textarea
                  id={`description-${exp.id}`}
                  rows={3}
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            className="w-full mt-2"
            onClick={handleAddExperience}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </TabsContent>
        
        <TabsContent value="education" className="space-y-6">
          {resumeData.education.map((edu: any) => (
            <div key={edu.id} className="p-4 border rounded-lg relative">
              <button
                type="button"
                onClick={() => handleRemoveEducation(edu.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`school-${edu.id}`}>School</Label>
                  <Input
                    id={`school-${edu.id}`}
                    value={edu.school}
                    onChange={(e) => handleEducationChange(edu.id, "school", e.target.value)}
                    placeholder="University Name"
                  />
                </div>
                <div>
                  <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                  <Input
                    id={`degree-${edu.id}`}
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                    placeholder="Bachelor of Science"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${edu.id}`}
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(edu.id, "startDate", e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div>
                  <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${edu.id}`}
                    value={edu.endDate}
                    onChange={(e) => handleEducationChange(edu.id, "endDate", e.target.value)}
                    placeholder="MM/YYYY or Present"
                  />
                </div>
                <div>
                  <Label htmlFor={`location-${edu.id}`}>Location</Label>
                  <Input
                    id={`location-${edu.id}`}
                    value={edu.location}
                    onChange={(e) => handleEducationChange(edu.id, "location", e.target.value)}
                    placeholder="City, State"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor={`description-${edu.id}`}>Description</Label>
                <Textarea
                  id={`description-${edu.id}`}
                  rows={3}
                  value={edu.description}
                  onChange={(e) => handleEducationChange(edu.id, "description", e.target.value)}
                  placeholder="Relevant coursework, achievements, etc."
                />
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            className="w-full mt-2"
            onClick={handleAddEducation}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill: any) => (
              <div
                key={skill.id}
                className="flex items-center bg-gray-100 rounded-full pl-3 pr-2 py-1"
              >
                <Input
                  className="border-0 bg-transparent p-0 m-0 h-auto text-sm w-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={skill.name}
                  onChange={(e) => handleSkillChange(skill.id, e.target.value)}
                  placeholder="Skill name"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill.id)}
                  className="ml-1 text-gray-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={handleAddSkill}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeForm;
