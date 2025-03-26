import mammoth from "mammoth";
import { InvoiceData } from "../components/InvoiceEditor/InvoiceEditor";

export interface DocumentData {
  content: string;
  preview: string;
  fileName?: string;
  invoiceData?: InvoiceData;
}

/**
 * Parse a DOCX file and extract content and preview
 * @param file The DOCX file to parse
 * @returns Promise with document content and HTML preview
 */
export async function parseDocxFile(file: File): Promise<DocumentData> {
  // Validate file type
  if (
    !file.type.includes(
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
  ) {
    throw new Error("Only DOCX files are supported");
  }

  try {
    let arrayBuffer: ArrayBuffer;
    let content: string;

    if (typeof file.arrayBuffer === "function") {
      arrayBuffer = await file.arrayBuffer();
      content = await file.text();
    } else {
      const text = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsText(file);
      });
      content = text;
      arrayBuffer = new TextEncoder().encode(text).buffer as ArrayBuffer;
    }

    const result = await mammoth.convertToHtml({ arrayBuffer });

    // Ensure result.value exists
    if (!result || typeof result.value !== "string") {
      throw new Error("Failed to convert document to HTML");
    }

    // Extract initial invoice data
    const invoiceData = extractInvoiceData(content);

    return {
      content,
      preview: result.value,
      invoiceData,
    };
  } catch (error) {
    console.error("Error processing document:", error);
    throw new Error(`Error processing document: ${(error as Error).message}`);
  }
}

/**
 * Extract text content from HTML
 * @param html HTML string
 * @returns Plain text content
 */
export function extractTextFromHtml(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

/**
 * Extract invoice data from document content
 * This function looks for placeholder patterns in the document
 */
export function extractInvoiceData(content: string): InvoiceData {
  // We'll use today's date as a default if no placeholder is found
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // Check if the document contains our placeholders
  const hasDatePlaceholder = content.includes("{{INVOICE_DATE}}");
  const hasInvoiceNoPlaceholder = content.includes("{{INVOICE_NUMBER}}");

  // For an actual date value, we'd try to extract it
  // If no placeholder is found, fall back to regex pattern
  const datePattern = /(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/;
  const invoiceNoPattern = /(?:Invoice|INV)[-\s]?#?\s*([A-Z0-9-]+)/i;

  const dateMatch = !hasDatePlaceholder ? content.match(datePattern) : null;
  const invoiceNoMatch = !hasInvoiceNoPlaceholder
    ? content.match(invoiceNoPattern)
    : null;

  return {
    // Use the placeholder if found, otherwise try to extract from content or use default
    date: hasDatePlaceholder
      ? formattedToday
      : dateMatch
      ? formatDate(dateMatch[1])
      : formattedToday,
    invoiceNo: hasInvoiceNoPlaceholder
      ? "INV-" + Date.now().toString().slice(-6)
      : invoiceNoMatch
      ? invoiceNoMatch[1]
      : "",
  };
}

function formatDate(dateStr: string): string {
  // Convert date to YYYY-MM-DD format for input type="date"
  const parts = dateStr.split(/[-/]/);
  if (parts.length !== 3) return "";

  let [day, month, year] = parts;

  // Handle 2-digit year
  if (year.length === 2) {
    const currentYear = new Date().getFullYear();
    const century = Math.floor(currentYear / 100) * 100;
    year = `${century + parseInt(year)}`;
  }

  // Ensure month and day are 2 digits
  month = month.padStart(2, "0");
  day = day.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function updateInvoiceContent(
  content: string,
  updates: InvoiceData
): string {
  let updatedContent = content;

  // Replace date placeholder
  if (updates.date) {
    const formattedDate = formatDisplayDate(updates.date);
    updatedContent = updatedContent.replace(/{{INVOICE_DATE}}/g, formattedDate);
  }

  // Replace invoice number placeholder
  if (updates.invoiceNo) {
    updatedContent = updatedContent.replace(
      /{{INVOICE_NUMBER}}/g,
      updates.invoiceNo
    );
  }

  return updatedContent;
}

function formatDisplayDate(isoDate: string): string {
  // Convert YYYY-MM-DD to DD/MM/YYYY
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

/**
 * Convert document to PDF format
 * For MVP, we create a simple PDF from the HTML content
 * In a production app, you would use a more sophisticated library or service
 */
export function convertToPdf(documentData: DocumentData): Blob {
  // For the MVP, we'll create a very basic PDF using the HTML content
  // This is a simplified approach that creates a printable HTML page
  const { preview, fileName } = documentData;

  // Create a styled HTML document
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${fileName || "Invoice"}</title>
      <style>
        body { 
          font-family: Arial, sans-serif;
          margin: 20mm;
          font-size: 12pt;
        }
        @media print {
          body { 
            width: 210mm;
            height: 297mm;
          }
        }
      </style>
    </head>
    <body>
      ${preview}
    </body>
    </html>
  `;

  // Return as a Blob that can be downloaded
  return new Blob([htmlContent], { type: "text/html" });
}
