import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import Providers from "./components/Providers";
import HookProvider from "./components/HookProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Up Enerji",
  description: "Up Enerji",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <HookProvider>
            <div className="bg-transparent mx-auto">
              <main className="flex flex-col justify-between items-center">
                {children}
              </main>
            </div>
          </HookProvider>
        </Providers>
      </body>
    </html>
  );
}
