"use client";

import React, { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";

const COMMANDS = [
  { command: "yarn global add @utsavdotdev/gc", label: "Using yarn" },
  { command: "npm install -g @utsavdotdev/gc", label: "Using npm" },
];

export function InstallBox() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % COMMANDS.length);
        setIsTransitioning(false);
      }, 500);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(COMMANDS[currentIndex].command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 neo-shadow">
      <h2 className="text-lg font-semibold text-white mb-4">Quick Install</h2>
      <div className="relative overflow-hidden bg-gray-900/50 rounded-lg p-4">
        <div
          className={`transform transition-all duration-500 ease-in-out ${
            isTransitioning
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          <p className="text-gray-400 text-sm mb-2">
            {COMMANDS[currentIndex].label}
          </p>
          <div className="flex items-center justify-between">
            <code className="text-green-400 text-lg">
              {COMMANDS[currentIndex].command}
            </code>
            <button
              onClick={handleCopy}
              className="ml-4 p-2 text-gray-400 hover:text-white transition-colors relative group"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
              <span
                className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-xs rounded whitespace-nowrap transition-opacity ${
                  copied ? "opacity-100" : "opacity-0"
                }`}
              >
                Copied!
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstallBox;
