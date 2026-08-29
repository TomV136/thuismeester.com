import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { REGION_NOTE } from "@/lib/site";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// -------------------------------------------------------
// Fonts
// Using Next.js built-in Google Font optimisation.
// Playfair Display → headings (elegant, premium serif)
// Inter             → body text (clean, legible sans-serif)
// -------------------------------------------------------
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

// -------------------------------------------------------
// Global SEO metadata
// Customise per-page via generateMetadata() in each page file.
// -------------------------------------------------------
export const metadata: Metadata = {
    title: {
        default: `Thuismeester — Jouw onafhankelijke thuisadviseur voor ${REGION_NOTE}`,
        template: "%s | Thuismeester",
    },
    description:
        "Jouw onafhankelijke thuisadviseur — voor onderhoud, reparaties en betrouwbare vakmensen. Voor bewoners in Amersfoort, Leusden, Hoevelaken, Nijkerk en Soest. Vanaf €10 per maand.",
    keywords: [
        "thuismeester",
        "Amersfoort",
        "onafhankelijk advies",
        "woningonderhoud",
        "second opinion offerte",
        "betrouwbare vakmensen",
        "Leusden",
        "Hoevelaken",
        "Nijkerk",
        "Soest",
    ],
    authors: [{ name: "Thuismeester" }],
    openGraph: {
        title: `Thuismeester — Jouw onafhankelijke thuisadviseur voor ${REGION_NOTE}`,
        description:
            "Jouw onafhankelijke thuisadviseur — voor onderhoud, reparaties en betrouwbare vakmensen.",
        locale: "nl_NL",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="nl" className={`${inter.variable} ${playfair.variable}`}>
            <body className="flex min-h-screen flex-col">
                <Navigation />
                <main className="flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
