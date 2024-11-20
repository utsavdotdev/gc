"use client";
import React, { useState, useRef, useEffect } from "react";

type CommandOutput = {
  command: string;
  output: React.ReactNode;
  timestamp: number;
};

export function Terminal() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && command.trim()) {
      const cmd = command.trim().toLowerCase();
      let output: React.ReactNode;

      switch (cmd) {
        case "gc info":
          output = (
            <div className="py-2 animate-fadeIn">
              <p className="text-green-400 font-semibold">
                gc - Git Commit Suggestion CLI
              </p>
              <p className="text-gray-200 mt-2">
                A powerful CLI tool that helps you write concise, professional
                commit messages with AI assistance. Streamline your git workflow
                and maintain consistent commit message standards across your
                team.
              </p>
            </div>
          );
          break;

        case "gc features":
          output = (
            <div className="py-2 animate-fadeIn">
              <p className="text-green-400 font-semibold">Features of gc:</p>
              <ul className="mt-2 space-y-2 text-gray-200">
                <li>• Generate AI-assisted commit messages (gc new)</li>
                <li>• Smart clipboard integration for copying messages</li>
                <li>• Auto-suggestions while using git commit -m</li>
                <li>• Direct push to remote repositories</li>
                <li>• Customizable commit message templates</li>
                <li>• Support for conventional commits</li>
              </ul>
            </div>
          );
          break;

        case "gc commands":
          output = (
            <div className="py-2 animate-fadeIn">
              <p className="text-green-400 font-semibold">
                Available Commands:
              </p>
              <div className="mt-2 space-y-4">
                <div>
                  <p className="text-yellow-400">gc new</p>
                  <p className="text-gray-200 ml-4">
                    Generate AI-assisted commit messages based on your changes.
                  </p>
                </div>
                <div>
                  <p className="text-yellow-400">gc help</p>
                  <p className="text-gray-200 ml-4">
                    Display detailed help information for any command.
                  </p>
                </div>
                <div>
                  <p className="text-yellow-400">gc setup</p>
                  <p className="text-gray-200 ml-4">
                    Configure auto-suggestions for your terminal (Bash/Zsh).
                  </p>
                </div>
              </div>
            </div>
          );
          break;

        case "clear":
          setHistory([]);
          setCommand("");
          return;

        case "cls":
          setHistory([]);
          setCommand("");
          return;

        default:
          output = (
            <p className="text-red-400 animate-fadeIn">
              Command not found. Try 'gc info', 'gc features', or 'gc commands'
            </p>
          );
      }

      setHistory((prev) => [
        ...prev,
        { command: cmd, output, timestamp: Date.now() },
      ]);
      setCommand("");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-xl overflow-hidden">
      <div className="flex items-center px-4 py-2 bg-gray-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-gray-400 text-sm font-fira">Terminal</span>
        </div>
      </div>

      <div
        ref={terminalRef}
        className="p-4 h-[400px] overflow-y-auto font-fira text-sm terminal-scroll"
      >
        {history.map(({ command, output, timestamp }) => (
          <div key={timestamp} className="mb-4">
            <div className="flex items-center text-gray-400">
              <span className="text-green-400">➜</span>
              <span className="text-blue-400 ml-2">~/</span>
              <span className="ml-2">{command}</span>
            </div>
            <div className="mt-2 ml-4">{output}</div>
          </div>
        ))}
        <div className="flex items-center text-gray-400">
          <span className="text-green-400">➜</span>
          <span className="text-blue-400 ml-2">~/</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 ml-2 bg-transparent outline-none"
            placeholder="Type a command..."
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}

export default Terminal;
