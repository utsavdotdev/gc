import React from "react";
import { Github, Terminal as TerminalIcon } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 backdrop-blur-sm flex justify-center">
      <div className="w-full md:w-[80%] transition-all duration-300 bg-gray-900/90 rounded-2xl px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-800/50 rounded-xl">
              <TerminalIcon className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-white font-semibold text-lg">gc</span>
          </div>
          <Link
            href="https://github.com/utsavdotdev/gc"
            target="_blank"
            className="inline-flex items-center px-4 py-2 bg-gray-800/50 rounded-xl transition-colors duration-200 text-white hover:bg-gray-800"
          >
            <Github className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">View on GitHub</span>
            <span className="sm:hidden">GitHub</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
