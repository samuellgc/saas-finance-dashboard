import type { Metadata } from "next";
import "@/shared/styles/globals.css";
import { Urbanist } from "next/font/google";
import { ReduxProvider } from "@/shared/providers/redux-provider";
import { ToastContainer } from "react-toastify";
import { themeInitializationScript } from "@/shared/lib/theme";

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
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased data-scroll-locked:overflow-visible! data-scroll-locked:mr-0!">
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static inline script to apply the saved theme before hydration */}
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
        <ReduxProvider>
          {children}
          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  );
}
