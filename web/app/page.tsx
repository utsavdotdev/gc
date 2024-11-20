import React from "react";
import { Terminal as TerminalIcon } from "lucide-react";
import InstallBox from "@/components/InstallBox";
import Terminal from "@/components/Terminal";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="container mx-auto min-h-screen flex flex-col lg:flex-row lg:items-center px-4 gap-8">
        {/* Left Section */}
        <div className="lg:w-1/2 pt-24 lg:pt-0">
          <div className="text-center lg:text-left">
            <div className="inline-block p-4 bg-gray-800/50 rounded-2xl neo-shadow mb-6">
              <TerminalIcon className="w-12 h-12 text-green-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Git Commit Suggestion CLI
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              AI-powered CLI to write better commit messages
            </p>
          </div>

          <div className="mb-12">
            <InstallBox />
          </div>

          <footer className="hidden lg:block text-center lg:text-left text-gray-400">
            <div className="flex gap-2">
              Made with 🔥 by
              <span>
                <Link
                  href="https://github.com/utsavdotdev"
                  className="hover:text-white transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @utsavdotdev
                </Link>
              </span>
            </div>
          </footer>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 pb-8 lg:pb-0">
          <div className="text-center mb-6">
            <p className="text-gray-300">
              Type{" "}
              <code className="bg-gray-800 px-2 py-1 rounded">gc info</code>,
              <code className="bg-gray-800 px-2 py-1 rounded">gc features</code>
              , or
              <code className="bg-gray-800 px-2 py-1 rounded">gc commands</code>
              to learn more
            </p>
          </div>
          <Terminal />
        </div>
      </div>
    </>
  );
}
