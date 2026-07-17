/**
 * ServicesCarousel component (src/components/ServicesCarousel.tsx)
 *
 * Centered, one-at-a-time carousel for the service cards on /diensten.
 * One card sits in focus in the middle of the track; the previous and next
 * cards peek in from the sides at reduced opacity, hinting that there is
 * more to scroll. The track is a native scroll container with mandatory
 * scroll-snapping, so touch swiping and trackpad scrolling work without
 * extra code — the arrows just scroll the target card to the centre.
 *
 * This is a client component ("use client") because the arrows need click
 * handlers and the active (centered) card is tracked in state to drive the
 * neighbours' transparency. The service *content* stays in the page file
 * (a server component) and is passed in via props.
 */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface Service {
    title: string;
    description: string;
    detail: string;
}

export default function ServicesCarousel({ services }: { services: Service[] }) {
    /** Ref to the scrollable track, so the arrows can drive it imperatively. */
    const trackRef = useRef<HTMLDivElement>(null);

    // Index of the card currently closest to the centre of the track.
    // Drives both the arrows' disabled state and the fade on the side cards.
    const [activeIndex, setActiveIndex] = useState(0);

    /**
     * Re-derive the active card from the scroll position: whichever card's
     * horizontal centre is closest to the visible centre of the track wins.
     * Runs on every scroll event (arrows, swipe or trackpad) and on resize.
     */
    const handleScroll = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        const center = el.scrollLeft + el.clientWidth / 2;
        const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
        let closest = 0;
        let minDistance = Infinity;
        cards.forEach((card, i) => {
            const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
            if (distance < minDistance) {
                minDistance = distance;
                closest = i;
            }
        });
        setActiveIndex(closest);
    }, []);

    // Run once after mount and again whenever the window is resized.
    useEffect(() => {
        handleScroll();
        window.addEventListener("resize", handleScroll);
        return () => window.removeEventListener("resize", handleScroll);
    }, [handleScroll]);

    /** Smoothly scroll the card at `index` to the centre of the track. */
    function scrollToCard(index: number) {
        const el = trackRef.current;
        if (!el) return;
        const clamped = Math.max(0, Math.min(services.length - 1, index));
        const card = el.querySelectorAll<HTMLElement>("[data-card]")[clamped];
        if (!card) return;
        el.scrollTo({
            left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2,
            behavior: "smooth",
        });
    }

    const canPrev = activeIndex > 0;
    const canNext = activeIndex < services.length - 1;

    /** Shared classes for both arrow buttons — square green outline that fills
        on hover and "presses" toward its purple accent edge. The purple bar sits
        only on the side the arrow points to (accent-l / accent-r, added per
        button below); faded with no bar when at either end. */
    const arrowClass =
        "flex h-11 w-11 items-center justify-center border border-green text-green " +
        "transition-all duration-150 hover:enabled:bg-green hover:enabled:text-white " +
        "hover:enabled:shadow-none disabled:opacity-30 disabled:shadow-none";

    return (
        <div>
            {/* Arrow controls — right-aligned above the track */}
            <div className="mb-8 flex items-center justify-end gap-3">
                <button
                    type="button"
                    aria-label="Vorige dienst"
                    onClick={() => scrollToCard(activeIndex - 1)}
                    disabled={!canPrev}
                    className={`${arrowClass} shadow-accent-l hover:enabled:-translate-x-[3px]`}
                >
                    {/* Left chevron */}
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="square" aria-hidden="true">
                        <path d="M14.5 6 L8.5 12 L14.5 18" />
                    </svg>
                </button>
                <button
                    type="button"
                    aria-label="Volgende dienst"
                    onClick={() => scrollToCard(activeIndex + 1)}
                    disabled={!canNext}
                    className={`${arrowClass} shadow-accent-r hover:enabled:translate-x-[3px]`}
                >
                    {/* Right chevron */}
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="square" aria-hidden="true">
                        <path d="M9.5 6 L15.5 12 L9.5 18" />
                    </svg>
                </button>
            </div>

            {/*
        The track: a flex row that scrolls horizontally.
          overflow-x-auto     → native horizontal scrolling
          snap-x snap-mandatory → the nearest card always settles centred
          scrollbar-hidden    → hides the scrollbar (defined in globals.css)
          relative            → makes card offsetLeft relative to the track,
                                which the centring math above relies on
        The spacer divs at both ends give the first and last card room to
        reach the centre; the -24px compensates for the flex gap (gap-6) so
        card 0 is perfectly centred at scrollLeft 0.
      */}
            <div
                ref={trackRef}
                onScroll={handleScroll}
                className="scrollbar-hidden relative flex snap-x snap-mandatory gap-6 overflow-x-auto"
            >
                <div aria-hidden="true" className="w-[calc(10%-24px)] shrink-0 lg:w-[calc(22.5%-24px)]" />
                {services.map((service, i) => (
                    <div
                        key={service.title}
                        data-card
                        /*
                          One card in view at a time: 80% wide on mobile, 55% on desktop
                          (the spacer widths above are (100% - card width) / 2, so the
                          centred card leaves an equal peek of its neighbours on both
                          sides). snap-center keeps whichever card you release nearest
                          the middle locked there; the non-active cards fade to 40%.
                        */
                        className={`flex w-[80%] shrink-0 snap-center flex-col gap-4 border border-beige-dark
                        bg-white p-10 lg:w-[55%] transition-all duration-300
                        hover:shadow-accent-l ${i === activeIndex ? "opacity-100" : "opacity-40"
                            }`}
                    >
                        <h2 className="font-serif text-xl font-semibold text-ink">
                            {service.title}
                        </h2>
                        <p className="text-sm leading-relaxed text-ink-muted">
                            {service.description}
                        </p>
                        <p className="mt-auto border-t border-beige-dark pt-4 text-xs leading-relaxed text-ink-muted/70">
                            {service.detail}
                        </p>
                    </div>
                ))}
                <div aria-hidden="true" className="w-[calc(10%-24px)] shrink-0 lg:w-[calc(22.5%-24px)]" />
            </div>
        </div>
    );
}
