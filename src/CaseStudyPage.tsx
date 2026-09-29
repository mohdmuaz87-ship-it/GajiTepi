import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  Link2,
  Share2,
  ShieldCheck,
  Star,
} from 'lucide-react'
import PostVisual from './PostVisual'
import './case-study.css'

type SectionId =
  | 'brief'
  | 'noise'
  | 'metaphor'
  | 'system'
  | 'interaction'
  | 'numbers'
  | 'learned'
  | 'credits'

type Step = { kicker: string; title: string; body: string; visual: 'noise' | 'funnel' | 'receipt' }
type Related = { type: string; title: string; read: string; color: string; mark: string }

const toc: { id: SectionId; n: string; label: string }[] = [
  { id: 'brief', n: '01', label: 'Cerita mula' },
  { id: 'noise', n: '02', label: 'Masalah sebenar' },
  { id: 'metaphor', n: '03', label: 'Metaphore' },
  { id: 'system', n: '04', label: 'Tipografi & warna' },
  { id: 'interaction', n: '05', label: 'Interaksi' },
  { id: 'numbers', n: '06', label: 'Angka' },
  { id: 'learned', n: '07', label: 'Pelajaran' },
  { id: 'credits', n: '08', label: 'Credits' },
]

const steps: Step[] = [
  {
    kicker: 'Scene 01 — Before',
    title: 'Paparan yang terlalu ramai',
    body: 'Semua orang jerakkan jumlah yang sama: “RM3,200 sebulan!” Kalau semua orang berkata benda yang sama, tiada siapa yang menang. Kami mulakan dengan sengaja meniru halaman terburuk yang pernah kami jumpa: sembilan kad janji, semua besar, semua oren.',
    visual: 'noise',
  },
  {
    kicker: 'Scene 02 — The filter',
    title: 'Tapis satu demi satu',
    body: 'Setiap program perlu menanggung burden of proof. Ia mesti jawab lima soalan yang sama: modal minimum, cara payout, siapa yang untung, dan bolehkah orang biasa benar-benar buat. Yang tak jawab, dibuang. Sembilan masuk, empat keluar.',
    visual: 'funnel',
  },
  {
    kicker: 'Scene 03 — After',
    title: 'Akhirnya, satu resit',
    body: 'Hasilnya bukan halaman paling cantik — tapi halaman yang boleh dipercayai. Empat program, satu skor yang konsisten, dan satu bahasa yang sama dari kad sehingga ke artikel. Satu keputusan, satu sumber rujukan.',
    visual: 'receipt',
  },
]

const stats = [
  { value: '4', lines: ['Program yang', 'layak'] },
  { value: 'RM0', lines: ['Modal mula', 'untuk semua'] },
  { value: '12', lines: ['Minggu', 'ujian sebenar'] },
  { value: '38K', lines: ['Pembaca dalam', '3 bulan'] },
]

const awards = [
  { label: 'Design', score: 8.8, w: '88%' },
  { label: 'User Experience', score: 8.4, w: '84%' },
  { label: 'Motion', score: 8.1, w: '81%' },
  { label: 'Development', score: 8.6, w: '86%' },
  { label: 'Content', score: 9.0, w: '90%' },
]

const swatches = [
  { hex: '#f6f2e9', name: 'Krim', note: 'Latar utama' },
  { hex: '#fbfaf6', name: 'Kertas', note: 'Kad & panel' },
  { hex: '#20221f', name: 'Ink', note: 'Teks & footer' },
  { hex: '#ee6948', name: 'Oren', note: 'Aksen satu' },
  { hex: '#d9d4c8', name: 'Garis', note: 'Pembatas' },
]

const credits = [
  { role: 'Design direction', who: 'Aina Yusof', note: 'Konsep, sistem tipografi, ilustrasi' },
  { role: 'Engineering', who: 'Danish Rosli', note: 'Build, scroll sequence, animasi' },
  { role: 'Research & data', who: 'Siti Nadhirah', note: 'Ujian payout, semakan terma rasmi' },
  { role: 'Copy & voice', who: 'Editorial GajiTepi', note: 'Bahasa Malaysia, ringkas & jujur' },
]

const related: Related[] = [
  { type: 'Panduan', title: 'Cara daftar Shopee Affiliate Malaysia: panduan lengkap 2026', read: '8 min baca', color: '#f8dfcf', mark: 'SH' },
  { type: 'Real talk', title: 'Berapa boleh dapat dengan TikTok Shop Affiliate? Kiraan sebenar', read: '11 min baca', color: '#d9e5d5', mark: 'TT' },
  { type: 'Perbandingan', title: 'Shopee vs Involve Asia: mana lebih sesuai untuk beginner?', read: '7 min baca', color: '#dedbf2', mark: 'VS' },
]

/* ---------------- scene visuals ---------------- */

const claims = [
  ['RM3,200', 'setiap bulan'],
  ['0 hari', 'untuk mula'],
  ['100%', 'pasti jadi'],
  ['RM8,000', 'sebulan'],
  ['Tanpa', 'risiko'],
  ['24 jam', 'payout'],
  ['RM5,100', 'bonus bulan'],
  ['Percuma', 'daftar'],
  ['RM2,700', 'bersih'],
]

const funnelRows = ['9 program', 'Semak terma payout', 'Cuba sendiri', '4 layak']

const receiptItems = [
  { name: 'Shopee Affiliate', score: 4.6, w: '92%' },
  { name: 'TikTok Shop', score: 4.3, w: '86%' },
  { name: 'Involve Asia', score: 4.1, w: '82%' },
  { name: 'Lazada Affiliate', score: 3.8, w: '76%' },
]

function NoiseVisual() {
  return (
    <div className="cs-noise" aria-hidden="true">
      {claims.map(([big, small], i) => (
        <span key={big} className={i > 4 ? 'dim' : undefined}>
          <b>{big}</b>
          <small>{small}</small>
        </span>
      ))}
    </div>
  )
}

function FunnelVisual() {
  return (
    <div className="cs-funnel" aria-hidden="true">
      {funnelRows.map((row) => (
        <span key={row}>{row}</span>
      ))}
    </div>
  )
}

function ReceiptVisual() {
  return (
    <div className="cs-receipt" data-reveal aria-hidden="true">
      <header>
        <span>GajiTepi · resit</span>
        <span>26 Sep 2026</span>
      </header>
      {receiptItems.map((item) => (
        <div key={item.name}>
          <div className="cs-receipt-line">
            <b>{item.name}</b>
            <span>{item.score.toFixed(1)}</span>
          </div>
          <i>
            <u style={{ '--w': item.w } as CSSProperties} />
          </i>
        </div>
      ))}
      <footer>
        <span>4 / 9 layak</span>
        <span>Disahkan 26.09.26</span>
      </footer>
    </div>
  )
}

function SceneVisual({ kind }: { kind: Step['visual'] }) {
  if (kind === 'noise') return <NoiseVisual />
  if (kind === 'funnel') return <FunnelVisual />
  return <ReceiptVisual />
}

/* ---------------- page ---------------- */

export default function CaseStudyPage({ onBack, onOpenArticle }: { onBack: () => void; onOpenArticle: () => void }) {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState<SectionId>('brief')
  const [scene, setScene] = useState(0)
  const [lift, setLift] = useState(false)
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const stepRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    let lastY = -1
    const measure = () => {
      lastY = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? Math.min(100, (window.scrollY / height) * 100) : 0)

      const sectionLine = window.innerHeight * 0.4
      let nextSection: SectionId = 'brief'
      toc.forEach((item) => {
        const el = document.getElementById(item.id)
        if (el && el.getBoundingClientRect().top <= sectionLine) nextSection = item.id
      })
      setActive(nextSection)

      const sceneLine = window.innerHeight * 0.45
      let nextScene = 0
      stepRefs.current.forEach((el, index) => {
        if (el && el.getBoundingClientRect().top <= sceneLine) nextScene = index
      })
      setScene(nextScene)

    }
    const onScroll = () => {
      if (Math.abs(window.scrollY - lastY) < 2) return
      measure()
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            reveal.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 },
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => reveal.observe(el))
    return () => reveal.disconnect()
  }, [scene])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const goTo = (id: SectionId) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <main className="cs-page">
      <div className="cs-progress" style={{ width: `${progress}%` }} />

      <header className="cs-head container">
        <div className="cs-crumbs">
          <button onClick={onBack}>Home</button>
          <span>/</span>
          <button onClick={onBack}>Blog</button>
          <span>/</span>
          <b>Case study</b>
        </div>

        <div className="cs-head-grid">
          <div>
            <div className="cs-kicker">
              <span className="cs-dot" /> Case study · GajiTepi Design
            </div>
            <h1 className="cs-title">
              Side income, <em>tanpa</em> SEARCHLIGHT
            </h1>
            <p className="cs-standfirst">
              Manifest kami: satu skor, satu bahasa, dan satu halaman yang boleh dipercayai. Apa yang kami buang,
              apa yang kami skor, dan kenapa sembilan program akhirnya menjadi empat.
            </p>
            <div className="cs-tags">
              <span>Editorial design</span>
              <span>Design system</span>
              <span>Scroll motion</span>
              <span>Bahasa Malaysia</span>
            </div>
          </div>

          <aside>
            <div className="cs-byline">
              <div className="cs-avatar">AY</div>
              <div className="cs-byline-text">
                <b>Aina Yusof</b>
                <span>Design lead · GajiTepi</span>
              </div>
            </div>
            <div className="cs-share">
              <button aria-label="Kongsi"><Share2 size={15} /></button>
              <button aria-label="Salin pautan" onClick={copyLink} className={copied ? 'cs-copied' : undefined}>
                {copied ? <Check size={15} /> : <Link2 size={15} />}
              </button>
              <button aria-label="Ke atas" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <ArrowUp size={15} />
              </button>
            </div>
            <div className="cs-side-card" style={{ marginTop: 22 }}>
              <h4>On this page</h4>
              <div className="cs-score-row"><span>Diterbitkan</span><b>26 Sep 2026</b></div>
              <div className="cs-score-row"><span>Masa baca</span><b>9 min</b></div>
              <div className="cs-score-row"><span>Kemajuan</span><b>Draft 4</b></div>
              <button className="cs-side-link" onClick={onBack}>Lagi daripada blog <ArrowUpRight size={15} /></button>
            </div>
          </aside>
        </div>
      </header>

      <section className="cs-cover">
        <div className="cs-cover-stage">
          <div className="cs-cover-glow" />
          <div className="cs-cover-grid" />
          <div className="cs-cover-word">
            <span>SEJARAH</span>
            <i>side income</i>
          </div>
          <div className="cs-float cs-float-1"><b>RM0</b><small>modal mula</small></div>
          <div className="cs-float cs-float-2"><b>4 / 9</b><small>program layak</small></div>
          <div className="cs-float cs-float-3"><b>5 soalan</b><small>semakan wajib</small></div>
          <div className="cs-float cs-float-4"><b>12 minggu</b><small>ujian sebenar</small></div>
          <div className="cs-badge">
            <small>Anugerah</small>
            <b>8.8</b>
            <span><Star size={11} fill="currentColor" /> Site of the day</span>
          </div>
          <div className="cs-cover-sub">GajiTepi · Sept 2026 · Case study oleh GajiTepi Design</div>
        </div>
        <div className="container cs-caption">
          <span>Fig. 01 — Ranking mula: satu ayat, satu nombor, satu tindakan</span>
          <span>Reka bentuk &amp; build: GajiTepi Design, 2026</span>
        </div>
      </section>

      <div className="cs-body container">
        <nav className="cs-rail" aria-label="Kandungan artikel">
          <div className="cs-rail-title">Kandungan</div>
          <div className="cs-toc">
            {toc.map((item) => (
              <button key={item.id} className={active === item.id ? 'active' : undefined} onClick={() => goTo(item.id)}>
                <span>{item.n}</span> {item.label}
              </button>
            ))}
          </div>
          <div className="cs-rail-note">
            <b>Kenapa halaman ini wujud</b>
            <span>Majoriti program affiliate gagal bukan sebab produk — tapi sebab janji yang tak boleh dipercayai.</span>
          </div>
        </nav>

        <article className="cs-prose">
          <p className="lead-in">
            Ramai orang bertanya: jika duit ini benar-benar ada, kenapa ramai yang kena tipu? Jawapannya bukan
            sebab programnya rosak — tetapi sebab halaman yang menjualnya.
          </p>
          <p>
            Kami mulakan GajiTepi kerana terlalu banyak halaman “review” di Malaysia kelihatan seperti salinan
            halaman jualan. Skor tanpa methodology, angka tanpa tarikh, dan bonus yang tidak pernah kena pada
            orang biasa. Bila kami baca halaman-halaman itu sebagai bakal pengguna, kami sedar masalahnya bukan
            aliran. Orang masih tidak percaya apa yang mereka baca.
          </p>

          <h2 id="brief"><sup>01</sup> Cerita mula: RM3,200 yang tak pernah sampai</h2>
          <p>
            Pada Julai 2025, seorang pembaca menghantar satu screenshot: “RM3,200 bulan lepas, saya copy paste.”
            Scroll ke atas, dan dia ternampak satu syarikat cajaran tersembunyi serta seratus komen yang meminta
            “cara”. Appeal yang sama muncul di empat halaman lain, ayat yang sama, angka yang sama. Bukan
            kebetulan — itu template yang boleh disalin.
          </p>
          <p>
            Dalam tempoh dua minggu, kami mengumpul 61 halaman yang menjanjikan RM1,000 ke atas. Selepas
            tapisan kata kunci, 47 advertiser, dan 22 testimonial yang perlu disahkan semula, hanya enam
            program yang bertahan untuk diuji sepenuhnya. Empat daripada enam itu akhirnya layak diterbitkan.
          </p>
          <ul>
            <li><i>01</i><span>Siapa yang untung, dan berapa banyak? Nama boleh kabur, tetapi nombor mesti ada.</span></li>
            <li><i>02</i><span>Bolehkah orang yang baru bermula benar-benar buat? Jawapan “ya” tanpa syarat adalah red flag.</span></li>
            <li><i>03</i><span>Bila duit masuk? Tempoh payout yang kabur adalah tanda program belum matang.</span></li>
          </ul>

          <div className="cs-callout">
            <p>“Skor tinggi bukan trofi. Ia cuma bukti bahawa kami benar-benar mencuba.”</p>
            <small>— Aina Yusof, design lead</small>
          </div>

          <h2 id="noise"><sup>02</sup> Masalah sebenar: terlalu ramai, terlalu gaduh</h2>
          <p>
            Setengah awal kami fokus pada perkara teknikal: hosting pantas, domain, SEO. Semua betul, semua tidak
            penting. Apabila kami tunjukkan wireframe pertama kepada 12 orang yang tidak pernah membeli secara
            affiliate, mereka hanya membawa satu soalan: “Ini program yang mana?”
          </p>
          <p>
            Jadi kami terbalik: mulakan daripada soalan yang mereka ada, kemudian susun halaman. Bukan halaman
            yang beritahu kami tentang diri kami sendiri.
          </p>

          <div className="cs-breakout cs-scene-block" id="metaphor">
            <div className="cs-breakout-inner container">
              <h2 className="cs-breakout-title"><sup>03</sup> Metaphore: daripada hingar kepada satu resit</h2>
              <p className="cs-breakout-lead">
                Fig. 02 — Tiga scene, satu jalan. Scroll untuk melihat scene di sebelah kiri bertukar.
              </p>
              <div className="cs-scenes">
                <div className="cs-scene-visual">
                  <SceneVisual kind={steps[scene].visual} />
                </div>
                <div className="cs-scene-steps">
                  {steps.map((step, index) => (
                    <section
                      key={step.kicker}
                      className={scene === index ? 'cs-step active' : 'cs-step'}
                      ref={(el) => { stepRefs.current[index] = el }}
                    >
                      <small>{step.kicker}</small>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <h2 id="system"><sup>04</sup> Sistem tipografi dan warna</h2>
          <p>
            Tiga font sahaja: Fraunces untuk ayat yang “bicara”, DM Sans untuk antara muka, dan DM Mono untuk
            nombor serta label. Palet warna diturunkan daripada satu aset — oren pada satu resit penghantaran —
            supaya tajuk, butang dan penanda skor terasa seperti satu keluarga.
          </p>
          <p>
            Skala ditetapkan supaya tajuk, perenggan dan label hanya berbeza dalam tiga aras. Kurang daripada
            itu, dan halaman mula bercakap-cakap antara satu bahagian dengan bahagian lain.
          </p>

          <div className="cs-fig-label">Fig. 03 — Palet warna dan skala tipografi</div>
          <div className="cs-swatches" data-reveal>
            {swatches.map((swatch) => (
              <div className="cs-swatch" key={swatch.name}>
                <i style={{ background: swatch.hex }} />
                <b>{swatch.name}</b>
                <small>{swatch.hex}</small>
              </div>
            ))}
          </div>

          <div className="cs-scale" data-reveal>
            <div className="s1"><small>Display · 92 / −3.4 tracking</small><b>Side income</b></div>
            <div className="s2"><small>Section · 33 / −1.2</small><b>Masalah sebenar</b></div>
            <div className="s3"><small>Body · 16.5 / 1.75</small><b>Program ini stabil, tetapi payout mengambil 14 hari.</b></div>
            <div className="s4"><small>Serif italic · pull quote</small><b>“Skor tinggi bukan dipilih.”</b></div>
            <div className="s5"><small>Mono · label</small><b>Dikemas kini 26 Sep 2026</b></div>
          </div>

          <h2 id="interaction"><sup>05</sup> Interaksi yang membuat orang terus baca</h2>
          <p>
            Setiap interaksi mesti ada tujuan. Hover pada kad program membuka quick verdict — bukan satu panel
            panjang yang tidak siapa mahu tutup.
          </p>
          <p>
            Kad di bawah ialah komponen sebenar daripada laman kami. Hover dengan tetikus, atau gunakan butang
            untuk mengujinya pada telefon.
          </p>

          <div className="cs-demo">
            <div className="cs-demo-head">
              <p>Fig. 04 — Live component · hover / klik untuk uji</p>
              <div className="cs-demo-toggle">
                <button className={lift ? undefined : 'active'} onClick={() => setLift(false)}>Rehat</button>
                <button className={lift ? 'active' : undefined} onClick={() => setLift(true)}>Hover</button>
              </div>
            </div>
            <div
              className={lift ? 'cs-demo-card lift' : 'cs-demo-card'}
              onMouseEnter={() => setLift(true)}
              onMouseLeave={() => setLift(false)}
            >
              <header>
                <h4>Shopee Affiliate</h4>
                <span className="cs-demo-score">
                  <Star size={12} fill="currentColor" /> <b>4.6</b>
                </span>
              </header>
              <p>
                Promote produk yang orang Malaysia memang cari setiap hari. Tiada minimum payout, dan cashout
                boleh dibuat melalui bank.
              </p>
              <div className="cs-demo-verdict">
                <ShieldCheck size={15} />
                <span>Sesuai untuk beginner: modal sifar, payout boleh dikawal, katalognya sudah dikenali ramai.</span>
              </div>
            </div>
          </div>

          <div className="cs-breakout cs-band" id="numbers">
            <div className="cs-breakout-inner container">
              <div className="cs-band-label">Fig. 05 — Angka selepas 12 minggu di lapangan</div>
              <div className="cs-stat-grid">
                {stats.map((stat) => (
                  <div className="cs-stat" key={stat.value}>
                    <b>{stat.value}</b>
                    <span>{stat.lines.map((line) => <span key={line}>{line}<br /></span>)}</span>
                  </div>
                ))}
              </div>
              <p className="cs-band-note">
                Semua payout disahkan sendiri sebelum kami publish. Tiada angka yang diambil daripada halaman
                orang lain.
              </p>
            </div>
          </div>

          <h2 id="learned"><sup>07</sup> Apa yang kami belajar</h2>
          <p>Tiga perkara yang tidak kami jangka sebelum bermula:</p>
          <ul>
            <li><i>01</i><span>Menyembunyikan affiliate disclosure tidak menjimatkan apa-apa. Ia cuma menunda kepercayaan.</span></li>
            <li><i>02</i><span>Kad paling jujur ialah kad paling boring. Empat baris fakta lebih meyakinkan daripada sepuluh testimonial.</span></li>
            <li><i>03</i><span>Skor tanpa methodology hanyalah marketing. Setiap kali ada yang challenge nombor kami, kami kembali kepada cara kami mengira.</span></li>
          </ul>
          <p>
            Nasihat untuk pembaca: mulakan kecil, sahkan payout sendiri, dan catat bila terma berubah. Program
            berubah, blog pun kena berubah.
          </p>

          <h2 id="credits"><sup>08</sup> Credits</h2>
          <p>Projek ini dibina dalam sembilan minggu, dengan data yang disahkan sehingga 26 September 2026.</p>
          <div className="cs-credits">
            {credits.map((credit) => (
              <div key={credit.role}>
                <small>{credit.role}</small>
                <b>{credit.who}</b>
                <span>{credit.note}</span>
              </div>
            ))}
          </div>

          <div className="cs-author">
            <div className="cs-avatar">AY</div>
            <div>
              <h4>Aina Yusof</h4>
              <p>
                Design lead GajiTepi. Beliau membina sistem visual dan metodologi skor yang digunakan untuk semua
                markah di laman ini. Sebelum GajiTepi, beliau lima tahun dalam e-commerce UX.
              </p>
            </div>
          </div>
        </article>

        <aside className="cs-side">
          <div className="cs-side-card">
            <h4>Markah halaman</h4>
            <div className="cs-score-row"><span>Design</span><b>8.8</b></div>
            <div className="cs-score-row"><span>UX</span><b>8.4</b></div>
            <div className="cs-score-row"><span>Motion</span><b>8.1</b></div>
            <div className="cs-score-row"><span>Dev</span><b>8.6</b></div>
            <p>4 jawan, 61 undi.</p>
          </div>
          <div className="cs-side-card">
            <h4>Dalam halaman ini</h4>
            <p>8 bahagian · 3 scene · 4 program · 12 minggu data.</p>
            <button className="cs-side-link" onClick={() => goTo('credits')}>Lihat credits <ArrowRight size={15} /></button>
          </div>
          <div className="cs-side-card">
            <h4>Langkah seterusnya</h4>
            <p>Teruskan dengan panduan pendaftaran penuh — dengan disclosure yang jelas.</p>
            <button className="cs-side-link" onClick={onOpenArticle}>Baca panduan <ArrowUpRight size={15} /></button>
          </div>
        </aside>
      </div>

      <div className="cs-breakout cs-band cs-awards-band">
        <div className="cs-breakout-inner container">
          <div className="cs-band-label">Penilaian juri · 4 jawan, 61 undi</div>
          <div className="cs-awards" data-reveal>
            {awards.map((award) => (
              <div className="cs-award-row" key={award.label}>
                <span>{award.label}</span>
                <i className="cs-award-bar">
                  <u style={{ '--w': award.w } as CSSProperties} />
                </i>
                <b>{award.score.toFixed(1)}</b>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="cs-related container">
        <div className="cs-related-head">
          <div>
            <div className="eyebrow orange">Daripada blog</div>
            <h2>Lagi panduan yang <em>boleh dipraktikkan.</em></h2>
          </div>
          <button className="compare-link" onClick={onOpenArticle}>Semua artikel <ArrowRight size={16} /></button>
        </div>
        <div className="article-grid">
          {related.map((post) => (
            <article className="article-card" key={post.title} onClick={onOpenArticle}>
              <div className="article-visual" style={{ backgroundColor: post.color }}>
                <PostVisual type={post.type} />
              </div>
              <div className="article-meta">
                <span>{post.type}</span>
                <span>{post.read}</span>
              </div>
              <h3>{post.title}</h3>
              <span className="read-more">Baca artikel <ArrowRight size={15} /></span>
            </article>
          ))}
        </div>
      </section>

      <div className="container">
        <div className="cs-newsletter">
          <div>
            <div className="eyebrow">Newsletter GajiTepi</div>
            <h2>Update program, <em>sekali seminggu.</em></h2>
            <p>
              Skor baru, terma payout yang berubah, dan satu program yang kami buang daripada senarai. Tiada
              affiliate, tiada spam.
            </p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setSubscribed(true) }}>
            <div className="cs-sub-form">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setSubscribed(false) }}
                placeholder="email@anda.my"
                aria-label="Alamat emel"
              />
              <button type="submit">
                {subscribed && <Check size={15} />}
                {subscribed ? 'Terdaftar' : 'Daftar'}
              </button>
            </div>
            <p className="cs-sub-note">
              {subscribed ? 'Terima kasih — semak inbox anda.' : 'Maksimum satu email seminggu. Berhenti bila-bila masa.'}
            </p>
          </form>
        </div>
      </div>

      <div style={{ height: 40 }} />
    </main>
  )
}
