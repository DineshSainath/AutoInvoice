import React, { useState } from "react";
import {
  DocumentData,
  updateInvoiceContent,
  convertToPdf,
} from "../services/documentProcessor";
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
import { ArrowLeft, Save, Download } from "lucide-react";
import {
  InvoiceEditor,
  InvoiceData,
} from "../components/InvoiceEditor/InvoiceEditor";
import { saveAs } from "file-saver";

// Helper function to format date for display
function formatDisplayDate(isoDate: string): string {
  if (!isoDate) return "";
  // Convert YYYY-MM-DD to DD/MM/YYYY
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

const DocumentUploadPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [documentData, setDocumentData] = useState<DocumentData | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleFileProcess = (data: DocumentData) => {
    setDocumentData(data);
    setIsEditing(false); // Reset editing state when a new file is uploaded
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBack = () => {
    setIsEditing(false);
  };

  const handleSaveInvoice = (updatedData: InvoiceData) => {
    if (!documentData) return;

    setIsSaving(true);

    try {
      // Update document content with new values (replace placeholders)
      const updatedContent = updateInvoiceContent(
        documentData.content,
        updatedData
      );

      // Format the date for display in the preview
      const formattedDate = formatDisplayDate(updatedData.date);

      // Create updated document data - update HTML preview with replaced values
      const updatedDocumentData: DocumentData = {
        ...documentData,
        content: updatedContent,
        invoiceData: updatedData,
        // Update the preview with placeholders replaced
        preview: documentData.preview
          .replace(/{{INVOICE_DATE}}/g, formattedDate)
          .replace(/{{INVOICE_NUMBER}}/g, updatedData.invoiceNo),
      };

      // Update state with new document data
      setDocumentData(updatedDocumentData);

      // Return to preview mode
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving invoice:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Add a separate function to handle downloads if needed
  const handleDownloadPdf = () => {
    if (!documentData) return;

    try {
      const pdfFilename = documentData.fileName
        ? documentData.fileName.replace(".docx", ".pdf")
        : "invoice.pdf";

      const pdfBlob = convertToPdf(documentData);
      saveAs(pdfBlob, pdfFilename);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
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
          <div className="grid md:grid-cols-1 gap-6 max-w-md mx-auto">
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Edit Invoice Details
              </h2>
              <InvoiceEditor
                initialData={documentData?.invoiceData}
                onSave={handleSaveInvoice}
                isLoading={isSaving}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Upload Document</h2>
            <FileUpload onFileProcess={handleFileProcess} />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">
              Preview
              {documentData && (
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-2"
                  onClick={handleDownloadPdf}
                >
                  <Download className="h-4 w-4 mr-1" />
                  PDF
                </Button>
              )}
            </h2>
            <DocumentPreview documentData={documentData} onEdit={handleEdit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadPage;
