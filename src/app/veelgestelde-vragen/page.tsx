import type { Metadata } from "next";
import SectionLabel from "@/components/SectionLabel";
import HouseSilhouette from "@/components/HouseSilhouette";
import { JSX } from "react";

export const metadata: Metadata = {
	title: "Veelgestelde vragen",
	description:
		"Antwoorden op veelgestelde vragen over Thuismeester: wat het is, wat het kost, hoe de aanmelding werkt en wanneer we starten in Amersfoort en omstreken.",
};

// -------------------------------------------------------
// FAQ content — grouped by theme.
// Add or edit questions here; the page renders each group
// with its own heading and accordion list.
// -------------------------------------------------------
const faqGroups = [
	{
		group: "General",
		items: [
			{
				q: "Wanneer gaat Thuismeester van start?",
				a: "De dienstverlening start in januari 2027, zodra er voldoende aanmeldingen zijn in Amersfoort en omstreken.",
			},
			{
				q: "Wat kost Thuismeester?",
				a: "Het vaste abonnement kost €10 per maand. Extra hulp en werkzaamheden worden uitgevoerd tegen uurtarief of op offertebasis.",
			},
			{
				q: "In welke gebieden is Thuismeester actief?",
				a: "In de eerste fase richt Thuismeester zich op Amersfoort, Leusden, Hoevelaken, Nijkerk en Soest.",
			},
			{
				q: "Zit ik vast aan een contract bij aanmelding?",
				a: "Nee. De aanmelding is volledig vrijblijvend en gratis. Je geeft alleen aan dat je geïnteresseerd bent.",
			},
			{
				q: "Wat voor soort hulp kan ik verwachten?",
				a: "Thuismeester helpt bij praktische zaken rondom je woning: van organisatievragen en onderhoud tot het vinden van betrouwbare vakmensen en coördinatie van klussen.",
			},
		],
	},
	/* different sections can be added by adding more items to this array */
]

/**
 * The top section.
 */
function TopSection(): JSX.Element {
	return (<>
		<HouseSilhouette variant="gable" className="right-0 w-80 text-white/[0.08]" />
		<div className="section-wrapper">
			<SectionLabel>
				<span className="text-white/60">Vragen &amp; antwoorden</span>
			</SectionLabel>
			<h1 className="font-serif text-display-lg font-semibold">
				Veelgestelde vragen
			</h1>
			<p className="mt-5 max-w-prose text-base leading-relaxed text-white/75">
				Alles wat je wilt weten over Thuismeester: wat het is, wat het
				kost, hoe de aanmelding werkt en wanneer we starten. Staat je
				vraag er niet tussen? Stel hem gerust via de contactpagina.
			</p>
		</div>
	</>);
}

/**
 * Section containing FAQs.
 */
function FAQSection(): JSX.Element {
	return (<>
		<HouseSilhouette variant="row" className="right-0 w-[32rem] text-green/[0.07]" />
		<div className="section-wrapper">
			<div className="mx-auto max-w-3xl space-y-16">
				{faqGroups.map(({ group, items }) => (
					<div key={group}>
						<SectionLabel>{group}</SectionLabel>
						<div className="mt-2 divide-y divide-beige-dark border-y border-beige-dark">
							{items.map(({ q, a }) => (
								<details key={q} className="group py-6">
									<summary className="flex cursor-pointer list-none items-center justify-between
                                          gap-4 font-serif text-base font-semibold text-ink">
										{q}
										{/* Purple accent: the +/× toggle indicator */}
										<span className="shrink-0 text-purple transition-transform group-open:rotate-45">
											+
										</span>
									</summary>
									<p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-muted">
										{a}
									</p>
								</details>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	</>);
}


export default function FAQPage() {
	return (
		<>
			<section className="relative overflow-hidden bg-green py-20 text-white">
				<TopSection />
			</section>
			<section className="relative overflow-hidden bg-beige-light py-section">
				<FAQSection />
			</section>
		</>
	);
}
