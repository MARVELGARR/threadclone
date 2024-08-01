
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import Session_Provider from "@/providers/session-provider";
import { ourFileRouter } from "./api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import Header from "@/components/myComponents/header";
import MobileNav from "@/components/myComponents/mobile-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "Home page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Session_Provider>
          
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
            <div className="">
              <Header className='py-4 sticky top-0 bg-white z-50'/>
              <MobileNav className=" lg:hidden z-[999] bg-white absolute bottom-0"/>
              <div className=' p-[2rem] lg:p-[0] overflow-y-auto overflow-auto'>

                {children}
              </div>
            </div>
          </ThemeProvider>
        </Session_Provider>
      </body>
    </html>
  );
}
