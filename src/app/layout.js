import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "./providers";
import { Toaster } from "react-hot-toast"; 
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <Head>
      <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <body
        style={{
          backgroundImage: "url('Layout2.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </SessionProvider>
      </body>
    </html>
  );
}
