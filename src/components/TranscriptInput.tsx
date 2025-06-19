
import React from 'react';
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
          
          <Button variant="outline" className="border-slate-200 hover:border-slate-300">
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TranscriptInput;
