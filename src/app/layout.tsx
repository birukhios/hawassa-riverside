import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hawassa Lakeside | Build the Lakefront Park",
  description:
    "Help build the Hawassa Lakeside — a lakefront park with promenades, playgrounds, water attractions and gathering spaces. Donate securely with AfroPay from anywhere, in any currency.",
  keywords:
    "Hawassa, Hawassa Lakeside, lakefront, park, fundraising, donation, Lake Hawassa, AfroPay",
  openGraph: {
    title: "Hawassa Lakeside",
    description:
      "Let's build the Hawassa Lakeside — a lakefront park for every family.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1488521787991-ed7fe863a37f?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Hawassa Community Fund",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
