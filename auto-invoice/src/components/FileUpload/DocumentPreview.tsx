import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { FileText, Edit, Download } from "lucide-react";
import { DocumentData } from "../../services/documentProcessor";
import { saveAs } from "file-saver";

interface DocumentPreviewProps {
  documentData: DocumentData | null;
  onEdit: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  documentData,
  onEdit,
}) => {
  if (!documentData) {
    return (
      <Card className="w-full h-full min-h-[300px] flex flex-col items-center justify-center">
        <CardContent className="flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
          <FileText className="h-12 w-12 mb-4 opacity-30" />
          <p className="font-medium">No document uploaded</p>
          <p className="text-sm">Upload a DOCX file to see preview</p>
        </CardContent>
      </Card>
    );
  }

  const handleDownload = () => {
    if (!documentData.fileName) return;

    // Create a blob from the content
    const blob = new Blob([documentData.content], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // Save the blob as a file
    saveAs(blob, documentData.fileName);
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl">
          <FileText className="h-5 w-5" />
          {documentData.fileName || "Document Preview"}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow overflow-auto">
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: documentData.preview }}
        />
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4">
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>

        <Button onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentPreview;
