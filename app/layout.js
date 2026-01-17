import "./globals.css"

export const metadata = {
  title: "Vega AI",
  description: "Text-to-image generation powered by Cloudflare",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50 antialiased">
        {children}
      </body>
    </html>
  )
}