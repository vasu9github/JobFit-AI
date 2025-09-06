import React from "react";
import { Linkedin, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white">JobFit</h2>
          <p className="text-sm text-gray-400">
            JobFit-AI • Your Personal Career Co-pilot
          </p>
        </div>

        <div className="flex space-x-6">
          <a href="www.linkedin.com/in/vasu-dhiman-04159a273" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <Linkedin size={22} />
          </a>
          <a href="https://x.com/vasudhiman105" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <Twitter size={22} />
          </a>
          <a href="https://github.com/vasu9github" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <Github size={22} />
          </a>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-4">
        © {new Date().getFullYear()} JobFit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
