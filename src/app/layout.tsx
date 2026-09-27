import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/context/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { ToastContainer } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "NOIR — Modern Dining | Haute Cuisine & Sensory Experiences",
  description:
    "Contemporary Indian fine dining crafted around bold flavors, seasonal provenance, and unforgettable moments. Reserve your table or indulge in our tasting menu.",
  keywords: ["fine dining", "modern Indian", "luxury restaurant", "NOIR", "tasting menu", "reservations"],
  authors: [{ name: "NOIR Culinary Atelier" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-noir-black text-cream-200 antialiased min-h-screen flex flex-col font-sans selection:bg-gold-500 selection:text-noir-black">
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CartDrawer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
