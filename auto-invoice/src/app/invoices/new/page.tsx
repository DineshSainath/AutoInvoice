import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function NewInvoicePage() {
  return (
    <MainLayout>
      <div className="container max-w-3xl px-4 md:px-6 lg:px-8 mx-auto py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Create New Invoice
          </h1>
          <p className="text-muted-foreground text-lg">
            Set up a new recurring invoice to be sent automatically.
          </p>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Invoice Details</CardTitle>
            <CardDescription>
              Enter the information for your new invoice.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-8">
              <div className="space-y-6">
                <div className="grid gap-3">
                  <Label htmlFor="invoice-name" className="text-base">
                    Invoice Name
                  </Label>
                  <Input
                    id="invoice-name"
                    placeholder="e.g., Monthly Invoice - Client A"
                    className="h-12"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="google-doc-link" className="text-base">
                    Google Doc Link
                  </Label>
                  <Input
                    id="google-doc-link"
                    placeholder="https://docs.google.com/document/d/..."
                    className="h-12"
                  />
                  <p className="text-sm text-muted-foreground">
                    Paste the link to your Google Docs invoice template
                  </p>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="invoice-amount" className="text-base">
                    Invoice Amount
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-muted-foreground">$</span>
                    </div>
                    <Input
                      id="invoice-amount"
                      className="pl-8 h-12"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="recipient-emails" className="text-base">
                    Recipient Emails
                  </Label>
                  <Input
                    id="recipient-emails"
                    placeholder="client@example.com, accounting@example.com"
                    className="h-12"
                  />
                  <p className="text-sm text-muted-foreground">
                    Separate multiple emails with commas
                  </p>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="send-day" className="text-base">
                    Send Day (Monthly)
                  </Label>
                  <Input
                    id="send-day"
                    type="number"
                    min="1"
                    max="28"
                    placeholder="1"
                    className="h-12"
                  />
                  <p className="text-sm text-muted-foreground">
                    Day of the month to send the invoice (1-28)
                  </p>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="email-subject" className="text-base">
                    Email Subject
                  </Label>
                  <Input
                    id="email-subject"
                    placeholder="Monthly Invoice - April 2024"
                    className="h-12"
                  />
                  <p className="text-sm text-muted-foreground">
                    The month will automatically update
                  </p>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="email-body" className="text-base">
                    Email Body
                  </Label>
                  <textarea
                    id="email-body"
                    className="min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-base"
                    placeholder="Dear client, 

Please find attached the invoice for this month's services.

Thank you for your business.

Regards,
Your Name"
                  ></textarea>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:justify-end">
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <Link href="/invoices">Cancel</Link>
                </Button>
                <Button className="w-full sm:w-auto">Create Invoice</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
