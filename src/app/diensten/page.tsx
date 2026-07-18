import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import ServicesCarousel from "@/components/ServicesCarousel";
import { JSX } from "react";

export const metadata: Metadata = {
    title: "Diensten",
    description:
        "Bekijk wat Thuismeester voor jou kan betekenen: van praktische ondersteuning tot begeleiding bij vakmensen. Voor bewoners in Amersfoort en omstreken.",
};

// -------------------------------------------------------
// Main service categories — keep wording broad and professional
// Add or remove services as the offering develops
// -------------------------------------------------------
const services = [
    {
        title: "Vast aanspreekpunt",
        description:
            "Je hebt één vaste persoon die jou en jouw woning kent. Geen zoekwerk, geen uitleggen van vooraf — gewoon bellen of sturen als er iets is.",
        detail:
            "Jouw Thuismeester leert je situatie kennen en denkt actief mee bij vragen en beslissingen rondom je woning.",
    },
    {
        title: "Meedenken bij praktische zaken",
        description:
            "Of het nu gaat om een verbouwingsvraag, een lekkage of onduidelijkheid over een offerte — Thuismeester helpt je nadenken en de juiste stappen te zetten.",
        detail:
            "Niet als aannemer of vakman, maar als een betrouwbare organisator die jou helpt de regie te houden.",
    },
    {
        title: "Onderhoud en kleine organisatievragen",
        description:
            "Regulier woningonderhoud vereist planning en overzicht. Thuismeester helpt je daar grip op te houden.",
        detail:
            "Van het plannen van schilderwerk tot het bijhouden van servicetermijnen — kleine zaken die anders blijven liggen.",
    },
    {
        title: "Doorverwijzing naar vakmensen",
        description:
            "Thuismeester beschikt over een netwerk van gescreende, betrouwbare vakmensen in de regio.",
        detail:
            "Je hoeft niet zelf te zoeken, vergelijken of te gokken — Thuismeester verbindt je met de juiste persoon voor de klus.",
    },
    {
        title: "Coördinatie van werkzaamheden",
        description:
            "Thuismeester coördineert bij terugkerende of eenmalige woningzaken, zodat jij er zo min mogelijk aan hoeft te denken.",
        detail:
            "Van het inplannen van een vakman tot het opvolgen van een offerte — Thuismeester houdt de regie.",
    },
    {
        title: "Advies en second opinion",
        description:
            "Twijfel je over een offerte, aanpak of beslissing rondom je woning? Thuismeester denkt met je mee en geeft een helder beeld.",
        detail:
            "Geen partijdig advies, maar een eerlijke blik vanuit de belangen van de bewoner.",
    },
];

/**
 * Section showing all services that thuismeester offers.
 * Services arranged in a carousel.
 */
function ServicesSection(): JSX.Element {
    return (<>
        {/* Shifted left of centre. Adjust the pixel value to taste; only
          Tailwind's own steps (…-6, …-24, …-48) or an arbitrary [value]
          work here — a made-up step like -translate-x-50 generates nothing. */}
        <div className="section-wrapper lg:-translate-x-[200px]">
            <ServicesCarousel services={services} />
        </div>
    </>);
}

/**
 * Section describing what thuismeester does not do.
 */
function WhatDoesThuismeesterNotDoSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="mx-auto max-w-3xl">
                <SectionLabel>Afbakening</SectionLabel>
                <h2 className="font-serif text-display-md font-semibold text-ink">
                    Wat doet Thuismeester niet?
                </h2>
                <p className="mt-5 text-base leading-relaxed text-ink-muted">
                    Thuismeester is geen vakman, aannemer, schoonmaakdienst of
                    boodschappenservice. De focus ligt op organisatie, advies en het
                    verbinden van bewoners met de juiste mensen. Werkzaamheden die
                    specifieke vakkennis vereisen, worden uitgevoerd door ons netwerk
                    van vakmensen — Thuismeester coördineert.
                </p>
            </div>
        </div>
    </>);
}

/**
 * Section with pricing information and button to sign up page.
 */
function PricingSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="grid items-center gap-12 lg:grid-cols-2">
                <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80"
                        alt="Betrouwbaar en persoonlijk contact met jouw Thuismeester"
                        fill
                        className="object-cover object-center"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                </div>
                <div>
                    <SectionLabel>
                        <span className="text-white/60">Tarief</span>
                    </SectionLabel>
                    <h2 className="font-serif text-display-md font-semibold text-white">
                        Vanaf €10 per maand
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-white/75">
                        Het vaste abonnement van €10 per maand geeft je toegang tot
                        Thuismeester. Extra hulp en werkzaamheden worden uitgevoerd
                        tegen uurtarief of op offertebasis — altijd transparant en
                        vooraf besproken.
                    </p>
                    <div className="mt-8">
                        <Button href="/aanmelden" size="lg"
                            className="bg-white text-green hover:bg-beige">
                            Aanmelden
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

/**
 * @returns the services page
 */
export default function ServicesPage() {
    return (
        <>
            <PageHeader
                label="Wat we doen"
                title="Diensten"
                intro="Thuismeester biedt praktische ondersteuning rondom je woning — van
                    organisatie en advies tot coördinatie en vakmansnetwerk."
                silhouetteVariant="tall"
                image={{
                    src: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=1800&q=80",
                    alt: "Gewone gezinswoning in Amersfoort — praktische hulp bij woningzaken",
                }}
            />

            <Section background="beige-light" scene="orchard" sceneWidth="w-[26rem]">
                <ServicesSection />
            </Section>

            <Section background="green" scene="lane" sceneWidth="w-[30rem]">
                <WhatDoesThuismeesterNotDoSection />
            </Section>

            <Section background="mint" scene="row" sceneWidth="w-[36rem]">
                <PricingSection />
            </Section>
        </>
    );
}
