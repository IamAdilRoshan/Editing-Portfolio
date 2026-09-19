import { useState, useRef, useEffect, useCallback, Fragment } from "react" // v4
import { Analytics } from "@vercel/analytics/react"
import showreelThumbImg from "@/imports/Showreel_2.png"
import faviconSrc from "@/imports/Cape_bgRemoved_-1.png"
import logoGolfBusters from "@/imports/golfbusters.jpg"
import logoBetterGaming from "@/imports/bettergaming_gemini.jpg"
import logoTheNut from "@/imports/the_nut.png"
import logoSul from "@/imports/sul.jpeg"
import capeLogoImg from "@/imports/Cape_bgRemoved_.png"

// Extracts YouTube video ID from embed or watch URL
function getYouTubeId(url: string): string {
  if (!url) return ""
  if (url.includes("/embed/"))
    return url.split("/embed/")[1]?.split("?")[0] ?? ""
  if (url.includes("v=")) return url.split("v=")[1]?.split("&")[0] ?? ""
  if (url.includes("youtu.be/"))
    return url.split("youtu.be/")[1]?.split("?")[0] ?? ""
  return ""
}

// ╔══════════════════════════════════════════════════════════════════╗
// ║                  YOUR CONTENT — EDIT HERE ONLY                  ║
// ║  Everything you need to customise is in this block.             ║
// ║  Do NOT edit anything below the Sub-components line.            ║
// ╚══════════════════════════════════════════════════════════════════╝

const SITE = {
  // ── Navbar ──────────────────────────────────────────────────────
  brandPart1: "ITS", // white
  brandAccent: "CAPE", // coral
  brandPart2: "EDITS", // white
  navCta: "Book a Project", // button label in navbar

  // ── Hero ────────────────────────────────────────────────────────
  heroEyebrow: "Video Editor & Post-Production Specialist",
  heroHeadline1: "Crafting", // line 1 before gradient word
  heroGradientWord: "High-Retention", // the coral gradient word
  heroHeadline2: "Visuals & Stories", // line 2
  heroSubtext:
    "From raw footage to viral-ready cuts. I transform creator and brand vision into cinematic content that holds attention — and converts.",
  heroPrimaryCta: "Start a Project",
  heroSecondaryCta: "View Work",

  // ── Showreel (the big video in the hero) ────────────────────────
  showreelLabel: "2024–2025 Showreel",
  showreelDuration: "0:31",
  // THREE OPTIONS — pick one and leave the others as "":
  //
  // A) Uploaded video file (MP4 hosted on Google Drive, Dropbox, Cloudinary, etc.)
  //    Paste the direct .mp4 URL here:
  showreelUploadedUrl:
    "https://res.cloudinary.com/rfjb7ele/video/upload/v1788005053/Showreel_Cape.mp4",
  //
  // B) YouTube link — paste your youtube.com/watch or youtu.be link here:
  showreelYouTubeUrl: "",
  //
  // C) Static thumbnail only (used when both above are empty)
  showreelThumb:
    "https://images.unsplash.com/photo-1700922180758-b335f78a3d59?w=1200&h=675&fit=crop&auto=format",

  // ── Social proof bar label ──────────────────────────────────────
  socialProofLabel: "Trusted by Top Creators & Brands",

  // ── Long-form section ───────────────────────────────────────────
  longFormEyebrow: "Long-Form Projects",
  longFormHeading: "Featured Work",

  // ── Short-form section ──────────────────────────────────────────
  shortFormEyebrow: "Short-Form Content",
  shortFormHeading: "Reels, TikToks & Shorts",

  // ── Testimonials section ────────────────────────────────────────
  testimonialsEyebrow: "Client Testimonials",
  testimonialsHeading: "What Clients Say",

  // ── Availability badge (navbar) ─────────────────────────────────
  availabilityLabel: "Available for Work",

  // ── Showreel quality badge ──────────────────────────────────────
  showreelQuality: "4K",

  // ── Contact / Footer ────────────────────────────────────────────
  contactEyebrow: "Ready to Collaborate?",
  contactHeadline1: "Let's Build Your Next",
  contactGradientWord: "Viral Project",
  contactSubtext:
    "Slots are limited. Drop an inquiry and I'll get back within 24 hours.",
  contactCta: "Send Inquiry",
  footerCopy: "© 2025 ITSCAPEEDITS. All rights reserved.",
  socialLinks: [
    { label: "YouTube", url: "https://www.youtube.com/@TheCape" },
    { label: "Instagram", url: "https://www.instagram.com/itscapeedits/" },
    { label: "X", url: "https://x.com/ItsCapeEdits" },
  ],
}

// ── Clients / social proof cards ────────────────────────────────────
const clients = [
  {
    name: "Golf Busters",
    niche: "Golf Channel",
    subs: "82K Subs",
    avatar: logoGolfBusters,
  },
  {
    name: "Better Gaming",
    niche: "Tech Reviews",
    subs: "40K Subs",
    avatar: logoBetterGaming,
  },
  {
    name: "The Nut",
    niche: "Gaming Channel",
    subs: "1.26K Subs",
    avatar: logoTheNut,
  },
  {
    name: "SUL",
    niche: "Skincare Brand",
    subs: "50K Followers",
    avatar: logoSul,
  },
]

// ── Long-form project cards (16:9) ──────────────────────────────────
// thumb:    16:9 thumbnail image URL
// videoUrl: YouTube embed URL — clicking the card opens the video
// Cards alternate left/right automatically.
// Add or remove objects to add/remove cards.
const projects = [
  {
    title: "Minecraft, But Dirt Drops OP Loot",
    category: "YouTube Video",
    tags: ["3D Motion Graphics", "Sound Design", "Story Telling"],
    views: "",
    duration: "",
    thumb: "https://img.youtube.com/vi/f3q5wDRPNvM/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/f3q5wDRPNvM",
    stats: [
      { value: "17.5×", label: "Views vs channel average" },
      { value: "7K Views", label: "Channel at 400 subs" },
    ],
    quote:
      "Delivered 7,000 views for a creator with under 400 subscribers. 17× above their usual baseline.",
  },
  {
    title: "RailPeek | Ideathone 2024 | Startup Idea Presentation",
    category: "Motion Graphics",
    tags: ["Motion Graphics", "Presentation", "Voice to Video"],
    views: "",
    duration: "",
    thumb: "https://img.youtube.com/vi/5MLzh2jaixg/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/5MLzh2jaixg",
    stats: [
      { value: "Zero Assets", label: "Everything built from scratch" },
      { value: "0 Revisions", label: "Approved on first delivery" },
    ],
    quote:
      "No footage, no assets, no templates. Script, visuals, motion, and voice all conceived and built from the ground up.",
  },
  {
    title:
      "This New Ridiculously Easy Way to Simplify Your Swing Requires No Practice",
    category: "YouTube Video",
    tags: ["Motion Graphics", "Analytics", "Color Grading"],
    views: "",
    duration: "",
    thumb: "https://img.youtube.com/vi/nuEUkDFT_mg/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/nuEUkDFT_mg",
    stats: [
      { value: "+9,200%", label: "View surge vs 650 avg" },
      { value: "42K Views", label: "On a single upload" },
    ],
    quote:
      "Took a channel averaging 650 views and delivered a 42,000-view video. A 64× leap in a single upload.",
  },
  {
    title: "Modders Just Unlocked NVMe SSD on Switch 2 Using microSD Slot",
    category: "YouTube Video",
    tags: ["Motion Graphics", "B-Roll", "Sound Design"],
    views: "",
    duration: "",
    thumb: "https://img.youtube.com/vi/BIJw5zl3Ab8/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/BIJw5zl3Ab8",
    stats: [
      { value: "6-Hour", label: "Edit-to-delivery" },
      { value: "Same Day", label: "Brief to final cut" },
    ],
    quote:
      "Trusted with tight deadlines. Consistently delivering broadcast-quality edits within the same working day.",
  },
]

// ── Signature Moments — 4 rows, true aspect ratios, Cloudinary resized ──
// Cloudinary resize helper
const cl = (w: number, id: string) =>
  `https://res.cloudinary.com/rfjb7ele/video/upload/w_${w},q_auto:low/${id}`

// Four grid sections, alternating portrait side — all use 37fr total width so they stack flush.
//
// Grid 1 — 9fr 14fr 14fr — portrait LEFT
//  r1 (475): [clip10s 9:16] [clip7 HERO ──────────────────────────]
//
// Grid 2 — 14fr 14fr 9fr — portrait RIGHT
//  r1 (238): [clip9]  [clip3]  [clip5s 9:16 ─┐]
//  r2 (238): [clip4]  [clip11] [             ─┘]
//
// Grid 3 — 9fr 14fr 14fr — portrait LEFT
//  r1 (238): [clip6s 9:16 ─┐] [clip8 HERO ──────────────────────]
//  r2 (238): [             ─┘] [         ──────────────────────]
//
// Grid 4 — 14fr 14fr 9fr — portrait RIGHT
//  r1 (238): [clip12] [clip16] [clip13s 9:16 ─┐]
//  r2 (238): [clip14] [clip15] [              ─┘]
//
// All portrait clips: ~270px wide × 481px tall → 9:16 ✓
// All landscape clips: ~424px wide × 238px tall → ~16:9 ✓
// Grid sections — alternating portrait left/right
const momentGrid1 = [
  { src: cl(360, "v1788011217/10s.mp4"), gridRow: "1", gridColumn: "1" }, // clip10s portrait
  { src: cl(900, "v1788011217/7.mp4"), gridRow: "1", gridColumn: "2 / 4" }, // clip7  HERO
]

const momentGrid2 = [
  { src: cl(480, "v1788011233/9.mp4"), gridRow: "1", gridColumn: "1" }, // clip9
  { src: cl(480, "v1788011207/3.mp4"), gridRow: "1", gridColumn: "2" }, // clip3
  { src: cl(360, "v1789810400/13s.mp4"), gridRow: "1 / 3", gridColumn: "3" }, // clip13s portrait RIGHT (swapped)
  { src: cl(480, "v1788011171/4.mp4"), gridRow: "2", gridColumn: "1" }, // clip4
  { src: cl(480, "v1788011158/11.mp4"), gridRow: "2", gridColumn: "2" }, // clip11
]

const momentGrid3 = [
  { src: cl(360, "v1788011200/6s.mp4"), gridRow: "1 / 3", gridColumn: "1" }, // clip6s portrait LEFT
  { src: cl(720, "v1788011260/8.mp4"), gridRow: "1 / 3", gridColumn: "2 / 4" }, // clip8  wide
]

const momentGrid4 = [
  { src: cl(480, "v1789806431/12.mp4"), gridRow: "1", gridColumn: "1" }, // clip12
  { src: cl(480, "v1789810809/16.mp4"), gridRow: "1", gridColumn: "2" }, // clip16
  { src: cl(360, "v1788011180/5s.mp4"), gridRow: "1 / 3", gridColumn: "3" }, // clip5s portrait RIGHT (swapped)
  { src: cl(480, "v1789810564/14.mp4"), gridRow: "2", gridColumn: "1" }, // clip14 side by side
  { src: cl(480, "v1789810625/15.mp4"), gridRow: "2", gridColumn: "2" }, // clip15 side by side
]

// ── Short-form cards (9:16 phone format) ────────────────────────────
// videoSrc: direct Cloudinary .mp4 — loops silently in the card
const shorts = [
  {
    title: "Short Form Edit",
    category: "Reel",
    videoSrc:
      "https://res.cloudinary.com/rfjb7ele/video/upload/w_360,q_auto:low/v1789224156/Shortform_5sec.mp4",
  },
  {
    title: "Streamer Moment",
    category: "Gaming",
    videoSrc:
      "https://res.cloudinary.com/rfjb7ele/video/upload/w_360,q_auto:low/v1789224162/Streamer_Moment.mp4",
  },
  {
    title: "Motion Backgrounds",
    category: "Motion Graphics",
    videoSrc:
      "https://res.cloudinary.com/rfjb7ele/video/upload/w_360,q_auto:low/v1789224190/Backgrounds.mp4",
  },
  {
    title: "Viral Icons",
    category: "Animation",
    videoSrc:
      "https://res.cloudinary.com/rfjb7ele/video/upload/w_360,q_auto:low/v1789224198/Viral_Icons_Animated.mp4",
  },
]

// ── Testimonials ─────────────────────────────────────────────────────
// stars: number 1–5
// logo: imported brand image (shown instead of avatar)
const testimonials = [
  {
    quote:
      "Cape helped us across both long-form and short-form projects, and the experience was genuinely great. The results spoke for themselves: clean edits, strong pacing, and a clear understanding of what we needed. We were happy with the outcome and still are.",
    name: "Better Gaming",
    role: "Gaming Brand",
    logo: logoBetterGaming,
    stars: 5,
  },
  {
    quote:
      "Absolutely nailed it. The edit came out exactly how we envisioned: sharp, engaging, and on-brand from start to finish. Delivered clean and fast. Working with Cape is effortless and the quality is always there.",
    name: "Golf Busters",
    role: "Sports Content",
    logo: logoGolfBusters,
    stars: 5,
  },
  {
    quote:
      "We've come back to Cape multiple times now, and every single project has landed the way we wanted. Consistent quality, fast delivery, and he always gets the vision right. Wouldn't go anywhere else for our edits.",
    name: "SUL",
    role: "Skincare Brand",
    logo: logoSul,
    stars: 5,
  },
]

// ╚══════════════════════════════════════════════════════════════════╝
//                       END OF YOUR CONTENT
// ╔══════════════════════════════════════════════════════════════════╝

/* ─── Muted looping clip (forces mute via ref to bypass browser quirks) ─────── */
function LoopClip({ src, style }: { src: string style?: React.CSSProperties }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.muted = true
      ref.current.play().catch(() => {})
    }
  }, [])
  return (
    <video
      ref={ref}
      src={src}
      loop
      muted
      playsInline
      autoPlay
      preload="metadata"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        ...style,
      }}
    />
  )
}

/* ─── Short carousel card ───────────────────────────────────────────────────── */

function ShortCard({
  s,
  isActive,
  offset,
  direction,
  isMobile = false,
  sideOffset = 0,
  onClick,
}: {
  s: { title: string category: string videoSrc: string }
  isActive: boolean
  offset: number
  direction: number
  isMobile?: boolean
  sideOffset?: number
  onClick: () => void
}) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (!ref.current) return
    ref.current.muted = true
    ref.current.play().catch(() => {})
  }, [])

  const cardW = isMobile ? 160 : 240
  const spacing = isMobile ? 95 : 148
  const absOff = Math.abs(offset)
  const tx = offset * spacing
  const tz = isActive ? 0 : absOff === 1 ? -60 : -110
  const ty = isActive ? 0 : absOff === 1 ? 18 : 36
  const scale = isActive ? 1 : absOff === 1 ? 0.84 : 0.68
  const blur = isActive ? 0 : absOff === 1 ? 3 : 7
  const opacity = isActive ? 1 : absOff === 1 ? 0.6 : 0.32
  const zIndex = isActive ? 10 : absOff === 1 ? 7 : 4
  const rotateY = isActive ? 0 : offset * -12

  // Wave stagger: incoming cards lead, departing cards trail behind them.
  // Going right (+1): positive offsets have 0 delay, negative offsets cascade out.
  // Going left  (-1): negative offsets have 0 delay, positive offsets cascade out.
  const staggerMs = Math.max(0, offset * direction) * 55

  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        width: cardW,
        cursor: isActive ? "default" : "pointer",
        borderRadius: 16,
        overflow: "hidden",
        border: isActive
          ? "1px solid rgba(243,59,88,0.45)"
          : "1px solid #261f21",
        background: "#121011",
        zIndex,
        transform: `translateX(${tx}px) translateY(${ty}px) translateZ(${tz}px) scale(${scale}) rotateY(${rotateY}deg)`,
        filter: `blur(${blur}px)`,
        opacity,
        // cinematic ease-in-out: smooth acceleration and deceleration, no bounce
        transition: [
          `transform 0.7s cubic-bezier(0.76, 0, 0.24, 1) ${staggerMs}ms`,
          `opacity 0.55s cubic-bezier(0.76, 0, 0.24, 1) ${staggerMs}ms`,
          `filter 0.55s cubic-bezier(0.76, 0, 0.24, 1) ${staggerMs}ms`,
          "box-shadow 0.55s ease",
          "border-color 0.4s ease",
        ].join(", "),
        willChange: "transform, opacity, filter",
        boxShadow: isActive
          ? "0 0 60px rgba(243,59,88,0.2), 0 24px 60px rgba(0,0,0,0.6)"
          : "none",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "9/16" }}>
        <video
          ref={ref}
          src={s.videoSrc}
          loop
          muted
          playsInline
          autoPlay
          preload="metadata"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(6,5,5,0.92) 0%, transparent 55%)",
            pointerEvents: "none",
          }}
        />
        {/* Category badge */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            background: "#f33b58",
            color: "#fff",
            fontSize: 9,
            fontWeight: 700,
            padding: "3px 8px",
            borderRadius: 2,
            fontFamily: "Inter, sans-serif",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {s.category}
        </div>
      </div>
    </div>
  )
}

/* ─── Ambient video player ──────────────────────────────────────────────────── */

function AmbientVideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)

  const sampleColors = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const glow = glowRef.current
    if (!video || !canvas || !glow || video.paused || video.ended) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.drawImage(video, 0, 0, 32, 18)
    const data = ctx.getImageData(0, 0, 32, 18).data

    let r = 0,
      g = 0,
      b = 0,
      count = 0
    for (let i = 0; i < data.length; i += 16) {
      r += data[i]
      g += data[i + 1]
      b += data[i + 2]
      count++
    }
    r = Math.round(r / count)
    g = Math.round(g / count)
    b = Math.round(b / count)

    const max = Math.max(r, g, b) || 1
    const boost = 1.6
    r = Math.min(255, Math.round((r / max) * max * boost))
    g = Math.min(255, Math.round((g / max) * max * boost))
    b = Math.min(255, Math.round((b / max) * max * boost))

    glow.style.boxShadow = `0 0 80px 20px rgba(${r},${g},${b},0.55), 0 0 160px 40px rgba(${r},${g},${b},0.25)`

    rafRef.current = requestAnimationFrame(sampleColors)
  }, [])

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Auto-pause when scrolled out of view, resume when back in view
  const wrapRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current
        if (!video || !playing) return
        if (!entry.isIntersecting) {
          video.pause()
        } else if (!paused) {
          video.play().catch(() => {})
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [playing, paused])

  const handleStart = () => {
    setPlaying(true)
    setPaused(false)
    // sampling kicks off via onPlay on the video element once mounted
  }

  const handleVideoPlay = () => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(sampleColors)
  }

  const handleToggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setPaused(false)
    } else {
      video.pause()
      setPaused(true)
      cancelAnimationFrame(rafRef.current)
    }
  }

  return (
    <div
      ref={(el) => {
        ;(glowRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        ;(wrapRef as React.MutableRefObject<HTMLDivElement | null>).current = el
      }}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 20,
        boxShadow:
          "0 0 80px 20px rgba(243,59,88,0.45), 0 0 140px 40px rgba(243,59,88,0.2)",
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* Hidden sampling canvas */}
      <canvas
        ref={canvasRef}
        width={32}
        height={18}
        style={{ display: "none" }}
      />

      {/* Video — only mounted after first play to avoid the black box */}
      {playing && (
        <video
          ref={videoRef}
          src={src}
          crossOrigin="anonymous"
          playsInline
          autoPlay
          onPlay={handleVideoPlay}
          onClick={handleToggle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 20,
            zIndex: 1,
            display: "block",
            cursor: "pointer",
          }}
        />
      )}

      {/* Pause indicator */}
      {playing && (paused || hovered) && (
        <div
          onClick={handleToggle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            borderRadius: 20,
            background: paused ? "rgba(0,0,0,0.35)" : "transparent",
            transition: "background 0.2s",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              background: "rgba(0,0,0,0.55)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: paused ? 1 : hovered ? 0.7 : 0,
              transition: "opacity 0.2s",
            }}
          >
            {paused ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            )}
          </div>
        </div>
      )}

      {/* Thumbnail + play button — shown before first play */}
      {!playing && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            cursor: "pointer",
            borderRadius: 20,
            overflow: "hidden",
          }}
          onClick={handleStart}
        >
          <img
            src={showreelThumbImg}
            alt="Showreel thumbnail"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.9,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(6,5,5,0.7) 0%, transparent 60%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                background: "rgba(243,59,88,0.92)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 40px rgba(243,59,88,0.6)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = "scale(1.1)"
                el.style.boxShadow = "0 0 60px rgba(243,59,88,0.8)"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = "scale(1)"
                el.style.boxShadow = "0 0 40px rgba(243,59,88,0.6)"
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Sub-components ────────────────────────────────────────────────────────── */

function PlayIcon({ size = 48 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: "rgba(243,59,88,0.92)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 32px rgba(243,59,88,0.5)",
      }}
    >
      <svg
        width={size * 0.38}
        height={size * 0.38}
        viewBox="0 0 24 24"
        fill="white"
      >
        <polygon points="5,3 19,12 5,21" />
      </svg>
    </div>
  )
}

// YouTube facade — shows thumbnail, swaps to inline player on click
function YouTubeEmbed({
  videoId,
  thumb,
  gradientDir,
}: {
  videoId: string
  thumb: string
  gradientDir: string
}) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        title="YouTube video player"
      />
    )
  }

  return (
    <>
      <img
        src={thumb || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt="Video thumbnail"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.85,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(${gradientDir}, transparent 65%, #121011 100%)`,
        }}
      />
      {/* YouTube-style play button — always visible */}
      <div
        onClick={() => setPlaying(true)}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 68,
            height: 48,
            background: "#ff0000",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 28px rgba(255,0,0,0.5)",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLDivElement).style.transform = "scale(1.12)"
            ;(e.currentTarget as HTMLDivElement).style.boxShadow =
              "0 0 40px rgba(255,0,0,0.7)"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLDivElement).style.transform = "scale(1)"
            ;(e.currentTarget as HTMLDivElement).style.boxShadow =
              "0 0 28px rgba(255,0,0,0.5)"
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
      </div>
    </>
  )
}

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < count ? "#f33b58" : "#261f21"}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function Tag({ label }: { label: string }) {
  return (
    <span
      style={{
        background: "rgba(243,59,88,0.1)",
        border: "1px solid rgba(243,59,88,0.25)",
        color: "#f33b58",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.08em",
        padding: "3px 10px",
        borderRadius: 3,
        fontFamily: "Inter, sans-serif",
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
  )
}

/* ─── Main App ──────────────────────────────────────────────────────────────── */

export default function App() {
  const [formData, setFormData] = useState({ name: "", email: "", project: "" })
  const [emailError, setEmailError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [activeShort, setActiveShort] = useState(1)
  const [shortDir, setShortDir] = useState(1)
  const stepShort = (dir: number) => {
    setShortDir(dir)
    setActiveShort((prev) => (prev + dir + shorts.length) % shorts.length)
  }

  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200,
  )
  const isMobile = windowWidth < 768
  useEffect(() => {
    const handler = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])

  // Scroll to top on every page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Favicon — injected via Vite-processed import so it's always bundled and served correctly
  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']")
    if (!link) {
      link = document.createElement("link")
      link.rel = "icon"
      document.head.appendChild(link)
    }
    link.href = faviconSrc
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    if (!emailOk) {
      setEmailError("Please enter a valid email address.")
      return
    }
    setEmailError("")
    const xhr = new XMLHttpRequest()
    xhr.open("POST", "https://formspree.io/f/xaenqwwg", true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("Accept", "application/json")
    xhr.send(
      JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.project,
      }),
    )
    setSubmitted(true)
  }

  return (
    <div
      style={{ background: "#060505", minHeight: "100vh", color: "#eeeded" }}
    >
      {/* ── NAVBAR ── */}
      <nav
        className="nav-blur"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          borderBottom: "1px solid #1a1314",
          padding: isMobile ? "0 20px" : "0 40px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img
            src={capeLogoImg}
            alt="Cape logo"
            style={{
              width: isMobile ? 22 : 30,
              height: isMobile ? 22 : 30,
              objectFit: "contain",
              flexShrink: 0,
              transform: "rotate(35deg)",
            }}
          />
          <span
            style={{
              fontFamily: "Barlow Condensed, sans-serif",
              fontWeight: 900,
              fontSize: isMobile ? 17 : 24,
              letterSpacing: "0.03em",
              fontStyle: "normal",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "#eeeded" }}>{SITE.brandPart1}</span>
            <span style={{ color: "#f33b58" }}>{SITE.brandAccent}</span>
            <span style={{ color: "#eeeded" }}>{SITE.brandPart2}</span>
          </span>
        </div>

        {/* Center badge — hidden on mobile */}
        <div
          style={{
            display: isMobile ? "none" : "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.25)",
            padding: "6px 14px",
            borderRadius: 20,
          }}
        >
          <div
            className="pulse-dot"
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 10px #22c55e, 0 0 20px rgba(34,197,94,0.4)",
            }}
          />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: "#d5a9a9",
              letterSpacing: "0.06em",
            }}
          >
            {SITE.availabilityLabel}
          </span>
        </div>

        {/* CTA */}
        <button
          style={{
            background: "#f33b58",
            color: "#fff",
            border: "none",
            padding: isMobile ? "6px 14px" : "9px 20px",
            borderRadius: 20,
            fontFamily: "Barlow Condensed, sans-serif",
            fontWeight: 700,
            fontSize: isMobile ? 13 : 16,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            ;(e.target as HTMLButtonElement).style.background = "#a70a40"
            ;(e.target as HTMLButtonElement).style.boxShadow =
              "0 0 20px rgba(167,10,64,0.5)"
          }}
          onMouseLeave={(e) => {
            ;(e.target as HTMLButtonElement).style.background = "#f33b58"
            ;(e.target as HTMLButtonElement).style.boxShadow = "none"
          }}
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {SITE.navCta}
        </button>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          paddingTop: isMobile ? 100 : 140,
          paddingBottom: isMobile ? 60 : 100,
          paddingLeft: isMobile ? 20 : 40,
          paddingRight: isMobile ? 20 : 40,
          maxWidth: 1200,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          className="section-label"
          style={{ marginBottom: isMobile ? 10 : 20 }}
        >
          {SITE.heroEyebrow}
        </div>

        <h1
          style={{
            fontFamily: "Barlow Condensed, sans-serif",
            fontWeight: 900,
            fontSize: isMobile
              ? "clamp(44px, 12vw, 64px)"
              : "clamp(52px, 8vw, 96px)",
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            color: "#eeeded",
            margin: isMobile ? "0 0 16px" : "0 0 28px",
          }}
        >
          {SITE.heroHeadline1}{" "}
          <span className="gradient-text">{SITE.heroGradientWord}</span>
          <br />
          {SITE.heroHeadline2}
        </h1>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 300,
            fontSize: isMobile ? 15 : 18,
            color: "#d5a9a9",
            maxWidth: 560,
            margin: isMobile ? "0 auto 24px" : "0 auto 40px",
            lineHeight: 1.6,
          }}
        >
          {SITE.heroSubtext}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: isMobile ? 10 : 12,
            justifyContent: "center",
            marginBottom: isMobile ? 36 : 72,
          }}
        >
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              background: "#f33b58",
              color: "#fff",
              border: "none",
              padding: isMobile ? "10px 24px" : "13px 32px",
              borderRadius: 24,
              fontFamily: "Barlow Condensed, sans-serif",
              fontWeight: 700,
              fontSize: isMobile ? 15 : 18,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              ;(e.target as HTMLButtonElement).style.background = "#a70a40"
              ;(e.target as HTMLButtonElement).style.boxShadow =
                "0 0 28px rgba(167,10,64,0.55)"
            }}
            onMouseLeave={(e) => {
              ;(e.target as HTMLButtonElement).style.background = "#f33b58"
              ;(e.target as HTMLButtonElement).style.boxShadow = "none"
            }}
          >
            {SITE.heroPrimaryCta}
          </button>
          <button
            onClick={() =>
              document
                .getElementById("work")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              background: "transparent",
              color: "#d5a9a9",
              border: "1px solid #261f21",
              padding: isMobile ? "10px 24px" : "16px 34px",
              borderRadius: 24,
              fontFamily: "Barlow Condensed, sans-serif",
              fontWeight: 600,
              fontSize: isMobile ? 15 : 18,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              const btn = e.target as HTMLButtonElement
              btn.style.borderColor = "#f33b58"
              btn.style.color = "#f33b58"
            }}
            onMouseLeave={(e) => {
              const btn = e.target as HTMLButtonElement
              btn.style.borderColor = "#261f21"
              btn.style.color = "#d5a9a9"
            }}
          >
            {SITE.heroSecondaryCta}
          </button>
        </div>

        {/* Showreel Player */}
        <div
          className="showreel-glow"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 900,
            margin: "0 auto",
            aspectRatio: "16/9",
            borderRadius: 20,
            overflow: "visible",
            cursor: "pointer",
          }}
        >
          {SITE.showreelUploadedUrl ? (
            // ── Cloudinary / MP4 with ambient glow ──
            <AmbientVideoPlayer src={SITE.showreelUploadedUrl} />
          ) : SITE.showreelYouTubeUrl ? (
            // ── YouTube facade fallback ──
            <div style={{ position: "absolute", inset: 0 }}>
              <YouTubeEmbed
                videoId={getYouTubeId(SITE.showreelYouTubeUrl)}
                thumb={SITE.showreelThumb}
                gradientDir="to top"
              />
            </div>
          ) : (
            // ── Static thumbnail placeholder ──
            <>
              <img
                src={SITE.showreelThumb}
                alt={SITE.showreelLabel}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(6,5,5,0.8) 0%, transparent 60%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PlayIcon size={72} />
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section
        style={{
          borderTop: "1px solid #1a1314",
          borderBottom: "1px solid #1a1314",
          padding: isMobile ? "40px 20px" : "48px 40px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto 32px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 1,
              background: "linear-gradient(to right, transparent, #261f21)",
            }}
          />
          <span
            className="section-label"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              color: "#6b5c5c",
              letterSpacing: "0.2em",
            }}
          >
            {SITE.socialProofLabel}
          </span>
          <div
            style={{
              flex: 1,
              height: 1,
              background: "linear-gradient(to left, transparent, #261f21)",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: isMobile ? 10 : 16,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {clients.map((c) => (
            <div
              key={c.name}
              style={{
                background: "#121011",
                border: "1px solid #261f21",
                borderRadius: 6,
                padding: isMobile ? "12px 10px" : "20px 22px",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "center" : "center",
                gap: isMobile ? 8 : 14,
                transition: "border-color 0.2s",
                textAlign: isMobile ? "center" : "left",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(243,59,88,0.3)"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.borderColor =
                  "#261f21"
              }}
            >
              <img
                src={c.avatar}
                alt={c.name}
                style={{
                  width: isMobile ? 48 : 40,
                  height: isMobile ? 48 : 40,
                  borderRadius: 6,
                  objectFit: "cover",
                  objectPosition: "center",
                  flexShrink: 0,
                  background: "#1a1314",
                  display: "block",
                }}
              />
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    fontWeight: 700,
                    fontSize: isMobile ? 13 : 15,
                    color: "#eeeded",
                    letterSpacing: "0.02em",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {c.name}
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isMobile ? 10 : 11,
                    color: "#6b5c5c",
                    marginBottom: 4,
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.niche}
                </div>
                <span
                  style={{
                    background: "rgba(243,59,88,0.1)",
                    border: "1px solid rgba(243,59,88,0.2)",
                    color: "#f33b58",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: 2,
                    fontFamily: "Inter, sans-serif",
                    letterSpacing: "0.06em",
                  }}
                >
                  {c.subs}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LONG-FORM VIDEO SHOWCASE ── */}
      <section
        id="work"
        style={{
          padding: isMobile ? "40px 20px" : "96px 40px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: 48 }}>
          <div className="section-label" style={{ marginBottom: 12 }}>
            {SITE.longFormEyebrow}
          </div>
          <h2
            style={{
              fontFamily: "Barlow Condensed, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px, 4vw, 52px)",
              textTransform: "uppercase",
              letterSpacing: "0.01em",
              color: "#eeeded",
              margin: 0,
            }}
          >
            {SITE.longFormHeading}
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {projects.map((p, idx) => {
            const isEven = idx % 2 === 0
            const gradientDir = isMobile
              ? "to bottom"
              : isEven
                ? "to right"
                : "to left"
            const videoId = getYouTubeId(p.videoUrl)
            const Thumb = (
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16/9",
                  minWidth: 0,
                  overflow: "hidden",
                }}
              >
                {videoId ? (
                  <YouTubeEmbed
                    videoId={videoId}
                    thumb={p.thumb}
                    gradientDir={gradientDir}
                  />
                ) : (
                  <>
                    <img
                      src={p.thumb}
                      alt={p.title}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.75,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(${gradientDir}, transparent 65%, #121011 100%)`,
                      }}
                    />
                    <div
                      className="play-icon"
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PlayIcon size={52} />
                    </div>
                  </>
                )}
                {p.duration && (
                  <div
                    style={{
                      position: "absolute",
                      top: 14,
                      ...(isEven ? { left: 14 } : { right: 14 }),
                      background: "rgba(6,5,5,0.75)",
                      border: "1px solid #261f21",
                      padding: "3px 10px",
                      borderRadius: 3,
                      fontFamily: "Inter, sans-serif",
                      fontSize: 11,
                      color: "#d5a9a9",
                      zIndex: 2,
                    }}
                  >
                    {p.duration}
                  </div>
                )}
              </div>
            )
            const Meta = (
              <div
                style={{
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minWidth: 0,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Barlow Condensed, sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#f33b58",
                      marginBottom: 10,
                    }}
                  >
                    {p.category}
                  </div>
                  <h3
                    style={{
                      fontFamily: "Barlow Condensed, sans-serif",
                      fontWeight: 800,
                      fontSize: 22,
                      textTransform: "uppercase",
                      letterSpacing: "0.02em",
                      color: "#eeeded",
                      margin: "0 0 20px",
                      lineHeight: 1.15,
                    }}
                  >
                    {p.title}
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.tags.map((t) => (
                      <Tag key={t} label={t} />
                    ))}
                  </div>

                  {/* Results strip */}
                  {"stats" in p && p.stats && (
                    <div style={{ marginTop: 24 }}>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "#6b5c5c",
                          marginBottom: 10,
                        }}
                      >
                        Results
                      </div>
                      <div
                        style={{ display: "flex", gap: 8, marginBottom: 14 }}
                      >
                        {(p.stats as { value: string label: string }[]).map(
                          (s) => (
                            <div
                              key={s.value}
                              style={{
                                flex: 1,
                                background: "rgba(243,59,88,0.06)",
                                border: "1px solid rgba(243,59,88,0.18)",
                                borderTop: "2px solid #f33b58",
                                borderRadius: 4,
                                padding: "10px 12px",
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: "Barlow Condensed, sans-serif",
                                  fontWeight: 900,
                                  fontSize: 22,
                                  color: "#f33b58",
                                  letterSpacing: "0.02em",
                                  lineHeight: 1,
                                  marginBottom: 4,
                                }}
                              >
                                {s.value}
                              </div>
                              <div
                                style={{
                                  fontFamily: "Inter, sans-serif",
                                  fontSize: 10,
                                  color: "#d5a9a9",
                                  lineHeight: 1.4,
                                }}
                              >
                                {s.label}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                      {"quote" in p && p.quote && (
                        <p
                          style={{
                            fontFamily: "Barlow, sans-serif",
                            fontStyle: "italic",
                            fontSize: 12,
                            color: "#6b5c5c",
                            lineHeight: 1.6,
                            margin: 0,
                            borderLeft: "2px solid #261f21",
                            paddingLeft: 10,
                          }}
                        >
                          "{p.quote as string}"
                        </p>
                      )}
                    </div>
                  )}
                </div>
                {p.views && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 28,
                      paddingTop: 20,
                      borderTop: "1px solid #1a1314",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#d5a9a9"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span
                      style={{
                        fontFamily: "Barlow Condensed, sans-serif",
                        fontWeight: 700,
                        fontSize: 16,
                        color: "#d5a9a9",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {p.views}
                    </span>
                  </div>
                )}
              </div>
            )
            return (
              <div
                key={p.title}
                className="project-card"
                style={{
                  background: "#121011",
                  border: "1px solid #261f21",
                  borderRadius: 6,
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1.6fr 1fr",
                  transition: "border-color 0.2s",
                  cursor: "default",
                  direction: isEven ? "ltr" : "rtl",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(243,59,88,0.3)"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.borderColor =
                    "#261f21"
                }}
              >
                <div style={{ direction: "ltr" }}>{Thumb}</div>
                <div style={{ direction: "ltr" }}>{Meta}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── SIGNATURE MOMENTS ── */}
      <section
        style={{
          borderTop: "1px solid #1a1314",
          padding: isMobile ? "36px 12px" : "80px 40px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: isMobile ? 20 : 40 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>
              Signature Moments
            </div>
            <h2
              style={{
                fontFamily: "Barlow Condensed, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(36px,4vw,52px)",
                textTransform: "uppercase",
                letterSpacing: "0.01em",
                color: "#eeeded",
                margin: 0,
              }}
            >
              Craft in Every Frame
            </h2>
          </div>

          {/* Four alternating grids scaled as a single unit on mobile */}
          {(() => {
            const gridW = 1120
            // Heights: grid1=475px (1 row), grid2=481px (2 rows+gap), grid3=481px, grid4=481px; 3 gaps between = 1933px
            const g1H = 475
            const g234H = 238 * 2 + 5
            const gridH = g1H + g234H * 3 + 5 * 3
            const padH = isMobile ? 24 : 0
            const scale = isMobile
              ? Math.min(1, (windowWidth - padH) / gridW)
              : 1
            const cell = {
              overflow: "hidden" as const,
              position: "relative" as const,
              background: "#0c0a0b",
            }
            const grids = [
              { data: momentGrid1, cols: "9fr 14fr 14fr", rows: "475px" },
              { data: momentGrid2, cols: "14fr 14fr 9fr", rows: "238px 238px" },
              { data: momentGrid3, cols: "9fr 14fr 14fr", rows: "238px 238px" },
              { data: momentGrid4, cols: "14fr 14fr 9fr", rows: "238px 238px" },
            ]
            return (
              <div
                style={{
                  width: "100%",
                  height: isMobile ? gridH * scale : "auto",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                    width: isMobile ? gridW : "100%",
                    transformOrigin: "top left",
                    transform: isMobile ? `scale(${scale})` : "none",
                    borderRadius: 14,
                    overflow: "hidden",
                  }}
                >
                  {grids.map((g, gi) => (
                    <div
                      key={gi}
                      style={{
                        display: "grid",
                        gridTemplateColumns: g.cols,
                        gridTemplateRows: g.rows,
                        gap: 5,
                      }}
                    >
                      {g.data.map((clip, i) => (
                        <div
                          key={i}
                          style={{
                            ...cell,
                            gridRow: clip.gridRow,
                            gridColumn: clip.gridColumn,
                          }}
                        >
                          <LoopClip src={clip.src} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ── SHORT-FORM CAROUSEL ── */}
      <section
        style={{
          borderTop: "1px solid #1a1314",
          paddingTop: isMobile ? 36 : 80,
          paddingBottom: isMobile ? 48 : 96,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: isMobile ? "0 20px" : "0 40px",
            maxWidth: 1200,
            margin: isMobile ? "0 auto 24px" : "0 auto 56px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <div className="section-label" style={{ marginBottom: 12 }}>
              {SITE.shortFormEyebrow}
            </div>
            <h2
              style={{
                fontFamily: "Barlow Condensed, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(36px, 4vw, 52px)",
                textTransform: "uppercase",
                letterSpacing: "0.01em",
                color: "#eeeded",
                margin: 0,
              }}
            >
              {SITE.shortFormHeading}
            </h2>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => stepShort(dir)}
                style={{
                  width: 40,
                  height: 40,
                  background: "#121011",
                  border: "1px solid #261f21",
                  borderRadius: 4,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor =
                    "#f33b58"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor =
                    "#261f21"
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d5a9a9"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <polyline
                    points={dir < 0 ? "15,18 9,12 15,6" : "9,18 15,12 9,6"}
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Stage */}
        <div
          style={{
            position: "relative",
            height: isMobile ? 420 : 540,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            perspective: "1200px",
          }}
        >
          {([-2, -1, 0, 1, 2] as const).map((offset) => {
            const n = shorts.length
            const realIndex = (((activeShort + offset) % n) + n) % n
            const s = shorts[realIndex]
            // On desktop alternate side offset for variety; on mobile keep centred
            const side = 120
            const sideOffset = isMobile
              ? 0
              : activeShort % 2 === 0
                ? -side
                : side
            return (
              <ShortCard
                key={offset}
                s={s}
                isActive={offset === 0}
                offset={offset}
                direction={shortDir}
                isMobile={isMobile}
                sideOffset={sideOffset}
                onClick={() => {
                  if (offset !== 0) stepShort(offset)
                }}
              />
            )
          })}
        </div>

        {/* Dot indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginTop: 32,
          }}
        >
          {shorts.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveShort(i)}
              style={{
                width: i === activeShort ? 24 : 6,
                height: 6,
                borderRadius: 3,
                border: "none",
                background: i === activeShort ? "#f33b58" : "#261f21",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        style={{
          background: "#0c0a0b",
          borderTop: "1px solid #1a1314",
          borderBottom: "1px solid #1a1314",
          padding: isMobile ? "40px 20px" : "96px 40px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{ textAlign: "center", marginBottom: isMobile ? 24 : 56 }}
          >
            <div className="section-label" style={{ marginBottom: 12 }}>
              {SITE.testimonialsEyebrow}
            </div>
            <h2
              style={{
                fontFamily: "Barlow Condensed, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(36px, 4vw, 52px)",
                textTransform: "uppercase",
                letterSpacing: "0.01em",
                color: "#eeeded",
                margin: 0,
              }}
            >
              {SITE.testimonialsHeading}
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: isMobile ? 16 : 20,
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                style={{
                  background: "#121011",
                  border: "1px solid #261f21",
                  borderRadius: 6,
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(243,59,88,0.3)"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.borderColor =
                    "#261f21"
                }}
              >
                <div>
                  <Stars count={t.stars} />
                  <p
                    style={{
                      fontFamily: "Barlow, sans-serif",
                      fontWeight: 300,
                      fontSize: 15,
                      color: "#d5a9a9",
                      lineHeight: 1.7,
                      margin: "18px 0 28px",
                      fontStyle: "italic",
                    }}
                  >
                    "{t.quote}"
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      background: "#1c1518",
                      border: "1px solid #2e2224",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      overflow: "hidden",
                      padding: 6,
                    }}
                  >
                    <img
                      src={t.logo}
                      alt={t.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "Barlow Condensed, sans-serif",
                        fontWeight: 700,
                        fontSize: 15,
                        color: "#eeeded",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 11,
                        color: "#6b5c5c",
                        marginTop: 2,
                      }}
                    >
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        style={{
          padding: isMobile ? "60px 20px" : "100px 40px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* CTA Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #1a0812 0%, #120a0f 100%)",
            border: "1px solid rgba(243,59,88,0.2)",
            borderRadius: 8,
            padding: isMobile ? "40px 24px" : "64px 56px",
            marginBottom: 64,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              height: 300,
              background:
                "radial-gradient(ellipse, rgba(167,10,64,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div className="section-label" style={{ marginBottom: 16 }}>
            {SITE.contactEyebrow}
          </div>
          <h2
            style={{
              fontFamily: "Barlow Condensed, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(40px, 5vw, 68px)",
              textTransform: "uppercase",
              letterSpacing: "0.01em",
              color: "#eeeded",
              margin: "0 0 16px",
              lineHeight: 0.95,
            }}
          >
            {SITE.contactHeadline1}{" "}
            <span className="gradient-text">{SITE.contactGradientWord}</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 300,
              fontSize: 16,
              color: "#d5a9a9",
              margin: "0 auto",
              maxWidth: 460,
              lineHeight: 1.6,
            }}
          >
            {SITE.contactSubtext}
          </p>
        </div>

        {/* Form */}
        {submitted ? (
          <div
            style={{
              background: "#121011",
              border: "1px solid rgba(243,59,88,0.3)",
              borderRadius: 6,
              padding: "56px 40px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                background: "rgba(243,59,88,0.1)",
                border: "1px solid rgba(243,59,88,0.3)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f33b58"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: "Barlow Condensed, sans-serif",
                fontWeight: 800,
                fontSize: 28,
                textTransform: "uppercase",
                color: "#eeeded",
                margin: "0 0 8px",
              }}
            >
              Inquiry Sent
            </h3>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#d5a9a9",
              }}
            >
              I'll be in touch within 24 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#121011",
              border: "1px solid #261f21",
              borderRadius: 6,
              padding: isMobile ? "28px 20px" : "48px 40px",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 16,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#d5a9a9",
                  marginBottom: 8,
                }}
              >
                Your Name
              </label>
              <input
                className="form-input"
                type="text"
                placeholder="Alex Johnson"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#d5a9a9",
                  marginBottom: 8,
                }}
              >
                Email Address
              </label>
              <input
                className="form-input"
                type="email"
                placeholder="alex@channel.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value })
                  setEmailError("")
                }}
                required
              />
              {emailError && (
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 11,
                    color: "#f33b58",
                    margin: "6px 0 0",
                  }}
                >
                  {emailError}
                </p>
              )}
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#d5a9a9",
                  marginBottom: 8,
                }}
              >
                Tell Me About Your Project
              </label>
              <textarea
                className="form-input"
                placeholder="YouTube documentary, short-form content, brand campaign… describe the project and your timeline."
                value={formData.project}
                onChange={(e) =>
                  setFormData({ ...formData, project: e.target.value })
                }
                required
                style={{ resize: "vertical", minHeight: 120 }}
              />
            </div>
            <div
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                justifyContent: isMobile ? "center" : "flex-end",
              }}
            >
              <button
                type="submit"
                style={{
                  background: "#f33b58",
                  color: "#fff",
                  border: "none",
                  padding: isMobile ? "11px 28px" : "14px 38px",
                  borderRadius: 24,
                  fontFamily: "Barlow Condensed, sans-serif",
                  fontWeight: 700,
                  fontSize: isMobile ? 15 : 18,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  ;(e.target as HTMLButtonElement).style.background = "#a70a40"
                  ;(e.target as HTMLButtonElement).style.boxShadow =
                    "0 0 28px rgba(167,10,64,0.55)"
                }}
                onMouseLeave={(e) => {
                  ;(e.target as HTMLButtonElement).style.background = "#f33b58"
                  ;(e.target as HTMLButtonElement).style.boxShadow = "none"
                }}
              >
                {SITE.contactCta}
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 28,
            borderTop: "1px solid #1a1314",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: "Barlow Condensed, sans-serif",
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "#eeeded" }}>{SITE.brandPart1}</span>
            <span style={{ color: "#f33b58" }}>{SITE.brandAccent}</span>
            <span style={{ color: "#eeeded" }}>{SITE.brandPart2}</span>
          </span>

          <div style={{ width: 1, height: 14, background: "#261f21" }} />

          {SITE.socialLinks.map((link, i) => (
            <Fragment key={link.label}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  color: "#6b5c5c",
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = "#f33b58")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = "#6b5c5c")
                }
              >
                {link.label}
              </a>
              {i < SITE.socialLinks.length - 1 && (
                <div style={{ width: 1, height: 10, background: "#261f21" }} />
              )}
            </Fragment>
          ))}

          <div style={{ width: 1, height: 14, background: "#261f21" }} />

          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              color: "#3d2f30",
              letterSpacing: "0.06em",
            }}
          >
            {SITE.footerCopy}
          </span>
        </div>
      </section>
      <Analytics />
    </div>
  )
}
