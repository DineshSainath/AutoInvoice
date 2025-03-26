import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DocumentPreview } from "./index";

describe("DocumentPreview Component", () => {
  const mockDocumentData = {
    fileName: "test-invoice.docx",
    preview: "<p>This is a test invoice</p><p>Amount: $100</p>",
    content: "Test content",
  };

  test("renders the document preview", () => {
    render(
      <DocumentPreview documentData={mockDocumentData} onEdit={() => {}} />
    );

    expect(screen.getByText(/test-invoice.docx/i)).toBeInTheDocument();
    expect(screen.getByText(/this is a test invoice/i)).toBeInTheDocument();
    expect(screen.getByText(/amount: \$100/i)).toBeInTheDocument();
  });

  test("calls onEdit when edit button is clicked", () => {
    const mockOnEdit = jest.fn();
    render(
      <DocumentPreview documentData={mockDocumentData} onEdit={mockOnEdit} />
    );

    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  test("renders placeholder when no document data is provided", () => {
    render(<DocumentPreview documentData={null} onEdit={() => {}} />);

    expect(screen.getByText(/no document uploaded/i)).toBeInTheDocument();
  });
});
