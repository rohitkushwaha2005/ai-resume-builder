
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf"; // Corrected import statement
import { saveAs } from "file-saver";
import { toast } from "sonner";

export const downloadAsPDF = async (resumeElementId: string, fileName: string = "resume") => {
  try {
    const element = document.getElementById(resumeElementId);
    if (!element) {
      toast.error("Could not find resume element to download");
      return;
    }

    toast.info("Preparing PDF download...");
    
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Calculate dimensions to fit the resume on PDF
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${fileName}.pdf`);
    
    toast.success("PDF downloaded successfully!");
  } catch (error) {
    console.error("Error generating PDF:", error);
    toast.error("Failed to download PDF. Please try again.");
  }
};

export const downloadAsDocx = async (resumeData: any, fileName: string = "resume") => {
  try {
    toast.info("Preparing Word document download...");
    
    // Create a simple text representation for DOCX
    let content = `${resumeData.personalInfo.name}\n`;
    content += `${resumeData.personalInfo.title}\n`;
    content += `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}\n\n`;
    
    if (resumeData.personalInfo.summary) {
      content += "PROFESSIONAL SUMMARY\n";
      content += `${resumeData.personalInfo.summary}\n\n`;
    }
    
    if (resumeData.experience.length > 0) {
      content += "WORK EXPERIENCE\n";
      resumeData.experience.forEach((exp: any) => {
        content += `${exp.position}, ${exp.company}\n`;
        content += `${exp.startDate} - ${exp.endDate || "Present"}, ${exp.location}\n`;
        content += `${exp.description}\n\n`;
      });
    }
    
    if (resumeData.education.length > 0) {
      content += "EDUCATION\n";
      resumeData.education.forEach((edu: any) => {
        content += `${edu.degree}, ${edu.school}\n`;
        content += `${edu.startDate} - ${edu.endDate || "Present"}, ${edu.location}\n`;
        content += `${edu.description}\n\n`;
      });
    }
    
    if (resumeData.skills.length > 0) {
      content += "SKILLS\n";
      const skillNames = resumeData.skills.map((skill: any) => skill.name).join(", ");
      content += `${skillNames}\n`;
    }
    
    // Create a Blob with the content
    const blob = new Blob([content], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    saveAs(blob, `${fileName}.docx`);
    
    toast.success("Word document downloaded successfully!");
  } catch (error) {
    console.error("Error generating DOCX:", error);
    toast.error("Failed to download Word document. Please try again.");
  }
};

export const downloadAsTxt = (resumeData: any, fileName: string = "resume") => {
  try {
    toast.info("Preparing text file download...");
    
    // Create a simple text representation
    let content = `${resumeData.personalInfo.name}\n`;
    content += `${resumeData.personalInfo.title}\n`;
    content += `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}\n\n`;
    
    if (resumeData.personalInfo.summary) {
      content += "PROFESSIONAL SUMMARY\n";
      content += `${resumeData.personalInfo.summary}\n\n`;
    }
    
    if (resumeData.experience.length > 0) {
      content += "WORK EXPERIENCE\n";
      resumeData.experience.forEach((exp: any) => {
        content += `${exp.position}, ${exp.company}\n`;
        content += `${exp.startDate} - ${exp.endDate || "Present"}, ${exp.location}\n`;
        content += `${exp.description}\n\n`;
      });
    }
    
    if (resumeData.education.length > 0) {
      content += "EDUCATION\n";
      resumeData.education.forEach((edu: any) => {
        content += `${edu.degree}, ${edu.school}\n`;
        content += `${edu.startDate} - ${edu.endDate || "Present"}, ${edu.location}\n`;
        content += `${edu.description}\n\n`;
      });
    }
    
    if (resumeData.skills.length > 0) {
      content += "SKILLS\n";
      const skillNames = resumeData.skills.map((skill: any) => skill.name).join(", ");
      content += `${skillNames}\n`;
    }
    
    // Create a Blob with the content
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${fileName}.txt`);
    
    toast.success("Text file downloaded successfully!");
  } catch (error) {
    console.error("Error generating TXT:", error);
    toast.error("Failed to download text file. Please try again.");
  }
};
