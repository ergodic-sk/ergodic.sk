// Privacy notice for the contact form (GDPR art. 13). Draft: have it reviewed before launch.
import type { Locale } from "@/i18n/routing"

type Section = { title: string; body: string[] }

export const privacy: Record<Locale, { updated: string; sections: Section[] }> = {
  sk: {
    updated: "Účinné od 12. 10. 2026",
    sections: [
      {
        title: "Prevádzkovateľ",
        body: [
          "Ergodic s. r. o., Bauerova 1205/7, 040 23 Košice, IČO 57859892, zapísaná v OR Mestského súdu Košice, oddiel Sro, vložka č. 67484/V. Kontakt: office@ergodic.sk.",
        ],
      },
      {
        title: "Aké údaje spracúvame a prečo",
        body: [
          "Keď nám pošlete zadanie cez formulár, spracúvame meno, názov firmy alebo IČO, e-mail a text správy. Použijeme ich len na to, aby sme vám odpovedali a pripravili ponuku.",
          "Právnym základom je vykonanie opatrení pred uzavretím zmluvy na vašu žiadosť (čl. 6 ods. 1 písm. b) GDPR).",
        ],
      },
      {
        title: "Ako dlho",
        body: [
          "Ak spolupráca nevznikne, správu vymažeme najneskôr do 12 mesiacov. Ak vznikne, údaje uchovávame po dobu trvania zmluvy a lehoty, ktoré vyžadujú účtovné a daňové predpisy.",
        ],
      },
      {
        title: "Kto k nim má prístup",
        body: [
          "Správa sa doručuje e-mailom cez poštový server spoločnosti WebSupport s. r. o. a web beží u poskytovateľa hostingu. Obaja sú sprostredkovatelia, ktorí údaje spracúvajú len podľa našich pokynov. Údaje nepredávame ani nepoužívame na marketing.",
        ],
      },
      {
        title: "Vaše práva",
        body: [
          "Máte právo na prístup k údajom, ich opravu, vymazanie, obmedzenie spracúvania, prenosnosť a právo namietať. Stačí napísať na office@ergodic.sk.",
          "Ak si myslíte, že s údajmi zaobchádzame nesprávne, môžete podať návrh na Úrad na ochranu osobných údajov SR, Hraničná 12, 820 07 Bratislava.",
        ],
      },
      {
        title: "Cookies",
        body: ["Web nepoužíva analytické ani reklamné cookies."],
      },
    ],
  },
  en: {
    updated: "Effective from 12 October 2026",
    sections: [
      {
        title: "Controller",
        body: [
          "Ergodic s. r. o., Bauerova 1205/7, 040 23 Košice, Slovakia, IČO 57859892, registered in the Commercial Register of the Municipal Court Košice, section Sro, file no. 67484/V. Contact: office@ergodic.sk.",
        ],
      },
      {
        title: "What we process and why",
        body: [
          "When you send a brief through the form, we process your name, company name or IČO, email and the message. We use them only to reply to you and prepare an offer.",
          "The legal basis is taking steps at your request before entering into a contract (Art. 6(1)(b) GDPR).",
        ],
      },
      {
        title: "How long",
        body: [
          "If we do not start working together, we delete the message within 12 months at the latest. If we do, we keep the data for the duration of the contract and the periods required by accounting and tax law.",
        ],
      },
      {
        title: "Who has access",
        body: [
          "The brief is delivered by email through the mail server of WebSupport s. r. o., and the site runs at a hosting provider. Both are processors acting only on our instructions. We do not sell the data or use it for marketing.",
        ],
      },
      {
        title: "Your rights",
        body: [
          "You have the right to access, rectify and erase your data, to restrict processing, to data portability and to object. Just write to office@ergodic.sk.",
          "If you believe we handle your data incorrectly, you can lodge a complaint with the Office for Personal Data Protection of the Slovak Republic, Hraničná 12, 820 07 Bratislava.",
        ],
      },
      {
        title: "Cookies",
        body: ["The site uses no analytics or advertising cookies."],
      },
    ],
  },
}
