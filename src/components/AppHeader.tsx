
import React from 'react';
import { FileText } from "lucide-react";

const AppHeader = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Meeting Notes AI</h1>
              <p className="text-sm text-slate-600">Transform transcripts into actionable insights</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
