import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
} from 'lucide-react'
import PostVisual from './PostVisual'
import './home.css'

export type HomeBrand = {
  id: string
  name: string
  category: string
  description: string
  score: number
  accent: string
  logo: string
  tag: string
  payout: string
  capital: string
  followers: string
  commission: string
}

type Post = { type: string; title: string; read: string; color: string; logo: string; accent: string; image: string }

const stats = [
  { value: '4', label: 'Program lulus semakan' },
  { value: '61', label: 'Halaman disaring' },
  { value: 'RM0', label: 'Modal untuk mula' },
  { value: '12', label: 'Minggu ujian sebenar' },
]

const steps = [
  {
    n: '01',
    title: 'Daftar dan cuba sendiri',
    body: 'Kami buka akaun sendiri dan promote seperti orang biasa. Program yang hanya boleh dibuktikan oleh orang dalam tidak melepasi pusingan pertama.',
    icon: Target,
  },
  {
    n: '02',
    title: 'Sahkan payout',
    body: 'Minimum payout, kaedah cashout dan tempoh bayaran disemak terus dengan terma rasmi platform.',
    icon: ShieldCheck,
  },
  {
    n: '03',
    title: 'Skor dan kemas kini',
    body: 'Skor ditulis semula bila terma berubah. Tarikh semakan sentiasa tercetak di atas setiap review.',
    icon: RefreshCw,
  },
]

const voices = [
  {
    initials: 'NA',
    name: 'Nur A.',
    role: 'Penjual accessories, KL',
    metric: '+RM1,240 bulan pertama',
    quote: 'Blog ini membantu saya untuk membuat pilihan nak join program affiliate yang mana satu sebab ada skor. Jadi saya pilih yang mudah untuk saya mula.',
    tone: '#f6e3d8',
  },
  {
    initials: 'FI',
    name: 'Firda I.',
    role: 'Freelance editor, PJ',
    metric: 'Bayar pertama 9 hari',
    quote: 'Blog transparent, ditulis mengikut pengalaman penulis sendiri tentang cara mendapatkan komisen daripada program affiliate di luar.',
    tone: '#e2e9f7',
  },
  {
    initials: 'RA',
    name: 'Razak A.',
    role: 'Guru surau, Kedah',
    metric: 'RM0 modal, telefon sahaja',
    quote: 'Sebab saya join affiliate - mudah dan pantas. Join, dapat link, terus buat kerja.',
    tone: '#e4efdf',
  },
]

const posts: Post[] = [
  { type: 'Panduan', title: 'Cara daftar Shopee Affiliate Malaysia: panduan lengkap 2026', read: '8 min baca', color: '#f8e6da', logo: 'S', accent: '#f45b35', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85' },
  { type: 'Real talk', title: 'Berapa boleh dapat dengan TikTok Shop Affiliate? Kiraan sebenar', read: '11 min baca', color: '#e0e9dd', logo: '♪', accent: '#171717', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=900&q=85' },
  { type: 'Perbandingan', title: 'Shopee vs Involve Asia: mana lebih sesuai untuk beginner?', read: '7 min baca', color: '#e3e0f5', logo: 'i', accent: '#6954d9', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85' },
]

type Props = {
  brands: HomeBrand[]
  onOpenBrand: (brand: HomeBrand) => void
  onPrograms: () => void
  onCompare: () => void
  onArticle: () => void
}

export default function HomePage({ brands, onOpenBrand, onPrograms, onCompare, onArticle }: Props) {
  const [tab, setTab] = useState(brands[0].id)
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const active = brands.find((brand) => brand.id === tab) ?? brands[0]

  return (
    <main className="hl">
      {/* ------------------------------------------------ hero */}
      <section className="hl-hero">
        <div className="hl-blobs" aria-hidden="true">
          <i className="hl-blob hl-blob-1" />
          <i className="hl-blob hl-blob-2" />
          <i className="hl-blob hl-blob-3" />
        </div>

        <div className="hl-hero-inner">
          <div className="hl-pill">
            <span className="hl-pill-dot" /> Kemas kini 26 September 2026 · 4 program lulus
          </div>

          <h1 className="hl-h1">
            Side income yang <em>masuk akal</em>,<br />bukan janji manis.
          </h1>

          <p className="hl-sub">
            Kami daftar, cuba dan sahkan payout sendiri. Daripada 61 halaman affiliate di Malaysia,
            empat yang benar-benar layak untuk orang yang baru bermula.
          </p>

          <div className="hl-cta-row">
            <button className="hl-btn hl-btn-dark" onClick={onPrograms}>
              Lihat semua program <ArrowRight size={17} />
            </button>
            <button className="hl-btn hl-btn-ghost" onClick={onCompare}>
              Bandingkan side by side
            </button>
          </div>

          <div className="hl-trust">
            <span><Check size={14} /> Tiada program MLM</span>
            <span><Check size={14} /> Semua payout disahkan</span>
            <span><Check size={14} /> Skor ada methodology</span>
          </div>
        </div>

        {/* ------------------------------------------- app mockup */}
        <div className="hl-stage">
          <div className="hl-window">
            <div className="hl-window-bar">
              <div className="hl-dots"><i /><i /><i /></div>
              <div className="hl-window-title">gajitepi.my / skor</div>
              <div className="hl-window-pill">Live</div>
            </div>

            <div className="hl-tabs" role="tablist" aria-label="Program">
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  role="tab"
                  aria-selected={tab === brand.id}
                  className={tab === brand.id ? 'hl-tab active' : 'hl-tab'}
                  onClick={() => setTab(brand.id)}
                >
                  <span className="hl-tab-logo" style={{ background: brand.accent }}>{brand.logo}</span>
                  {brand.name}
                </button>
              ))}
            </div>

            <div className="hl-panel">
              <div className="hl-panel-head">
                <div>
                  <span className="hl-label">{active.category}</span>
                  <h3>{active.name}</h3>
                </div>
                <div className="hl-score">
                  <b>{active.score.toFixed(1)}</b>
                  <span>/ 5</span>
                  <div className="hl-stars">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span className="hl-star" key={i}>
                        <Star size={12} />
                        <span style={{ width: `${Math.max(0, Math.min(1, active.score - i)) * 100}%` }}><Star size={12} fill="currentColor" /></span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="hl-panel-desc">{active.description}</p>

              <div className="hl-facts">
                <div><small>Modal mula</small><b>{active.capital}</b></div>
                <div><small>Minimum payout</small><b>{active.payout}</b></div>
                <div><small>Komisen biasa</small><b>{active.commission}</b></div>
                <div><small>Followers</small><b>{active.followers}</b></div>
              </div>

              <div className="hl-meter">
                <div className="hl-meter-head">
                  <span>Skor GajiTepi</span>
                  <b>{Math.round(active.score * 20)}%</b>
                </div>
                <div className="hl-meter-track">
                  <u style={{ width: `${active.score * 20}%` }} />
                </div>
              </div>

              <div className="hl-panel-foot">
                <span><Check size={14} /> Sesuai untuk beginner</span>
                <button onClick={() => onOpenBrand(active)}>Buka review penuh <ArrowUpRight size={15} /></button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------ stats */}
      <section className="hl-stats container">
        {stats.map((stat) => (
          <div className="hl-stat" key={stat.label}>
            <b>{stat.value}</b>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* --------------------------------------------- how we test */}
      <section className="hl-section hl-how container">
        <div className="hl-section-head">
          <div>
            <span className="hl-pill hl-pill-sm"><ShieldCheck size={13} /> Methodology</span>
            <h2>Bagaimana skor kami <em>dihitung</em>.</h2>
          </div>
        </div>

        <div className="hl-steps">
          {steps.map((step) => (
            <div className="hl-step" key={step.n}>
              <div className="hl-step-top">
                <span className="hl-step-n">{step.n}</span>
                <step.icon size={19} />
              </div>
              <h4>{step.title}</h4>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------- compare */}
      <section className="hl-section container">
        <div className="hl-compare">
          <div className="hl-compare-copy">
            <span className="hl-pill hl-pill-sm"><Target size={13} /> Quick compare</span>
            <h2>Tak pasti nak pilih mana?</h2>
            <p>Letak program sebelah-sebelah. Nampak terus bezanya, dari modal sampai ke payout.</p>
            <button className="hl-btn hl-btn-dark" onClick={onCompare}>
              Buka comparison matrix <ArrowRight size={16} />
            </button>
          </div>

          <div className="hl-compare-table">
            <div className="hl-ct-head">
              <span>Program</span><span>Skor</span><span>Modal</span><span>Payout</span>
            </div>
            {brands.map((brand) => (
              <div className="hl-ct-row" key={brand.id} onClick={() => onOpenBrand(brand)}>
                <span className="hl-ct-name">
                  <i style={{ background: brand.accent }}>{brand.logo}</i>
                  {brand.name}
                </span>
                <span><Star size={12} fill="currentColor" /> {brand.score.toFixed(1)}</span>
                <span>{brand.capital}</span>
                <span>{brand.payout}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------- voices */}
      <section className="hl-section container">
        <div className="hl-section-head">
          <div>
            <span className="hl-pill hl-pill-sm"><TrendingUp size={13} /> Hasil daripada reader</span>
            <h2>Apa kata mereka yang sudah <em>mencuba</em>.</h2>
          </div>
        </div>

        <div className="hl-voices">
          {voices.map((voice) => (
            <figure className="hl-voice" key={voice.name} style={{ background: voice.tone }}>
              <div className="hl-voice-metric">{voice.metric}</div>
              <blockquote>{voice.quote}</blockquote>
              <figcaption>
                <span className="hl-voice-avatar">{voice.initials}</span>
                <span><b>{voice.name}</b><small>{voice.role}</small></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------- blog */}
      <section className="hl-section container">
        <div className="hl-section-head">
          <div>
            <span className="hl-pill hl-pill-sm"><Clock3 size={13} /> Dari blog</span>
            <h2>Panduan yang terus <em>boleh dipraktikkan</em>.</h2>
          </div>
          <button className="hl-link" onClick={onArticle}>Semua artikel <ArrowRight size={15} /></button>
        </div>

        <div className="hl-posts">
          {posts.map((post) => (
            <article className="hl-post" key={post.title} onClick={onArticle}>
              <div className="hl-post-visual" style={{ background: post.color }}>
                <PostVisual type={post.type} logo={post.logo} accent={post.accent} image={post.image} />
              </div>
              <div className="hl-post-meta">
                <span>{post.type}</span><span>{post.read}</span>
              </div>
              <h3>{post.title}</h3>
              <span className="hl-post-more">Baca artikel <ArrowRight size={15} /></span>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------- newsletter */}
      <section className="hl-section container">
        <div className="hl-news">
          <div>
            <span className="hl-pill hl-pill-light"><Sparkles size={13} /> Newsletter</span>
            <h2>Update program, <em>sekali seminggu</em>.</h2>
            <p>Skor baru, terma payout yang berubah, dan satu program yang kami buang daripada senarai.</p>
          </div>

          <form
            className="hl-news-form"
            onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setJoined(true) }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setJoined(false) }}
              placeholder="email@anda.my"
              aria-label="Alamat emel"
            />
            <button type="submit">
              {joined ? <Check size={16} /> : null}
              {joined ? 'Terdaftar' : 'Daftar'}
            </button>
            <small>{joined ? 'Terima kasih — semak inbox anda.' : 'Tiada spam. Berhenti bila-bila masa.'}</small>
          </form>
        </div>
      </section>
    </main>
  )
}
