import { useState } from 'react';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Send, Wrench, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  role: 'user' | 'assistant' | 'function';
  content: string;
  name?: string;
}

interface ToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
}

export const GrokTools = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Define available tools
  const tools = [
    {
      type: 'function',
      function: {
        name: 'get_current_weather',
        description: 'Get the current weather in a given location',
        parameters: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'The city and state, e.g. San Francisco, CA',
            },
            unit: {
              type: 'string',
              enum: ['celsius', 'fahrenheit'],
              description: 'The temperature unit to use',
            },
          },
          required: ['location'],
        },
      },
    },
    {
      type: 'function',
      function: {
        name: 'search_web',
        description: 'Search the web for current information',
        parameters: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The search query',
            },
          },
          required: ['query'],
        },
      },
    },
    {
      type: 'function',
      function: {
        name: 'calculate',
        description: 'Perform mathematical calculations',
        parameters: {
          type: 'object',
          properties: {
            expression: {
              type: 'string',
              description: 'The mathematical expression to evaluate',
            },
          },
          required: ['expression'],
        },
      },
    },
  ];

  // Mock function implementations
  const executeTool = async (name: string, args: any): Promise<string> => {
    console.log(`Executing tool: ${name} with args:`, args);
    
    switch (name) {
      case 'get_current_weather':
        return JSON.stringify({
          location: args.location,
          temperature: Math.floor(Math.random() * 30) + 10,
          unit: args.unit || 'celsius',
          condition: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)],
        });
      
      case 'search_web':
        return JSON.stringify({
          query: args.query,
          results: [
            { title: 'Sample Result 1', snippet: 'This is a mock search result for demonstration.' },
            { title: 'Sample Result 2', snippet: 'Another mock result showing tool calling capability.' },
          ],
        });
      
      case 'calculate':
        try {
          // Simple safe eval for demo (in production, use a proper math parser)
          const result = eval(args.expression);
          return JSON.stringify({ expression: args.expression, result });
        } catch (error) {
          return JSON.stringify({ error: 'Invalid expression' });
        }
      
      default:
        return JSON.stringify({ error: 'Unknown function' });
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      console.log('Calling Grok Tools with:', { messageCount: updatedMessages.length, toolCount: tools.length });
      
      // Send initial request with tools
      const { data, error } = await supabase.functions.invoke('grok', {
        body: {
          messages: updatedMessages.map(msg => ({
            role: msg.role,
            content: msg.content,
            ...(msg.name && { name: msg.name }),
          })),
          model: 'grok-3',
          temperature: 0.7,
          tools,
          tool_choice: 'auto',
        },
      });

      console.log('Grok Tools response:', { data, error });

      if (error) {
        console.error('Grok Tools error details:', error);
        throw error;
      }

      const choice = data.choices[0];
      
      // Check if the model wants to use a tool
      if (choice.message.tool_calls) {
        const toolCalls: ToolCall[] = choice.message.tool_calls;
        
        // Add assistant's tool call message
        const assistantMessage: Message = {
          role: 'assistant',
          content: choice.message.content || 'Using tools to help answer your question...',
        };
        
        const messagesWithAssistant = [...updatedMessages, assistantMessage];
        
        // Execute all tool calls
        const toolResults: Message[] = [];
        for (const toolCall of toolCalls) {
          const args = JSON.parse(toolCall.function.arguments);
          const result = await executeTool(toolCall.function.name, args);
          
          toolResults.push({
            role: 'function',
            name: toolCall.function.name,
            content: result,
          });
        }
        
        setMessages([...messagesWithAssistant, ...toolResults]);
        
        // Send tool results back to get final response
        const finalResponse = await supabase.functions.invoke('grok', {
          body: {
            messages: [
              ...messagesWithAssistant.map(msg => ({
                role: msg.role,
                content: msg.content,
              })),
              ...toolResults.map(msg => ({
                role: msg.role,
                name: msg.name,
                content: msg.content,
              })),
            ],
            model: 'grok-3',
            temperature: 0.7,
            tools,
          },
        });

        if (finalResponse.error) throw finalResponse.error;

        const finalMessage: Message = {
          role: 'assistant',
          content: finalResponse.data.choices[0].message.content,
        };

        setMessages([...messagesWithAssistant, ...toolResults, finalMessage]);
      } else {
        // No tool calls, just a regular response
        const assistantMessage: Message = {
          role: 'assistant',
          content: choice.message.content,
        };

        setMessages([...updatedMessages, assistantMessage]);
      }
    } catch (error: any) {
      console.error('Error calling Grok with tools:', error);
      toast({
        title: 'Error',
        description: error?.message || 'Failed to get response from Grok. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <CardDescription className="mb-4 flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Grok with function calling - weather, search, calculations, and more
            <Badge variant="outline" className="ml-2">Tools</Badge>
          </CardDescription>

          {/* Available Tools Info */}
          <div className="mb-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2 text-sm font-medium">
              <Code className="w-4 h-4" />
              Available Tools
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-muted-foreground">
              <div>🌤️ Weather - Get current weather</div>
              <div>🔍 Search - Web search</div>
              <div>🧮 Calculate - Math operations</div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Messages */}
            <div className="min-h-[400px] max-h-[500px] overflow-y-auto space-y-4 p-4 border border-border rounded-lg bg-muted/30">
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-[400px] text-muted-foreground text-sm text-center">
                  <div>
                    <p className="mb-2">Ask Grok to use tools!</p>
                    <p className="text-xs">Try: "What's the weather in New York?" or "Calculate 15 * 24"</p>
                  </div>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : message.role === 'function'
                        ? 'bg-muted border border-border'
                        : 'bg-background border border-border'
                    }`}
                  >
                    {message.role === 'function' && (
                      <div className="text-xs font-mono mb-1 text-muted-foreground">
                        Tool: {message.name}
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-background border border-border rounded-lg p-3">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Grok to use tools..."
                className="min-h-[80px]"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                size="icon"
                className="h-[80px] w-[80px]"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
