import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { parseDocxFile, DocumentData } from "../../services/documentProcessor";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { AlertCircle, Upload, FileText, Loader2 } from "lucide-react";

interface FileUploadProps {
  onFileProcess: (documentData: DocumentData) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileProcess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      setIsProcessing(true);
      setError(null);

      try {
        const result = await parseDocxFile(file);

        // Add filename to result
        const documentData: DocumentData = {
          ...result,
          fileName: file.name,
        };

        onFileProcess(documentData);
      } catch (err) {
        console.error("Error processing file:", err);
        setError((err as Error).message);
      } finally {
        setIsProcessing(false);
      }
    },
    [onFileProcess]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
  });

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            transition-colors duration-200 flex flex-col items-center justify-center
            min-h-40 ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50"
            }
          `}
        >
          <input {...getInputProps()} />

          {isProcessing ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">
                Processing document...
              </p>
            </div>
          ) : (
            <>
              {error ? (
                <div className="flex flex-col items-center justify-center space-y-2 text-destructive">
                  <AlertCircle className="h-8 w-8" />
                  <p className="font-medium">{error}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setError(null);
                    }}
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                  {isDragActive ? (
                    <>
                      <FileText className="h-10 w-10 text-primary" />
                      <p className="font-medium text-primary">
                        Drop your file here
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <p className="font-medium">
                        Drop your DOCX file here, or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Only DOCX files are supported
                      </p>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
