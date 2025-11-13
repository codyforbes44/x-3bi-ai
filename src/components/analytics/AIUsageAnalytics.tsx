import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart, LineChart, TrendingUp, DollarSign, Zap, AlertCircle, Download, Calendar as CalendarIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ResponsiveTable } from '@/components/ui/responsive-table';
import { useExport } from '@/hooks/useExport';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';

interface UsageData {
  model: string;
  requests: number;
  tokens: number;
  cost: number;
  avgResponseTime: number;
}

export function AIUsageAnalytics() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  
  const [usageData, setUsageData] = useState<UsageData[]>([
    { model: 'Grok-3', requests: 1247, tokens: 156000, cost: 12.45, avgResponseTime: 1.2 },
    { model: 'Claude Opus 4', requests: 892, tokens: 134000, cost: 26.80, avgResponseTime: 1.8 },
    { model: 'GPT-5', requests: 634, tokens: 98000, cost: 19.60, avgResponseTime: 1.5 },
    { model: 'Gemini 2.5 Flash', requests: 2156, tokens: 245000, cost: 4.90, avgResponseTime: 0.8 },
  ]);

  const { exportToCSV, exportToJSON } = useExport();
  
  const totalCost = usageData.reduce((sum, item) => sum + item.cost, 0);
  const totalRequests = usageData.reduce((sum, item) => sum + item.requests, 0);
  const monthlyBudget = 150;
  const budgetUsage = (totalCost / monthlyBudget) * 100;
  
  // Table columns configuration
  const columns = [
    { 
      key: 'model', 
      label: 'Model',
      render: (item: UsageData) => <span className="font-medium">{item.model}</span>
    },
    { 
      key: 'requests', 
      label: 'Requests',
      render: (item: UsageData) => item.requests.toLocaleString()
    },
    { 
      key: 'tokens', 
      label: 'Tokens',
      render: (item: UsageData) => item.tokens.toLocaleString(),
      hideOnMobile: true
    },
    { 
      key: 'cost', 
      label: 'Cost ($)',
      render: (item: UsageData) => `$${item.cost.toFixed(2)}`
    },
    { 
      key: 'avgResponseTime', 
      label: 'Avg Response (s)',
      render: (item: UsageData) => `${item.avgResponseTime}s`,
      hideOnMobile: true
    },
  ];

  const handleExportCSV = () => {
    exportToCSV(usageData, `ai-usage-analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`);
  };

  const handleExportJSON = () => {
    exportToJSON(usageData, `ai-usage-analytics-${format(new Date(), 'yyyy-MM-dd')}.json`);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Date Range Picker & Export Actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-auto justify-start text-left font-normal h-12 sm:h-10",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-background z-50" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="flex-1 sm:flex-none h-12 sm:h-9 touch-target"
          >
            <Download className="w-4 h-4 mr-2" />
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportJSON}
            className="flex-1 sm:flex-none h-12 sm:h-9 touch-target"
          >
            <Download className="w-4 h-4 mr-2" />
            JSON
          </Button>
        </div>
      </div>

      {/* Budget Alert */}
      {budgetUsage > 80 && (
        <Alert variant={budgetUsage > 90 ? 'destructive' : 'default'} className="touch-target">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            You've used {budgetUsage.toFixed(0)}% of your monthly budget (${totalCost.toFixed(2)} / ${monthlyBudget})
          </AlertDescription>
        </Alert>
      )}

      {/* Overview Cards - Mobile Optimized */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="touch-target">
          <CardHeader className="pb-2 p-4 sm:p-6">
            <CardDescription className="text-xs sm:text-sm">Total Requests</CardDescription>
            <CardTitle className="text-2xl sm:text-3xl">{totalRequests.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="touch-target">
          <CardHeader className="pb-2 p-4 sm:p-6">
            <CardDescription className="text-xs sm:text-sm">Total Cost</CardDescription>
            <CardTitle className="text-2xl sm:text-3xl">${totalCost.toFixed(2)}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <Progress value={budgetUsage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {budgetUsage.toFixed(0)}% of budget
            </p>
          </CardContent>
        </Card>

        <Card className="touch-target">
          <CardHeader className="pb-2 p-4 sm:p-6">
            <CardDescription className="text-xs sm:text-sm">Avg Response Time</CardDescription>
            <CardTitle className="text-2xl sm:text-3xl">1.2s</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs text-muted-foreground">
              <Zap className="w-3 h-3 inline mr-1" />
              15% faster than average
            </p>
          </CardContent>
        </Card>

        <Card className="touch-target">
          <CardHeader className="pb-2 p-4 sm:p-6">
            <CardDescription className="text-xs sm:text-sm">Cost per Request</CardDescription>
            <CardTitle className="text-2xl sm:text-3xl">$0.013</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs text-muted-foreground">
              <DollarSign className="w-3 h-3 inline mr-1" />
              Optimized routing
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="models" className="space-y-4">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
          <TabsTrigger value="models" className="text-xs sm:text-sm">By Model</TabsTrigger>
          <TabsTrigger value="trends" className="text-xs sm:text-sm">Trends</TabsTrigger>
          <TabsTrigger value="optimization" className="text-xs sm:text-sm">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Model Usage & Costs</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Breakdown by AI model</CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 sm:pt-0">
              <ResponsiveTable
                data={usageData}
                columns={columns}
                keyExtractor={(item) => item.model}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Usage Trends</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {dateRange?.from && dateRange?.to
                  ? `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd, yyyy")}`
                  : "Last 30 days"}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[250px] sm:h-[300px] flex items-center justify-center text-muted-foreground p-4 sm:p-6">
              <div className="text-center">
                <LineChart className="w-10 h-10 sm:w-12 sm:h-12 opacity-50 mx-auto mb-2" />
                <p className="text-sm sm:text-base">Chart visualization coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-3 sm:space-y-4">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Cost Optimization Suggestions</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Save money with these recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <Alert className="touch-target">
                <TrendingUp className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  <strong>Use Gemini 2.5 Flash for simple queries</strong>
                  <br />
                  <span className="text-xs sm:text-sm">
                    Could save ~$8.20/month by routing 40% of Claude requests to Gemini Flash
                  </span>
                </AlertDescription>
              </Alert>
              <Alert className="touch-target">
                <Zap className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  <strong>Enable response caching</strong>
                  <br />
                  <span className="text-xs sm:text-sm">
                    Reduce duplicate requests by 15-20%, estimated savings: $5.40/month
                  </span>
                </AlertDescription>
              </Alert>
              <Alert className="touch-target">
                <DollarSign className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  <strong>Switch to GPT-5 Mini for code tasks</strong>
                  <br />
                  <span className="text-xs sm:text-sm">
                    Similar quality for code generation, could save $4.80/month
                  </span>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
