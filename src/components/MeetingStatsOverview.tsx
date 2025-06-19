
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle } from "lucide-react";

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

interface MeetingStatsOverviewProps {
  summary: MeetingSummary;
}

const MeetingStatsOverview = ({ summary }: MeetingStatsOverviewProps) => {
  return (
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
  );
};

export default MeetingStatsOverview;
