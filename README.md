# Thuismeester — website

Pre-launch registratie website voor Thuismeester. Gebouwd met Next.js 16 en
Tailwind CSS. Aanmeldingen worden opgeslagen in Supabase en bevestigd per
e-mail via Resend.

---

## Lokaal starten

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in de browser.

Zonder ingestelde omgevingsvariabelen (zie hieronder) draaien de pagina's,
maar mislukt het aanmeldformulier en worden er geen e-mails verstuurd.

---

## Omgevingsvariabelen

Maak een `.env.local` aan in de projectroot (deze staat in `.gitignore`).
Stel in productie dezelfde variabelen in via het Vercel-dashboard.

```bash
SUPABASE_URL=                # Supabase project-URL
SUPABASE_SERVICE_ROLE_KEY=   # Supabase service-role key — alleen server-side, nooit NEXT_PUBLIC_
RESEND_API_KEY=              # Resend API-key (zonder deze key worden e-mails overgeslagen)
NOTIFY_EMAIL=                # adres dat nieuwe aanmeldingen én contactberichten ontvangt
MAIL_FROM=                   # optioneel — afzender, standaard "Thuismeester <noreply@thuismeester.nl>"
```

Aanmeldingen worden weggeschreven naar de Supabase-tabel `aanmeldingen`
(kolommen: `naam`, `email`, `postcode`, `woonplaats`, `opmerkingen`).

---

## Productie-build

```bash
npm run build
npm start
```

---

## Projectstructuur

```
src/
├── app/
│   ├── page.tsx                  ← Homepage
│   ├── hoe-werkt-het/page.tsx    ← Hoe werkt het
│   ├── diensten/page.tsx         ← Diensten
│   ├── over-thuismeester/page.tsx← Over pagina
│   ├── aanmelden/page.tsx        ← Aanmeldformulier
│   ├── contact/page.tsx          ← Contactpagina
│   ├── api/aanmelden/route.ts    ← API: verwerkt aanmeldingen
│   └── api/contact/route.ts      ← API: verwerkt contactberichten
└── components/
    ├── Navigation.tsx             ← Navigatiebalk
    ├── Footer.tsx                 ← Footer
    ├── Button.tsx                 ← Herbruikbare knopcomponent
    ├── SectionLabel.tsx           ← Kleine sectietitel boven koppen
    ├── AanmeldenForm.tsx          ← Aanmeldformulier (client component)
    └── ContactForm.tsx            ← Contactformulier (client component)

public/images/                     ← Voeg hier definitieve foto's toe
```

---

## Formulierdata

- **Aanmeldingen** → opgeslagen in de Supabase-tabel `aanmeldingen`. Bij elke
  aanmelding stuurt Resend een bevestigingsmail naar de aanmelder en een interne
  notificatie naar `NOTIFY_EMAIL`. Een verborgen honeypot-veld (`_hp`) weert bots.
- **Contactberichten** → per e-mail naar `NOTIFY_EMAIL` gestuurd via Resend
  (met `replyTo` op de afzender). Er wordt niets naar het lokale bestandssysteem
  geschreven — dat is op Vercel namelijk vluchtig en zou berichten verliezen.

---

## Foto's vervangen

Zie `public/images/PHOTOS-PLACEHOLDER.md` voor de volledige lijst van foto's die
vervangen moeten worden. De meeste pagina's gebruiken nog tijdelijke
`images.unsplash.com` URL's; de homepage gebruikt al de lokale foto
`public/images/jaren-30-woning.jpg`.

Stap:
1. Upload foto naar `public/images/[naam].jpg`
2. Vervang de `images.unsplash.com` URL in het `<Image src=...>` attribuut door `/images/[naam].jpg`

---

## Tekst aanpassen

- **Notificatie-e-mail**: stel `NOTIFY_EMAIL` in als omgevingsvariabele (zie boven); de footer/contactpagina tonen tot de lancering alleen een pre-launch-melding
- **Diensten**: array `diensten` in `src/app/page.tsx`
- **Startdatum**: zoek op `januari 2027` in de pagina's

---

## Brochure

Er staat een placeholder-sectie op de Over-pagina (`src/app/over-thuismeester/page.tsx`)
voor de toekomstige brochure. Voeg daar een downloadlink toe als de brochure gereed is.
