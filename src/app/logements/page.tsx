// src/app/logements/page.tsx
"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { logements } from "../../data/logements"
import { FaMapMarkerAlt, FaBed, FaBath, FaSearch } from "react-icons/fa"

export default function LogementsPage() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const PER_PAGE = 12

  // 🔎 Filtrage
  const filteredLogements = useMemo(() => {
    return logements.filter(
      (l) =>
        l.titre.toLowerCase().includes(search.toLowerCase()) ||
        l.emplacement.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  const totalPages = Math.ceil(filteredLogements.length / PER_PAGE)
  const paginatedLogements = filteredLogements.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  )

  return (
    <main className="min-h-screen py-20 px-6">
      <motion.h1
        className="text-4xl font-bold text-center mb-12 text-white drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Nos appartements premium
      </motion.h1>

      {/* 🔎 Recherche */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="flex items-center gap-3 bg-white/90 rounded-xl shadow px-4 py-3">
          <FaSearch className="text-neutral-500" />
          <input
            type="text"
            placeholder="Rechercher par ville ou titre..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="w-full bg-transparent outline-none"
          />
        </div>
      </div>

      {/* 🏠 Grille logements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {paginatedLogements.length === 0 && (
          <p className="text-neutral-300 text-center col-span-full">
            Aucun logement trouvé.
          </p>
        )}

        {paginatedLogements.map((logement, index) => {
          const shortDesc =
            logement.description.length > 110
              ? logement.description.slice(0, 110) + "..."
              : logement.description

          // 🏷️ Badge dynamique (calculé à l’affichage)
          let badge: string | null = null
          const prixNum = parseInt(logement.prix.replace(/\D/g, "")) || 0
          const idNum = parseInt(logement.id.replace("app", "")) || 0

          if ([12, 38].includes(idNum)) {
            badge = "Promo"
          } else if (idNum >= 31 && idNum <= 40) {
            badge = "Étudiant"
          } else if (idNum <= 5) {
            badge = "Nouveau"
          } else if (prixNum > 2500) {
            badge = "Exclusif"
          }

          return (
            <motion.div
              key={logement.id}
              className="bg-white/85 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 border border-white/10 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              {/* Image + badge */}
              <div className="relative">
                <img
                  src={logement.cover}
                  alt={logement.titre}
                  className="w-full h-56 object-cover"
                />
                {badge && (
                  <span
                    className={`absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md
                      ${
                        badge === "Promo"
                          ? "bg-red-600"
                          : badge === "Étudiant"
                          ? "bg-blue-600"
                          : badge === "Nouveau"
                          ? "bg-green-600"
                          : "bg-yellow-600"
                      }`}
                  >
                    {badge}
                  </span>
                )}
              </div>

              {/* Contenu */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-2">{logement.titre}</h2>
                <p className="text-neutral-700 mb-4 flex-grow">{shortDesc}</p>

                <div className="flex items-center gap-4 text-sm text-neutral-600 mb-4">
                  {logement.emplacement && (
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-yellow-600" />{" "}
                      {logement.emplacement}
                    </span>
                  )}
                  {logement.details?.chambres && (
                    <span className="flex items-center gap-1">
                      <FaBed className="text-yellow-600" />{" "}
                      {logement.details.chambres}
                    </span>
                  )}
                  {logement.details?.sallesDeBain && (
                    <span className="flex items-center gap-1">
                      <FaBath className="text-yellow-600" />{" "}
                      {logement.details.sallesDeBain}
                    </span>
                  )}
                </div>

                {/* Bas aligné */}
                <div className="mt-auto">
                  <p className="text-lg font-bold text-black mb-4">
                    {logement.prix}
                  </p>
                  <Link
                    href={`/logements/${logement.id}`}
                    className="inline-block text-center w-full px-5 py-3 rounded-xl text-white font-semibold shadow-md transition
                               bg-gradient-to-r from-yellow-600 to-yellow-700 hover:opacity-90"
                  >
                    Découvrir cet appartement →
                  </Link>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded bg-neutral-200 text-neutral-700 disabled:opacity-50"
          >
            Précédent
          </button>
          <span className="text-sm text-neutral-300">
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded bg-neutral-200 text-neutral-700 disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      )}
    </main>
  )
}