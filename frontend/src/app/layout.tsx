import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: any) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}