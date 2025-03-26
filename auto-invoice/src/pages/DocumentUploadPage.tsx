import React, { useState } from "react";
import { DocumentData } from "../services/documentProcessor";
import FileUpload from "../components/FileUpload/FileUpload";
import DocumentPreview from "../components/FileUpload/DocumentPreview";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft } from "lucide-react";

const DocumentUploadPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [documentData, setDocumentData] = useState<DocumentData | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleFileProcess = (data: DocumentData) => {
    setDocumentData(data);
    setIsEditing(false); // Reset editing state when a new file is uploaded
  };

  const handleEdit = () => {
    setIsEditing(true);
    // Later we'll navigate to an edit page or show an edit modal
  };

  const handleBack = () => {
    setIsEditing(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Please sign in to upload and manage your documents.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CardHeader className="px-0 pt-0 pb-6">
        <CardTitle className="text-2xl font-bold">
          Document Management
        </CardTitle>
      </CardHeader>

      {isEditing ? (
        <div>
          <Button variant="outline" className="mb-4" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Preview
          </Button>
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Edit functionality will be implemented in the next phase.
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Upload Document</h2>
            <FileUpload onFileProcess={handleFileProcess} />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Preview</h2>
            <DocumentPreview documentData={documentData} onEdit={handleEdit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadPage;
