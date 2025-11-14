import { Toaster } from "sonner";
import "./../globals.css";
import { AOSConfig } from "@/config/AOS";

export const metadata = {
  title: "5Pets",
  description: "Ultimate platform for pet lovers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <AOSConfig />
        {children}
      </body>
    </html>
  );
}
