import { useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAISidebar } from '@/hooks/useAISidebar';
import { useAISidebarContext } from '@/contexts/AISidebarContext';
import { getFeatureContext } from '@/utils/aiSidebarContext';
import { AISidebarHeader } from './AISidebarHeader';
import { AISidebarContextPanel } from './AISidebarContextPanel';
import { AISidebarChat } from './AISidebarChat';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function AISidebar() {
  const { state, isCollapsed, isCompact, isExpanded, toggle, close, open } = useAISidebar();
  const { currentFeature } = useAISidebarContext();
  const context = getFeatureContext(currentFeature);
  const isMobile = useIsMobile();
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');

  const handlePromptClick = useCallback((prompt: string) => {
    setSelectedPrompt(prompt);
  }, []);

  const handleClearPrompt = useCallback(() => {
    setSelectedPrompt('');
  }, []);

  // Mobile floating button + sheet
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90"
          >
            <Sparkles className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-[400px] p-0">
          <div className="flex flex-col h-full">
            <AISidebarHeader
              isCollapsed={false}
              isCompact={true}
              isExpanded={false}
              onToggle={() => {}}
              onClose={() => {}}
            />
            <Tabs defaultValue="chat" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-2 m-2">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="help">Help</TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="flex-1 mt-0">
                <AISidebarChat
                  context={context}
                  initialPrompt={selectedPrompt}
                  onClearPrompt={handleClearPrompt}
                  height="h-[calc(100vh-180px)]"
                />
              </TabsContent>
              <TabsContent value="help" className="flex-1 mt-0 overflow-y-auto">
                <AISidebarContextPanel
                  context={context}
                  onPromptClick={handlePromptClick}
                />
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop sidebar
  return (
    <>
      {/* Collapsed state - floating trigger */}
      {isCollapsed && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                onClick={() => open('compact')}
                className="fixed right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full shadow-lg z-40 bg-primary hover:bg-primary/90"
              >
                <Sparkles className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <div>
                <p className="font-semibold">AI Assistant</p>
                <p className="text-xs text-muted-foreground">Ctrl+Shift+G</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* Expanded sidebar */}
      <aside
        className={cn(
          'fixed right-0 top-0 h-screen border-l border-border bg-background transition-all duration-300 ease-in-out z-30',
          isCollapsed && 'translate-x-full',
          isCompact && 'w-[350px] translate-x-0',
          isExpanded && 'w-[450px] translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          <AISidebarHeader
            isCollapsed={isCollapsed}
            isCompact={isCompact}
            isExpanded={isExpanded}
            onToggle={toggle}
            onClose={close}
          />

          {isCompact && (
            <Tabs defaultValue="chat" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-2 m-2">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="help">Help</TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="flex-1 mt-0">
                <AISidebarChat
                  context={context}
                  initialPrompt={selectedPrompt}
                  onClearPrompt={handleClearPrompt}
                  height="h-[calc(100vh-140px)]"
                />
              </TabsContent>
              <TabsContent value="help" className="flex-1 mt-0 overflow-y-auto">
                <AISidebarContextPanel
                  context={context}
                  onPromptClick={handlePromptClick}
                />
              </TabsContent>
            </Tabs>
          )}

          {isExpanded && (
            <div className="flex-1 flex">
              <div className="flex-1 border-r border-border">
                <AISidebarChat
                  context={context}
                  initialPrompt={selectedPrompt}
                  onClearPrompt={handleClearPrompt}
                  height="h-[calc(100vh-60px)]"
                />
              </div>
              <div className="w-[200px] overflow-y-auto">
                <AISidebarContextPanel
                  context={context}
                  onPromptClick={handlePromptClick}
                />
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {!isCollapsed && !isMobile && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-20"
          onClick={close}
        />
      )}
    </>
  );
}
