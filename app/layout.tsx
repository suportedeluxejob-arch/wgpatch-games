import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { SocialProofNotifications } from "@/components/social-proof-notifications"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WG PATCH - Patches de Futebol para Consoles e PC",
  description: "O patch mais completo e realista do mercado para PS4, PS5, Xbox e PC",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        <WhatsAppFloat />
        <SocialProofNotifications />

        {/* Utmify Pixel Tracking */}
        <Script id="utmify-pixel" strategy="afterInteractive">
          {`
            window.pixelId = "68c46a0cc92e42d03e29ece4";
            var a = document.createElement("script");
            a.setAttribute("async", "");
            a.setAttribute("defer", "");
            a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
            document.head.appendChild(a);
          `}
        </Script>

        {/* Utmify UTM Tracking */}
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          strategy="afterInteractive"
          data-utmify-prevent-xcod-sck=""
          data-utmify-prevent-subids=""
        />
      </body>
    </html>
  )
}
