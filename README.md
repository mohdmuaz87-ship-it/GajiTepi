# Gaji Tepi

A responsive Malaysian side-income and affiliate review blog built with Vite, React and TypeScript.

## Programme directory (`#programs`)

`src/ProgramsPage.tsx` + `src/programs.css` are a page dedicated to listing every affiliate programme we track. `src/programs.ts` is the single source of truth for both the programmes and the blog posts attached to each one.

The page has a search field, three filter groups (type, status, sort), a stat band, a card grid and a "latest posts" strip:

- **search** matches programme name, category, tag, "best for" and every related post title
- **type** filters: `Marketplace`, `Network`, `Produk digital`, `Iklan & content`
- **status** filters: `Disyorkan`, `Layak`, `Kondisional`
- **sort** by: skor tertinggi, payout terendah, terbanyak post, nama A–Z
- filters and search combine, and a reset button appears as soon as anything is active

Each card shows the logo, status, score, commission, minimum payout, approval time and post count. Clicking a card opens that programme's page.

## Programme page (`#program/:id`)

Every programme is deep-linkable (`#program/shopee`, `#program/blogr`, …) and shows **all blog posts written about that affiliate**, which is what the card click leads to.

- header card with logo, status, score and a `N artikel · N min baca` pill
- four fact cells: minimum payout, followers, commission, approval
- three working tabs: **Semua post (N)** (default, the related post list), **Ringkasan review** (verdict, highlights, fact list) and **Cara daftar** (the three-step block)
- clicking a post opens the article page with that post's own title, kicker and excerpt; the sidebar lists the programme's other articles
- a "Lagi program yang kami semak" strip cross-links the other programmes, plus a link to the comparison matrix

## Article page (`#article`)

`src/ArticlePage.tsx` + `src/article.css` are the long-form article template. It reuses the case study's editorial layout rather than a one-off article skin, so posts read the same way as the design write-up: numbered section headings, a sticky table of contents, sticky side cards, a full-bleed stat band, and numbered steps.

- reading-progress bar, then breadcrumb buttons back to the directory
- sticky header card: kicker, title, author/date/read-time meta, and a boxed quick verdict
- sticky TOC rail (six sections, scroll-spy) and a sticky side column: quick facts, "baca artikel lain" list, and a subscribe card
- `01`–`06` numbered sections: Ringkasan cepat, Apa itu …, Cara daftar, Berapa boleh dapat, Kelebihan dan perkara perlu diawasi, Soalan lazim
- full-bleed stat band between sections 03 and 04, pros/watch-outs two-column grid, and a working FAQ accordion
- closing CTA, author block, related posts, programme strip, newsletter

Interaction details:

- the progress bar and scroll-spy both read the same six section IDs, so the TOC highlight and the bar stay in step
- because the stat band is `100vw`, the same `.is-wide` technique as the case study fades the TOC rail and side column while it is on screen (`.art-body.is-wide`), so nothing is ever half-covered
- sticky offsets use `--lt-sticky: 100px`, matching `--cs-sticky`
- the breadcrumb, side list, related posts, programme strip and the programme page's post list all cross-link, so any post is reachable from the directory, the programme page or a related post

Content is driven entirely by data, so a new post needs no page-specific code: the template takes a `program` and an optional `post`. `#article` with no post renders that programme's default "how to register" article; clicking any post row passes that post in, and the kicker, meta, stat band, sibling list, FAQ answers and related posts all follow the data. The FAQ answers and stat band are generated from the programme record, so they stay correct without editing the template.

## Routing

All views are hash-routed, so every page is linkable and the browser back/forward buttons work:

| hash | view |
| --- | --- |
| *(none)* | home |
| `#programs` | programme directory |
| `#program/:id` | one programme with its posts |
| `#compare` | comparison matrix |
| `#article` | long-form article (case-study template) |
| `#case-study` | Awwwards-style case study |

An unknown programme id falls back to the default programme instead of rendering nothing.

The footer has a programme column listing the first five programmes, and the nav "Program" button plus the homepage hero and section CTAs all point at the directory.

## Data

`src/programs.ts` exports `programs` (all 8), `featuredPrograms` (the 4 personally tested ones used by the homepage and compare matrix), `programGroups`, `findProgram`, `postsForProgram` and `allPosts`. Adding a programme or a post means editing that one file.

## Home page (redesigned, light theme)

`src/HomePage.tsx` + `src/home.css` rebuild the homepage on a light canvas, borrowing chameleon.io's visual language rather than its dark palette: blurred pastel gradient blobs, pill-shaped CTAs and labels, 24–26px rounded surfaces, a live product-mockup window with floating glass chips, a real bento grid (4 + 2 / 3 + 3 columns), stat band, methodology steps, quick-compare table, reader voices, blog cards and a newsletter CTA.

Interactive: program tabs inside the mockup (hovering a card also switches the tab), filter chips that filter the bento grid, compare rows that open the programme page, and a validating newsletter form. The hero and section CTAs link to the full directory at `#programs`.

## Light theme across every view

`src/light.css` is imported last in `src/main.tsx` and re-skins the original editorial system in `src/styles.css` to the same light language as the homepage. It covers the shared chrome (topbar, translucent blurred header, wordmark, nav, four-column footer), the comparison matrix, the programme pages, the article cards and the case study.

Design tokens: `--cream`/`--paper` are white, `--line` is `#e8e5df`, `--ink` is `#16181a`, `--muted` is `#6f7276` and the accent stays orange `#ee6948`. Surfaces use 20–28px radii, hairline borders and soft shadows; controls (back links, filters, score chips, TOC entries, demo toggles, subscribe field) are pills; micro-labels use DM Mono. The case study's dark cover and full-bleed stat band stay dark for contrast, while its body, cards, receipt, demo and newsletter switch to white.

## Other views

The comparison matrix keeps its original markup and is themed by `src/light.css`. The old standalone article skin and its now-unused rules have been removed from `light.css` in favour of the dedicated `src/article.css`.

## Run locally

```bash
npm install
npm run dev
```

The app includes the home discovery grid, filter chips, a full affiliate programme directory with search and filters, per-programme post listings, an interactive comparison matrix, the case-study-style article template, scorecards, affiliate disclosure, anti-scam trust section, and community CTA.

## Blog case study page

An Awwwards-style editorial case study lives at `#case-study`. It is linked from the footer and from the homepage "Cara kami buat review" button. It is deliberately **not** in the main nav, so `#case-study` is a direct link only.

`src/CaseStudyPage.tsx` + `src/case-study.css` implement it:

- reading-progress bar, sticky table of contents with scroll-spy
- full-bleed cover scene with a "site of the day" badge
- sticky three-scene scroll sequence (noise → filter → receipt) with a live animated visual
- full-bleed dark stat band, palette/type-scale specimen, live hover component demo
- judges' score bars, credits, author block, related posts, newsletter CTA
- full-bleed sections use `.cs-breakout` (`100vw` + negative margin), which is disabled between 901–1180px where the two-column body is off-centre and below 720px where it would spill; `.cs-page` also sets `overflow-x: clip` so the cover glow never widens the page
- because a `100vw` band spans the whole viewport, it would slide under the two sticky columns. The scroll handler flags a full-bleed block reaching the sticky zone with `.cs-body.is-wide`, which fades the TOC rail and the side cards out (and back in) so nothing is ever half-covered
- every sticky offset comes from one token, `--cs-sticky: 100px` (the topbar scrolls away, so the sticky header is 73px tall plus a gutter); `scroll-margin-top` on jump targets uses the same value
