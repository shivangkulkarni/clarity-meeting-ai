
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Users, CheckCircle, ArrowRight, Upload, Download, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  const mockSummarize = (text: string): MeetingSummary => {
    // Mock AI processing - in a real app, this would call an AI API
    const words = text.toLowerCase();
    
    return {
      highlights: [
        "Q4 revenue targets exceeded expectations by 15%",
        "New product launch scheduled for March 2025",
        "Customer satisfaction scores improved to 94%"
      ],
      actionItems: [
        { task: "Prepare marketing campaign for new product launch", assignee: "Sarah", priority: 'high' },
        { task: "Schedule follow-up meeting with engineering team", assignee: "Mike", priority: 'medium' },
        { task: "Update quarterly report with latest metrics", assignee: "Alex", priority: 'low' }
      ],
      decisions: [
        "Approved budget increase for marketing department",
        "Agreed to extend beta testing period by 2 weeks",
        "Decided to implement new customer feedback system"
      ],
      speakers: ["John (CEO)", "Sarah (Marketing)", "Mike (Engineering)", "Alex (Finance)"],
      topics: ["Revenue Performance", "Product Launch", "Customer Feedback", "Budget Planning"]
    };
  };

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

    // Simulate AI processing
    setTimeout(() => {
      const result = mockSummarize(transcript);
      setSummary(result);
      setIsProcessing(false);
      
      toast({
        title: "Summary Generated",
        description: "Your meeting notes have been successfully analyzed.",
      });
    }, 2000);
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
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
                    onClick={handleSummarize} 
                    disabled={isProcessing}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
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

            {/* Stats Overview */}
            {summary && (
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">Meeting Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">{summary.speakers.length}</div>
                      <div className="text-sm text-slate-600">Speakers</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">{summary.actionItems.length}</div>
                      <div className="text-sm text-slate-600">Action Items</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Summary Section */}
          <div className="space-y-6">
            {summary ? (
              <>
                {/* Export Actions */}
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex gap-2">
                      <Button onClick={handleExport} variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                      </Button>
                      <Button onClick={handleEmail} variant="outline" className="flex-1">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Summary
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Key Highlights */}
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900">Key Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {summary.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-slate-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Action Items */}
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900">Action Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {summary.actionItems.map((item, index) => (
                        <div key={index} className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <p className="text-slate-700 font-medium">{item.task}</p>
                              {item.assignee && (
                                <p className="text-sm text-slate-500 mt-1">Assigned to: {item.assignee}</p>
                              )}
                            </div>
                            <Badge className={getPriorityColor(item.priority)}>
                              {item.priority}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Decisions */}
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900">Key Decisions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {summary.decisions.map((decision, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{decision}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Speakers & Topics */}
                <div className="grid grid-cols-1 gap-6">
                  <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-900">Speakers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {summary.speakers.map((speaker, index) => (
                          <Badge key={index} variant="secondary" className="bg-slate-100 text-slate-700">
                            {speaker}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-900">Topics Discussed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {summary.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="border-blue-200 text-blue-700">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to Analyze</h3>
                  <p className="text-slate-600 mb-4">
                    Enter your meeting transcript to generate a comprehensive summary with highlights, action items, and key decisions.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-400">0</div>
                      <div className="text-sm text-slate-500">Highlights</div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-400">0</div>
                      <div className="text-sm text-slate-500">Action Items</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
