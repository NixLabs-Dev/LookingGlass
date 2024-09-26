import type { Metadata } from "next";
import localFont from "next/font/local";
import "@public/globals.scss";
import NavBar from "@/components/NavBar";

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NixLabs Networks",
  description: "Boldly powering projects across the net with affordable, stable, and reliable network, cloud, and collocation services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <link rel="icon" type="image/png" href="/logo.png" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
