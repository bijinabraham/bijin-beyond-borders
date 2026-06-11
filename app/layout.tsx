import type { Metadata } from "next";
import { Josefin_Sans, Nunito_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import "./globals.css";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bijin Beyond Borders",
  description: "Travels, projects, and the spaces between: collected by someone who looks slowly and moves often.",
  openGraph: {
    title: "Bijin Beyond Borders",
    description: "Travels, projects, and the spaces between.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${josefinSans.variable} ${nunitoSans.variable}`}>
        <SmoothScroll>
          <Loader />
          <Cursor />
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
