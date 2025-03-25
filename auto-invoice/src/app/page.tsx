import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";

export default function Home() {
  return (
    <MainLayout>
      <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Invoice Auto-Sender
              </h1>
              <p className="mx-auto max-w-[700px] text-lg md:text-xl text-muted-foreground">
                Automate your invoicing process. Upload once, send automatically
                every month.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <Button
                asChild
                size="lg"
                className="px-8 py-6 text-base md:text-lg"
              >
                <Link href="/auth">Get Started</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="px-8 py-6 text-base md:text-lg"
              >
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="w-full py-16 md:py-24 lg:py-32 bg-muted/30"
        id="features"
      >
        <div className="container px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Features
              </h2>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
                Everything you need to automate your invoicing process.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Google Docs Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Connect with your Google Docs to import your invoice template
                  seamlessly.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Auto-Updating Fields</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Automatically update invoice dates and customize amounts
                  before sending.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Scheduled Sending</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Set up recurring schedules to send invoices to your clients
                  automatically.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Email Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Send professional PDFs directly through Gmail to multiple
                  recipients.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Review Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Get notified before invoices are sent and after successful
                  delivery.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Secure Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Sign in with Google OAuth for secure access to your documents
                  and email.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to get started?
              </h2>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
                Join thousands of freelancers and small businesses who automate
                their invoicing.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="px-8 py-6 text-base md:text-lg"
            >
              <Link href="/auth">Sign Up Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
