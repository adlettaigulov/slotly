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
  title: "Belle Nails — Расписание студии",
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
      <body className="h-full flex flex-col">
        <header className="bg-white border-b border-primary/15 px-4 sm:px-6 py-3 sm:py-3.5 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]">
          <div className="max-w-5xl mx-auto flex items-center gap-3 sm:gap-2.5">
            <div className="flex h-9 w-9 sm:h-7 sm:w-7 items-center justify-center rounded-xl sm:rounded-lg bg-primary text-primary-foreground shadow-sm">
              <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" className="w-4 h-4 sm:w-3.5 sm:h-3.5">
                <rect x="1" y="2.5" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
                <path d="M4.5 0.5V4.5M9.5 0.5V4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M1 6.5H13" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="7" cy="9" r="1" fill="currentColor" />
                <circle cx="10" cy="9" r="1" fill="currentColor" />
                <circle cx="4" cy="9" r="1" fill="currentColor" />
              </svg>
            </div>
            <span className="font-bold text-lg sm:text-base tracking-tight text-foreground leading-none">Belle Nails</span>
            <span className="text-muted-foreground/40 select-none text-lg sm:text-base leading-none">·</span>
            <span className="text-[15px] sm:text-sm text-muted-foreground leading-none">Студия маникюра</span>
          </div>
        </header>
        <div className="flex-1 flex flex-col min-h-0">
          <AppointmentProvider>{children}</AppointmentProvider>
        </div>
      </body>
    </html>
  )
}
