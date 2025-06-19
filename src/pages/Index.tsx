
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { summarizeWithAI } from "@/utils/aiService";
import AppHeader from "@/components/AppHeader";
import TranscriptInput from "@/components/TranscriptInput";
import MeetingStatsOverview from "@/components/MeetingStatsOverview";
import SummaryDisplay from "@/components/SummaryDisplay";

interface MeetingSummary {
  highlights: string[];
  actionItems: Array<{
    task: string;
    assignee?: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  decisions: string[];
  speakers: string[];
  topics: string[];
}

const Index = () => {
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState<MeetingSummary | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!transcript.trim()) {
      toast({
        title: "Error",
        description: "Please enter a meeting transcript to summarize.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    console.log("Processing transcript:", transcript.length, "characters");

    try {
      const result = await summarizeWithAI(transcript);
      setSummary(result);
      
      toast({
        title: "Summary Generated",
        description: "Your meeting notes have been successfully analyzed by AI.",
      });
    } catch (error) {
      console.error("Summarization error:", error);
      toast({
        title: "Summarization Failed",
        description: error instanceof Error ? error.message : "Failed to summarize the meeting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = () => {
    toast({
      title: "Export Ready",
      description: "Summary would be exported to PDF in a real implementation.",
    });
  };

  const handleEmail = () => {
    toast({
      title: "Email Sent",
      description: "Summary would be sent via email in a real implementation.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <AppHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <TranscriptInput
              transcript={transcript}
              setTranscript={setTranscript}
              onSummarize={handleSummarize}
              isProcessing={isProcessing}
            />

            {/* Stats Overview */}
            {summary && <MeetingStatsOverview summary={summary} />}
          </div>

          {/* Summary Section */}
          <div className="space-y-6">
            <SummaryDisplay
              summary={summary}
              onExport={handleExport}
              onEmail={handleEmail}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
