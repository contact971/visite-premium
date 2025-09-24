// src/app/logements/[id]/page.tsx
"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { logements } from "../../../data/logements"
import { useMemo, useState } from "react"
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaArrowLeft,
} from "react-icons/fa"

import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import Zoom from "yet-another-react-lightbox/plugins/zoom"

export default function LogementDetail({ params }: { params: { id: string } }) {
  const router = useRouter()

  // Trouver le logement via l'id
  const logement = useMemo(
    () => logements.find((l) => l.id === params.id),
    [params.id]
  )

  if (!logement) {
    return (
      <main className="min-h-screen flex items-center justify-center p-10">
        <div className="text-center">
          <p className="text-white text-lg mb-4">Logement introuvable.</p>
          <button
            onClick={() => router.push("/logements")}
            className="inline-flex items-center gap-2 text-sm font-medium text-yellow-600 hover:text-white hover:bg-yellow-600 px-4 py-2 rounded-lg transition"
          >
            <FaArrowLeft className="text-xs" />
            Retour à la liste des logements
          </button>
        </div>
      </main>
    )
  }

  // Images secondaires (hors cover)
  const galleryImages = Array.from(
    { length: logement.photos ?? 0 },
    (_, i) => `${logement.dossier}/${i + 1}.jpg`
  )

  // Lightbox
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
    } else {
      router.push("/logements")
    }
  }

  return (
    <main className="relative min-h-screen">
      <div className="relative z-10">
        {/* Cover avec watermark */}
        <section className="relative w-full h-[65vh]">
          <div className="relative w-full h-full">
            <img
              src={logement.cover}
              alt={`${logement.titre} – couverture`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Luxor watermark"
                className="opacity-20 w-2/3 max-w-md pointer-events-none select-none"
              />
            </div>
          </div>
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
          {/* Galerie */}
          {galleryImages.length > 0 && (
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {galleryImages.slice(0, 4).map((src, i) => (
                  <div key={i} className="relative">
                    <img
                      src={src}
                      alt={`${logement.titre} – photo ${i + 1}`}
                      className="w-full h-64 object-cover rounded-xl shadow-md cursor-pointer hover:opacity-80"
                      onClick={() => {
                        setIndex(i)
                        setOpen(true)
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src="/logo.png"
                        alt="Luxor watermark"
                        className="opacity-20 w-1/2 pointer-events-none select-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
              {galleryImages.length > 4 && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => {
                      setIndex(0)
                      setOpen(true)
                    }}
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
          <section className="bg-gradient-to-br from-black/90 to-yellow-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-yellow-700/30 p-8 text-white">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4 drop-shadow-md">
              Description
            </h3>
            <p className="text-neutral-200 leading-relaxed whitespace-pre-line">
              {logement.description}
            </p>
          </section>

          {/* CTA réservation */}
          <section className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-2xl shadow-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
            <p className="text-lg font-medium">
              Intéressé par ce logement ? Réservez votre visite premium dès
              maintenant.
            </p>
            <Link
              href="/reservations"
              className="inline-block px-8 py-4 rounded-xl text-yellow-700 font-semibold shadow-lg bg-white hover:opacity-90 transition"
            >
              Réserver ma visite →
            </Link>
          </section>

          {/* Retour */}
          <div className="text-center">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-yellow-600 hover:text-white hover:bg-yellow-600 px-4 py-2 rounded-lg transition drop-shadow-md"
            >
              <FaArrowLeft className="text-xs" />
              Retour à la liste des logements
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Lightbox stylisée */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={galleryImages.map((src) => ({ src }))}
        plugins={[Zoom, Thumbnails]}
        styles={{
          container: {
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.95) 60%, rgba(161,98,7,0.85) 100%)",
          },
          button: {
            backgroundColor: "rgba(161,98,7,0.7)",
            borderRadius: "9999px",
            padding: "10px",
          },
          icon: { color: "#fff" },
          thumbnailsContainer: {
            background: "rgba(0,0,0,0.6)",
            padding: "8px",
            borderRadius: "12px",
          },
          thumbnail: {
            borderRadius: "8px",
            border: "2px solid transparent",
          },
        }}
        render={{
          slide: ({ slide }) => (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={slide.src}
                alt="Luxor logement"
                className="max-h-screen max-w-full object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Luxor watermark"
                  className="opacity-20 w-1/2 max-w-md pointer-events-none select-none"
                />
              </div>
            </div>
          ),
          thumbnail: ({ slide, rect, render }) => {
            const thumbIndex = galleryImages.findIndex((src) => src === slide.src)
            const isActive = thumbIndex === index
            return (
              <div
                className={`overflow-hidden rounded-lg border-2 ${
                  isActive ? "border-yellow-400" : "border-transparent"
                }`}
              >
                <img
                  src={slide.src}
                  alt="Luxor miniature"
                  className="h-16 w-24 object-cover"
                />
              </div>
            )
          },
        }}
      />
    </main>
  )
}