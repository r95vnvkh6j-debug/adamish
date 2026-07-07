import "./globals.css";

export const metadata = {
  title: "Adamish Uploader",
  description: "No More Compression On TikTok",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}