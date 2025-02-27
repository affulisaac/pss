import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import ObservabilityInit from "@/components/common/Observability";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hubtel Programmable Service Simulator",
  description: "A modern simulator for testing programmable service flows",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ObservabilityInit />
        <ErrorBoundary>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Toaster richColors />
        </ErrorBoundary>
      </body>
    </html>
  );
}
