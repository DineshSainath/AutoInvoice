import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FileUpload } from "./index";

// Mock document processor
jest.mock("../../services/documentProcessor", () => ({
  parseDocxFile: jest.fn().mockResolvedValue({
    content: "Parsed content",
    preview: "Document preview",
  }),
}));

// Mock react-dropzone
jest.mock("react-dropzone", () => ({
  useDropzone: () => {
    const mockOnDrop = jest.fn();
    return {
      getRootProps: () => ({
        onClick: () => {},
        onDrop: mockOnDrop,
        "data-testid": "dropzone",
      }),
      getInputProps: () => ({
        "data-testid": "file-input",
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.files) {
            mockOnDrop(Array.from(event.target.files));
          }
        },
      }),
      isDragActive: false,
      acceptedFiles: [],
    };
  },
}));

describe("FileUpload Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders upload area", () => {
    render(<FileUpload onFileProcess={() => {}} />);
    expect(screen.getByText(/drop your docx file here/i)).toBeInTheDocument();
  });

  test("handles file upload via clicking", async () => {
    const mockOnFileProcess = jest.fn();
    render(<FileUpload onFileProcess={mockOnFileProcess} />);

    const input = screen.getByTestId("file-input");
    const mockFile = new File(["test content"], "test.docx", {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    fireEvent.change(input, { target: { files: [mockFile] } });

    await waitFor(() => {
      expect(mockOnFileProcess).toHaveBeenCalledWith({
        content: "Parsed content",
        preview: "Document preview",
        fileName: "test.docx",
      });
    });
  });

  test("shows loading state during file processing", async () => {
    const mockOnFileProcess = jest.fn();
    render(<FileUpload onFileProcess={mockOnFileProcess} />);

    const input = screen.getByTestId("file-input");
    const mockFile = new File(["test content"], "test.docx", {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    fireEvent.change(input, { target: { files: [mockFile] } });

    expect(screen.getByText(/Processing document/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.queryByText(/Processing document/i)
      ).not.toBeInTheDocument();
    });
  });

  test("shows error message for non-docx files", async () => {
    const mockOnFileProcess = jest.fn();
    render(<FileUpload onFileProcess={mockOnFileProcess} />);

    const input = screen.getByTestId("file-input");
    const mockFile = new File(["test content"], "test.pdf", {
      type: "application/pdf",
    });

    fireEvent.change(input, { target: { files: [mockFile] } });

    await waitFor(() => {
      expect(
        screen.getByText(/only docx files are supported/i)
      ).toBeInTheDocument();
    });
  });
});
