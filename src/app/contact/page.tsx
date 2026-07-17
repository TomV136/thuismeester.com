import type { Metadata } from "next";
import Image from "next/image";
import SectionLabel from "@/components/SectionLabel";
import ContactForm from "@/components/ContactForm";
import HouseSilhouette from "@/components/HouseSilhouette";
import { JSX } from "react";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Neem contact op met Thuismeester. Actief in voorbereiding voor Amersfoort en omstreken.",
};

/**
 * The top section.
 */
function TopSection(): JSX.Element {
    return (<>
        <HouseSilhouette variant="stepped" className="right-0 w-72 text-white/[0.08]" />
        <div className="section-wrapper">
            <SectionLabel>
                <span className="text-white/60">Bereikbaarheid</span>
            </SectionLabel>
            <h1 className="font-serif text-display-lg font-semibold">
                Contact
            </h1>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-white/75">
                Heb je een vraag over Thuismeester, de aanmelding of de dienst?
                Neem gerust contact op.
            </p>
        </div>
    </>);
}

/**
 * The form component.
 */
function Form(): JSX.Element {
    return (<>
        <div className="bg-white p-8 shadow-sm sm:p-12">
            <h2 className="font-serif text-2xl font-semibold text-ink">
                Stuur een bericht
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
                We reageren zo snel mogelijk, doorgaans binnen één werkdag.
            </p>
            <div className="mt-8">
                <ContactForm />
            </div>
        </div>
    </>);
}

/**
 * The sidebar element.
 */
function Sidebar(): JSX.Element {
    return (<>
        <aside className="space-y-8">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=700&q=80"
                    alt="Thuismeester — betrouwbaar aanspreekpunt in Amersfoort"
                    fill
                    className="object-cover object-center"
                    sizes="340px"
                />
            </div>

            {/* Contact details */}
            <div className="space-y-5">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                        Regio
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">
                        Actief in voorbereiding voor{" "}
                        <strong>Amersfoort en omstreken</strong>
                    </p>
                    <p className="mt-1 text-xs text-ink-muted">
                        Amersfoort · Leusden · Hoevelaken · Nijkerk · Soest
                    </p>
                </div>

                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                        Start
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">
                        Januari 2027, bij voldoende aanmeldingen
                    </p>
                </div>
            </div>
        </aside>
    </>);
}

export default function ContactPage() {
    return (
        <>
            <section className="bg-green py-20 text-white">
                <TopSection />
            </section>

            <section className="bg-beige-light py-section">
                <HouseSilhouette variant="gable" className="right-0 w-80 text-green/[0.07]" />
                <div className="section-wrapper">
                    <div className="grid items-start gap-16 lg:grid-cols-[1fr_340px]">
                        <Form />
                        <Sidebar />
                    </div>
                </div>
            </section>
        </>
    );
}
