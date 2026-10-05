import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { workCategories } from '../data'

const publicAsset = path => {
  const assetPath = path.replace(/^\/+/, '')
  return import.meta.env.DEV
    ? `/__local-assets/${assetPath}`
    : `${import.meta.env.BASE_URL}${assetPath}`
}

/* ── Shared helpers ─────────────────────────────────────────── */

function PlayBtn({ platform }) {
  return (
    <div className={`play-btn ${platform}`}>
      <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: '#fff', marginLeft: 3 }}>
        <polygon points="5,3 19,12 5,21" />
      </svg>
    </div>
  )
}

function VideoCard({ item, onLightbox }) {
  const [err, setErr] = useState(false)
  const isPortrait = item.portrait

  return (
    <a href={item.url} target="_blank" rel="noreferrer" className="media-card" data-cursor="WATCH">
      {/* thumbnail or gradient fallback */}
      {item.gradFrom ? (
        <div style={{ width: '100%', aspectRatio: isPortrait ? '9/16' : '16/9', minHeight: isPortrait ? 320 : undefined, background: `linear-gradient(135deg,${item.gradFrom},${item.gradTo})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PlayBtn platform={item.platform} />
        </div>
      ) : err || !item.thumb ? (
        <div style={{ width: '100%', aspectRatio: isPortrait ? '9/16' : '16/9', background: 'var(--paper-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--ink-ghost)' }}>
          {item.label}
        </div>
      ) : (
        <img src={item.thumb} alt={item.label} className={`media-card-thumb${isPortrait ? ' portrait' : ''}`} onError={() => setErr(true)} />
      )}

      {/* play overlay (only when not gradient) */}
      {!item.gradFrom && (
        <div className={`media-card-play${isPortrait ? ' portrait' : ''}`}>
          <PlayBtn platform={item.platform} />
        </div>
      )}

      <div className="media-card-meta">
        <span className="media-card-label">{item.label}</span>
        <span className={`media-card-badge badge-${item.platform}`}>
          {item.badge ?? (item.platform === 'yt' ? 'YouTube' : 'Instagram')}
        </span>
      </div>
    </a>
  )
}

function ImageThumb({ src, cap, onLightbox, className = 'thumb' }) {
  const [err, setErr] = useState(false)
  const imageUrl = publicAsset(src)
  return (
    <div>
      {err ? (
        <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 'var(--r-lg)', background: 'var(--paper-warm)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--ink-ghost)' }}>{cap}</div>
      ) : (
        <img src={imageUrl} alt={cap} className={className} data-cursor="ZOOM" onClick={() => onLightbox(imageUrl)} onError={() => setErr(true)} />
      )}
      {cap && <p className="cap">{cap}</p>}
    </div>
  )
}

function LocalVideo({ src, cap }) {
  return (
    <div>
      <div className="vid-wrap">
        <video controls muted playsInline loading="lazy">
          <source src={publicAsset(src)} type="video/mp4" />
        </video>
      </div>
      {cap && <p className="cap">{cap}</p>}
    </div>
  )
}

function IgCard({ item }) {
  return (
    <div>
      <a href={item.url} target="_blank" rel="noreferrer" className="ig-card" style={{ minHeight: 200 }}>
        <div className="ig-card-icon">
          <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
        </div>
        <div className="ig-card-title">{item.label}</div>
        <div className="ig-card-sub">{item.sub}</div>
        <span className="ig-card-btn">Watch ↗</span>
      </a>
      {item.cap && <p className="cap">{item.cap}</p>}
    </div>
  )
}

/* ── Channel header ─────────────────────────────────────────── */

function ChHdr({ ch }) {
  return (
    <div className="ch-hdr">
      <span className="ch-dot" style={{ background: ch.dotColor }} />
      <span className="ch-name">{ch.name}</span>
      {ch.handle && (
        <a href={ch.url} target="_blank" rel="noreferrer" className="ch-link">{ch.handle}</a>
      )}
      {ch.badge && (
        <span className="ch-badge" style={{ background: ch.badgeBg, color: ch.badgeColor, marginLeft: 'auto' }}>{ch.badge}</span>
      )}
    </div>
  )
}

/* ── Tab panels ─────────────────────────────────────────────── */

function FeaturedShowcase({ items, onLightbox }) {
  const spotlight = items[0]
  const sideCards = items.slice(1, 3)
  const lowerCards = items.slice(3, 6)

  if (!spotlight) return null

  return (
    <div className="work-showcase">
      <div className="work-showcase-featured">
        <VideoCard item={spotlight} onLightbox={onLightbox} />
      </div>

      <div className="work-showcase-side">
        {sideCards.map((item, i) => (
          <div key={`${item.label}-${i}`} className="work-mini-card">
            <VideoCard item={item} onLightbox={onLightbox} />
          </div>
        ))}
      </div>

      {lowerCards.length > 0 && (
        <div className="work-showcase-lower">
          {lowerCards.map((item, i) => (
            <div key={`${item.label}-${i}`} className="work-lower-card">
              <VideoCard item={item} onLightbox={onLightbox} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CreatorTab({ channels, onLightbox }) {
  const featuredItems = channels.flatMap(ch => {
    if (ch.layout === 'creator') return [ch.mainItem, ...ch.gridItems, ch.bottomItem]
    return ch.items || []
  })

  return <FeaturedShowcase items={featuredItems} onLightbox={onLightbox} />
}

function BrandTab({ channels, onLightbox }) {
  const featuredItems = channels.flatMap(ch => ch.items || [])
  return <FeaturedShowcase items={featuredItems} onLightbox={onLightbox} />
}

function VfxTab({ sections, onLightbox }) {
  return (
    <>
      {sections.map((sec, si) => (
        <div key={si} style={{ marginTop: si > 0 ? 48 : 0 }}>
          <div className="ch-hdr">
            <span className="ch-dot" style={{ background: sec.dotColor }} />
            <span className="ch-name">{sec.name}</span>
            {sec.badge && (
              <span className="ch-badge" style={{ background: sec.badgeBg, color: sec.badgeColor, marginLeft: 'auto' }}>{sec.badge}</span>
            )}
          </div>

          {/* rows of 3 */}
          {sec.rows && sec.rows.map((row, ri) => (
            <div key={ri} className="g3 mt2">
              {row.map((item, ii) => (
                item.type === 'ig-card' ? <IgCard key={ii} item={item} /> :
                item.type === 'local-video' ? <LocalVideo key={ii} src={item.src} cap={item.cap} /> : null
              ))}
            </div>
          ))}

          {/* bottom row of 2 */}
          {sec.bottomRow && (
            <div className="g2 mt2">
              {sec.bottomRow.map((item, ii) => (
                item.type === 'local-video' ? <LocalVideo key={ii} src={item.src} cap={item.cap} /> : null
              ))}
            </div>
          )}

          {/* grid4 */}
          {sec.grid4 && (
            <div className="g4">
              {sec.grid4.map((img, ii) => <ImageThumb key={ii} src={img.src} cap={img.cap} onLightbox={onLightbox} />)}
            </div>
          )}

          {/* grid3 */}
          {sec.grid3 && (
            <div className="g3 mt2">
              {sec.grid3.map((img, ii) => <ImageThumb key={ii} src={img.src} cap={img.cap} onLightbox={onLightbox} />)}
            </div>
          )}
        </div>
      ))}
    </>
  )
}

function WeddingTab({ cat, onLightbox }) {
  const [heroErr, setHeroErr] = useState(false)
  return (
    <>
      <div className="ch-hdr">
        <span className="ch-dot" style={{ background: 'var(--wedding)' }} />
        <span className="ch-name">Wedding Films</span>
        <span className="ch-badge" style={{ background: 'var(--wedding-bg)', color: 'var(--wedding)', marginLeft: 'auto' }}>Cinematic Coverage</span>
      </div>
      {heroErr ? (
        <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 'var(--r-lg)', background: 'var(--paper-warm)', border: '1px solid var(--border)', marginBottom: 12 }} />
      ) : (
        <img src={publicAsset(cat.heroImg)} alt="Wedding hero shot" className="wedding-hero-img" onClick={() => onLightbox(publicAsset(cat.heroImg))} onError={() => setHeroErr(true)} />
      )}
      <div className="g4 mt">
        {cat.stills.map((s, i) => (
          <ImageThumb key={i} src={s.src} cap={null} onLightbox={onLightbox} className="wedding-still" />
        ))}
      </div>
      <p className="cap" style={{ marginTop: 10 }}>Click any photo to view full size.</p>
    </>
  )
}

/* ── CMS flat tab  renders items from Sanity ───────────────── */
function CmsTab({ items, onLightbox }) {
  return (
    <div className="g3">
      {items.map((item, i) => {
        const thumbUrl = item.thumbnail?.asset?.url
          || (item.youtubeId ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg` : null)
          || (item.url?.includes('youtube') ? `https://img.youtube.com/vi/${item.url.split('v=')[1]?.split('&')[0]}/hqdefault.jpg` : null)

        if (item.mediaType === 'image') {
          return (
            <div key={item._id}>
              <img src={thumbUrl} alt={item.title} className="thumb"
                onClick={() => onLightbox(thumbUrl)}
                onError={e => e.target.style.display = 'none'} />
              {item.caption && <p className="cap">{item.caption}</p>}
            </div>
          )
        }
        return (
          <a key={item._id} href={item.url} target="_blank" rel="noreferrer" className="media-card">
            {thumbUrl
              ? <img src={thumbUrl} alt={item.title} className={`media-card-thumb${item.portrait ? ' portrait' : ''}`} />
              : <div style={{ width: '100%', aspectRatio: '16/9', background: 'var(--paper-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--ink-ghost)' }}>{item.title}</div>
            }
            <div className={`media-card-play${item.portrait ? ' portrait' : ''}`}>
              <div className={`play-btn ${item.mediaType === 'youtube' ? 'yt' : 'ig'}`}>
                <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: '#fff', marginLeft: 3 }}><polygon points="5,3 19,12 5,21" /></svg>
              </div>
            </div>
            <div className="media-card-meta">
              <span className="media-card-label">{item.title}</span>
              <span className={`media-card-badge ${item.mediaType === 'youtube' ? 'badge-yt' : 'badge-ig'}`}>
                {item.mediaType === 'youtube' ? 'YouTube' : 'Instagram'}
              </span>
            </div>
          </a>
        )
      })}
    </div>
  )
}

/* ── CMS helper  converts flat Sanity items into tab structure ── */
function buildCategoriesFromCms(items) {
  const categoryMeta = {
    creator: { label: 'Creator Space', color: 'var(--creator)' },
    brand:   { label: 'Brand & Commercial', color: 'var(--brand)' },
    vfx:     { label: 'VFX & 3D', color: 'var(--vfx)' },
    wedding: { label: 'Wedding Films', color: 'var(--wedding)' },
  }
  return Object.entries(categoryMeta).map(([id, meta]) => {
    const catItems = items.filter(i => i.category === id)
    return {
      id,
      ...meta,
      // For CMS mode we use a simple flat grid per category
      cmsItems: catItems,
    }
  }).filter(c => c.cmsItems.length > 0)
}

/* ── Main Work section ──────────────────────────────────────── */

export default function Work({ onLightbox, cmsPortfolio }) {
  const useCms = cmsPortfolio?.length > 0
  const categories = useCms ? buildCategoriesFromCms(cmsPortfolio) : workCategories
  const [active, setActive] = useState(categories[0]?.id || 'creator')
  const ref = useScrollReveal()
  const panelRef = useRef(null)
  const current = categories.find(c => c.id === active) || categories[0]

  useEffect(() => {
    if (!panelRef.current) return
    const tween = gsap.fromTo(panelRef.current,
      { opacity: 0, y: 24, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out' })
    return () => tween.kill()
  }, [active])

  return (
    <section id="work" style={{ background: 'var(--paper-warm)', padding: '120px 0' }} ref={ref}>
      <div className="wrap--wide">
        {/* header */}
        <div className="work-section-header">
          <p className="label sr"><span className="rule" />Selected work</p>
          <h2 className="sr d1 work-section-title">
            Projects we're <em style={{ fontStyle: 'italic', color: 'var(--wedding)' }}>proud of</em>
          </h2>
        </div>

        {/* tab nav */}
        <div className="sr d2 work-section-tabs" style={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap', borderBottom: '1px solid var(--border)', marginBottom: 48 }}>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActive(cat.id)} style={{
              fontSize: 12, fontWeight: active === cat.id ? 500 : 400, letterSpacing: '.04em',
              padding: '9px 18px 10px', borderRadius: 'var(--r-pill) var(--r-pill) 0 0',
              border: active === cat.id ? '1px solid var(--border)' : '1px solid transparent',
              borderBottom: 'none', color: active === cat.id ? 'var(--ink)' : 'var(--ink-mid)',
              background: active === cat.id ? 'var(--paper-warm)' : 'transparent',
              position: 'relative', bottom: -1, cursor: 'pointer', transition: 'all 0.2s ease',
            }}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* tab content  CMS flat grid or rich local layouts */}
        <div key={active} ref={panelRef}>
          {useCms ? (
            <CmsTab items={current.cmsItems} onLightbox={onLightbox} />
          ) : (
            <>
              {active === 'creator' && <CreatorTab channels={current.channels} onLightbox={onLightbox} />}
              {active === 'brand'   && <BrandTab channels={current.channels} onLightbox={onLightbox} />}
              {active === 'vfx'     && <VfxTab sections={current.sections} onLightbox={onLightbox} />}
              {active === 'wedding' && <WeddingTab cat={current} onLightbox={onLightbox} />}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
