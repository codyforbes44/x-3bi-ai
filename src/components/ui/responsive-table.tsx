import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useDevice } from "@/hooks/useDevice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Column<T> {
  key: string;
  label: string;
  render: (item: T) => ReactNode;
  mobileLabel?: string; // Label for mobile card view
  hideOnMobile?: boolean;
}

interface ResponsiveTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T, index: number) => string;
  className?: string;
  emptyMessage?: string;
}

/**
 * Responsive table that converts to cards on mobile
 */
export function ResponsiveTable<T>({
  data,
  columns,
  keyExtractor,
  className,
  emptyMessage = "No data available"
}: ResponsiveTableProps<T>) {
  const { isMobile } = useDevice();
  
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }
  
  if (isMobile) {
    // Card view for mobile
    return (
      <div className={cn("space-y-3", className)}>
        {data.map((item, index) => (
          <div key={keyExtractor(item, index)} className="border rounded-lg p-4 space-y-3">
            {columns
              .filter(col => !col.hideOnMobile)
              .map(col => (
                <div key={col.key} className="flex justify-between items-start gap-4">
                  <span className="text-sm font-medium text-muted-foreground min-w-[100px]">
                    {col.mobileLabel || col.label}
                  </span>
                  <div className="text-sm text-right flex-1">
                    {col.render(item)}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    );
  }
  
  // Table view for desktop
  return (
    <div className={cn("rounded-md border", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(col => (
              <TableHead key={col.key}>{col.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={keyExtractor(item, index)}>
              {columns.map(col => (
                <TableCell key={col.key}>
                  {col.render(item)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
