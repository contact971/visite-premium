// src/app/logements/page.tsx
"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { logements } from "../../data/logements"

// ---------------- Types
type BaseLogement = {
  id: string
  titre: string
  prix: string
  description: string
  emplacement: string
  details?: {
    chambres?: number
    sallesDeBain?: number
    superficie?: string
    etage?: number
  }
  dossier: string
  photos: number
  cover: string
  badge?: string | null
}
type UILogement = Omit<BaseLogement, "badge"> & { badge: string }

// ---------------- Utils
// Hash déterministe (djb2)
function hashStr(s: string) {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h) + s.charCodeAt(i)
  return Math.abs(h) >>> 0
}

// Badge stable : garde le badge du dataset si présent, sinon calcule
function stableBadge(item: BaseLogement): string {
  const explicit = (item.badge ?? "").trim()
  if (explicit) return explicit

  const isLoft = item.titre?.toLowerCase().includes("loft") ?? false
  if (isLoft) return "Loft"

  const h = hashStr(`${item.id}|${item.titre}`)
  const r = (h % 1000) / 1000 // 0..1 stable
  if (r < 0.15) return "Nouveau"
  if (r < 0.25) return "Exclusivité"
  return ""
}

function normalizeWithBadges(list: BaseLogement[]): UILogement[] {
  return list.map((it) => ({ ...it, badge: stableBadge(it) }))
}

// m² → pi² (si besoin)
function toSqft(val?: string) {
  if (!val) return undefined
  const cleaned = val.replace(/\s/g, "").toLowerCase()
  if (cleaned.includes("pi²") || cleaned.includes("ft") || cleaned.includes("sq")) return val
  const m2 = parseFloat(cleaned.replace(/[^\d.,-]/g, "").replace(",", "."))
  if (isNaN(m2)) return val
  const sqft = Math.round(m2 * 10.7639)
  return `${sqft} pi²`
}

const badgeClass = (label?: string) => {
  if (!label) return "opacity-0 pointer-events-none" // rendu mais invisible si vide
  const l = label.toLowerCase()
  if (l.includes("loft")) return "bg-purple-600"
  if (l.includes("nouveau")) return "bg-green-600"
  if (l.includes("exclus")) return "bg-pink-600"
  return "bg-yellow-600"
}

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] md:text-xs px-2 py-1 rounded bg-white/10 border border-white/10 text-white/80">
    {children}
  </span>
)

export default function LogementsPage() {
  // Données UI déterministes
  const data: UILogement[] = useMemo(() => {
    const normalized = normalizeWithBadges((logements as unknown) as BaseLogement[])
    return normalized.map((l) => ({
      ...l,
      details: { ...l.details, superficie: toSqft(l.details?.superficie) },
    }))
  }, [])

  // Pagination responsive
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(12)
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      if (w < 640) setPerPage(6)
      else if (w < 1024) setPerPage(8)
      else if (w < 1280) setPerPage(9)
      else setPerPage(12)
    }
    calc()
    window.addEventListener("resize", calc)
    return () => window.removeEventListener("resize", calc)
  }, [])

  // Quartiers (filtre simple)
  const quartiers = useMemo(() => {
    const set = new Set<string>()
    data.forEach((logement) => {
      const parts = logement.emplacement.split("—").map((s) => s.trim())
      const quartier = parts[parts.length - 1]
      set.add(quartier)
    })
    return Array.from(set).sort()
  }, [data])

  const [selectedQuartier, setSelectedQuartier] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const logementsFiltres = useMemo(() => {
    return selectedQuartier
      ? data.filter((l) =>
          l.emplacement.toLowerCase().includes(selectedQuartier.toLowerCase())
        )
      : data
  }, [data, selectedQuartier])

  const totalPages = Math.max(1, Math.ceil(logementsFiltres.length / perPage))
  const current = useMemo<UILogement[]>(() => {
    const start = (page - 1) * perPage
    return logementsFiltres.slice(start, start + perPage)
  }, [page, perPage, logementsFiltres])

  useEffect(() => {
    if (page > totalPages) setPage(1)
  }, [perPage, totalPages, page])

  return (
    <main className="relative min-h-screen w-full">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-6 text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl md:text-4xl font-semibold text-yellow-500 drop-shadow-lg">
            Nos appartements disponibles
          </h1>
          <p className="mt-3 text-neutral-300 max-w-2xl mx-auto">
            Sélection premium, visites <span className="font-semibold text-yellow-400">prioritaires</span> sur demande.
          </p>
        </motion.div>

        {/* Filtres quartiers */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-4xl mx-auto overflow-x-auto pb-2">
          <button
            onClick={() => { setSelectedQuartier(null); setPage(1) }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              selectedQuartier === null ? "bg-yellow-600 text-white" : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            Tous
          </button>

          {(showAll ? quartiers : quartiers.slice(0, 8)).map((q) => (
            <button
              key={q}
              onClick={() => { setSelectedQuartier(q); setPage(1) }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                selectedQuartier === q ? "bg-yellow-600 text-white" : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {q}
            </button>
          ))}

          {quartiers.length > 8 && (
            <button
              onClick={() => setShowAll((s) => !s)}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white/70 hover:bg-white/20"
            >
              {showAll ? "Voir moins" : "Voir plus"}
            </button>
          )}
        </div>
      </section>

      {/* Grid logements */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {current.map((logement, i) => {
            // ➜ Bandeau pour les 2 premières cartes de la page 1 :
            const showReserveStripe = page === 1 && i < 2
            // Variante par IDs (dé-commente et commente la ligne ci-dessus si tu préfères)
            // const reservedIds = new Set<string>(["app3", "app9"])
            // const showReserveStripe = reservedIds.has(logement.id)

            return (
              <motion.div
                key={logement.id}
                className="group bg-black/55 backdrop-blur-md border border-white/10 rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden flex flex-col relative"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
              >
                {/* Pastille (au-dessus de l'image) */}
                <span
                  className={`absolute top-2 left-2 z-20 ${badgeClass(logement.badge)} text-white text-[11px] font-bold px-2 py-1 rounded drop-shadow`}
                  data-badge={logement.badge}
                >
                  {logement.badge}
                </span>

                <Link href={`/logements/${logement.id}`}>
                  <div className="relative z-0 w-full h-48 md:h-56 overflow-hidden">
                    {/* Bandeau de réservation en cours */}
                    {showReserveStripe && (
                      <div
                        className="absolute top-0 left-0 right-0 z-30 bg-red-600/90 text-white text-[11px] md:text-xs font-semibold text-center py-1"
                        aria-label="Actuellement en cours de réservation"
                      >
                        Actuellement en cours de réservation
                      </div>
                    )}

                    <img
                      src={logement.cover}
                      alt={logement.titre}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute bottom-2 right-2 bg-yellow-600 text-white text-[11px] md:text-xs px-2 py-1 rounded shadow-md">
                      {logement.prix}
                    </span>
                  </div>
                </Link>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1">{logement.titre}</h3>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {logement.emplacement && <Chip>{logement.emplacement}</Chip>}
                    {logement.details?.chambres != null && <Chip>🛏 {logement.details.chambres} ch</Chip>}
                    {logement.details?.sallesDeBain != null && <Chip>🛁 {logement.details.sallesDeBain} sdb</Chip>}
                    {logement.details?.superficie && <Chip>📐 {logement.details.superficie}</Chip>}
                  </div>

                  <Link
                    href={`/logements/${logement.id}`}
                    className="mt-auto inline-block px-4 py-2 text-center text-xs font-medium bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
                  >
                    Voir le logement
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => { if (page > 1) { setPage((p) => p - 1); window.scrollTo({ top: 0, behavior: "smooth" }) }}}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 disabled:opacity-40"
          >
            ← Précédent
          </button>

          <span className="text-white/80 text-sm px-3 py-2 rounded-lg bg-white/5 border border-white/10">
            Page <strong className="text-white">{page}</strong> / {totalPages}
          </span>

          <button
            onClick={() => { if (page < totalPages) { setPage((p) => p + 1); window.scrollTo({ top: 0, behavior: "smooth" }) }}}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 disabled:opacity-40"
          >
            Suivant →
          </button>
        </div>

        {/* CTA */}
        <div className="text-center mt-6">
          <Link
            href="/reservations"
            className="inline-block px-7 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-full shadow transition"
          >
            Réserver une visite premium
          </Link>
        </div>
      </section>
    </main>
  )
}