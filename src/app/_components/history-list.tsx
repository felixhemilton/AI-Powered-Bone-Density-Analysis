'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { AnalysisResult } from '@/lib/types';
import { cn } from '@/lib/utils';
import { History, Inbox } from 'lucide-react';

interface HistoryListProps {
  history: AnalysisResult[];
  onSelect: (result: AnalysisResult) => void;
  currentResultId?: string;
}

export function HistoryList({ history, onSelect, currentResultId }: HistoryListProps) {
  const getRiskVariant = (riskLevel: string) => {
    const risk = riskLevel.toLowerCase();
    if (risk === 'high') return 'destructive';
    if (risk === 'moderate') return 'secondary';
    return 'default';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <History className="h-6 w-6"/>
            <CardTitle>Analysis History</CardTitle>
        </div>
        <CardDescription>Your past analysis results.</CardDescription>
      </CardHeader>
      <CardContent>
        {history.length > 0 ? (
          <div className="w-full overflow-auto" style={{maxHeight: '400px'}}>
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Risk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className={cn("cursor-pointer", item.id === currentResultId && "bg-accent")}
                >
                  <TableCell className="font-medium">{item.date}</TableCell>
                  <TableCell>{item.classification}</TableCell>
                  <TableCell>
                    <Badge variant={getRiskVariant(item.riskLevel)}>{item.riskLevel}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground bg-accent/50 rounded-lg">
            <Inbox className="w-12 h-12" />
            <p className="mt-4 text-sm">No history yet</p>
            <p className="text-xs">Your analysis results will appear here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
