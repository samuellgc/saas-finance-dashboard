import type { Metadata } from "next";
import "@/shared/styles/globals.css";
import { Urbanist } from "next/font/google";
import { ReduxProvider } from "@/shared/providers/redux-provider";
import { ToastContainer } from "react-toastify";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SaaS Finance Dashboard",
  description: "Frontend do SaaS Finance Dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={urbanist.className}
    >
      <body className="data-scroll-locked:overflow-visible! data-scroll-locked:mr-0!">
        <ReduxProvider>
          {children}
          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  );
}
