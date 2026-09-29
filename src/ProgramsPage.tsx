import { useMemo, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Filter,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  X,
} from 'lucide-react'
import { allPosts, programGroups, programs } from './programs'
import type { Program, ProgramStatus } from './programs'
import PostVisual from './PostVisual'
import './programs.css'

type Sort = 'skor' | 'payout' | 'post' | 'nama'

const sorts: { id: Sort; label: string }[] = [
  { id: 'skor', label: 'Skor tertinggi' },
  { id: 'payout', label: 'Payout terendah' },
  { id: 'post', label: 'Terbanyak post' },
  { id: 'nama', label: 'Nama A - Z' },
]

const statuses: (ProgramStatus | 'Semua status')[] = ['Semua status', 'Disyorkan', 'Layak', 'Kondisional']

const latestPostImages = [
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85',
]

const programImages: Record<string, string> = {
  shopee: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85',
  tiktok: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=900&q=85',
  involve: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85',
  lazada: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=85',
  blogr: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=85',
  ios2u: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85',
  amazon: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=900&q=85',
  adsense: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
}

/** "RM15" -> 15, so payout sorting means something numeric. */
const payoutValue = (payout: string) => {
  const match = payout.match(/(\d+)/)
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER
}

type Props = {
  onOpenProgram: (program: Program) => void
  onOpenPost: (program: Program, postId: string) => void
  onCompare: () => void
}

export default function ProgramsPage({ onOpenProgram, onOpenPost, onCompare }: Props) {
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState<string>('Semua')
  const [status, setStatus] = useState<string>('Semua status')
  const [sort, setSort] = useState<Sort>('skor')

  const totalPosts = useMemo(() => programs.reduce((sum, item) => sum + item.posts.length, 0), [])

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const list = programs.filter((item) => {
      if (group !== 'Semua' && item.group !== group) return false
      if (status !== 'Semua status' && item.status !== status) return false
      if (!needle) return true
      return (
        item.name.toLowerCase().includes(needle) ||
        item.category.toLowerCase().includes(needle) ||
        item.tag.toLowerCase().includes(needle) ||
        item.bestFor.toLowerCase().includes(needle) ||
        item.posts.some((entry) => entry.title.toLowerCase().includes(needle))
      )
    })

    return list.sort((a, b) => {
      if (sort === 'skor') return b.score - a.score
      if (sort === 'payout') return payoutValue(a.payout) - payoutValue(b.payout)
      if (sort === 'post') return b.posts.length - a.posts.length
      return a.name.localeCompare(b.name)
    })
  }, [query, group, status, sort])

  const filtered = query.trim() !== '' || group !== 'Semua' || status !== 'Semua status' || sort !== 'skor'
  const reset = () => { setQuery(''); setGroup('Semua'); setStatus('Semua status'); setSort('skor') }

  const latest = allPosts.slice(0, 3)

  return (
    <main className="pg">
      {/* ------------------------------------------------------ hero */}
      <section className="pg-hero">
        <div className="pg-blobs" aria-hidden="true">
          <i className="pg-blob pg-blob-1" />
          <i className="pg-blob pg-blob-2" />
        </div>

        <div className="container pg-hero-inner">
          <span className="pg-pill"><span className="pg-pill-dot" /> Dikemas kini 26 September 2026</span>

          <h1 className="pg-h1">
            Semua program affiliate<br />di <em>Malaysia</em>, satu tempat.
          </h1>

          <p className="pg-sub">
            {programs.length} program, {totalPosts} artikel panduan, satu methodology. Pilih program untuk
            melihat semua blog post yang kami tulis tentangnya.
          </p>

          <div className="pg-search">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari program atau artikel, contohnya Shopee"
              aria-label="Cari program affiliate"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Padam carian"><X size={16} /></button>
            )}
          </div>

          <div className="pg-trust">
            <span><Check size={14} /> Tiada program MLM</span>
            <span><Check size={14} /> Payout disahkan sendiri</span>
            <span><Check size={14} /> Skor ada tarikh semakan</span>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- stats */}
      <section className="container pg-stats">
        <div><b>{programs.length}</b><span>Program diluluskan</span></div>
        <div><b>{totalPosts}</b><span>Artikel tersedia</span></div>
        <div><b>{programGroups.length - 1}</b><span>Jenis program</span></div>
        <div><b>RM0</b><span>Modal minimum</span></div>
      </section>

      {/* -------------------------------------------------- controls */}
      <section className="container pg-controls">
        <div className="pg-filter-block">
          <span className="pg-filter-label"><Filter size={13} /> Jenis program</span>
          <div className="pg-chips" role="tablist" aria-label="Jenis program">
            {programGroups.map((item) => (
              <button
                key={item}
                role="tab"
                aria-selected={group === item}
                className={group === item ? 'pg-chip active' : 'pg-chip'}
                onClick={() => setGroup(item)}
              >
                {group === item && <Check size={13} />}
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="pg-filter-block">
          <span className="pg-filter-label"><ShieldCheck size={13} /> Status</span>
          <div className="pg-chips" role="tablist" aria-label="Status program">
            {statuses.map((item) => (
              <button
                key={item}
                role="tab"
                aria-selected={status === item}
                className={status === item ? 'pg-chip active' : 'pg-chip'}
                onClick={() => setStatus(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="pg-filter-block pg-filter-sort">
          <span className="pg-filter-label"><SlidersHorizontal size={13} /> Susun</span>
          <div className="pg-chips" role="tablist" aria-label="Susun senarai">
            {sorts.map((item) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={sort === item.id}
                className={sort === item.id ? 'pg-chip active' : 'pg-chip'}
                onClick={() => setSort(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- count */}
      <section className="container pg-count">
        <b>{visible.length}</b> program dipaparkan
        {filtered && (
          <button className="pg-reset" onClick={reset}>Set semula semua penapis <X size={14} /></button>
        )}
      </section>

      {/* ------------------------------------------------------ grid */}
      <section className="container pg-grid">
        {visible.map((item) => (
          <article className="pg-card" key={item.id} onClick={() => onOpenProgram(item)}>
            <div className="pg-card-image">
              <img src={programImages[item.id]} alt={`${item.name} affiliate program`} loading="lazy" />
            </div>
            <div className="pg-card-top">
              <span className="pg-card-logo" style={{ background: item.accent }}>{item.logo}</span>
              <span className={`pg-status pg-status-${item.status.toLowerCase()}`}>{item.status}</span>
            </div>

            <span className="pg-label">{item.group}</span>
            <h2>{item.name}</h2>
            <p className="pg-card-desc">{item.description}</p>

            <div className="pg-card-score">
              <span className="pg-stars">
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={12} fill="currentColor" />)}
              </span>
              <b>{item.score.toFixed(1)}</b>
              <span className="pg-card-score-label">Skor GajiTepi</span>
            </div>

            <div className="pg-card-facts">
              <span><small>Komisen</small>{item.commission}</span>
              <span><small>Minimum payout</small>{item.payout}</span>
              <span><small>Kelulusan</small>{item.approval}</span>
            </div>

            <div className="pg-card-foot">
              <span className="pg-card-tag">{item.tag}</span>
              <span className="pg-card-go">
                {item.posts.length} post <ArrowUpRight size={15} />
              </span>
            </div>
          </article>
        ))}

        {visible.length === 0 && (
          <div className="pg-empty">
            <strong>Tiada program sepadan dengan carian ini.</strong>
            <span>Cuba kata kunci lain, atau set semula penapis.</span>
            <button className="pg-btn pg-btn-ghost" onClick={reset}>Set semula penapis</button>
          </div>
        )}
      </section>

      {/* ----------------------------------------------------- notes */}
      <section className="container pg-notes">
        <div className="pg-note">
          <ShieldCheck size={20} />
          <div>
            <b>Bagaimana senarai ini disaring</b>
            <span>Setiap program dibuka, didaftar dan diuji dengan akaun sendiri. Kadar komisen dan syarat payout boleh berubah, jadi semak terma rasmi sebelum mula.</span>
          </div>
        </div>
        <div className="pg-note">
          <Sparkles size={20} />
          <div>
            <b>Nak lihat sebelah-sebelah?</b>
            <span>Matrix perbandingan menunjukkan modal, payout dan komisen setiap program dalam satu jadual.</span>
          </div>
          <button className="pg-btn pg-btn-dark" onClick={onCompare}>Buka matrix <ArrowRight size={16} /></button>
        </div>
      </section>

      {/* ---------------------------------------------------- latest */}
      <section className="container pg-latest">
        <div className="pg-latest-head">
          <span className="pg-pill pg-pill-sm"><Clock3 size={13} /> Post terkini</span>
          <h2>Artikel terbaru dari semua program.</h2>
        </div>

        <div className="pg-posts">
          {latest.map((entry, index) => (
            <article
              className="pg-post"
              key={entry.id}
              onClick={() => onOpenPost(entry.program, entry.id)}
            >
              <div className="pg-post-visual" style={{ background: entry.color }}>
                <PostVisual type={entry.type} logo={entry.program.logo} accent={entry.program.accent} image={latestPostImages[index]} />
                <em style={{ color: entry.program.accent }}>{entry.program.name}</em>
              </div>
              <div className="pg-post-meta">
                <span>{entry.type}</span><span>{entry.read}</span>
              </div>
              <h3>{entry.title}</h3>
              <span className="pg-post-more">Baca artikel <ArrowRight size={15} /></span>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
