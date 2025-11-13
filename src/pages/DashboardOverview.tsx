import { useState, useEffect } from 'react';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Settings, Plus, Briefcase, Code, Shield } from 'lucide-react';
import { SystemHealthWidget } from '@/components/dashboard/widgets/SystemHealthWidget';
import { WebVitalsWidget } from '@/components/dashboard/widgets/WebVitalsWidget';
import { AIUsageWidget } from '@/components/dashboard/widgets/AIUsageWidget';
import { PredictiveInsightsWidget } from '@/components/dashboard/widgets/PredictiveInsightsWidget';
import { RecentActivityWidget } from '@/components/dashboard/widgets/RecentActivityWidget';
import { DraggableDashboardWidget } from '@/components/dashboard/DraggableDashboardWidget';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

type WidgetKey = 'systemHealth' | 'webVitals' | 'aiUsage' | 'predictive' | 'activity';

interface WidgetConfig {
  id: WidgetKey;
  name: string;
  component: React.ComponentType;
  enabled: boolean;
}

const STORAGE_KEY = 'dashboard-widget-config';
const TEMPLATE_KEY = 'dashboard-template';

const defaultWidgets: WidgetConfig[] = [
  { id: 'systemHealth', name: 'System Health', component: SystemHealthWidget, enabled: true },
  { id: 'webVitals', name: 'Web Vitals', component: WebVitalsWidget, enabled: true },
  { id: 'aiUsage', name: 'AI Usage', component: AIUsageWidget, enabled: true },
  { id: 'predictive', name: 'Predictive Insights', component: PredictiveInsightsWidget, enabled: true },
  { id: 'activity', name: 'Recent Activity', component: RecentActivityWidget, enabled: true },
];

type DashboardTemplate = 'custom' | 'executive' | 'developer' | 'admin';

interface Template {
  id: DashboardTemplate;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  enabledWidgets: WidgetKey[];
}

const templates: Template[] = [
  {
    id: 'executive',
    name: 'Executive',
    icon: Briefcase,
    description: 'High-level insights and KPIs',
    enabledWidgets: ['predictive', 'aiUsage', 'activity'],
  },
  {
    id: 'developer',
    name: 'Developer',
    icon: Code,
    description: 'Technical metrics and performance',
    enabledWidgets: ['systemHealth', 'webVitals', 'activity'],
  },
  {
    id: 'admin',
    name: 'Admin',
    icon: Shield,
    description: 'Complete system overview',
    enabledWidgets: ['systemHealth', 'webVitals', 'aiUsage', 'predictive', 'activity'],
  },
];

export default function DashboardOverview() {
  const [currentTemplate, setCurrentTemplate] = useState<DashboardTemplate>(() => {
    const saved = localStorage.getItem(TEMPLATE_KEY);
    return (saved as DashboardTemplate) || 'custom';
  });

  const [widgets, setWidgets] = useState<WidgetConfig[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with defaults to handle new widgets
        return defaultWidgets.map(defaultWidget => {
          const savedWidget = parsed.find((w: WidgetConfig) => w.id === defaultWidget.id);
          return savedWidget ? { ...defaultWidget, enabled: savedWidget.enabled } : defaultWidget;
        });
      } catch {
        return defaultWidgets;
      }
    }
    return defaultWidgets;
  });

  const [lastUpdated, setLastUpdated] = useState(new Date());

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Save to localStorage whenever widgets change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets));
  }, [widgets]);

  // Save template selection
  useEffect(() => {
    localStorage.setItem(TEMPLATE_KEY, currentTemplate);
  }, [currentTemplate]);

  const toggleWidget = (id: WidgetKey) => {
    setWidgets(prev => 
      prev.map(w => w.id === id ? { ...w, enabled: !w.enabled } : w)
    );
    setCurrentTemplate('custom'); // Switch to custom when manually toggling
  };

  const applyTemplate = (templateId: DashboardTemplate) => {
    if (templateId === 'custom') {
      setCurrentTemplate('custom');
      return;
    }

    const template = templates.find(t => t.id === templateId);
    if (!template) return;

    setWidgets(prev => 
      prev.map(w => ({
        ...w,
        enabled: template.enabledWidgets.includes(w.id),
      }))
    );
    setCurrentTemplate(templateId);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const enabledWidgets = widgets.filter(w => w.enabled);
  const disabledCount = widgets.length - enabledWidgets.length;

  return (
    <>
      <SEO
        title="Dashboard Overview - Comprehensive Analytics & Monitoring"
        description="View all your metrics, analytics, and insights in one comprehensive dashboard with real-time updates."
      />

      <div className="container max-w-7xl mx-auto py-6 sm:py-8 px-4">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-2">
                <LayoutDashboard className="h-8 w-8 text-primary" />
                Dashboard Overview
              </h1>
              <p className="text-muted-foreground">
                Comprehensive view of all metrics and insights
              </p>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="outline" className="text-xs">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Live
              </Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="min-h-[44px]">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Template: {currentTemplate === 'custom' ? 'Custom' : templates.find(t => t.id === currentTemplate)?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>Dashboard Templates</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {templates.map((template) => {
                    const Icon = template.icon;
                    return (
                      <DropdownMenuItem
                        key={template.id}
                        onClick={() => applyTemplate(template.id)}
                        className="cursor-pointer"
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        <div className="flex-1">
                          <div className="font-medium">{template.name}</div>
                          <div className="text-xs text-muted-foreground">{template.description}</div>
                        </div>
                        {currentTemplate === template.id && (
                          <Badge variant="secondary" className="ml-2">Active</Badge>
                        )}
                      </DropdownMenuItem>
                    );
                  })}
                  {currentTemplate === 'custom' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-default">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        <div className="flex-1">
                          <div className="font-medium">Custom</div>
                          <div className="text-xs text-muted-foreground">Your personalized layout</div>
                        </div>
                        <Badge variant="secondary" className="ml-2">Active</Badge>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="min-h-[44px]">
                    <Settings className="h-4 w-4 mr-2" />
                    Customize
                    {disabledCount > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {disabledCount} hidden
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Visible Widgets</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {widgets.map((widget) => (
                    <DropdownMenuCheckboxItem
                      key={widget.id}
                      checked={widget.enabled}
                      onCheckedChange={() => toggleWidget(widget.id)}
                    >
                      {widget.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>

        {/* Widgets Grid */}
        {enabledWidgets.length === 0 ? (
          <div className="text-center py-16">
            <LayoutDashboard className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No widgets enabled</h3>
            <p className="text-muted-foreground mb-4">
              Enable some widgets to see your dashboard
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Widgets
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuLabel>Available Widgets</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {widgets.map((widget) => (
                  <DropdownMenuCheckboxItem
                    key={widget.id}
                    checked={widget.enabled}
                    onCheckedChange={() => toggleWidget(widget.id)}
                  >
                    {widget.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={enabledWidgets.map(w => w.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {enabledWidgets.map((widget) => {
                  const WidgetComponent = widget.component;
                  return (
                    <DraggableDashboardWidget key={widget.id} id={widget.id}>
                      <WidgetComponent />
                    </DraggableDashboardWidget>
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {/* Quick Actions */}
        {enabledWidgets.length > 0 && (
          <div className="mt-8 p-4 border rounded-lg bg-muted/50">
            <h3 className="font-semibold mb-3 text-sm">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="/monitoring">View Full Monitoring</a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="/usage-analytics">View Analytics</a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="/digital-twin">View Predictions</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
