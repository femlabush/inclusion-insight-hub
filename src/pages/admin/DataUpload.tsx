import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Progress } from '../../components/ui/progress';
import { 
  Upload, 
  File, 
  CheckCircle, 
  AlertCircle, 
  X,
  FileSpreadsheet,
  Database
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'validating' | 'completed' | 'error';
  progress: number;
  error?: string;
}

const DataUpload: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    processFiles(selectedFiles);
  };

  const processFiles = (fileList: File[]) => {
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    
    fileList.forEach(file => {
      if (!validTypes.includes(file.type) && !file.name.endsWith('.csv')) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported format. Please upload CSV or Excel files.`,
          variant: "destructive"
        });
        return;
      }

      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0
      };

      setFiles(prev => [...prev, newFile]);
      simulateUpload(newFile.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    // Simulate upload progress
    const interval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = Math.min(file.progress + 10, 100);
          
          if (newProgress === 100) {
            clearInterval(interval);
            
            // Simulate validation
            setTimeout(() => {
              setFiles(prev => prev.map(f => 
                f.id === fileId 
                  ? { ...f, status: 'validating', progress: 0 }
                  : f
              ));
              
              // Simulate validation progress
              const validationInterval = setInterval(() => {
                setFiles(prev => prev.map(f => {
                  if (f.id === fileId) {
                    const validationProgress = Math.min(f.progress + 20, 100);
                    
                    if (validationProgress === 100) {
                      clearInterval(validationInterval);
                      
                      // Random validation result
                      const isValid = Math.random() > 0.2;
                      
                      setTimeout(() => {
                        setFiles(prev => prev.map(file => 
                          file.id === fileId 
                            ? { 
                                ...file, 
                                status: isValid ? 'completed' : 'error',
                                error: isValid ? undefined : 'Invalid data format in column 3'
                              }
                            : file
                        ));
                        
                        if (isValid) {
                          toast({
                            title: "Upload successful",
                            description: `${file.name} has been processed successfully.`,
                          });
                        }
                      }, 500);
                    }
                    
                    return { ...f, progress: validationProgress };
                  }
                  return f;
                }));
              }, 200);
              
            }, 1000);
          }
          
          return { ...file, progress: newProgress };
        }
        return file;
      }));
    }, 100);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <File className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'uploading': return 'Uploading...';
      case 'validating': return 'Validating...';
      case 'completed': return 'Completed';
      case 'error': return 'Error';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Data Upload</h1>
        <p className="text-muted-foreground">
          Upload CSV or Excel files for financial inclusion analysis
        </p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Dataset</CardTitle>
          <CardDescription>
            Drag and drop files or click to browse. Supported formats: CSV, Excel (.xlsx, .xls)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/30 hover:border-muted-foreground/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Drop files here or click to upload
            </h3>
            <p className="text-muted-foreground mb-4">
              Maximum file size: 50MB per file
            </p>
            <Input
              type="file"
              multiple
              accept=".csv,.xlsx,.xls"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Choose Files
              </Button>
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Progress</CardTitle>
            <CardDescription>
              Monitor the status of your file uploads and validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(file.status)}
                      <div>
                        <p className="font-medium text-foreground">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(file.size)} • {getStatusText(file.status)}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {(file.status === 'uploading' || file.status === 'validating') && (
                    <div className="space-y-2">
                      <Progress value={file.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {file.progress}% {file.status === 'uploading' ? 'uploaded' : 'validated'}
                      </p>
                    </div>
                  )}
                  
                  {file.status === 'error' && file.error && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{file.error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {file.status === 'completed' && (
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-success">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Ready for processing</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Database className="mr-2 h-4 w-4" />
                        Process Data
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>File Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-foreground mb-2">Supported Formats</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• CSV files (.csv)</li>
                <li>• Excel files (.xlsx, .xls)</li>
                <li>• UTF-8 encoding recommended</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Data Requirements</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Include column headers</li>
                <li>• Consistent date formats</li>
                <li>• No special characters in headers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataUpload;