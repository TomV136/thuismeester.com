import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import { JSX } from "react";
import { REGION_NOTE, REGIONS } from "@/lib/site";

export const metadata: Metadata = {
    title: `Thuismeester — Jouw onafhankelijke thuisadviseur voor ${REGION_NOTE}`,
};

/**
 * Main section the main page.
 */
function TopSection(): JSX.Element {
    return (
        <div className="section-wrapper pb-20 pt-32">
            <div className="max-w-2xl">
                <span className="badge mb-6 border border-white/25 bg-green/90 text-white">
                    {REGION_NOTE} · Start januari 2027
                </span>
                <h1 className="font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                    Een onafhankelijk advies<br />
                    <span className="italic">vóórdat je tekent.</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
                    Twijfel je over een offerte, een klus of welk onderhoud nodig
                    is? Jouw Thuismeester denkt met je mee — niet als verkoper,
                    maar als vertrouwd aanspreekpunt dat alleen jouw belang dient.
                    Voor bewoners in {REGION_NOTE}, vanaf €10 per maand.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                    <Button href="/aanmelden" variant="light" size="lg">
                        Meld je aan voor jouw regio
                    </Button>
                    <Button href="/hoe-werkt-het" variant="outline-light" size="lg">
                        Hoe werkt het?
                    </Button>
                </div>
            </div>
        </div>
    );
}

/**
 * Section describing the regions where thuismeester might be set up.
 */
function RegionsSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="mx-auto max-w-3xl text-center">
                <SectionLabel>Lokaal</SectionLabel>
                <h2 className="font-serif text-display-lg font-semibold text-ink">
                    Voor {REGION_NOTE}
                </h2>
                <p className="mx-auto mt-6 max-w-prose text-base leading-relaxed text-ink-muted">
                    Thuismeester start bewust lokaal, in Amersfoort en de
                    omliggende plaatsen. Zo kunnen we bewoners persoonlijk leren
                    kennen — en blijven we aanspreekbaar op wat we beloven.
                </p>

                {/* Region pills */}
                <ul className="mt-8 flex flex-wrap justify-center gap-3">
                    {REGIONS.map((plaats) => (
                        <li key={plaats}>
                            <span className="inline-block rounded-full border border-green/30 bg-beige-light
                                   px-5 py-2 font-serif text-sm font-medium text-ink
                                   transition-colors duration-150 hover:border-green/60">
                                {plaats}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </>)
}

/**
 * Section describing a series of problems (that thuismeester solves)
 */
function ProblemSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="grid items-center gap-16 lg:grid-cols-2">
                {/* Text */}
                <div>
                    <SectionLabel>Het probleem</SectionLabel>
                    <h2 className="font-serif text-display-md font-semibold text-ink">
                        Onderhoud en reparaties kosten tijd — en twijfel
                    </h2>
                    <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-muted">
                        De druppende kraan, de dakgoot die vol zit, de schilder die
                        niet terugbelt, de offerte waarvan je niet weet of die
                        redelijk is. Niet alleen het regelen kost tijd — vaak weet
                        je ook niet zeker of een aanpak of prijs wel klopt.
                    </p>
                    <ul className="mt-8 space-y-4">
                        {[
                            "Geen idee of een offerte reëel is",
                            "Geen vakman in het adresboek die je vertrouwt",
                            "Achter afspraken en terugbelverzoeken aan bellen",
                            "Niet weten welk onderhoud wanneer nodig is",
                        ].map((item) => (
                            <li key={item} className="flex items-start gap-3 text-base text-ink-soft">
                                <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-white
                                     flex items-center justify-center text-green text-xs">
                                    ✓
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Image block */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-sm lg:aspect-square">
                    <Image
                        src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80"
                        alt="Drukke huiseigenaar met weinig tijd voor woningbeheer"
                        fill
                        className="object-cover object-center"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                </div>
            </div>
        </div>
    </>);
}

/**
 * Section describing solutions from the problems in the problem section.
 */
function SolutionsSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="grid items-center gap-16 lg:grid-cols-2">
                {/* Image block — left on desktop */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-lg order-last lg:order-first">
                    <Image
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80"
                        alt="Thuismeester in gesprek met een bewoner — betrouwbaar en persoonlijk"
                        fill
                        className="object-cover object-center"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                </div>

                {/* Text */}
                <div>
                    <SectionLabel>
                        <span className="text-white/80">De oplossing</span>
                    </SectionLabel>
                    <h2 className="font-serif text-display-md font-semibold text-white">
                        Eén onafhankelijk aanspreekpunt, aan jouw kant
                    </h2>
                    <p className="mt-6 max-w-prose text-base leading-relaxed text-white/85">
                        Thuismeester is geen klusbedrijf en geen verkoper van
                        vakmensen. Je krijgt één vaste persoon die jouw woning kent,
                        meedenkt over de beste aanpak, een eerlijke tweede mening
                        geeft over offertes, en — als je dat wilt — de juiste vakman
                        regelt en de klus bewaakt. Altijd vanuit jouw belang, nooit
                        vanuit dat van een aannemer.
                    </p>
                    <div className="mt-8">
                        <Button href="/diensten" variant="outline-light">
                            Bekijk wat we voor je doen
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

/**
 * Section with a short personal introduction of the founder, linking to the
 * full story on the about page.
 */
function FounderSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="grid items-center gap-16 lg:grid-cols-[320px_1fr]">
                {/* Portrait — replace with a real photo of the founder */}
                <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden shadow-sm">
                    <Image
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                        alt="[NAAM], oprichter van Thuismeester"
                        fill
                        className="object-cover object-center"
                        sizes="(min-width: 1024px) 320px, 100vw"
                    />
                </div>

                <div>
                    <SectionLabel>Vertrouwen</SectionLabel>
                    <h2 className="font-serif text-display-md font-semibold text-ink">
                        Aangenaam, [NAAM]
                    </h2>
                    <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-muted">
                        Thuismeester is het initiatief van [NAAM], die in [PLAATS]
                        woont en werkt. [Een of twee zinnen persoonlijke aanleiding
                        — waarom dit initiatief is gestart.] Straks ben ik het
                        vaste gezicht voor bewoners in de regio.
                    </p>
                    <p className="mt-6">
                        <Link href="/over-thuismeester"
                            className="font-medium text-green underline underline-offset-2 hover:text-green-light">
                            Lees het hele verhaal
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </>);
}

/**
 * Section summarising the two service pillars in short text, with a link to
 * the services page.
 */
function ServicesSummarySection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="mx-auto max-w-3xl text-center">
                <SectionLabel>Diensten</SectionLabel>
                <h2 className="font-serif text-display-lg font-semibold text-ink">
                    Wat Thuismeester voor je doet
                </h2>
                <div className="mt-8 space-y-5 text-left sm:text-center">
                    <p className="mx-auto max-w-prose text-base leading-relaxed text-ink-muted">
                        <strong className="text-ink">Onafhankelijk advies</strong> —
                        Twijfel over een offerte, klus of onderhoudsvraag? Ik denk
                        met je mee, vanuit jouw belang.
                    </p>
                    <p className="mx-auto max-w-prose text-base leading-relaxed text-ink-muted">
                        <strong className="text-ink">Vakmensen &amp; coördinatie</strong> —
                        Nodig? Ik regel een vakman die ik persoonlijk ken, en houd
                        de vinger aan de pols tot de klus is afgerond.
                    </p>
                </div>
                <p className="mt-8">
                    <Link href="/diensten"
                        className="font-medium text-green underline underline-offset-2 hover:text-green-light">
                        Alle diensten bekijken
                    </Link>
                </p>
            </div>
        </div>
    </>);
}

/**
 * Section covering pricing of the subscription.
 */
function PricingInfoSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="mx-auto max-w-4xl">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        <SectionLabel>
                            <span className="text-white/80">Prijs</span>
                        </SectionLabel>
                        <h2 className="font-serif text-display-md font-semibold text-white">
                            Heldere basis
                        </h2>
                        <p className="mt-6 text-base leading-relaxed text-white/85">
                            €10 per maand voor een vaste Thuismeester die je woning
                            kent, meedenkt bij vragen en toegang geeft tot ons
                            netwerk van vakmensen. Uitvoering wordt altijd vooraf
                            besproken — tegen uurtarief of op offertebasis. Geen
                            verborgen kosten, maandelijks opzegbaar.
                        </p>
                    </div>

                    {/* Pricing card — carries the wide purple left-edge accent so the
                  price block is the clear focal point of this section */}
                    <div className="border border-beige-dark bg-white p-10 shadow-accent-l-lg">
                        <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                            Maandelijks abonnement
                        </p>
                        <p className="mt-4 font-serif text-5xl font-semibold text-green">
                            €10
                            <span className="ml-2 text-lg font-normal text-ink-muted">/ maand</span>
                        </p>
                        <p className="mt-6 text-base text-ink-soft">
                            Geen verborgen kosten, maandelijks opzegbaar.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

/**
 * Final section — when the service starts, with the closing CTA's.
 */
function FinalSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="mx-auto max-w-2xl text-center">
                <SectionLabel>Afsluiting</SectionLabel>
                <h2 className="font-serif text-display-lg font-semibold text-ink">
                    We starten in januari 2027
                </h2>
                <p className="mx-auto mt-6 max-w-prose text-base leading-relaxed text-ink-muted">
                    Zodra er voldoende aanmeldingen zijn in {REGION_NOTE}, gaan we
                    van start. Meld je vrijblijvend aan en blijf op de hoogte.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button href="/aanmelden" size="lg">
                        Meld je aan voor jouw regio
                    </Button>
                    <Button href="/contact" variant="outline" size="lg">
                        Stel een vraag
                    </Button>
                </div>
            </div>
        </div>
    </>);
}

/**
 * @returns the main page
 */
export default function HomePage(): JSX.Element {
    return (
        <>
            {/* Backgrounds alternate between the warm beiges, cool mint and
                dark green so no two adjacent sections (incl. the green
                footer) look alike; every section gets its own scene. */}
            <Section
                background="green"
                padding=""
                className="flex min-h-[90vh] items-end"
                backdrop={<>
                    <Image
                        src="/images/jaren-30-woning.jpg"
                        alt="Een nette Nederlandse gezinswoning in Amersfoort en omstreken"
                        fill
                        priority
                        className="object-cover object-[center_30%]"
                        sizes="100vw"
                    />
                    {/* Gradient overlay — darkens bottom for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green/90 via-green/40 to-transparent" />
                </>}
            >
                <TopSection />
            </Section>
            <Section background="beige" scene="gable" sceneWidth="w-96">
                <RegionsSection />
            </Section>
            <Section background="mint" scene="play" sceneWidth="w-80">
                <ProblemSection />
            </Section>
            <Section background="green" scene="row" sceneWidth="w-[36rem]">
                <SolutionsSection />
            </Section>
            <Section background="beige-light" scene="court" sceneWidth="w-96">
                <FounderSection />
            </Section>
            <Section background="mint" scene="stepped" sceneWidth="w-72">
                <ServicesSummarySection />
            </Section>
            <Section
                background="green"
                scene="lane"
                sceneWidth="w-[32rem]"
                backdrop={<>
                    <Image
                        src="https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1800&q=80"
                        alt="Rustige woonstraat in Amersfoort en omstreken"
                        fill
                        className="object-cover object-center"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-green/85" />
                </>}
            >
                <PricingInfoSection />
            </Section>
            <Section background="beige" scene="orchard" sceneWidth="w-96">
                <FinalSection />
            </Section>
        </>
    );
}
