import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { UserProfileProvider } from "@/context/UserProfileContext";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Ritmo",
  description: "Ritmo é um aplicativo de gerenciamento de vendas e comissões para vendedores autônomos.",
};



export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased dark`}
    >
      <body className="overflow-hidden h-full max-w-lg mx-auto">
        <UserProfileProvider>
          {children}
          <Toaster />
        </UserProfileProvider>

      </body>
    </html>
  );
}