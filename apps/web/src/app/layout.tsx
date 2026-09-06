import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://3bmotor.com"),
  title: {
    default: "3B Motors Mobility Operating System",
    template: "%s | 3B Motors"
  },
  description:
    "3B Motors Mobility Operating System for vehicles, parts, service, financing, fulfillment, and intelligence.",
  robots: {
    index: false,
    follow: false
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
