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

export default function AuthPage() {
  return (
    <MainLayout>
      <div className="container flex items-center justify-center py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8">
        <Card className="mx-auto max-w-sm w-full shadow-lg">
          <CardHeader className="space-y-2 text-center pb-8">
            <CardTitle className="text-2xl md:text-3xl font-bold">
              Sign in
            </CardTitle>
            <CardDescription className="text-base">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-5">
              <Button className="w-full py-6 text-base" variant="outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="mr-2 h-5 w-5"
                >
                  <path
                    fill="currentColor"
                    d="M12.545 12.151L12.545 12.151L12.545 12.151L12.545 12.151L12.545 12.151L12.544 12.15C11.746 13.311 10.316 14 8.75 14C6.126 14 4 11.873 4 9.25C4 6.626 6.126 4.5 8.75 4.5C10.299 4.5 11.715 5.171 12.518 6.311L12.526 6.323L10.295 8.77L10.278 8.751C9.988 8.44 9.392 8.125 8.75 8.125C8.01 8.125 7.42 8.362 7.02 8.764C6.621 9.164 6.38 9.747 6.38 10.5C6.38 11.235 6.616 11.819 7.013 12.223C7.413 12.63 8.009 12.875 8.75 12.875C9.129 12.875 9.476 12.789 9.776 12.625C10.077 12.461 10.309 12.239 10.464 11.98L8.499 11.98V9.874L13.291 9.874C13.363 10.124 13.405 10.373 13.405 10.624C13.405 10.916 13.373 11.199 13.312 11.471C13.251 11.744 13.155 12.01 13.028 12.264L13.019 12.284L12.545 12.151Z"
                  />
                  <path
                    fill="currentColor"
                    d="M16.25 9.75H19V12H16.25V14.75H14V12H11.25V9.75H14V7H16.25V9.75Z"
                  />
                </svg>
                Continue with Google
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              <div className="grid gap-2 text-center">
                <p className="text-sm text-muted-foreground">
                  By clicking continue, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="underline underline-offset-4 hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-4 hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
