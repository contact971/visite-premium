// src/app/logements/page.tsx
"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { logements } from "../../data/logements"

type Logement = (typeof logements)[number]

export default function LogementsPage() {
  // -------- Pagination responsive --------
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(12)

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      // Ajuste le nombre d’items / page selon la largeur pour garder de belles lignes
      if (w < 640) setPerPage(6)        // 1 col x 6
      else if (w < 1024) setPerPage(8)  // 2 cols x 4
      else if (w < 1280) setPerPage(9)  // 3 cols x 3
      else setPerPage(12)               // 4 cols x 3
    }
    calc()
    window.addEventListener("resize", calc)
    return () => window.removeEventListener("resize", calc)
  }, [])

  const totalPages = Math.max(1, Math.ceil(logements.length / perPage))
  const current = useMemo(() => {
    const start = (page - 1) * perPage
    return logements.slice(start, start + perPage)
  }, [page, perPage])

  useEffect(() => {
    // si on change perPage et que la page courante dépasse le nouveau total
    if (page > totalPages) setPage(1)
  }, [perPage, totalPages, page])

  // -------- Styles helpers --------
  const badgeClass = (label?: string) => {
    if (!label) return "bg-yellow-600"
    const l = label.toLowerCase()
    if (l.includes("étud")) return "bg-blue-600"
    if (l.includes("nouveau")) return "bg-green-600"
    if (l.includes("coup") || l.includes("coeur") || l.includes("coeur")) return "bg-pink-600"
    if (l.includes("promo")) return "bg-red-600"
    return "bg-yellow-600"
  }

  const Chip = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[11px] md:text-xs px-2 py-1 rounded bg-white/10 border border-white/10 text-white/80">
      {children}
    </span>
  )

  return (
    <main className="relative min-h-screen w-full">
      {/* Header section */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-yellow-500 drop-shadow-lg">
            Nos appartements disponibles
          </h1>
          <p className="mt-3 text-neutral-300 max-w-2xl mx-auto">
            Sélection premium, visites&nbsp;
            <span className="font-semibold text-yellow-400">prioritaires</span> sur demande.
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {current.map((logement: Logement, i: number) => (
            <motion.div
              key={logement.id}
              className="group bg-black/55 backdrop-blur-md border border-white/10 rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden flex flex-col relative"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
            >
              {/* Badge dynamique (pastille coin haut) */}
              {logement.badge && (
                <span
                  className={`absolute top-2 left-2 ${badgeClass(
                    (logement as any).badge
                  )} text-white text-[11px] font-bold px-2 py-1 rounded`}
                >
                  {(logement as any).badge}
                </span>
              )}

              <Link href={`/logements/${logement.id}`}>
                <div className="relative w-full h-48 md:h-56 overflow-hidden">
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

              {/* Contenu */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1">
                  {logement.titre}
                </h3>

                {/* Pastilles d’info (emplacement / ch / sdb / m²) */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {(logement as any).emplacement && <Chip>{(logement as any).emplacement}</Chip>}
                  {(logement as any).chambres && <Chip>🛏 {(logement as any).chambres} ch</Chip>}
                  {(logement as any).salleDeBain && <Chip>🛁 {(logement as any).salleDeBain} sdb</Chip>}
                  {(logement as any).superficie && <Chip>📐 {(logement as any).superficie}</Chip>}
                </div>

                <Link
                  href={`/logements/${logement.id}`}
                  className="mt-auto inline-block px-4 py-2 text-center text-xs font-medium bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
                >
                  Voir le logement
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => {
              if (page > 1) {
                setPage(p => p - 1)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            }}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 disabled:opacity-40"
          >
            ← Précédent
          </button>

          <span className="text-white/80 text-sm px-3 py-2 rounded-lg bg-white/5 border border-white/10">
            Page <strong className="text-white">{page}</strong> / {totalPages}
          </span>

          <button
            onClick={() => {
              if (page < totalPages) {
                setPage(p => p + 1)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            }}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 disabled:opacity-40"
          >
            Suivant →
          </button>
        </div>

        {/* CTA secondaire */}
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