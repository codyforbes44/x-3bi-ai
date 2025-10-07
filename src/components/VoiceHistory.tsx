import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Trash2, Download, Mic, Calendar } from "lucide-react";
import { toast } from "sonner";

interface VoiceRecord {
  id: string;
  text: string;
  audioUrl: string;
  voice: string;
  provider: string;
  timestamp: Date;
  duration?: number;
}

export default function VoiceHistory() {
  const [records, setRecords] = useState<VoiceRecord[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('voiceHistory');
    if (saved) {
      const parsed = JSON.parse(saved);
      setRecords(parsed.map((r: any) => ({
        ...r,
        timestamp: new Date(r.timestamp)
      })));
    }
  }, []);

  const saveToStorage = (newRecords: VoiceRecord[]) => {
    localStorage.setItem('voiceHistory', JSON.stringify(newRecords));
    setRecords(newRecords);
  };

  const handlePlay = (record: VoiceRecord) => {
    if (playingId === record.id) {
      audio?.pause();
      setPlayingId(null);
      return;
    }

    if (audio) {
      audio.pause();
    }

    const newAudio = new Audio(record.audioUrl);
    newAudio.onended = () => setPlayingId(null);
    newAudio.play();
    setAudio(newAudio);
    setPlayingId(record.id);
  };

  const handleDelete = (id: string) => {
    const newRecords = records.filter(r => r.id !== id);
    saveToStorage(newRecords);
    toast.success('Recording deleted');
  };

  const handleDownload = async (record: VoiceRecord) => {
    try {
      const response = await fetch(record.audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `voice-${record.timestamp.getTime()}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Download started');
    } catch (error) {
      toast.error('Failed to download');
    }
  };

  const groupByDate = () => {
    const groups: { [key: string]: VoiceRecord[] } = {};
    records.forEach(record => {
      const date = record.timestamp.toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(record);
    });
    return groups;
  };

  const grouped = groupByDate();

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardDescription>
              Play, download, or manage your voice recordings
            </CardDescription>
          </div>
          <Badge variant="secondary">{records.length} recordings</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {Object.keys(grouped).length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Mic className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No voice recordings yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(grouped).map(([date, dateRecords]) => (
                <div key={date}>
                  <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{date}</span>
                  </div>
                  <div className="space-y-2">
                    {dateRecords.map((record) => (
                      <Card key={record.id} className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {record.provider}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {record.voice}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {record.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-sm line-clamp-2">{record.text}</p>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handlePlay(record)}
                            >
                              {playingId === record.id ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDownload(record)}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(record.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

// Export utility function to add records
export const addVoiceRecord = (record: Omit<VoiceRecord, 'id' | 'timestamp'>) => {
  const saved = localStorage.getItem('voiceHistory');
  const existing = saved ? JSON.parse(saved) : [];
  const newRecord = {
    ...record,
    id: crypto.randomUUID(),
    timestamp: new Date()
  };
  const updated = [newRecord, ...existing].slice(0, 100); // Keep last 100
  localStorage.setItem('voiceHistory', JSON.stringify(updated));
};
