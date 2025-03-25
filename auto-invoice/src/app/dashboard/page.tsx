import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="container px-4 md:px-6 lg:px-8 max-w-6xl mx-auto py-8 md:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/invoices/new">Add New Invoice</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Active Invoices</CardTitle>
              <CardDescription>
                Total invoices scheduled for sending
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">3</p>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Sent This Month</CardTitle>
              <CardDescription>
                Invoices successfully sent this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">2</p>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Next Scheduled</CardTitle>
              <CardDescription>
                Date of the next scheduled invoice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">May 1, 2024</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-6">Recent Activity</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
                <div>
                  <p className="font-medium text-base md:text-lg">
                    Monthly Invoice - Client A
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Sent on April 2, 2024
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="self-start sm:self-auto"
                >
                  <Link href="/invoices/1">View</Link>
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
                <div>
                  <p className="font-medium text-base md:text-lg">
                    Monthly Invoice - Client B
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Sent on April 1, 2024
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="self-start sm:self-auto"
                >
                  <Link href="/invoices/2">View</Link>
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
                <div>
                  <p className="font-medium text-base md:text-lg">
                    Monthly Invoice - Client C
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Failed to send on April 1, 2024
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="self-start sm:self-auto"
                >
                  <Link href="/invoices/3">View</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
