import {
  AlertTriangle,
  BookOpen,
  FileText,
  Gift,
  MessageCircle,
  Scale,
  Target,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/** Post type → icon, so every thumbnail says what kind of read it is. */
const ICONS: Record<string, LucideIcon> = {
  panduan: BookOpen,
  perbandingan: Scale,
  'nisbah komisen': Scale,
  strategi: Target,
  kesilapan: AlertTriangle,
  'real talk': MessageCircle,
  rewards: Gift,
}

type Props = {
  type: string
  /** Program badge shown in the corner, when the post belongs to one program. */
  logo?: string
  accent?: string
  image?: string
  postId?: string
}

const POST_IMAGES = [
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
]

const imageForPost = (postId: string) => {
  const hash = [...postId].reduce((value, character) => (value * 31 + character.charCodeAt(0)) >>> 0, 0)
  return POST_IMAGES[hash % POST_IMAGES.length]
}

/** Thumbnail for a blog post: photo, type icon, and program badge. */
export default function PostVisual({ type, logo, accent, image, postId }: Props) {
  const Icon = ICONS[type.toLowerCase()] ?? FileText
  const visualImage = image ?? (postId ? imageForPost(postId) : undefined)
  return (
    <span className={visualImage ? 'post-visual has-image' : 'post-visual'} aria-hidden="true">
      {visualImage && <img className="post-visual-image" src={visualImage} alt="" loading="lazy" decoding="async" />}
      <span className="post-visual-icon"><Icon size={26} strokeWidth={1.8} /></span>
      <span className="post-visual-type">{type}</span>
      {logo && <span className="post-visual-badge" style={{ background: accent }}>{logo}</span>}
    </span>
  )
}
