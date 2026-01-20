import localFont from "next/font/local";
import "./globals.css";

const sfPro = localFont({
  src: [
    {
      path: "../public/fonts/SF-Pro-Display-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Display-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Display-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro",
});

export const metadata = {
  title: "FLUX - Urban & Action Sports Apparel",
  description:
    "Shop the latest urban and action sports collection - BMX, Skateboarding, and Urban wear",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sfPro.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
