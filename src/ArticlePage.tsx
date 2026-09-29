import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUp,
  Check,
  ChevronRight,
  ExternalLink,
  Link2,
  Share2,
  ShieldCheck,
  Star,
} from 'lucide-react'
import { programs } from './programs'
import type { Program, RelatedPost } from './programs'
import PostVisual from './PostVisual'
import './article.css'

type SectionId = 'summary' | 'what' | 'signup' | 'earnings' | 'pros' | 'faq'

type Props = {
  program: Program
  post?: RelatedPost
  onBack: () => void
  onOpenProgram: (program: Program) => void
  onOpenPost: (program: Program, post: RelatedPost) => void
  onOpenDirectory: () => void
}

const AUTHOR = { initials: 'AY', name: 'Aina Yusof', role: 'Penulis & penguji program · GajiTepi' }

const relatedImages = [
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85',
]

export default function ArticlePage({ program, post, onBack, onOpenProgram, onOpenPost, onOpenDirectory }: Props) {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState<SectionId>('summary')
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const toc: { id: SectionId; n: string; label: string }[] = [
    { id: 'summary', n: '01', label: 'Ringkasan cepat' },
    { id: 'what', n: '02', label: 'Apa itu affiliate?' },
    { id: 'signup', n: '03', label: 'Cara daftar' },
    { id: 'earnings', n: '04', label: 'Berapa boleh dapat?' },
    { id: 'pros', n: '05', label: 'Kelebihan & risiko' },
    { id: 'faq', n: '06', label: 'Soalan lazim' },
  ]

  useEffect(() => {
    let lastY = -1
    const measure = () => {
      lastY = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? Math.min(100, (window.scrollY / height) * 100) : 0)

      const line = window.innerHeight * 0.4
      let next: SectionId = 'summary'
      toc.forEach((item) => {
        const el = document.getElementById(item.id)
        if (el && el.getBoundingClientRect().top <= line) next = item.id
      })
      setActive(next)

    }
    const onScroll = () => { if (Math.abs(window.scrollY - lastY) < 2) return; measure() }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const goTo = (id: SectionId) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const approvalTime = program.approval.replace(/^Kelulusan\s*/i, '')
  const totalRead = program.posts.reduce((sum, item) => sum + Number.parseInt(item.read, 10), 0)
  const title = post ? post.title : `Cara daftar ${program.name}: panduan lengkap 2026`
  const standfirst = post
    ? post.excerpt
    : `Nak mula affiliate tapi tak tahu nak tekan mana? Ini langkah sebenar untuk ${program.name}, tanpa jargon dan tanpa janji pendapatan kayangan.`

  const stats = [
    { value: `${program.score.toFixed(1)}`, lines: ['Skor', 'GajiTepi'] },
    { value: program.payout, lines: ['Minimum', 'payout'] },
    { value: `${program.posts.length}`, lines: ['Artikel', 'tentang program'] },
    { value: `${totalRead}`, lines: ['Min', 'bacaan penuh'] },
  ]

  const faq = [
    {
      q: `Berapa minimum payout untuk ${program.name}?`,
      a: `Minimum payout ialah ${program.payout}, dan bayaran dibuat melalui bank atau e-wallet tempatan. Kumpul order dahulu sehingga jumlah mencapai ambang sebelum cashout.`,
    },
    {
      q: 'Perlukah ada followers untuk mula?',
      a: `Keperluan follower untuk ${program.name} ialah ${program.followers.toLowerCase()}. Kalau program ini memerlukan jumlah minimum yang tinggi, mula dengan program lain sambil membina akaun.`,
    },
    {
      q: 'Berapa lama proses kelulusan mengambil masa?',
      a: `${program.approval}. Sediakan maklumat bank yang tepat sebelum memohon, kerana maklumat salah adalah punca paling biasa payout tertahan.`,
    },
    {
      q: `Adakah ${program.name} sesuai untuk beginner?`,
      a: program.verdict,
    },
  ]

  const siblings = program.posts.filter((item) => item.id !== post?.id).slice(0, 3)
  const otherPrograms = programs.filter((item) => item.id !== program.id).slice(0, 3)

  return (
    <main className="art">
      <div className="art-progress" style={{ width: `${progress}%` }} />

      {/* ------------------------------------------------------ head */}
      <header className="art-head container">
        <div className="art-crumbs">
          <button onClick={onBack}>Semua program</button>
          <span>/</span>
          <button onClick={() => onOpenProgram(program)}>{program.name}</button>
          <span>/</span>
          <b>{post ? post.type : 'Panduan'}</b>
        </div>

        <div className="art-head-grid">
          <div>
            <div className="art-kicker">
              <span className="art-dot" style={{ background: program.accent }} />
              {post ? post.type : 'Panduan'} · {post ? post.date : '26 Sep 2026'}
            </div>
            <h1 className="art-title">
              {post ? <>{title}</> : <>{title.split(':')[0]}:<br /><em>panduan lengkap 2026.</em></>}
            </h1>
            <p className="art-standfirst">{standfirst}</p>
            <div className="art-tags">
              <span>{program.group}</span>
              <span>{program.status}</span>
              <span>{post ? post.read : '8 min baca'}</span>
              <span>Bahasa Malaysia</span>
            </div>
          </div>

          <aside className="art-head-card">
            <div className="art-byline">
              <div className="art-avatar">{AUTHOR.initials}</div>
              <div className="art-byline-text">
                <b>{AUTHOR.name}</b>
                <span>{AUTHOR.role}</span>
              </div>
            </div>

            <div className="art-verdict">
              <span className="art-verdict-label">Quick verdict</span>
              <div className="art-verdict-row">
                <span className="art-brand-mark" style={{ background: program.accent }}>{program.logo}</span>
                <strong>{program.verdict}</strong>
              </div>
              <div className="art-stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span className="art-star" key={i}>
                    <Star size={13} />
                    <span className="art-stars-fill" style={{ width: `${Math.max(0, Math.min(1, program.score - i)) * 100}%` }}>
                      <Star size={13} fill="currentColor" />
                    </span>
                  </span>
                ))}
                <b>{program.score.toFixed(1)}</b>
              </div>
            </div>

            <div className="art-share">
              <button aria-label="Kongsi"><Share2 size={15} /></button>
              <button aria-label="Salin pautan" onClick={copyLink} className={copied ? 'art-copied' : undefined}>
                {copied ? <Check size={15} /> : <Link2 size={15} />}
              </button>
              <button aria-label="Ke atas" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <ArrowUp size={15} />
              </button>
            </div>
          </aside>
        </div>
      </header>

      {/* ------------------------------------------------------ body */}
      <div className="art-body container">
        <nav className="art-rail" aria-label="Kandungan artikel">
          <div className="art-rail-title">Kandungan</div>
          <div className="art-toc">
            {toc.map((item) => (
              <button
                key={item.id}
                className={active === item.id ? 'active' : undefined}
                onClick={() => goTo(item.id)}
              >
                <span>{item.n}</span> {item.label}
              </button>
            ))}
          </div>
          <div className="art-rail-note">
            <b>Kenapa artikel ini wujud</b>
            <span>Kebanyakan program affiliate gagal bukan sebab produk, tetapi sebab janji yang tidak boleh dipercayai.</span>
          </div>
        </nav>

        <article className="art-prose">
          <div className="art-disclosure">
            <ShieldCheck size={18} />
            <span><b>Affiliate disclosure:</b> Artikel ini mengandungi link affiliate. Kami mungkin menerima komisen kecil tanpa kos tambahan kepada anda.</span>
          </div>

          {/* ------------------------------------------- 01 summary */}
          <h2 id="summary"><sup>01</sup> Ringkasan cepat</h2>
          <p>
            Kalau anda hanya ada masa dua minit, ini yang perlu anda tahu tentang {program.name}. Kami sudah
            membuka akaun, mencuba promote dan menyemak payout sendiri, jadi setiap ayat di bawah datang daripada
            penggunaan sebenar, bukan daripada halaman promosi.
          </p>

          <ul className="art-list">
            <li><i>01</i><span>Modal mula {program.capital}, jadi tiada alasan untuk menunggu sehingga ada bajet.</span></li>
            <li><i>02</i><span>Kadar komisen {program.commission}, bergantung pada kategori produk.</span></li>
            <li><i>03</i><span>Kelulusan akaun {approvalTime}, jadi anda tahu bila boleh mula promote.</span></li>
          </ul>

          <div className="art-callout">
            <p>&ldquo;{program.verdict}&rdquo;</p>
            <small>— {AUTHOR.name}, {AUTHOR.role}</small>
          </div>

          {/* ---------------------------------------------- 02 what */}
          <h2 id="what"><sup>02</sup> Apa itu {program.name}?</h2>
          <p>
            Secara mudah, anda mengesyorkan produk menggunakan link khas. Bila seseorang beli melalui link itu, anda
            mendapat komisen. Anda tidak perlu menyimpan stok, membungkus parcel atau layan customer service.
            Kos operasi hampir sifar, jadi hampir semua komisen yang anda terima ialah untung bersih.
          </p>
          <p>
            Yang membezakan {program.name} daripada program lain ialah {program.bestFor.toLowerCase()}. Itulah sebab
            ia masuk senarai kami: ada alasan yang jelas untuk orang Malaysia memilihnya pada tahun ini.
          </p>

          <h3>Tiga perkara yang perlu difahami</h3>
          <p>
            Pertama, bayaran mengikut kategori produk, bukan kadar rata-rata. Kedua, masa payout bergantung pada
            ambang minimum, bukan pada masa anda klik. Ketiga, walaupun program ini berstatus <b>{program.status}</b>
            {' '}dalam penilaian kami, masih ada perkara yang perlu dijaga. Kami senaraikan di bahagian 05.
          </p>

          {/* -------------------------------------------- 03 signup */}
          <h2 id="signup"><sup>03</sup> Cara daftar, langkah demi langkah</h2>
          <p>
            Pendaftaran {program.name} boleh disiapkan dalam satu sesi, dan kelulusan akaun biasanya {approvalTime}.
            Ikut urutan ini supaya akaun anda diluluskan pada kali pertama.
          </p>

          <div className="art-steps">
            <div><b>01</b><span><strong>Buka platform dan cari menu Affiliate</strong><small>Log masuk akaun anda, pergi ke profil dan pilih menu Creator atau Affiliate. Jika menu itu tiada, akaun anda masih belum cukup umur atau belum disahkan.</small></span></div>
            <div><b>02</b><span><strong>Isi maklumat payout</strong><small>Masukkan maklumat bank tempatan yang tepat. Salah ejaan nama dan nombor akaun adalah punca paling biasa bayaran tersangkut.</small></span></div>
            <div><b>03</b><span><strong>Pilih produk yang anda faham</strong><small>Mula dengan 3 hingga 5 produk sahaja. Jangan promote semua benda serentak, kerana pembaca akan berhenti mempercayai anda.</small></span></div>
          </div>

          {/* ------------------------------------------ 04 earnings */}
          <h2 id="earnings"><sup>04</sup> Berapa boleh dapat?</h2>
          <p>
            Ini bahagian yang paling ramai tertipu. Jumlah pendapatan bukan bergantung pada program sahaja,
            tetapi pada berapa banyak trafik yang anda bawa, berapa tinggi purata order, dan berapa kadar
            komisen bagi kategori produk yang anda promote.
          </p>

          <div className="art-breakout art-band">
            <div className="art-breakout-inner container">
              <div className="art-band-label">Fig. 01 — Angka yang kami sahkan sendiri</div>
              <div className="art-stat-grid">
                {stats.map((stat) => (
                  <div className="art-stat" key={stat.value}>
                    <b>{stat.value}</b>
                    <span>{stat.lines.map((line) => <span key={line}>{line}<br /></span>)}</span>
                  </div>
                ))}
              </div>
              <p className="art-band-note">
                Semua payout disahkan sebelum kami publish. Tiada angka yang diambil daripada halaman orang lain.
              </p>
            </div>
          </div>

          <h3>Contoh kiraan yang munasabah</h3>
          <p>
            Anggap purata nilai order RM80, komisen 5%, dan 5 order seminggu. Itu kira-kira <b>RM80 sebulan</b>.
            Bukan angka yang mengubah hidup, tetapi cukup untuk membina skill dan momentum sebelum
            anda naik ke program yang lebih tinggi.
          </p>

          <div className="art-earnings">
            <div><small>Contoh kiraan beginner</small><strong>RM80<span>/ bulan</span></strong></div>
            <div><span>5 order / minggu</span><span>RM80 purata order</span><span>5% purata komisen</span></div>
          </div>

          {/* ----------------------------------------------- 05 pros */}
          <h2 id="pros"><sup>05</sup> Kelebihan dan perkara perlu diawasi</h2>
          <p>
            Tiada program yang sempurna. Berikut yang kami jumpa ketika menguji {program.name} selama beberapa minggu.
          </p>

          <div className="art-pros">
            <div className="art-pros-good">
              <h4><Check size={16} /> Kelebihan</h4>
              <ul>
                {program.highlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="art-pros-bad">
              <h4><ShieldCheck size={16} /> Perlu diwaspadai</h4>
              <ul>
                {program.watchOuts.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>

          {/* ------------------------------------------------- 06 faq */}
          <h2 id="faq"><sup>06</sup> Soalan lazim</h2>
          <p>Empat soalan yang paling kerap ditanya tentang {program.name}.</p>

          <div className="art-faq">
            {faq.map((item, index) => (
              <div className={openFaq === index ? 'art-faq-item open' : 'art-faq-item'} key={item.q}>
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                  {item.q}
                  <ChevronRight size={16} />
                </button>
                <div className="art-faq-answer"><p>{item.a}</p></div>
              </div>
            ))}
          </div>

          <div className="art-cta">
            <div>
              <small>Ready nak mula?</small>
              <strong>Daftar {program.name}</strong>
              <p>Mulakan dengan {program.capital} dan explore produk yang sesuai dengan audience anda.</p>
            </div>
            <button className="art-cta-btn">Pergi ke {program.name} <ExternalLink size={15} /></button>
            <small className="art-cta-note">Link affiliate · Disclosure included</small>
          </div>

          <div className="art-author">
            <div className="art-avatar">{AUTHOR.initials}</div>
            <div>
              <h4>{AUTHOR.name}</h4>
              <p>
                Penulis dan penguji program di GajiTepi. Beliau membuka akaun sendiri untuk setiap program, menguji
                cara promote selama beberapa minggu dan menyemak payout sebelum menulis panduan ini.
              </p>
            </div>
          </div>
        </article>

        <aside className="art-side">
          <div className="art-side-card">
            <h4>Markah {program.name}</h4>
            <div className="art-score-row"><span>Skor GajiTepi</span><b>{program.score.toFixed(1)} / 5</b></div>
            <div className="art-score-row"><span>Status</span><b>{program.status}</b></div>
            <div className="art-score-row"><span>Jenis</span><b>{program.group}</b></div>
            <div className="art-score-row"><span>Kelulusan</span><b>{program.approval}</b></div>
            <div className="art-score-row"><span>Payout</span><b>{program.payout}</b></div>
            <button className="art-side-link" onClick={() => onOpenProgram(program)}>
              Halaman program <ArrowUp size={15} />
            </button>
          </div>

          <div className="art-side-card">
            <h4>Kemahiran</h4>
            {program.review.map((item) => (
              <div className="art-meter" key={item.label}>
                <div><span>{item.label}</span><b>{item.value.toFixed(1)}</b></div>
                <i><u style={{ width: `${item.value * 20}%` }} /></i>
              </div>
            ))}
          </div>

          <div className="art-side-card">
            <h4>Artikel lain</h4>
            {program.posts.map((item) => (
              <button className="art-side-link art-side-post" key={item.id} onClick={() => onOpenPost(program, item)}>
                {item.title}
              </button>
            ))}
            <button className="art-side-link" onClick={onOpenDirectory}>
              Semua program <ArrowRight size={15} />
            </button>
          </div>

          <div className="art-disclosure art-disclosure-side">
            <ShieldCheck size={17} />
            <span>Artikel ini mengandungi link affiliate. Pendapat kekal independent.</span>
          </div>
        </aside>
      </div>

      {/* ------------------------------------------------- program strip */}
      <section className="art-strip container">
        <div className="art-strip-head">
          <div>
            <div className="eyebrow orange">Program lain</div>
            <h2>Sedang cari <em>alternatif?</em></h2>
          </div>
          <button className="compare-link" onClick={onOpenDirectory}>Semua program <ArrowRight size={15} /></button>
        </div>
        <div className="art-strip-grid">
          {otherPrograms.map((item) => (
            <button className="art-strip-card" key={item.id} onClick={() => onOpenProgram(item)}>
              <span className="art-strip-logo" style={{ background: item.accent }}>{item.logo}</span>
              <span><b>{item.name}</b><small>{item.group} · {item.posts.length} artikel</small></span>
              <ArrowRight size={15} />
            </button>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- related */}
      <section className="art-related container">
        <div className="art-related-head">
          <div>
            <div className="eyebrow orange">Daripada {program.name}</div>
            <h2>Lagi panduan yang <em>boleh dipraktikkan.</em></h2>
          </div>
          <button className="compare-link" onClick={() => onOpenProgram(program)}>
            Halaman program <ArrowRight size={16} />
          </button>
        </div>
        <div className="article-grid">
          {(siblings.length ? siblings : program.posts.slice(0, 3)).map((item, index) => (
            <article className="article-card" key={item.id} onClick={() => onOpenPost(program, item)}>
              <div className="article-visual" style={{ backgroundColor: item.color }}>
                <PostVisual type={item.type} logo={program.logo} accent={program.accent} image={relatedImages[index]} />
              </div>
              <div className="article-meta">
                <span>{item.type}</span>
                <span>{item.read}</span>
              </div>
              <h3>{item.title}</h3>
              <span className="read-more">Baca artikel <ArrowRight size={15} /></span>
            </article>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------- newsletter */}
      <div className="container">
        <div className="art-newsletter">
          <div>
            <div className="eyebrow">Newsletter GajiTepi</div>
            <h2>Update program, <em>sekali seminggu.</em></h2>
            <p>
              Skor baru, terma payout yang berubah, dan satu program yang kami buang daripada senarai. Tiada
              affiliate, tiada spam.
            </p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setSubscribed(true) }}>
            <div className="art-sub-form">
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
            <small className="art-sub-note">
              {subscribed ? 'Terima kasih — semak inbox anda.' : 'Maksimum satu email seminggu. Berhenti bila-bila masa.'}
            </small>
          </form>
        </div>
      </div>
    </main>
  )
}
