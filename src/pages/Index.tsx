
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        
        {/* Testimonials section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Loved by Job Seekers</h2>
              <p className="mt-4 text-xl text-gray-600">
                Join thousands who have successfully landed interviews with resumes created using ResumeAI.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-gray-100 resume-shadow">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                      <span className="text-gray-600 font-medium">
                        {String.fromCharCode(64 + i)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">User {i}</h4>
                      <p className="text-sm text-gray-500">Software Engineer</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "I created my resume in less than 30 minutes and got called for an interview the next day. 
                    The templates are professional and the AI suggestions were incredibly helpful."
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to action */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Create Your Professional Resume?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of job seekers who are landing their dream jobs with resumes built using ResumeAI.
            </p>
            <a
              href="/builder"
              className="inline-block bg-white text-primary font-medium py-3 px-8 rounded-md hover:bg-gray-100 transition duration-200"
            >
              Get Started Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
