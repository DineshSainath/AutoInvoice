import mammoth from "mammoth";

export interface DocumentData {
  content: string;
  preview: string;
  fileName?: string;
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

    return {
      content,
      preview: result.value,
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
 * This is a placeholder for more advanced parsing logic
 */
export function extractInvoiceData(content: string): {
  date?: string;
  amount?: string;
} {
  // Basic regex patterns for date and amount extraction
  // These patterns can be improved for production use
  const datePattern = /(\d{1,2}\/\d{1,2}\/\d{2,4}|\d{1,2}-\d{1,2}-\d{2,4})/;
  const amountPattern = /\$(\d+(\.\d{2})?)/;

  const dateMatch = content.match(datePattern);
  const amountMatch = content.match(amountPattern);

  return {
    date: dateMatch ? dateMatch[0] : undefined,
    amount: amountMatch ? amountMatch[1] : undefined,
  };
}
