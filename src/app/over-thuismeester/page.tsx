import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
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
        title: "Onafhankelijk",
        body:
            "Ik verkoop geen producten of eigen uitvoering. Mijn advies dient alleen jouw belang.",
    },
    {
        title: "Lokaal",
        body:
            `Ik begin klein en bewust: alleen Amersfoort, Leusden, Hoevelaken, Nijkerk, en Soest. Persoonlijke dienstverlening werkt alleen als je de buurt en de vakmensen echt kent.`,
    },
    {
        title: "Betrouwbaar",
        body:
            "Vertrouwen verdien je niet met een mooie website, maar door afspraken na te komen. Ik beloof alleen wat ik kan waarmaken.",
    },
    {
        title: "Persoonlijk",
        body:
            "Geen callcenter, geen ticketsysteem. Jij hebt één vaste Thuismeester die weet wie je bent en wat je woning nodig heeft.",
    },
];

/**
 * Section containing story about use of thuismeester.
 */
function StorySection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="grid items-center gap-16 lg:grid-cols-2">
                <div>
                    <SectionLabel>Het verhaal</SectionLabel>
                    <h2 className="font-serif text-display-md font-semibold text-ink">
                        Waarom Thuismeester
                    </h2>
                    <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-muted">
                        <p>
                            Iedere huiseigenaar kent het: de kraan die al weken drupt,
                            de dakgoot die eigenlijk schoongemaakt moet worden, de
                            schilder die maar niet terugbelt en de offerte waarvan je
                            niet weet of die redelijk is. Stuk voor stuk kleine
                            dingen — maar samen vormen ze een lijstje dat nooit af is.
                        </p>
                        <p>
                            Thuismeester is ontstaan vanuit een simpele overtuiging:
                            bewoners verdienen één onafhankelijk, betrouwbaar
                            aanspreekpunt dichtbij huis. Niet een anoniem platform met
                            wisselende klussers, maar een vertrouwde persoon die jou
                            en je woning kent, meedenkt vanuit jouw belang — en niet
                            vanuit dat van een verkoper.
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
 *
 * The bracketed placeholders must be filled in with the real name, place,
 * background and personal motivation — and the portrait replaced by a real
 * photo of the founder — before the site goes live.
 */
function AboutFounderSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="grid items-center gap-16 lg:grid-cols-[380px_1fr]">
                {/* Portrait — replace with a real photo of the founder */}
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
                        Aangenaam, [NAAM]
                    </h2>
                    <div className="mt-6 space-y-5 max-w-prose text-base leading-relaxed text-ink-muted">
                        <p>
                            Ik ben [NAAM], en woon en werk al [X] jaar in [PLAATS].
                            Na [aantal] jaar in [vakgebied — bijvoorbeeld bouw,
                            techniek, facilitaire dienstverlening] zag ik hoe vaak
                            bewoners vastlopen op precies hetzelfde: geen tijd, geen
                            overzicht en geen vakman in het adresboek die ze echt
                            vertrouwen. [Eén persoonlijke zin over de concrete
                            aanleiding.] Daarom ben ik Thuismeester begonnen — en
                            straks ben ik het vaste gezicht voor bewoners hier in de
                            regio.
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
 * Final section with the single contextual CTA of this page.
 */
function ContactCTASection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="mx-auto max-w-2xl text-center text-white">
                <h2 className="font-serif text-display-md font-semibold">
                    Persoonlijk kennismaken?
                </h2>
                <div className="mt-8">
                    <Button href="/contact" size="lg"
                        className="bg-white text-green hover:bg-beige">
                        Stuur een bericht
                    </Button>
                </div>
            </div>
        </div>
    </>);
}

export default function OverThuismeesterPage() {
    return (
        <>
            <PageHeader
                label="Over ons"
                title="Over Thuismeester"
                intro="Onafhankelijk, lokaal, betrouwbaar en persoonlijk. Dat is de
                    kern van Thuismeester."
                silhouetteVariant="row"
                image={{
                    src: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1800&q=80",
                    alt: "Over Thuismeester — onafhankelijk, lokaal, betrouwbaar en persoonlijk",
                }}
            />
            <Section background="beige-light" scene="play" sceneWidth="w-80">
                <StorySection />
            </Section>
            <Section background="mint" scene="lane" sceneWidth="w-[28rem]">
                <AboutFounderSection />
            </Section>
            <Section background="beige" scene="tall" sceneWidth="w-96">
                <ValuesSection />
            </Section>
            <Section background="mint" scene="gable" sceneWidth="w-72">
                <ContactCTASection />
            </Section>
        </>
    );
}
