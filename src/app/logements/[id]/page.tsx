"use client"

import { notFound } from "next/navigation"
import { logements } from "../../../data/logements"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from "react-icons/fa"

export default function LogementDetail({ params }: { params: { id: string } }) {
  const logement = logements.find((l) => l.id === params.id)
  if (!logement) return notFound()

  // Images secondaires (hors cover)
  const galleryImages = Array.from(
    { length: logement.photos ?? 0 },
    (_, i) => `${logement.dossier}/${i + 1}.jpg`
  )

  const [isOpen, setIsOpen] = useState(false)

  return (
    <main className="relative min-h-screen">
      <div className="relative z-10">
        {/* Cover immersive */}
        <section className="relative w-full h-[65vh]">
          <img
            src={logement.cover}
            alt={`${logement.titre} – couverture`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
              {logement.titre}
            </h1>
            <span className="inline-block bg-white/90 text-neutral-900 px-6 py-2 rounded-full text-xl font-semibold shadow-lg">
              {logement.prix}
            </span>
          </div>
        </section>

        {/* Contenu principal */}
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
          {/* Galerie limitée */}
          {galleryImages.length > 0 && (
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {galleryImages.slice(0, 4).map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${logement.titre} – photo ${i + 1}`}
                    className="w-full h-64 object-cover rounded-xl shadow-md"
                  />
                ))}
              </div>
              {galleryImages.length > 4 && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="px-6 py-3 bg-neutral-900 text-white rounded-xl shadow hover:opacity-90 transition"
                  >
                    Voir toutes les {galleryImages.length} photos
                  </button>
                </div>
              )}
            </section>
          )}

          {/* Détails rapides */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-neutral-700">
            {logement.emplacement && (
              <div className="bg-white/95 rounded-xl p-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-yellow-600" />
                <p className="font-medium">{logement.emplacement}</p>
              </div>
            )}
            {logement.details?.chambres && (
              <div className="bg-white/95 rounded-xl p-4 flex items-center gap-2">
                <FaBed className="text-yellow-600" />
                <p className="font-medium">{logement.details.chambres} chambres</p>
              </div>
            )}
            {logement.details?.sallesDeBain && (
              <div className="bg-white/95 rounded-xl p-4 flex items-center gap-2">
                <FaBath className="text-yellow-600" />
                <p className="font-medium">
                  {logement.details.sallesDeBain} salle(s) de bain
                </p>
              </div>
            )}
            {logement.details?.superficie && (
              <div className="bg-white/95 rounded-xl p-4 flex items-center gap-2">
                <FaRulerCombined className="text-yellow-600" />
                <p className="font-medium">{logement.details.superficie}</p>
              </div>
            )}
          </section>

          {/* Description */}
          <section className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Description
            </h3>
            <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
              {logement.description}
            </p>
          </section>

          {/* CTA réservation */}
          <section className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-2xl shadow-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
            <p className="text-lg font-medium">
              Intéressé par ce logement ? Réservez votre visite premium dès
              maintenant.
            </p>
            <a
              href="/reservations"
              className="inline-block px-8 py-4 rounded-xl text-yellow-700 font-semibold shadow-lg bg-white hover:opacity-90 transition"
            >
              Réserver ma visite →
            </a>
          </section>
        </div>
      </div>

      {/* Modal galerie */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center overflow-y-auto p-6"
          >
            {/* Fond repris du layout */}
            <div className="absolute inset-0">
              <img
                src="/images/background.jpg"
                alt="background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70" />
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="relative z-10 self-end mb-4 px-4 py-2 bg-white text-black rounded shadow hover:bg-neutral-200 transition"
            >
              Fermer
            </button>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
              {galleryImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${logement.titre} – photo ${i + 1}`}
                  className="w-full h-72 object-cover rounded-xl shadow"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}