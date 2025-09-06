import { Star, BrainCircuit, FileText } from 'lucide-react'; 
import React from 'react';

const features = [
  {
    icon: <Star className="h-10 w-10 text-blue-600" />,
    title: 'Trusted by Users',
    description: 'With an average rating of 4.4 out of 5, developers and job seekers trust JobFit-AI to land their dream role.',
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-blue-600" />,
    title: 'AI-Powered Analysis',
    description: 'Our intelligent algorithms scan your resume against job descriptions to provide actionable, data-driven feedback.',
  },
  {
    icon: <FileText className="h-10 w-10 text-blue-600" />,
    title: 'Instant Feedback',
    description: 'No more waiting. Get an instant "JobFit Score" and detailed improvement suggestions in seconds.',
  },
];

const About = () => {
  return (

    <section id='about' className="bg-gradient-to-bl from-white to-sky-100 py-20">
      <div className="container mx-auto px-4">
        <div>
          <h1 className="mt-10 text-2xl md:text-4xl text-gray-800 text-center font-bold font-roboto">
            Why Choose JobFit-AI?
          </h1>
          <p className="mt-4 text-center text-gray-500 max-w-2xl mx-auto">
            We leverage cutting-edge technology to give you the competitive edge you need in today's job market.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 gap-8">
        
            {features.map((feature, index) => (
              <div 
                key={index}
                className="
                  flex flex-col items-center text-center 
                  bg-white 
                  p-8 
                  rounded-2xl 
                  shadow-md 
                  hover:shadow-xl hover:-translate-y-2 
                  transition-all duration-300 ease-in-out
                "
              >
                <div className="bg-blue-100 p-4 rounded-full mb-6">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;