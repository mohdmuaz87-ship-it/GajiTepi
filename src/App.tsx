import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Menu,
  Search,
  Send,
  ShieldCheck,
  Star,
  X,
} from 'lucide-react'
import ArticlePage from './ArticlePage'
import CaseStudyPage from './CaseStudyPage'
import HomePage from './HomePage'
import PostVisual from './PostVisual'
import ProgramsPage from './ProgramsPage'
import { featuredPrograms, findProgram, programs } from './programs'
import type { Program, RelatedPost } from './programs'

type View = 'home' | 'programs' | 'hub' | 'compare' | 'article' | 'case-study'

type Route = { view: View; programId?: string }

/** Hash routing keeps every view linkable: #programs, #program/shopee, #compare, … */
const readRoute = (): Route => {
  const raw = window.location.hash.replace(/^#/, '')
  if (raw.startsWith('program/')) return { view: 'hub', programId: raw.slice('program/'.length) }
  if (raw === 'programs') return { view: 'programs' }
  if (raw === 'compare') return { view: 'compare' }
  if (raw === 'article') return { view: 'article' }
  if (raw === 'case-study') return { view: 'case-study' }
  return { view: 'home' }
}

const hashFor = (view: View, programId?: string) => {
  if (view === 'home') return ''
  if (view === 'hub') return `#program/${programId ?? featuredPrograms[0].id}`
  return `#${view}`
}

function Stars({ score }: { score: number }) {
  return <span className="stars" aria-label={`${score} daripada 5`}><Star size={14} fill="currentColor" /> <b>{score}</b> <small>/ 5</small></span>
}

function App() {
  const [route, setRoute] = useState<Route>(readRoute)
  const [program, setProgram] = useState<Program>(
    () => (route.programId && findProgram(route.programId)) || featuredPrograms[0],
  )
  const [post, setPost] = useState<RelatedPost | undefined>()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onHashChange = () => {
      const next = readRoute()
      setRoute(next)
      if (next.programId) {
        const found = findProgram(next.programId)
        if (found) setProgram(found)
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = (view: View, options?: { program?: Program; post?: RelatedPost }) => {
    const target = options?.program ?? program
    if (options?.program) setProgram(options.program)
    setPost(view === 'article' ? options?.post : undefined)
    setRoute(view === 'hub' ? { view, programId: target.id } : { view })

    const hash = hashFor(view, target.id)
    if (window.location.hash !== hash) {
      if (hash) window.location.hash = hash
      else window.history.pushState(null, '', window.location.pathname)
    }
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navClass = (...views: View[]) => (views.includes(route.view) ? 'active' : undefined)

  const openPost = (owner: Program, postId: string) => {
    const entry = owner.posts.find((item) => item.id === postId)
    navigate('article', { program: owner, post: entry })
  }

  return <div className="app-shell">
    <div className="topbar"><div className="container topbar-inner"><span><span className="pulse" /> Data dikemas kini: 26 September 2026</span><span className="topbar-right">Independent review · Tiada program MLM <ShieldCheck size={14} /></span></div></div>
    <header className="site-header"><div className="container nav-wrap">
      <a className="wordmark" onClick={() => navigate('home')}><span className="wordmark-icon">↗</span> gaji<span>tepi</span></a>
      <nav className={mobileOpen ? 'nav-links open' : 'nav-links'}>
        <button className={navClass('home')} onClick={() => navigate('home')}>Home</button>
        <button className={navClass('programs', 'hub')} onClick={() => navigate('programs')}>Program</button>
        <button className={navClass('compare')} onClick={() => navigate('compare')}>Bandingkan</button>
      </nav>
      <div className="nav-actions"><button className="search-button" aria-label="Cari" onClick={() => setSearchOpen(true)}><Search size={19} /></button><button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">{mobileOpen ? <X /> : <Menu />}</button></div>
    </div></header>

    {searchOpen && <SearchDialog
      onClose={() => setSearchOpen(false)}
      onOpenProgram={(item) => { setSearchOpen(false); navigate('hub', { program: item }) }}
      onOpenPost={(owner, postId) => { setSearchOpen(false); openPost(owner, postId) }}
    />}

    {route.view === 'home' && <HomePage
      brands={featuredPrograms}
      onOpenBrand={(brand) => navigate('hub', { program: findProgram(brand.id) ?? featuredPrograms[0] })}
      onPrograms={() => navigate('programs')}
      onCompare={() => navigate('compare')}
      onArticle={() => navigate('article')}
    />}
    {route.view === 'programs' && <ProgramsPage
      onOpenProgram={(item) => navigate('hub', { program: item })}
      onOpenPost={(owner, postId) => openPost(owner, postId)}
      onCompare={() => navigate('compare')}
    />}
    {route.view === 'compare' && <ComparePage brands={featuredPrograms} onOpen={(item) => navigate('hub', { program: item })} />}
    {route.view === 'hub' && <ProgramPage
      program={program}
      onBack={() => navigate('programs')}
      onOpenPost={(postId) => openPost(program, postId)}
      onOpenProgram={(item) => navigate('hub', { program: item })}
      onCompare={() => navigate('compare')}
    />}
    {route.view === 'article' && <ArticlePage
      program={program}
      post={post}
      onBack={() => navigate('programs')}
      onOpenProgram={(item) => navigate('hub', { program: item })}
      onOpenPost={(owner, entry) => navigate('article', { program: owner, post: entry })}
      onOpenDirectory={() => navigate('programs')}
    />}
    {route.view === 'case-study' && <CaseStudyPage onBack={() => navigate('home')} onOpenArticle={() => navigate('article')} />}

    <footer className="footer"><div className="container footer-grid">
      <div><a className="wordmark" onClick={() => navigate('home')}>↗ gaji<span>tepi</span></a><p>Review side income yang jujur<br />untuk Malaysia.</p></div>
      <div><strong>Explore</strong><button onClick={() => navigate('home')}>Laman utama</button><button onClick={() => navigate('programs')}>Semua program</button><button onClick={() => navigate('compare')}>Bandingkan</button><button onClick={() => navigate('article')}>Panduan</button><button onClick={() => navigate('case-study')}>Case study</button></div>
      <div><strong>Program</strong>{programs.slice(0, 5).map((item) => <button key={item.id} onClick={() => navigate('hub', { program: item })}>{item.name}</button>)}<button onClick={() => navigate('programs')}>Lihat semua {programs.length} &rarr;</button></div>
      <div><strong>Ikuti kami</strong><span className="socials"><Send size={17} /><Send size={17} /><Send size={17} /></span><small>© 2026 Gaji Tepi. Dibina di Malaysia.</small></div>
    </div></footer>
  </div>
}

function SearchDialog({ onClose, onOpenProgram, onOpenPost }: {
  onClose: () => void
  onOpenProgram: (program: Program) => void
  onOpenPost: (program: Program, postId: string) => void
}) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const needle = query.trim().toLowerCase()
  const programHits = needle ? programs.filter((item) => `${item.name} ${item.category} ${item.description}`.toLowerCase().includes(needle)) : []
  const postHits = needle
    ? programs.flatMap((owner) => owner.posts.filter((entry) => entry.title.toLowerCase().includes(needle)).map((entry) => ({ owner, entry })))
    : []

  return <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Cari" onClick={onClose}>
    <div className="search-panel" onClick={(event) => event.stopPropagation()}>
      <div className="search-field">
        <Search size={18} />
        <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari program atau artikel…" aria-label="Kata carian" />
        <button onClick={onClose} aria-label="Tutup"><X size={18} /></button>
      </div>
      {needle && <div className="search-results">
        {programHits.length > 0 && <div className="search-group"><small>Program</small>{programHits.map((item) => <button key={item.id} onClick={() => onOpenProgram(item)}><span className="table-brand" style={{ backgroundColor: item.accent }}>{item.logo}</span><span><b>{item.name}</b><em>{item.category}</em></span></button>)}</div>}
        {postHits.length > 0 && <div className="search-group"><small>Artikel</small>{postHits.slice(0, 8).map(({ owner, entry }) => <button key={entry.id} onClick={() => onOpenPost(owner, entry.id)}><span><b>{entry.title}</b><em>{owner.name} · {entry.read}</em></span></button>)}</div>}
        {programHits.length === 0 && postHits.length === 0 && <p className="search-empty">Tiada hasil untuk “{query}”.</p>}
      </div>}
    </div>
  </div>
}

function ComparePage({ brands, onOpen }: { brands: Program[]; onOpen: (brand: Program) => void }) {
  return <main className="inner-page container"><div className="breadcrumbs">Home <span>/</span> Bandingkan program</div><div className="page-intro"><div><div className="eyebrow orange">Compare matrix</div><h1>Semua program,<br /><em>sebelah-sebelah.</em></h1><p>Gunakan data ini untuk pilih program yang sesuai dengan masa, skill dan sasaran anda.</p></div><div className="last-updated"><span className="pulse" /> Dikemas kini 26 Sep 2026</div></div><div className="compare-table-wrap"><table><thead><tr><th>Program</th><th>Gaji Tepi score</th><th>Modal mula</th><th>Minimum payout</th><th>Komisen</th><th>Best for</th><th /></tr></thead><tbody>{brands.map((brand) => <tr key={brand.id}><td><div className="table-program"><span className="table-brand" style={{ backgroundColor: brand.accent }}>{brand.logo}</span><span><b>{brand.name}</b><small>{brand.category}</small></span></div></td><td><Stars score={brand.score} /></td><td>{brand.capital}</td><td>{brand.payout}</td><td>{brand.commission}</td><td>{brand.tag}</td><td><button className="circle-arrow" onClick={() => onOpen(brand)}><ArrowRight size={15} /></button></td></tr>)}</tbody></table></div><div className="matrix-note"><ShieldCheck size={20} /><span><b>Nota penting:</b> Kadar komisen dan syarat program boleh berubah. Sentiasa semak terma rasmi sebelum daftar.</span></div></main>
}

type ProgramPageProps = {
  program: Program
  onBack: () => void
  onOpenPost: (postId: string) => void
  onOpenProgram: (program: Program) => void
  onCompare: () => void
}

function ProgramPage({ program, onBack, onOpenPost, onOpenProgram, onCompare }: ProgramPageProps) {
  const [tab, setTab] = useState<'posts' | 'summary' | 'steps'>('posts')
  const others = programs.filter((item) => item.id !== program.id).slice(0, 3)
  const totalRead = program.posts.reduce((sum, item) => sum + Number.parseInt(item.read, 10), 0)

  return <main className="inner-page container">
    <button className="back-link" onClick={onBack}>← Semua program</button>

    <div className="breadcrumbs">Semua program <span>/</span> {program.group} <span>/</span> {program.name}</div>

    <div className="hub-header">
      <div className="hub-brand-mark" style={{ backgroundColor: program.accent }}>{program.logo}</div>
      <div>
        <div className="eyebrow orange">{program.group} · {program.status}</div>
        <h1>{program.name}</h1>
        <p>{program.description}</p>
      </div>
      <div className="hub-header-side">
        <Stars score={program.score} />
        <span className="hub-posts-count"><Clock3 size={13} /> {program.posts.length} artikel · {totalRead} min baca</span>
        <button className="hub-join-button" type="button" onClick={() => setTab('steps')}>
          <span>Join <b>{program.name}</b> Now</span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>

    <div className="facts-grid">
      <div><small>Minimum payout</small><b>{program.payout}</b><span>melalui bank / e-wallet</span></div>
      <div><small>Followers diperlukan</small><b>{program.followers}</b><span>untuk mula promote</span></div>
      <div><small>Komisen biasa</small><b>{program.commission}</b><span>ikut kategori produk</span></div>
      <div><small>Kelulusan</small><b>{program.approval.replace(/^Kelulusan\s*/i, '').replace(/^./, (c) => c.toUpperCase())}</b><span>masa kelulusan akaun</span></div>
    </div>

    <div className="hub-layout">
      <div>
        <div className="tabs" role="tablist" aria-label="Bahagian program">
          <button role="tab" aria-selected={tab === 'posts'} className={tab === 'posts' ? 'selected' : ''} onClick={() => setTab('posts')}>Semua post ({program.posts.length})</button>
          <button role="tab" aria-selected={tab === 'summary'} className={tab === 'summary' ? 'selected' : ''} onClick={() => setTab('summary')}>Ringkasan review</button>
          <button role="tab" aria-selected={tab === 'steps'} className={tab === 'steps' ? 'selected' : ''} onClick={() => setTab('steps')}>Cara daftar</button>
        </div>

        {tab === 'posts' && (
          <section className="post-list" aria-label={`Artikel tentang ${program.name}`}>
            <p className="post-list-lead">
              Semua artikel yang kami tulis tentang <b>{program.name}</b>, daripada panduan pendaftaran
              sampai kepada kesilapan yang paling kerap berlaku.
            </p>

            {program.posts.map((entry) => (
              <article className="post-row" key={entry.id} onClick={() => onOpenPost(entry.id)}>
                <div className="post-row-visual" style={{ background: entry.color }}>
                  <PostVisual type={entry.type} logo={program.logo} accent={program.accent} postId={entry.id} />
                </div>
                <div className="post-row-body">
                  <div className="post-row-meta">
                    <span>{entry.type}</span>
                    <span>{entry.date}</span>
                    <span>{entry.read}</span>
                  </div>
                  <h3>{entry.title}</h3>
                  <p>{entry.excerpt}</p>
                  <span className="post-row-go">Baca artikel <ArrowRight size={15} /></span>
                </div>
              </article>
            ))}

            {program.posts.length === 0 && (
              <div className="post-list-empty">Belum ada artikel untuk program ini.</div>
            )}
          </section>
        )}

        {tab === 'summary' && (
          <article className="hub-article">
            <div className="eyebrow orange">Full review · 9 min baca</div>
            <h2>{program.name}: berbaloi ke untuk orang biasa?</h2>
            <p>Jawapan pendek: ya, kalau anda sudah ada tempat untuk berkongsi content dan sanggup konsisten. Dalam review ini kami pecahkan cara ia berfungsi, apa yang boleh dijangka dan siapa yang patut elakkan.</p>
            <h3>Verdict Gaji Tepi</h3>
            <div className="verdict"><Check /><strong>{program.verdict}</strong></div>
            <h3>Apa yang kami temui</h3>
            <ul className="hub-highlights">
              {program.highlights.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <h3>Ringkasan fakta</h3>
            <ul className="hub-facts-list">
              <li><b>Jenis</b>{program.group}</li>
              <li><b>Status</b>{program.status}</li>
              <li><b>Sesuai untuk</b>{program.bestFor}</li>
              <li><b>Tahap kesukaran</b>{program.difficulty}</li>
              <li><b>{program.since}</b>Skor disemak semula secara berkala</li>
            </ul>
            <button className="primary-button" onClick={() => onOpenPost(program.posts[0]?.id ?? '')}>Mula dengan panduan daftar <ArrowRight size={16} /></button>
          </article>
        )}

        {tab === 'steps' && (
          <article className="hub-article">
            <div className="eyebrow orange">Langkah demi langkah</div>
            <h2>Cara mula dengan {program.name}</h2>
            <div className="steps">
              <div><b>01</b><span><strong>Buka platform dan cari menu Affiliate</strong><small>Log masuk akaun anda, pergi ke profil dan pilih menu Creator atau Affiliate.</small></span></div>
              <div><b>02</b><span><strong>Isi maklumat payout</strong><small>Masukkan maklumat bank tempatan yang tepat supaya bayaran tidak tersangkut.</small></span></div>
              <div><b>03</b><span><strong>Pilih produk yang anda faham</strong><small>Mula dengan 3 hingga 5 produk. Jangan promote semua benda serentak.</small></span></div>
            </div>
            <div className="verdict"><Check /><strong>{program.verdict}</strong></div>
            <button className="primary-button" onClick={() => onOpenPost(program.posts[0]?.id ?? '')}>Baca panduan lengkap <ArrowRight size={16} /></button>
          </article>
        )}

        <section className="hub-more">
          <h3>Lagi program yang kami semak</h3>
          <div className="hub-more-grid">
            {others.map((item) => (
              <button className="hub-more-card" key={item.id} onClick={() => onOpenProgram(item)}>
                <span className="hub-more-logo" style={{ background: item.accent }}>{item.logo}</span>
                <span><b>{item.name}</b><small>{item.posts.length} artikel</small></span>
                <ArrowUpRight size={15} />
              </button>
            ))}
          </div>
          <button className="compare-link" onClick={onCompare}>Bandingkan semua program <ArrowRight size={15} /></button>
        </section>
      </div>

      <aside className="sidebar-card">
        <div className="eyebrow orange">Score breakdown</div>
        <h3>Kenapa {program.score}/5?</h3>
        {program.review.map((item) => (
          <div className="score-break" key={item.label}>
            <span>{item.label}</span>
            <b>{item.value.toFixed(1)}</b>
            <i><u style={{ width: `${item.value * 20}%` }} /></i>
          </div>
        ))}

        <div className="sidebar-split" />
        <h3>Butiran program</h3>
        <div className="sidebar-facts">
          <span><b>{program.group}</b>Jenis program</span>
          <span><b>{program.difficulty}</b>Tahap kesukaran</span>
          <span><b>{program.posts.length}</b>Artikel tersedia</span>
        </div>

        <div className="disclosure"><ShieldCheck size={17} /><span>Review ini mengandungi link affiliate. Pendapat kekal independent.</span></div>
      </aside>
    </div>
  </main>
}

export default App
