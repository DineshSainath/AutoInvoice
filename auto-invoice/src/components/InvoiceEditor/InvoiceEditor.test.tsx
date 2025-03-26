import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InvoiceEditor, InvoiceData } from "./InvoiceEditor";

describe("InvoiceEditor", () => {
  const mockOnSave = jest.fn();
  const initialData: InvoiceData = {
    date: "2024-02-20",
    invoiceNo: "INV-001",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with initial data", () => {
    render(<InvoiceEditor initialData={initialData} onSave={mockOnSave} />);

    expect(screen.getByLabelText(/date/i)).toHaveValue("2024-02-20");
    expect(screen.getByLabelText(/invoice no/i)).toHaveValue("INV-001");
  });

  test("updates form fields on change", () => {
    render(<InvoiceEditor initialData={initialData} onSave={mockOnSave} />);

    const dateInput = screen.getByLabelText(/date/i);
    const invoiceNoInput = screen.getByLabelText(/invoice no/i);

    fireEvent.change(dateInput, { target: { value: "2024-02-21" } });
    fireEvent.change(invoiceNoInput, { target: { value: "INV-002" } });

    expect(dateInput).toHaveValue("2024-02-21");
    expect(invoiceNoInput).toHaveValue("INV-002");
  });

  test("calls onSave with updated data on form submission", () => {
    render(<InvoiceEditor initialData={initialData} onSave={mockOnSave} />);

    const dateInput = screen.getByLabelText(/date/i);
    const invoiceNoInput = screen.getByLabelText(/invoice no/i);

    fireEvent.change(dateInput, { target: { value: "2024-02-21" } });
    fireEvent.change(invoiceNoInput, { target: { value: "INV-002" } });

    fireEvent.click(screen.getByText(/update invoice/i));

    expect(mockOnSave).toHaveBeenCalledWith({
      date: "2024-02-21",
      invoiceNo: "INV-002",
    });
  });

  test("disables submit button when loading", () => {
    render(
      <InvoiceEditor
        initialData={initialData}
        onSave={mockOnSave}
        isLoading={true}
      />
    );

    expect(screen.getByText(/updating/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
