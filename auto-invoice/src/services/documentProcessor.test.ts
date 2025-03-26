import { parseDocxFile } from "./documentProcessor";

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
      this.result = "test content";
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

  test("parseDocxFile should convert docx file to html", async () => {
    // Create a mock file
    const mockFile = new File(["test content"], "test.docx", {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // Mock arrayBuffer method
    mockFile.arrayBuffer = jest.fn().mockResolvedValue(new ArrayBuffer(0));
    mockFile.text = jest.fn().mockResolvedValue("test content");

    const result = await parseDocxFile(mockFile);

    expect(result).toEqual({
      content: "test content",
      preview: "<p>Converted HTML</p>",
    });
  });

  test("parseDocxFile should throw an error if not a docx file", async () => {
    // Create a mock file with wrong type
    const mockFile = new File(["test content"], "test.pdf", {
      type: "application/pdf",
    });

    await expect(parseDocxFile(mockFile)).rejects.toThrow(
      "Only DOCX files are supported"
    );
  });

  test("parseDocxFile should handle conversion errors", async () => {
    // Mock implementation to simulate error
    const mammoth = require("mammoth");
    mammoth.convertToHtml.mockRejectedValueOnce(new Error("Conversion error"));

    const mockFile = new File(["test content"], "test.docx", {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // Mock arrayBuffer method
    mockFile.arrayBuffer = jest.fn().mockResolvedValue(new ArrayBuffer(0));
    mockFile.text = jest.fn().mockResolvedValue("test content");

    await expect(parseDocxFile(mockFile)).rejects.toThrow(
      "Error processing document: Conversion error"
    );
  });
});
