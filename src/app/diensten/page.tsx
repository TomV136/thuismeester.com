import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import { JSX } from "react";

export const metadata: Metadata = {
    title: "Diensten",
    description:
        "Thuismeester biedt twee dingen: onafhankelijk advies over je woning, en de juiste vakman geregeld en gecoördineerd. Voor bewoners in Amersfoort en omstreken.",
};

/**
 * Section describing the first service pillar: independent advice.
 */
function AdviceSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="mx-auto max-w-3xl">
                <SectionLabel>Dienst één</SectionLabel>
                <h2 className="font-serif text-display-md font-semibold text-ink">
                    Onafhankelijk advies
                </h2>
                <p className="mt-5 text-base leading-relaxed text-ink-muted">
                    Een verbouwingsplan, een lekkage, een offerte waar je niet
                    uitkomt: ik denk met je mee, zet de opties op een rij en help
                    je de juiste beslissing nemen. Niet als aannemer of verkoper,
                    maar als iemand die naast jou staat en alleen jouw belang
                    dient.
                </p>
                {/* Concrete example — purple accent border, like elsewhere on the site */}
                <div className="mt-8 border-l-2 border-purple pl-5">
                    <p className="text-base leading-relaxed text-ink-muted">
                        Bijvoorbeeld: je hebt een offerte van €4.500 voor dakwerk.
                        Ik beoordeel of de prijs en aanpak kloppen, vóórdat je
                        tekent. Of: het buitenschilderwerk is over twee jaar aan de
                        beurt — ik signaleer dat op tijd, zodat het geen
                        achterstallig onderhoud wordt.
                    </p>
                </div>
            </div>
        </div>
    </>);
}

/**
 * Section describing the second service pillar: vetted professionals and
 * coordination of the work.
 */
function ProfessionalsSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="mx-auto max-w-3xl">
                <SectionLabel>Dienst twee</SectionLabel>
                <h2 className="font-serif text-display-md font-semibold text-ink">
                    Vakmensen &amp; coördinatie
                </h2>
                <p className="mt-5 text-base leading-relaxed text-ink-muted">
                    Geen reviews doorspitten of gokken op een onbekende klusser.
                    Ik werk met een netwerk van gescreende, betrouwbare vakmensen
                    uit de regio die ik persoonlijk ken — en blijf aanspreekbaar
                    op de kwaliteit van hun werk. Van het aanvragen van de offerte
                    tot het inplannen, opvolgen en controleren van de klus: ik
                    houd de regie, zodat jij er niet achteraan hoeft te bellen.
                    Jij krijgt één helder voorstel vooraf en één terugkoppeling
                    achteraf.
                </p>
            </div>
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
                    Duidelijkheid werkt twee kanten op. Thuismeester is geen
                    vakman, aannemer, schoonmaakdienst of boodschappenservice — en
                    doet dus zelf geen uitvoerend werk dat specifieke vakkennis
                    vereist. Dat werk laat ik bewust over aan de gescreende
                    vakmensen uit mijn netwerk, die er hun vak van hebben gemaakt.
                    Mijn meerwaarde zit in alles eromheen: weten wie je moet
                    hebben, afspraken maken en bewaken, meedenken en het overzicht
                    houden.
                </p>
            </div>
        </div>
    </>);
}

/**
 * Section with a short price reference and the single page CTA.
 */
function PricingSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="mx-auto max-w-3xl text-center">
                <SectionLabel>Prijs</SectionLabel>
                <h2 className="font-serif text-display-md font-semibold text-ink">
                    €10 per maand
                </h2>
                <p className="mx-auto mt-5 max-w-prose text-base leading-relaxed text-ink-muted">
                    €10 per maand voor advies, aanspreekpunt en toegang tot het
                    vakmensennetwerk. Bekijk de volledige prijsopbouw op de{" "}
                    <Link href="/" className="font-medium text-green underline underline-offset-2 hover:text-purple">
                        homepage
                    </Link>.
                </p>
                <div className="mt-8">
                    <Button href="/aanmelden" size="lg">
                        Nieuwsgierig? Meld je vrijblijvend aan
                    </Button>
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
                intro="Thuismeester biedt twee dingen: een onafhankelijk advies over je
                    woning, en — als je dat wilt — de juiste vakman geregeld en
                    gecoördineerd. Geen zes losse diensten, maar één duidelijke
                    belofte."
                silhouetteVariant="tall"
                image={{
                    src: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=1800&q=80",
                    alt: "Gewone gezinswoning in Amersfoort — praktische hulp bij woningzaken",
                }}
            />

            <Section background="beige-light" scene="orchard" sceneWidth="w-[26rem]">
                <AdviceSection />
            </Section>

            <Section background="mint" scene="gable" sceneWidth="w-80">
                <ProfessionalsSection />
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
