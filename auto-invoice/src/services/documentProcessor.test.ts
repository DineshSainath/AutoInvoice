import {
  parseDocxFile,
  extractInvoiceData,
  updateInvoiceContent,
} from "./documentProcessor";

// Mock the mammoth library
jest.mock("mammoth", () => ({
  convertToHtml: jest.fn().mockImplementation(() =>
    Promise.resolve({
      value: "<p>Converted HTML</p>",
      messages: [],
    })
  ),
}));

// Create a minimal DOMException mock
class MockDOMException extends Error implements Partial<DOMException> {
  constructor(message: string, name: string = "Error") {
    super(message);
    this.name = name;
  }
  readonly code = 0;
  readonly ABORT_ERR = 20;
  readonly DATA_CLONE_ERR = 25;
}

// Mock FileReader
class MockFileReader implements Partial<FileReader> {
  readonly EMPTY = 0 as const;
  readonly LOADING = 1 as const;
  readonly DONE = 2 as const;
  readyState: 0 | 1 | 2 = 0;
  result: string | ArrayBuffer | null = null;
  error: DOMException | null = null;
  onload: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null =
    null;
  onabort: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null =
    null;
  onerror: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null =
    null;
  onloadend: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null =
    null;
  onloadstart:
    | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
    | null = null;
  onprogress:
    | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
    | null = null;

  readAsText(file: Blob) {
    this.readyState = this.LOADING;
    setTimeout(() => {
      this.result = "test content\nInvoice #INV-001\nDate: 20/02/2024";
      this.readyState = this.DONE;
      if (this.onload) {
        const event = {
          type: "load",
          target: this as unknown as FileReader,
          currentTarget: this as unknown as FileReader,
          eventPhase: 0,
          bubbles: false,
          cancelable: false,
          defaultPrevented: false,
          composed: false,
          timeStamp: Date.now(),
          srcElement: null,
          returnValue: true,
          cancelBubble: false,
          path: [],
          preventDefault: () => {},
          stopPropagation: () => {},
          stopImmediatePropagation: () => {},
          composedPath: () => [],
          initEvent: () => {},
          lengthComputable: false,
          loaded: 1,
          total: 1,
          NONE: 0,
          CAPTURING_PHASE: 1,
          AT_TARGET: 2,
          BUBBLING_PHASE: 3,
          isTrusted: true,
        } as ProgressEvent<FileReader>;

        const target = this as unknown as FileReader;
        this.onload.call(target, event);
      }
    }, 0);
  }

  readAsArrayBuffer() {}
  readAsBinaryString() {}
  readAsDataURL() {}
  abort() {}
  addEventListener() {}
  removeEventListener() {}
  dispatchEvent() {
    return true;
  }
}

// @ts-ignore
global.FileReader = MockFileReader;

describe("Document Processor Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("parseDocxFile", () => {
    test("should convert docx file to html and extract invoice data", async () => {
      const mockFile = new File(["test content"], "test.docx", {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      mockFile.arrayBuffer = jest.fn().mockResolvedValue(new ArrayBuffer(0));
      mockFile.text = jest
        .fn()
        .mockResolvedValue("test content\nInvoice #INV-001\nDate: 20/02/2024");

      const result = await parseDocxFile(mockFile);

      expect(result).toEqual({
        content: "test content\nInvoice #INV-001\nDate: 20/02/2024",
        preview: "<p>Converted HTML</p>",
        invoiceData: {
          date: "2024-02-20",
          invoiceNo: "INV-001",
        },
      });
    });

    test("should throw an error if not a docx file", async () => {
      const mockFile = new File(["test content"], "test.pdf", {
        type: "application/pdf",
      });

      await expect(parseDocxFile(mockFile)).rejects.toThrow(
        "Only DOCX files are supported"
      );
    });

    test("should handle conversion errors", async () => {
      const mammoth = require("mammoth");
      mammoth.convertToHtml.mockRejectedValueOnce(
        new Error("Conversion error")
      );

      const mockFile = new File(["test content"], "test.docx", {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      mockFile.arrayBuffer = jest.fn().mockResolvedValue(new ArrayBuffer(0));
      mockFile.text = jest.fn().mockResolvedValue("test content");

      await expect(parseDocxFile(mockFile)).rejects.toThrow(
        "Error processing document: Conversion error"
      );
    });
  });

  describe("extractInvoiceData", () => {
    test("should extract date and invoice number from content", () => {
      const content = "Invoice #INV-001\nDate: 20/02/2024";
      const result = extractInvoiceData(content);

      expect(result).toEqual({
        date: "2024-02-20",
        invoiceNo: "INV-001",
      });
    });

    test("should handle different date formats", () => {
      const content = "Invoice #INV-001\nDate: 20-02-24";
      const result = extractInvoiceData(content);

      expect(result).toEqual({
        date: "2024-02-20",
        invoiceNo: "INV-001",
      });
    });

    test("should return empty strings when no data found", () => {
      const content = "Some random content";
      const result = extractInvoiceData(content);

      expect(result).toEqual({
        date: "",
        invoiceNo: "",
      });
    });
  });

  describe("updateInvoiceContent", () => {
    test("should update date and invoice number in content", () => {
      const content = "Invoice #INV-001\nDate: 20/02/2024";
      const updates = {
        date: "2024-03-21",
        invoiceNo: "INV-002",
      };

      const result = updateInvoiceContent(content, updates);

      expect(result).toContain("Invoice #INV-002");
      expect(result).toContain("21/03/2024");
    });

    test("should handle partial updates", () => {
      const content = "Invoice #INV-001\nDate: 20/02/2024";
      const updates = {
        date: "2024-03-21",
        invoiceNo: "",
      };

      const result = updateInvoiceContent(content, updates);

      expect(result).toContain("Invoice #INV-001");
      expect(result).toContain("21/03/2024");
    });
  });
});
