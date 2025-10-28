import "./globals.css";

export const metadata = {
  title: "5Pets",
  description: "Ultimate platform for pet lovers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
