import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import TabBar from "@/components/TabBar";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Level Up",
  description: "Track your progress and level up in real life",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${rubik.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="flex-1">{children}</div>
        <TabBar />
      </body>
    </html>
  );
}
