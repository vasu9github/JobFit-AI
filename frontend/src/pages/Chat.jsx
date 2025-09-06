import React from 'react';
import { UploadCloud, FileText, History, Bot, Loader2, CheckCircle, XCircle } from 'lucide-react';

const mockHistory = [
  { id: 1, title: 'Software Engineer @ Google', score: 88, date: '2023-10-27' },
  { id: 2, title: 'Product Manager @ Facebook', score: 72, date: '2023-10-25' },
  { id: 3, title: 'UX Designer @ Amazon', score: 91, date: '2023-10-22' },
];

const mockAiResponse = {
  score: 88,
  strengths: [
    'Excellent match for skills like React, Node.js, and TypeScript.',
    'Project experience with "Project X" is highly relevant to the role.',
    'Strong action verbs used throughout the resume.',
  ],
  weaknesses: [
    'Consider quantifying achievements in the "Lead Developer" role.',
    'The summary could be more tailored to the specific job title.',
    'Missing keywords like "CI/CD" and "Agile" from the job description.',
  ],
};

const Chat = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12 font-sans">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 font-roboto">Resume Analyzer</h1>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Upload your resume and paste a job description to get an instant analysis of your JobFit score and improvement tips.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <form className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><UploadCloud className="mr-2 text-blue-500" /> Upload & Describe</h2>
        
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Your Resume</label>
                <label htmlFor="resume-upload" className="group cursor-pointer w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-gray-50 transition-colors">
                  <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-blue-500" />
                  <p className="mt-2 text-sm text-gray-500">
                    Click to upload a file
                  </p>
                  <p className="text-xs text-gray-400">PDF, DOC, DOCX (MAX. 5MB)</p>
                </label>
                <input id="resume-upload" type="file" className="hidden" accept=".pdf,.doc,.docx" />
              </div>

              <div className="mt-4">
                <label htmlFor="job-description" className="block text-sm font-medium text-gray-600 mb-1">Job Description</label>
                <textarea
                  id="job-description"
                  rows="10"
                  placeholder="Paste the full job description here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full mt-6 flex items-center justify-center bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 active:scale-95 transition-transform duration-150 shadow-md"
              >
                <Bot className="w-5 h-5 mr-2" />
                Analyze My Resume
              </button>
            </form>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><History className="mr-2 text-blue-500" /> Analysis History</h3>
              <ul className="space-y-3">
                {mockHistory.map(item => (
                  <li key={item.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div>
                      <p className="font-semibold text-gray-800">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                    <span className={`font-bold text-lg ${item.score > 85 ? 'text-green-500' : 'text-yellow-600'}`}>{item.score}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 min-h-[400px] flex flex-col justify-center items-center">
            
              <div className="w-full animate-fade-in">
                 <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Analysis Complete!</h2>
                 <div className="text-center mb-8">
                   <p className="text-gray-600">Your JobFit Score is:</p>
                   <p className={`text-6xl font-bold ${mockAiResponse.score > 85 ? 'text-green-500' : 'text-yellow-600'}`}>{mockAiResponse.score}%</p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-green-50 p-4 rounded-lg">
                     <h4 className="font-semibold text-green-800 flex items-center mb-2"><CheckCircle className="mr-2"/> Strengths</h4>
                     <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                       {mockAiResponse.strengths.map((s, i) => <li key={i}>{s}</li>)}
                     </ul>
                   </div>
                   <div className="bg-red-50 p-4 rounded-lg">
                     <h4 className="font-semibold text-red-800 flex items-center mb-2"><XCircle className="mr-2"/> Areas for Improvement</h4>
                     <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                        {mockAiResponse.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                     </ul>
                   </div>
                 </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;


