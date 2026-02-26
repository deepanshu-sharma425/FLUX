import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FramerPage } from "./FramerPage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FLUX - Streetwear for the Bold",
  description: "FLUX is a streetwear brand that embodies the spirit of urban culture. Our collections are designed for those who dare to stand out and embrace the energy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FramerPage>{children}</FramerPage>
      </body>
    </html>
  );
}
