// Copy for the service pages (/tvorba-webov, /mobilne-aplikacie, ...). Each page targets one search intent.
// Claims stay within what the home page already says: no prices, no deadlines, no client numbers.
import type { Locale } from "@/i18n/routing"

export const serviceKeys = ["web", "mobile", "automation", "care"] as const
export type ServiceKey = (typeof serviceKeys)[number]

export const servicePath = {
  web: "/services/web",
  mobile: "/services/mobile",
  automation: "/services/automation",
  care: "/services/care",
} as const satisfies Record<ServiceKey, string>

type Faq = { q: string; a: string }

export type ServiceCopy = {
  metaTitle: string
  metaDescription: string
  h1: string
  lead: string
  forWho: string[]
  deliverables: string[]
  faq: Faq[]
}

// Cases from the Drawings sheet that show this service in practice.
export const serviceCases: Record<ServiceKey, ("kromka" | "zwicker" | "heystol")[]> = {
  web: ["kromka", "zwicker"],
  mobile: [],
  automation: ["kromka", "heystol"],
  care: [],
}

export const services: Record<Locale, Record<ServiceKey, ServiceCopy>> = {
  sk: {
    web: {
      metaTitle: "Tvorba webov a e-shopov na mieru · Košice | Ergodic",
      metaDescription:
        "Weby a e-shopy na mieru pre firmy v Košiciach, na Slovensku a v EÚ. Rýchle na mobile, po slovensky aj po anglicky, s platbami cez Stripe.",
      h1: "Tvorba webov a e-shopov na mieru",
      lead: "Firemný web, ktorý sa na telefóne načíta hneď, Google mu rozumie a zákazník na ňom nájde, čo hľadal. Po slovensky, po anglicky alebo v ďalších jazykoch.",
      forWho: [
        "Firmy, ktorým starý web nič neprináša a nevedia prečo.",
        "Obchody, ktoré prerástli šablónu a potrebujú prepojenie na sklad, CRM alebo ERP.",
        "Reštaurácie, penzióny a služby, ktoré chcú viacjazyčný web a texty si budú meniť samy.",
      ],
      deliverables: [
        "Návrh a vývoj na Next.js alebo Astro. Vyberieme podľa toho, čo web potrebuje.",
        "Technické SEO od prvého dňa. Rýchlosť, štruktúrované dáta, sitemap a jazykové verzie sú súčasťou stavby, nie doplnok.",
        "Platby cez Stripe a prepojenie na váš CRM, ERP alebo sklad.",
        "Redakčný systém, v ktorom upravíte texty a fotky bez programátora.",
        "Hosting a monitoring po spustení, ak chcete.",
      ],
      faq: [
        {
          q: "Koľko stojí tvorba webu?",
          a: "Záleží na rozsahu. Po prvom rozhovore vám pošleme niekoľko variantov vedľa seba, od hotového riešenia po vývoj na mieru, a pri každom bude cena. Vyberáte vy.",
        },
        {
          q: "Ako dlho to trvá?",
          a: "Staviame v malých vydaniach. Prvú verziu používate skôr, než je hotové všetko, a ďalšie časti pribúdajú postupne.",
        },
        {
          q: "Budem si môcť web upravovať sám?",
          a: "Áno. Ak sa obsah mení často, dostanete redakčný systém (napríklad Payload CMS). Texty, fotky aj jazykové verzie v ňom zmeníte sami.",
        },
        {
          q: "Robíte weby aj pre firmy mimo Košíc?",
          a: "Áno, po celom Slovensku aj v EÚ. Stretnúť sa dá v Košiciach alebo online, po slovensky aj po anglicky.",
        },
        {
          q: "Čo sa s webom deje po spustení?",
          a: "Môžete ho prevziať a spravovať sami. Alebo zostanete na mesačnom paušále a o hosting, aktualizácie a menšie úpravy sa postaráme my.",
        },
      ],
    },
    mobile: {
      metaTitle: "Vývoj mobilných aplikácií pre iOS a Android | Ergodic",
      metaDescription:
        "Mobilné aplikácie na mieru pre iOS aj Android z jedného kódu v React Native. Zverejnenie v App Store a Google Play, notifikácie, offline režim.",
      h1: "Vývoj mobilných aplikácií pre iOS a Android",
      lead: "Jedna aplikácia, jeden kód, dva obchody. Píšeme v React Native a Expo, takže nová funkcia príde na iPhone aj Android naraz a vývoj neplatíte dvakrát.",
      forWho: [
        "Firmy, ku ktorým sa zákazníci vracajú pravidelne a web im nestačí. Objednávky, rezervácie, vernostné programy.",
        "Ľudia v teréne, ktorí potrebujú aplikáciu aj tam, kde nie je signál.",
        "Startupy, ktoré chcú nápad overiť na oboch platformách bez dvoch tímov.",
      ],
      deliverables: [
        "Vývoj v React Native a Expo pre iOS aj Android.",
        "Push notifikácie, offline režim, prihlásenie a platby podľa toho, čo aplikácia potrebuje.",
        "Napojenie na váš web, API alebo interný systém.",
        "Zverejnenie v App Store a Google Play vrátane schvaľovania. Aplikácia je vedená na vašu firmu.",
      ],
      faq: [
        {
          q: "Koľko stojí mobilná aplikácia?",
          a: "Záleží na tom, čo má robiť. Po prvom rozhovore dostanete varianty vedľa seba, od jednoduchej po rozsiahlu, a každý s cenou.",
        },
        {
          q: "Prečo jeden kód a nie dve natívne aplikácie?",
          a: "Pre väčšinu firemných aplikácií je React Native dosť rýchly a vyjde lacnejšie, lebo sa píše aj udržiava raz. Ak by vaša aplikácia potrebovala niečo, čo ide len natívne, povieme vám to už pri variantoch.",
        },
        {
          q: "Kto aplikáciu zverejní v obchodoch?",
          a: "My. Pripravíme popisy a snímky obrazovky a prejdeme schvaľovaním v App Store aj Google Play.",
        },
        {
          q: "Čo po spustení?",
          a: "iOS aj Android sa každý rok menia a aplikácia s nimi musí držať krok. V mesačnom pláne ju udržiavame a pridávame menšie funkcie.",
        },
      ],
    },
    automation: {
      metaTitle: "Automatizácia procesov a AI pre firmy | Ergodic",
      metaDescription:
        "Automatizácia firemných procesov. Prepojíme vaše systémy cez API, nasadíme AI tam, kde dáva zmysel, a postavíme interné dashboardy.",
      h1: "Automatizácia procesov a AI pre firmy",
      lead: "Ak niekto u vás každý týždeň prepisuje údaje z jedného systému do druhého, dá sa to robiť inak. Opakovanú prácu necháme na stroj a rozhodovanie na človeka.",
      forWho: [
        "Firmy, kde sa objednávky, faktúry alebo sklad prepisujú ručne medzi systémami.",
        "Tímy, ktoré trávia hodiny nad tabuľkami a reportmi.",
        "Firmy, ktoré chcú použiť AI na e-maily, dokumenty alebo dopyty, ale nie bez kontroly.",
      ],
      deliverables: [
        "Mapa procesu. Kde vznikajú údaje, kto ich prepisuje a koľko času to stojí.",
        "Integrácie cez API medzi e-shopom, CRM, ERP, účtovníctvom a bankou.",
        "AI procesy na čítanie dokumentov a triedenie dopytov. Pri dôležitých krokoch rozhoduje človek.",
        "Interné dashboardy s číslami, ktoré už nemusíte ručne exportovať.",
        "Monitoring, aby ste o chybe v prepojení vedeli skôr než zákazník.",
      ],
      faq: [
        {
          q: "Čo sa oplatí automatizovať ako prvé?",
          a: "To, čo sa opakuje často, riadi sa pravidlami a pri chybe to bolí. Najprv prejdeme, ako firma naozaj funguje, a varianty zoradíme podľa toho, koľko času ušetria.",
        },
        {
          q: "Musíme meniť systémy, ktoré používame?",
          a: "Väčšinou nie. Najprv skúsime prepojiť to, čo už máte. Nový nástroj navrhneme, len keď sa starý prepojiť nedá alebo by to vyšlo drahšie.",
        },
        {
          q: "Je AI na firemné dáta spoľahlivá?",
          a: "Na niektoré úlohy áno, na iné nie. Nasadzujeme ju tam, kde sa chyba ukáže hneď, a kde ide o peniaze alebo zákazníka, posledné slovo má človek.",
        },
        {
          q: "Koľko stojí automatizácia?",
          a: "Každý variant dostanete s cenou aj s odhadom, koľko práce ušetrí. Potom sa dá ľahko porovnať, čo sa oplatí.",
        },
      ],
    },
    care: {
      metaTitle: "Správa webu a aplikácií za mesačný paušál | Ergodic",
      metaDescription:
        "Hosting, aktualizácie, monitoring a menšie funkcie každý mesiac za paušál. Jeden kontakt, ktorý pozná celý váš systém.",
      h1: "Správa webu a aplikácií za mesačný paušál",
      lead: "Web ani aplikácia nie sú hotové dňom spustenia. Za mesačný paušál ich udržíme v chode a aktuálne a pridáme menšie funkcie, keď ich budete potrebovať.",
      forWho: [
        "Firmy bez vlastného programátora, ktoré ho nechcú hľadať pri každej zmene.",
        "Majitelia webov a aplikácií, ktorým pôvodný dodávateľ prestal odpovedať.",
        "Firmy, ktoré chcú systém rozvíjať postupne namiesto veľkého projektu raz za pár rokov.",
      ],
      deliverables: [
        "Hosting a SSL certifikáty.",
        "Bezpečnostné a systémové aktualizácie.",
        "Monitoring dostupnosti a chýb.",
        "Menšie úpravy a nové funkcie každý mesiac.",
        "Jeden kontakt, ktorý pozná celý systém.",
      ],
      faq: [
        {
          q: "Prevezmete aj web, ktorý ste nerobili vy?",
          a: "Áno. Najprv ho prejdeme, povieme vám, v akom je stave, a navrhneme, či ho udržiavať, alebo postupne prerobiť.",
        },
        {
          q: "Čo ak potrebujem väčšiu zmenu?",
          a: "Menšie úpravy sú v paušále. Väčšiu zmenu nakreslíme ako samostatné varianty s cenou a rozhodnete sa vy.",
        },
        {
          q: "Koľko stojí paušál?",
          a: "Záleží na tom, koľko systémov spravujeme a koľko práce mesačne čakáte. Cenu poznáte vopred.",
        },
      ],
    },
  },
  en: {
    web: {
      metaTitle: "Website and e-shop development in Slovakia | Ergodic",
      metaDescription:
        "Custom websites and e-shops for businesses in Slovakia and the EU. Fast on mobile, in Slovak and English, with Stripe payments.",
      h1: "Custom website and e-shop development",
      lead: "A company site that loads at once on a phone, that Google understands, and where customers find what they came for. In Slovak, English or more languages.",
      forWho: [
        "Businesses whose old site brings nothing and they can't tell why.",
        "Shops that outgrew a template and need links to stock, CRM or ERP.",
        "Restaurants, guesthouses and services that want a multilingual site and will edit the copy themselves.",
      ],
      deliverables: [
        "Design and build on Next.js or Astro, picked by what the site needs.",
        "Technical SEO from day one. Speed, structured data, sitemap and language versions are part of the build, not an add-on.",
        "Stripe payments and links to your CRM, ERP or stock system.",
        "A CMS where you change text and photos without a developer.",
        "Hosting and monitoring after launch, if you want it.",
      ],
      faq: [
        {
          q: "How much does a website cost?",
          a: "It depends on scope. After the first call we send a few options side by side, from off-the-shelf to fully custom, each with a price. You choose.",
        },
        {
          q: "How long does it take?",
          a: "We build in small releases. You use the first version before everything is done, and the rest arrives step by step.",
        },
        {
          q: "Can I edit the site myself?",
          a: "Yes. If content changes often, you get a CMS (Payload, for example) where you edit text, photos and language versions yourself.",
        },
        {
          q: "Do you work with companies outside Slovakia?",
          a: "Yes, across the EU. We meet in Košice or online, in English or Slovak.",
        },
        {
          q: "What happens after launch?",
          a: "You can take it over and run it yourself. Or stay on a monthly retainer and we handle hosting, updates and small changes.",
        },
      ],
    },
    mobile: {
      metaTitle: "Mobile app development for iOS and Android | Ergodic",
      metaDescription:
        "Custom mobile apps for iOS and Android from one React Native codebase. App Store and Google Play release, push notifications, offline mode.",
      h1: "Mobile app development for iOS and Android",
      lead: "One app, one codebase, two stores. We build in React Native and Expo, so a new feature lands on iPhone and Android together and you don't pay for it twice.",
      forWho: [
        "Businesses whose customers come back often and a website isn't enough. Orders, bookings, loyalty.",
        "People in the field who need the app where there's no signal.",
        "Startups that want to test an idea on both platforms without two teams.",
      ],
      deliverables: [
        "React Native and Expo build for iOS and Android.",
        "Push notifications, offline mode, sign-in and payments, as the app needs them.",
        "Connection to your website, API or internal system.",
        "App Store and Google Play release, review included. The app is listed under your company.",
      ],
      faq: [
        {
          q: "How much does a mobile app cost?",
          a: "It depends on what it has to do. After the first call you get options side by side, from simple to extensive, each with a price.",
        },
        {
          q: "Why one codebase instead of two native apps?",
          a: "For most business apps React Native is fast enough and cheaper, because it's written and maintained once. If yours needs something only native code can do, we say so in the options.",
        },
        {
          q: "Who publishes the app to the stores?",
          a: "We do. We prepare the listings and screenshots and take it through App Store and Google Play review.",
        },
        {
          q: "What happens after launch?",
          a: "iOS and Android change every year and the app has to keep up. On a monthly plan we maintain it and add small features.",
        },
      ],
    },
    automation: {
      metaTitle: "Business process automation and AI | Ergodic",
      metaDescription:
        "Business process automation. We connect your systems through APIs, use AI where it makes sense and build internal dashboards.",
      h1: "Business process automation and AI",
      lead: "If someone on your team copies data from one system to another every week, there's another way. Repetitive work goes to the machine, decisions stay with a person.",
      forWho: [
        "Companies where orders, invoices or stock get retyped between systems.",
        "Teams that spend hours on spreadsheets and reports.",
        "Companies that want AI on email, documents or enquiries, but not without checks.",
      ],
      deliverables: [
        "A process map. Where data starts, who retypes it and how much time that costs.",
        "API integrations between your e-shop, CRM, ERP, accounting and bank.",
        "AI workflows that read documents and sort enquiries. A person decides on the steps that matter.",
        "Internal dashboards with numbers you no longer export by hand.",
        "Monitoring, so you hear about a broken link before a customer does.",
      ],
      faq: [
        {
          q: "What's worth automating first?",
          a: "Whatever repeats often, follows rules and hurts when it goes wrong. We first walk through how the business really works, then rank the options by time saved.",
        },
        {
          q: "Do we have to change the tools we use?",
          a: "Usually not. We try to connect what you already have. We suggest a new tool only when the old one can't be connected or it would cost more.",
        },
        {
          q: "Is AI reliable with company data?",
          a: "For some tasks yes, for others no. We use it where a mistake shows up right away, and where money or a customer is involved, a person has the last word.",
        },
        {
          q: "How much does automation cost?",
          a: "Each option comes with a price and an estimate of the work it saves, so it's easy to compare what pays off.",
        },
      ],
    },
    care: {
      metaTitle: "Website and app maintenance retainer | Ergodic",
      metaDescription:
        "Hosting, updates, monitoring and small features every month for a flat fee. One contact who knows your whole system.",
      h1: "Website and app maintenance on a monthly retainer",
      lead: "A site or app isn't finished on launch day. On a monthly retainer we keep it running and up to date, and add small features when you need them.",
      forWho: [
        "Companies without an in-house developer who don't want to hunt for one at every change.",
        "Owners of sites and apps whose original vendor stopped answering.",
        "Companies that want to grow a system step by step instead of a big project every few years.",
      ],
      deliverables: [
        "Hosting and SSL certificates.",
        "Security and platform updates.",
        "Uptime and error monitoring.",
        "Small changes and new features every month.",
        "One contact who knows the whole system.",
      ],
      faq: [
        {
          q: "Will you take over a site you didn't build?",
          a: "Yes. We review it first, tell you what shape it's in, and suggest whether to maintain it or rebuild it step by step.",
        },
        {
          q: "What if I need a bigger change?",
          a: "Small changes are in the retainer. A bigger one we draw up as separate options with prices, and you decide.",
        },
        {
          q: "How much is the retainer?",
          a: "It depends on how many systems we look after and how much work you expect each month. You know the price up front.",
        },
      ],
    },
  },
}
