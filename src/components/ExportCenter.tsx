import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, FileJson, FileCode, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface ExportData {
  conversations: any[];
  voiceRecordings: any[];
  generatedImages: any[];
  codeSnippets: any[];
}

export default function ExportCenter() {
  const [selectedData, setSelectedData] = useState({
    conversations: true,
    voiceRecordings: true,
    generatedImages: false,
    codeSnippets: true
  });
  const [format, setFormat] = useState<"json" | "markdown" | "csv">("json");
  const [isExporting, setIsExporting] = useState(false);

  const exportOptions = [
    {
      key: "conversations" as const,
      label: "Chat Conversations",
      description: "All AI chat history and responses",
      icon: FileText,
      count: 0 // Will be populated from localStorage
    },
    {
      key: "voiceRecordings" as const,
      label: "Voice Recordings",
      description: "Generated voice audio files",
      icon: FileCode,
      count: 0
    },
    {
      key: "generatedImages" as const,
      label: "Generated Images",
      description: "AI-created images and artwork",
      icon: FileJson,
      count: 0
    },
    {
      key: "codeSnippets" as const,
      label: "Code Snippets",
      description: "Generated code and architecture",
      icon: FileCode,
      count: 0
    }
  ];

  const gatherData = (): ExportData => {
    const data: ExportData = {
      conversations: [],
      voiceRecordings: [],
      generatedImages: [],
      codeSnippets: []
    };

    try {
      if (selectedData.voiceRecordings) {
        const voiceHistory = localStorage.getItem('voiceHistory');
        if (voiceHistory) {
          data.voiceRecordings = JSON.parse(voiceHistory);
        }
      }

      // Add other data sources as they're implemented
      // TODO: Gather conversation history
      // TODO: Gather generated images
      // TODO: Gather code snippets
    } catch (error) {
      console.error('Error gathering data:', error);
    }

    return data;
  };

  const exportAsJSON = (data: ExportData) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-data-export-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const exportAsMarkdown = (data: ExportData) => {
    let markdown = `# AI Data Export\n\nExported: ${new Date().toLocaleString()}\n\n`;

    if (data.conversations.length > 0) {
      markdown += `## Conversations (${data.conversations.length})\n\n`;
      // Add conversation formatting
    }

    if (data.voiceRecordings.length > 0) {
      markdown += `## Voice Recordings (${data.voiceRecordings.length})\n\n`;
      data.voiceRecordings.forEach((record: any, index: number) => {
        markdown += `### ${index + 1}. ${new Date(record.timestamp).toLocaleDateString()}\n`;
        markdown += `**Provider:** ${record.provider}\n`;
        markdown += `**Voice:** ${record.voice}\n`;
        markdown += `**Text:** ${record.text}\n\n`;
      });
    }

    if (data.codeSnippets.length > 0) {
      markdown += `## Code Snippets (${data.codeSnippets.length})\n\n`;
      // Add code formatting
    }

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-data-export-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const exportAsCSV = (data: ExportData) => {
    let csv = '';

    if (data.voiceRecordings.length > 0) {
      csv += 'Type,Provider,Voice,Text,Timestamp\n';
      data.voiceRecordings.forEach((record: any) => {
        csv += `Voice Recording,"${record.provider}","${record.voice}","${record.text.replace(/"/g, '""')}","${record.timestamp}"\n`;
      });
    }

    // Add other data types

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-data-export-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const data = gatherData();
      
      const hasData = Object.values(selectedData).some(v => v) && 
        (data.conversations.length > 0 || 
         data.voiceRecordings.length > 0 || 
         data.generatedImages.length > 0 || 
         data.codeSnippets.length > 0);

      if (!hasData) {
        toast.error('No data selected or available for export');
        return;
      }

      switch (format) {
        case 'json':
          exportAsJSON(data);
          break;
        case 'markdown':
          exportAsMarkdown(data);
          break;
        case 'csv':
          exportAsCSV(data);
          break;
      }

      toast.success('Export completed successfully!');
    } catch (error: any) {
      console.error('Export error:', error);
      toast.error(error.message || 'Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>
          Export your AI-generated content in various formats
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-3">Select Data to Export</h3>
            <div className="space-y-3">
              {exportOptions.map((option) => (
                <div
                  key={option.key}
                  className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    id={option.key}
                    checked={selectedData[option.key]}
                    onCheckedChange={(checked) =>
                      setSelectedData({ ...selectedData, [option.key]: !!checked })
                    }
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={option.key}
                      className="flex items-center gap-2 font-medium cursor-pointer"
                    >
                      <option.icon className="w-4 h-4" />
                      {option.label}
                      {option.count > 0 && (
                        <Badge variant="secondary">{option.count}</Badge>
                      )}
                    </label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Export Format</label>
            <Select value={format} onValueChange={(v: any) => setFormat(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">
                  <div className="flex items-center gap-2">
                    <FileJson className="w-4 h-4" />
                    JSON (Full data structure)
                  </div>
                </SelectItem>
                <SelectItem value="markdown">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Markdown (Human-readable)
                  </div>
                </SelectItem>
                <SelectItem value="csv">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4" />
                    CSV (Spreadsheet compatible)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleExport}
            disabled={isExporting || !Object.values(selectedData).some(v => v)}
            className="w-full"
          >
            {isExporting ? (
              <>
                <Download className="mr-2 h-4 w-4 animate-bounce" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </>
            )}
          </Button>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">Privacy First</p>
                <p className="text-muted-foreground">
                  All exports are generated locally in your browser. No data is sent to any server.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
