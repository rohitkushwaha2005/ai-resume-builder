
import { CheckCircle, Clock, Download, Layout } from "lucide-react";

const features = [
  {
    icon: <Layout className="h-8 w-8 text-primary" />,
    title: "Professional Templates",
    description: "Choose from a variety of professionally designed resume templates suitable for any industry.",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: "AI-Powered Suggestions",
    description: "Get smart content suggestions to improve your resume and stand out from other candidates.",
  },
  {
    icon: <Download className="h-8 w-8 text-primary" />,
    title: "Multiple Export Formats",
    description: "Download your resume in PDF, DOCX, or plain text format to suit different application requirements.",
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Quick & Easy",
    description: "Create a professional resume in minutes with our intuitive and user-friendly interface.",
  },
];

const Features = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose ResumeAI?</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our resume builder offers everything you need to create a professional resume that helps you land your dream job.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg border border-gray-100 hover:border-primary/20 transition-all duration-300 resume-shadow hover:shadow-lg"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
