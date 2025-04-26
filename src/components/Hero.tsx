
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden gradient-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Create Professional <span className="text-primary">Resumes</span> in Minutes
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                Our AI-powered resume builder helps you craft standout resumes with professionally designed templates tailored to your industry.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button asChild size="lg" className="px-8">
                  <Link to="/builder">
                    Create Your Resume
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/login">
                    Sign In
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block animate-fade-in animate-delay-200">
              <div className="relative">
                <div className="resume-shadow rounded-lg overflow-hidden border border-gray-100 bg-white transform rotate-1">
                  <img 
                    src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Resume Template" 
                    className="w-full"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 resume-shadow rounded-lg overflow-hidden border border-gray-100 bg-white transform -rotate-3">
                  <img 
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Resume Template" 
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
