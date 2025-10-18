import { Figtree, Kaisei_Decol } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from "@/components/ui/sonner";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const kaisei = Kaisei_Decol({
  variable: "--font-kaisei",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Preglow",
  description: "Preglow Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} ${kaisei.variable} antialiased`}
      >
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
