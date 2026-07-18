import type { Metadata } from "next";
import Image from "next/image";
import SectionLabel from "@/components/SectionLabel";
import HouseSilhouette from "@/components/HouseSilhouette";
import { JSX } from "react";

export const metadata: Metadata = {
    title: "Over Thuismeester",
    description:
        "Lees wie er achter Thuismeester zit en waarom we dit initiatief zijn gestart voor bewoners in Amersfoort en omstreken.",
};

// -------------------------------------------------------
// Core values — edit text and order as needed
// -------------------------------------------------------
const values = [
    {
        title: "Lokaal",
        body:
            "We beginnen klein en bewust. Thuismeester richt zich in de eerste fase uitsluitend op Amersfoort en omliggende plaatsen, zodat we bewoners echt persoonlijk kunnen helpen.",
    },
    {
        title: "Betrouwbaar",
        body:
            "Een vertrouwensband opbouwen kost tijd. Thuismeester investeert daar actief in — door consistent te zijn, afspraken na te komen en eerlijk te communiceren.",
    },
    {
        title: "Persoonlijk",
        body:
            "Geen callcenter, geen ticketsysteem. Jij hebt één vast aanspreekpunt dat jou en jouw woning echt kent.",
    },
    {
        title: "Praktisch",
        body:
            "Thuismeester richt zich op wat werkt. Geen ingewikkelde processen, maar heldere afspraken en daadkrachtige hulp bij zaken die er toe doen.",
    },
];

/**
 *  The top section.
 */
function TopSection(): JSX.Element {
    return (<>
        <Image
            src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1800&q=80"
            alt="Over Thuismeester — lokaal, betrouwbaar en persoonlijk"
            fill
            priority
            className="object-cover object-center opacity-20"
            sizes="100vw"
        />
        <HouseSilhouette variant="gable" className="right-0 w-80 text-white/[0.08]" />
        <div className="section-wrapper relative z-10">
            <SectionLabel>
                <span className="text-white/60">Over ons</span>
            </SectionLabel>
            <h1 className="font-serif text-display-lg font-semibold">
                Over Thuismeester
            </h1>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-white/75">
                Lokaal, betrouwbaar en persoonlijk. Dat is de kern van
                Thuismeester.
            </p>
        </div>
    </>);
}

/**
 * Section containing story about use of thuismeester.
 */
function StorySection(): JSX.Element {
    return (<>
        <HouseSilhouette variant="stepped" className="right-0 w-80 text-green/[0.07]" />
        <div className="section-wrapper">
            <div className="grid items-center gap-16 lg:grid-cols-2">
                <div>
                    <SectionLabel>Het verhaal</SectionLabel>
                    <h2 className="font-serif text-display-md font-semibold text-ink">
                        Waarom Thuismeester?
                    </h2>
                    <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-muted">
                        <p>
                            Veel huiseigenaren zijn druk. Ze hebben een fijn huis, een
                            volle agenda en weinig tijd voor de praktische zaken die bij
                            een woning komen kijken. Onderhoud, kleine regelzaken, het
                            vinden van de juiste vakman — het kost aandacht die er
                            simpelweg niet altijd is.
                        </p>
                        <p>
                            Thuismeester is ontstaan vanuit de overtuiging dat bewoners
                            recht hebben op een betrouwbaar aanspreekpunt dichtbij huis.
                            Niet een onpersoonlijk platform, maar een vertrouwde persoon
                            die helpt, meedenkt en coördineert.
                        </p>
                        <p>
                            We starten bewust klein — in Amersfoort en omstreken — zodat
                            we onze beloftes waar kunnen maken. Persoonlijk, lokaal en
                            met aandacht voor wie jij bent en wat jouw woning nodig heeft.
                        </p>
                    </div>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden shadow-sm">
                    <Image
                        src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80"
                        alt="Thuismeester — rust en overzicht in huis"
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
 * Section containing about the founder.
 */
function AboutFounderSection(): JSX.Element {
    return (<>
        <HouseSilhouette variant="tall" className="right-0 w-96 text-green/[0.08]" />
        <div className="section-wrapper">
            <div className="grid items-center gap-16 lg:grid-cols-[380px_1fr]">
                {/* Portrait */}
                <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden shadow-sm">
                    <Image
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                        alt="[NAAM], oprichter van Thuismeester"
                        fill
                        className="object-cover object-center"
                        sizes="(min-width: 1024px) 380px, 100vw"
                    />
                </div>

                {/* Bio */}
                <div>
                    <SectionLabel>De oprichter</SectionLabel>
                    <h2 className="font-serif text-display-md font-semibold text-ink">
                        Aangenaam: [NAAM], jouw Thuismeester
                    </h2>
                    <div className="mt-6 space-y-5 max-w-prose text-base leading-relaxed text-ink-muted">
                        <p>
                            Thuismeester is het initiatief van [NAAM], geboren en
                            getogen in [PLAATS — bijv. de regio Amersfoort]. Na
                            [ACHTERGROND — bijv. jaren ervaring in techniek, bouw of
                            facilitaire dienstverlening] zag hij hoe vaak bewoners
                            vastlopen op precies hetzelfde: geen tijd, geen overzicht en
                            geen betrouwbare vakman in het adresboek.
                        </p>
                        <p>
                            [PERSOONLIJKE MOTIVATIE — bijv. &ldquo;Toen mijn ouders
                            ouder werden, merkte ik hoeveel rust het gaf dat er iemand
                            was die alles rondom hun huis in de gaten hield. Dat gun ik
                            iedere bewoner.&rdquo;]
                        </p>
                        <p>
                            Als Thuismeester is hij straks het vaste gezicht voor
                            bewoners in de regio: de persoon die je belt bij een vraag,
                            die de juiste vakman regelt en die zorgt dat afspraken
                            worden nagekomen. Persoonlijk kennismaken? Dat kan altijd —
                            stuur gerust een bericht via de contactpagina.
                        </p>
                    </div>

                    {/* Signature-style closing */}
                    <p className="mt-8 font-serif text-xl italic text-ink">
                        [NAAM]
                    </p>
                    <p className="text-sm text-ink-muted">
                        Oprichter van Thuismeester
                    </p>
                </div>
            </div>
        </div>
    </>);
}

/**
 * Section containing the values of thuismeester.
 */
function ValuesSection(): JSX.Element {
    return (<>
        <HouseSilhouette variant="gable" className="right-0 w-72 text-green/[0.07]" />
        <div className="section-wrapper">
            <div className="mx-auto max-w-3xl text-center">
                <SectionLabel>Kernwaarden</SectionLabel>
                <h2 className="font-serif text-display-md font-semibold text-ink">
                    Waar Thuismeester voor staat
                </h2>
            </div>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {/* Each core value card has a purple left border as accent line */}
                {values.map((v) => (
                    <div key={v.title} className="border-l-2 border-purple pl-5">
                        <h3 className="font-serif text-xl font-semibold text-ink">
                            {v.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                            {v.body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </>);
}

/**
 * Section containing 2 pictures and generic text.
 */
function FillerSection(): JSX.Element {
    return (<>
        <HouseSilhouette variant="stepped" className="right-0 w-72 text-green/[0.07]" />
        <div className="section-wrapper">
            <div className="grid gap-6 sm:grid-cols-2">
                <div className="relative aspect-square overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80"
                        alt="Nette voordeur van een gewone Nederlandse woning"
                        fill
                        className="object-cover object-center"
                        sizes="(min-width: 640px) 50vw, 100vw"
                    />
                </div>
                <div className="relative aspect-square overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=900&q=80"
                        alt="Rustige, nette woonruimte met warme sfeer"
                        fill
                        className="object-cover object-center"
                        sizes="(min-width: 640px) 50vw, 100vw"
                    />
                </div>
            </div>

            <p className="mt-6 text-center text-xs text-ink-muted">
                Thuismeester - voor bewoners die het beste willen voor hun woning
            </p>
        </div>
    </>);
}

/**
 * Section containing general info.
 */
function GeneralInfoSection(): JSX.Element {
    return (<>
        <HouseSilhouette variant="row" className="right-0 w-[36rem] text-white/[0.07]" />
        <div className="section-wrapper">
            <div className="mx-auto max-w-3xl">
                <SectionLabel>
                    <span className="text-white/60">Onze aanpak</span>
                </SectionLabel>
                <h2 className="font-serif text-display-md font-semibold text-white">
                    Geen goedkope klusdienst, maar een betrouwbaar aanspreekpunt
                </h2>
                <p className="mt-6 text-base leading-relaxed text-white/75">
                    Thuismeester positioneert zich bewust niet als een generieke
                    klus- of onderhoudsdienst. De focus ligt op organisatie, advies
                    en vertrouwen — aangeboden aan huiseigenaren die prijs stellen op
                    kwaliteit en persoonlijk contact.
                </p>
                <p className="mt-4 text-base leading-relaxed text-white/75">
                    We werken met vakmensen die we kennen en vertrouwen. We maken
                    heldere afspraken. En we leren jou en jouw woning kennen, zodat
                    we je op de lange termijn goed kunnen begeleiden.
                </p>
            </div>
        </div>
    </>);
}

export default function OverThuismeesterPage() {
    return (
        <>
            <section className="relative overflow-hidden bg-green py-28 text-white">
                <TopSection />
            </section>
            <section className="relative overflow-hidden bg-beige-light py-section">
                <StorySection />
            </section>
            <section className="relative overflow-hidden bg-beige py-section">
                <AboutFounderSection />
            </section>
            <section className="relative overflow-hidden bg-beige-light py-section">
                <ValuesSection />
            </section>
            <section className="relative overflow-hidden bg-green py-section text-white">
                <FillerSection />
            </section>
            <section className="relative overflow-hidden bg-beige-light py-section">
                <GeneralInfoSection />
            </section>
        </>
    );
}
