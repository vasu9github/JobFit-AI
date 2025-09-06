import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api.js';
import { UploadCloud, FileText, History, Bot, Loader2, CheckCircle, XCircle, FileUp, AlertTriangle } from 'lucide-react';


const Chat = () => {
    const { token } = useContext(AuthContext);

    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [resumeText, setResumeText] = useState('');
    const [fileName, setFileName] = useState('');
    const [isParsing, setIsParsing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;
        }
    }, []);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!token) return;
            try {
                const response = await api.get('/api/resume/history', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setHistory(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error("Error fetching history:", err);
                setError('Failed to load analysis history.');
            }
        };
        fetchHistory();
    }, [token]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setFileName(file.name);
        setIsParsing(true);
        setError('');
        setResumeText('');

        try {
            let text = '';
            if (file.type === 'application/pdf') {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    try {
                        const typedarray = new Uint8Array(e.target.result);
                        const pdf = await window.pdfjsLib.getDocument(typedarray).promise;
                        for (let i = 1; i <= pdf.numPages; i++) {
                            const page = await pdf.getPage(i);
                            const content = await page.getTextContent();
                            text += content.items.map(item => item.str).join(' ') + '\n';
                        }
                        setResumeText(text);
                    } catch (pdfError) {
                        setError('Could not read text from PDF file.');
                    } finally {
                        setIsParsing(false);
                    }
                };
                reader.readAsArrayBuffer(file);
            } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    window.mammoth.extractRawText({ arrayBuffer: e.target.result })
                        .then(result => {
                            setResumeText(result.value);
                            setIsParsing(false);
                        })
                        .catch(err => {
                            setError('Could not read text from DOCX file.');
                            setIsParsing(false);
                        });
                };
                reader.readAsArrayBuffer(file);
            } else {
                setError('Unsupported file type. Please upload a PDF or DOCX.');
                setIsParsing(false);
            }
        } catch (err) {
            setError('An error occurred while processing the file.');
            setIsParsing(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!resumeText || !jobDescription || !jobTitle) {
            setError('Please provide a job title, upload a resume, and paste the job description.');
            return;
        }
        setIsLoading(true);
        setError('');
        setAnalysisResult(null);
        try {
            const response = await api.post('/api/resume/analyze',
                { jobTitle, jobDescription, resumeText },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            setAnalysisResult(response.data);
            const historyResponse = await api.get('/api/resume/history', { headers: { 'Authorization': `Bearer ${token}` } });
            if (Array.isArray(historyResponse.data)) setHistory(historyResponse.data);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during analysis.');
        } finally {
            setIsLoading(false);
        }
    };
    
    // This function builds the UI for the analysis results.
    const renderAnalysisResult = () => {
        if (isLoading) {
            return (
                <div className="text-center p-8 flex flex-col justify-center items-center h-full min-h-[400px]">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto" />
                    <p className="mt-4 text-lg font-semibold text-gray-600">Our AI is analyzing your resume...</p>
                </div>
            );
        }

        if (!analysisResult) {
            return (
                <div className="text-center text-gray-500 p-8 flex flex-col justify-center items-center h-full min-h-[400px]">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-bold text-gray-800">Your Analysis Will Appear Here</h3>
                </div>
            );
        }
        
        const score = parseInt(analysisResult.matchScore, 10);
        const scoreColor = score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500';

        return (
            <div className="w-full animate-fade-in p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Analysis Complete!</h2>
                <div className="text-center mb-8">
                    <p className="text-gray-600">Your JobFit Score is:</p>
                    <p className={`text-6xl font-bold ${scoreColor}`}>{analysisResult.matchScore}</p>
                </div>
                <div className="space-y-6">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 flex items-center mb-2"><CheckCircle className="mr-2 h-5 w-5"/> Matching Keywords</h4>
                        <p className="text-sm text-green-700">{analysisResult.matchingKeywords.join(', ')}</p>
                    </div>
                     <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h4 className="font-semibold text-yellow-800 flex items-center mb-2"><XCircle className="mr-2 h-5 w-5"/> Missing Keywords</h4>
                        <p className="text-sm text-yellow-700">{analysisResult.missingKeywords.join(', ')}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 flex items-center mb-2"><Bot className="mr-2 h-5 w-5"/> AI Suggestions</h4>
                        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                           {analysisResult.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className='bg-gray-50 min-h-screen w-full flex flex-col items-center justify-center py-20 px-4'>
            <div className="w-full max-w-6xl">
                <header className='text-center mb-12'>
                    <h1 className='text-4xl md:text-5xl font-semibold text-gray-800'>Resume Analyzer</h1>
                    <p className="text-gray-500 mt-2">Get an instant, AI-powered analysis of your JobFit score.</p>
                </header>

                {error && (
                     <div className="w-full bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-8" role="alert">
                        <div className="flex">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                            <div>
                                <p className="font-bold">Error</p>
                                <p>{error}</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Main Content Area */}
                <div className='flex flex-col lg:flex-row items-start justify-center gap-8'>
                    
                    <div className='w-full lg:w-1/2 space-y-8'>
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                             <h2 className="text-xl font-semibold text-gray-700 mb-5 flex items-center"><FileUp className="mr-2 text-blue-500" /> Your Application Details</h2>
                             <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="job-title" className="block text-sm font-medium text-gray-600 mb-1">Job Title</label>
                                    <input id="job-title" type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="e.g., Senior Frontend Developer" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Your Resume</label>
                                    <label htmlFor="resume-upload" className="group cursor-pointer w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-gray-50 transition-colors">
                                        <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-blue-500" />
                                        <p className="mt-2 text-sm text-gray-500">{fileName ? 'File selected:' : 'Click to upload'}</p>
                                        <p className="text-xs text-gray-600 font-medium truncate w-full text-center px-2">{fileName || 'PDF or DOCX (MAX. 5MB)'}</p>
                                    </label>
                                    <input id="resume-upload" type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.docx" />
                                </div>
                                <div>
                                    <label htmlFor="job-description" className="block text-sm font-medium text-gray-600 mb-1">Job Description</label>
                                    <textarea id="job-description" rows="8" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste the job description here..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"></textarea>
                                </div>
                                <button type="submit" disabled={isLoading || isParsing} className="w-full flex items-center justify-center bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 active:scale-95 transition-transform duration-150 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed">
                                    {isLoading || isParsing ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Bot className="w-5 h-5 mr-2" />}
                                    {isParsing ? 'Reading File...' : isLoading ? 'Analyzing...' : 'Analyze My Resume'}
                                </button>
                            </form>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><History className="mr-2 text-blue-500" /> Analysis History</h3>
                             {history.length > 0 ? (
                                <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                                    {history.map(item => (
                                        <li key={item._id} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer" onClick={() => setAnalysisResult(item.analysisResult)}>
                                            <div>
                                                <p className="font-semibold text-gray-800">{item.jobTitle}</p>
                                                <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <span className={`font-bold text-lg ${parseInt(item.analysisResult.matchScore, 10) >= 80 ? 'text-green-500' : 'text-yellow-600'}`}>{item.analysisResult.matchScore}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500 text-center py-4">Your past analyses will appear here.</p>
                            )}
                        </div>
                    </div>
                    
                    {/* Result Portion */}
                    <div className='w-full lg:w-1/2'>
                        <div className="bg-white rounded-2xl shadow-md border border-gray-200 min-h-full lg:sticky top-28">
                             {renderAnalysisResult()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;

