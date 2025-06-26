
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, Download, Mail } from "lucide-react";

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

interface SummaryDisplayProps {
  summary: MeetingSummary | null;
  onExport: () => void;
  onEmail: () => void;
}

const SummaryDisplay = ({ summary, onExport, onEmail }: SummaryDisplayProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!summary) {
    return (
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to Analyze</h3>
          <p className="text-slate-600 mb-4">
            Enter your meeting transcript to generate a comprehensive AI-powered summary.
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
    );
  }

  return (
    <>
      {/* Export Actions */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Button onClick={onExport} variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button onClick={onEmail} variant="outline" className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Email Summary
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Highlights */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">Highlights</CardTitle>
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
  );
};

export default SummaryDisplay;
