import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreVertical, Maximize2, Minimize2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardWidgetProps {
  title: string;
  description?: string;
  children: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onRemove?: () => void;
  className?: string;
}

export function DashboardWidget({
  title,
  description,
  children,
  icon,
  action,
  isExpanded = false,
  onToggleExpand,
  onRemove,
  className,
}: DashboardWidgetProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {icon && <div className="flex-shrink-0">{icon}</div>}
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg truncate">{title}</CardTitle>
              {description && (
                <CardDescription className="truncate">{description}</CardDescription>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            {action}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onToggleExpand && (
                  <DropdownMenuItem onClick={onToggleExpand}>
                    {isExpanded ? (
                      <>
                        <Minimize2 className="h-4 w-4 mr-2" />
                        Collapse
                      </>
                    ) : (
                      <>
                        <Maximize2 className="h-4 w-4 mr-2" />
                        Expand
                      </>
                    )}
                  </DropdownMenuItem>
                )}
                {onRemove && (
                  <DropdownMenuItem onClick={onRemove} className="text-destructive">
                    Remove Widget
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
