import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, ArrowRight } from "lucide-react";

interface TranscriptInputProps {
  transcript: string;
  setTranscript: (value: string) => void;
  onSummarize: () => void;
  isProcessing: boolean;
}

const TranscriptInput = ({ transcript, setTranscript, onSummarize, isProcessing }: TranscriptInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if it's a text file
    if (!file.type.includes('text') && !file.name.endsWith('.txt')) {
      alert('Please upload a text file (.txt) or a document with text content.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        setTranscript(content);
      }
    };
    reader.onerror = () => {
      alert('Error reading file. Please try again.');
    };
    reader.readAsText(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
          <Upload className="h-5 w-5 text-blue-600" />
          Meeting Transcript
        </CardTitle>
        <p className="text-sm text-slate-600">
          Paste your meeting transcript below or upload from Zoom, Teams, etc.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste your meeting transcript here... 

Example:
John: Welcome everyone to our Q4 review meeting. Let's start with the revenue numbers.
Sarah: The marketing campaign exceeded our targets by 15%. We saw significant growth in the tech sector.
Mike: From an engineering perspective, we're on track for the March product launch..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          className="min-h-[300px] resize-none border-slate-200 focus:border-blue-400 focus:ring-blue-400"
        />
        
        <div className="flex gap-3">
          <Button 
            onClick={onSummarize} 
            disabled={isProcessing}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing with AI...
              </>
            ) : (
              <>
                Summarize Meeting
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            className="border-slate-200 hover:border-slate-300"
            onClick={handleUploadClick}
            type="button"
          >
            <Upload className="h-4 w-4" />
          </Button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.doc,.docx,.pdf"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </CardContent>
    </Card>
  );
};

export default TranscriptInput;
