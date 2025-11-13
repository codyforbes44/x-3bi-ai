import { toast } from "sonner";

type ExportFormat = 'csv' | 'json';

interface ExportOptions {
  filename: string;
  format: ExportFormat;
}

/**
 * Export data to CSV or JSON files
 */
export const useExport = () => {
  
  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      toast.error("No data to export");
      return;
    }
    
    // Get headers from first object
    const headers = Object.keys(data[0]);
    
    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape quotes and wrap in quotes if contains comma
          const stringValue = String(value || '');
          if (stringValue.includes(',') || stringValue.includes('"')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        }).join(',')
      )
    ].join('\n');
    
    downloadFile(csvContent, filename, 'text/csv');
  };
  
  const exportToJSON = (data: any[], filename: string) => {
    if (data.length === 0) {
      toast.error("No data to export");
      return;
    }
    
    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, filename, 'application/json');
  };
  
  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success(`Exported ${filename}`);
  };
  
  const exportData = (data: any[], options: ExportOptions) => {
    const { format, filename } = options;
    
    if (format === 'csv') {
      exportToCSV(data, filename.endsWith('.csv') ? filename : `${filename}.csv`);
    } else {
      exportToJSON(data, filename.endsWith('.json') ? filename : `${filename}.json`);
    }
  };
  
  return { exportData, exportToCSV, exportToJSON };
};
