import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export interface InvoiceData {
  date: string;
  invoiceNo: string;
}

interface InvoiceEditorProps {
  initialData?: InvoiceData;
  onSave: (data: InvoiceData) => void;
  isLoading?: boolean;
}

export function InvoiceEditor({
  initialData,
  onSave,
  isLoading = false,
}: InvoiceEditorProps) {
  const [formData, setFormData] = useState<InvoiceData>({
    date: initialData?.date || "",
    invoiceNo: initialData?.invoiceNo || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, date: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invoiceNo">Invoice No.</Label>
            <Input
              id="invoiceNo"
              type="text"
              value={formData.invoiceNo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, invoiceNo: e.target.value }))
              }
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Invoice"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
