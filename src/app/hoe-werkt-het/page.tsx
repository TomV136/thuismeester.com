import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import { JSX } from "react";

export const metadata: Metadata = {
    title: "Hoe werkt het",
    description:
        "Ontdek hoe Thuismeester werkt: van inschrijving tot jouw vaste aanspreekpunt in Amersfoort en omstreken.",
};

const steps = [
    {
        number: "01",
        title: "Schrijf je in",
        body: "Meld je vrijblijvend aan via het aanmeldformulier. Je vult je naam, e-mailadres, postcode en woonplaats in. Er zijn geen kosten verbonden aan de aanmelding.",
        // Image: /images/step-aanmelden.jpg
        // Replace with a clean photo of someone filling in a form on a tablet or laptop
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=900&q=80",
        imageAlt: "Aanmelden bij Thuismeester via het formulier",
    },
    {
        number: "02",
        title: "We starten bij voldoende aanmeldingen",
        body: "Thuismeester start in januari 2027 als er genoeg bewoners in Amersfoort en omstreken geregistreerd zijn. Jouw aanmelding helpt ons bepalen of er voldoende vraag is in jouw regio. Je ontvangt een bericht zodra we de startdatum bevestigen.",
        // Image: /images/step-regio.jpg
        // Replace with a calm regional street or neighbourhood photo (Amersfoort / omstreken)
        image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=900&q=80",
        imageAlt: "Rustige woonstraat in Amersfoort en omstreken",
    },
    {
        number: "03",
        title: "Jouw Thuismeester helpt je verder",
        body: "Na de start word je gekoppeld aan een vast aanspreekpunt — jouw Thuismeester. Die leert jou en jouw woning kennen en helpt bij praktische zaken op een betrouwbare, persoonlijke manier.",
        // Image: /images/step-thuismeester.jpg
        // Replace with a warm photo of a Thuismeester in conversation with a homeowner
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80",
        imageAlt: "Jouw Thuismeester helpt bij praktische woningzaken",
    },
];

const exampleScenario = [
    {
        title: "Je meldt het",
        body: "Na een storm hangt de dakgoot los. Je stuurt jouw Thuismeester een berichtje — meer hoef je niet te doen.",
    },
    {
        title: "Wij regelen de juiste vakman",
        body: "Jouw Thuismeester kent de situatie van je woning, schat in wat er nodig is en benadert een betrouwbare vakman uit ons netwerk. Jij ontvangt één helder voorstel met prijs.",
    },
    {
        title: "De klus wordt gedaan — en opgevolgd",
        body: "Na jouw akkoord wordt de afspraak ingepland. Jouw Thuismeester houdt in de gaten dat het werk goed en op tijd gebeurt, en checkt achteraf of alles naar wens is.",
    },
];

/**
 * Section containing the steps of signingup->being notified.
 */
function StepsSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="space-y-28">
                {steps.map((step, i) => (
                    <div
                        key={step.number}
                        className={`grid items-center gap-16 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-last" : ""
                            }`}
                    >
                        {/* Text */}
                        <div>
                            {/* Oversized step number in the faded accent purple */}
                            <p className="font-serif text-6xl font-semibold leading-none text-purple/25">
                                {step.number}
                            </p>
                            <h2 className="mt-4 font-serif text-display-md font-semibold text-ink">
                                {step.title}
                            </h2>
                            <p className="mt-5 max-w-prose text-base leading-relaxed text-ink-muted">
                                {step.body}
                            </p>
                        </div>

                        {/* Image */}
                        <div className="relative aspect-[4/3] overflow-hidden shadow-sm">
                            <Image
                                src={step.image}
                                alt={step.imageAlt}
                                fill
                                className="object-cover object-center"
                                sizes="(min-width: 1024px) 50vw, 100vw"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>);
}

/**
 * Section containing a practical example.
 */
function PracticalExampleSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="mx-auto max-w-3xl text-center">
                <SectionLabel>
                    <span className="text-white/60">In de praktijk</span>
                </SectionLabel>
                <h2 className="font-serif text-display-md font-semibold">
                    Zo gaat dat straks: de losse dakgoot
                </h2>
                <p className="mx-auto mt-5 max-w-prose text-base leading-relaxed text-white/75">
                    Een voorbeeld van hoe een alledaagse woningklus verloopt zodra
                    Thuismeester actief is. Jij houdt de regie, wij doen het
                    regelwerk.
                </p>
            </div>

            <div className="mt-14 grid gap-10 sm:grid-cols-3">
                {exampleScenario.map((step, i) => (
                    <div key={step.title} className="border-l-2 border-purple-300/60 pl-5 text-left">
                        <p className="font-serif text-3xl font-semibold text-white/30">
                            {i + 1}
                        </p>
                        <h3 className="mt-3 font-serif text-lg font-semibold text-white">
                            {step.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-white/70">
                            {step.body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </>);
}

/**
 * Section asking user if they want to sign up.
 */
function PricingInfoSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="mx-auto max-w-3xl">
                <SectionLabel>Helder afgesproken</SectionLabel>
                <h2 className="font-serif text-display-md font-semibold text-ink">
                    Wat het kost, en wat niet
                </h2>
                <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-muted">
                    Het abonnement kost <strong className="text-ink">€10 per maand</strong>.
                    Daarvoor heb je een vaste Thuismeester die jou en je woning kent,
                    die meedenkt bij vragen en beslissingen, en die je toegang geeft
                    tot een netwerk van gescreende vakmensen. Aanmelden vóór de start
                    is gratis en verplicht je tot niets.
                </p>
                <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-muted">
                    Uitvoerend werk — door een vakman of extra hulp van je
                    Thuismeester — valt buiten het abonnement en wordt altijd vooraf
                    besproken: tegen uurtarief of op offertebasis. Je komt dus nooit
                    voor verrassingen te staan.
                </p>
                <p className="mt-6 max-w-prose text-sm leading-relaxed text-ink-muted">
                    Meer weten? Bekijk de{" "}
                    <Link href="/veelgestelde-vragen" className="font-medium text-green underline underline-offset-2 hover:text-green-light">
                        veelgestelde vragen
                    </Link>
                    .
                </p>
            </div>
        </div>
    </>);
}

/**
 * @returns the 'how does it work' page
 */
export default function HoeWerktHetPage() {
    return (
        <>
            <PageHeader
                label="Werkwijze"
                title="Hoe werkt het?"
                intro="Van aanmelding tot jouw vaste aanspreekpunt — in drie heldere
                    stappen."
                silhouetteVariant="stepped"
            />

            <Section background="beige" scene="court" sceneWidth="w-96">
                <StepsSection />
            </Section>

            <Section background="green" scene="stepped" sceneWidth="w-80">
                <PracticalExampleSection />
            </Section>

            <Section background="mint" scene="orchard" sceneWidth="w-[26rem]">
                <PricingInfoSection />
            </Section>
        </>
    );
}
