import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-t-[#f3da72] text-white py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
    
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <span className="text-sm">
            &copy; {new Date().getFullYear()} <strong>PulseCheck</strong>. All rights reserved.
          </span>
        </div>

       
        <div className="flex items-center space-x-6">
          <a
            href="https://x.com/prynsshh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:underline text-white hover:text-[#f3da72]"
          >
            Contact Us
          </a>
          <a
            href="https://github.com/prynsh/PulseCheck"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-[#f3da72] hover:underline"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
