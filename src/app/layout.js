"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/redux/store.js";
import WebsiteHeader from "@/components/websiteHeader/WebsiteHeader";
import WebsiteFooter from "@/components/websiteFooter/WebsiteFooter";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <WebsiteHeader />
          {children}
          <WebsiteFooter />
        </Provider>
      </body>
    </html>
  );
}
