import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AppointmentProvider } from "@/components/providers/appointment-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Slotly — Расписание студии",
  description: "Единое расписание для студии маникюра",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <header className="border-b border-border px-4 sm:px-6 py-3">
          <div className="max-w-5xl mx-auto flex items-center gap-2">
            <span className="font-semibold text-sm tracking-tight">Slotly</span>
            <span className="text-xs text-muted-foreground">—</span>
            <span className="text-sm text-muted-foreground">Студия маникюра</span>
          </div>
        </header>
        <AppointmentProvider>{children}</AppointmentProvider>
      </body>
    </html>
  )
}
