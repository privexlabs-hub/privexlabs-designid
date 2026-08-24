import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: {
    default: "PrivexLabs Brand Kit",
    template: "%s · PrivexLabs Brand Kit",
  },
  description:
    "The PrivexLabs brand identity playbook and template editor — tokens, assets, voice, and 130 exportable social, ad, email and web templates.",
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/png/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/png/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/brand/png/favicon-180.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0E5A4A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="px-shell">
          <SiteHeader />
          <main>{children}</main>
          <footer className="px-footer">
            <div className="px-container" style={{ display: "flex", gap: "var(--space-5)", flexWrap: "wrap", justifyContent: "space-between" }}>
              <span>PrivexLabs Design System — brand identity playbook and template editor.</span>
              <span className="px-label">TOKENS ONLY · ONE ACCENT · NO HYPE</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
