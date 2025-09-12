// src/app/page.tsx
"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { FaBolt, FaClipboardList, FaShieldAlt, FaStar, FaCheckCircle } from "react-icons/fa"

const apps = ["app1", "app2", "app3", "app4", "app5", "app6", "app7", "app8"] // IDs alignés avec logements.ts

export default function Home() {
  // ------- Carrousel paginé (multi-cards) -------
  const [itemsPerView, setItemsPerView] = useState(4)
  const [pageIndex, setPageIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  // calc nb de cartes visibles selon largeur
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      if (w < 640) setItemsPerView(1)
      else if (w < 1024) setItemsPerView(2)
      else if (w < 1280) setItemsPerView(3)
      else setItemsPerView(4)
    }
    calc()
    window.addEventListener("resize", calc)
    return () => window.removeEventListener("resize", calc)
  }, [])

  // chunks par page
  const pages = useMemo(() => {
    const out: string[][] = []
    for (let i = 0; i < apps.length; i += itemsPerView) {
      out.push(apps.slice(i, i + itemsPerView))
    }
    return out
  }, [itemsPerView])

  const totalPages = pages.length

  // reset page si layout change
  useEffect(() => {
    setPageIndex(0)
  }, [itemsPerView])

  // auto défilement
  useEffect(() => {
    if (totalPages <= 1) return
    if (paused) return
    const id = setInterval(() => {
      setPageIndex((p) => (p + 1) % totalPages)
    }, 4000)
    return () => clearInterval(id)
  }, [totalPages, paused])

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ================= HERO (CTA #1) ================= */}
      <section className="relative z-10 text-center pt-20 pb-12 px-6">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <img src="/logo.png" alt="Luxor" className="w-44 mx-auto mb-6 drop-shadow-2xl" loading="eager" decoding="sync" />
          <h1 className="text-3xl md:text-5xl font-semibold text-white drop-shadow-lg">
            Visites immobilières premium à Montréal
          </h1>
          <p className="text-neutral-200 max-w-2xl mx-auto mt-4">
            <strong>Visitez avant tout le monde</strong> et boostez votre crédibilité locataire avec notre préparation de dossier.
            Simple, rapide, premium.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/reservations" className="px-7 py-4 bg-yellow-600 text-white rounded-full shadow-xl hover:bg-yellow-700 hover:scale-105 transition">
              Réserver maintenant (Pack 85 $)
            </Link>
            <Link href="/logements" className="px-7 py-4 bg-white/90 text-black rounded-full shadow-xl hover:bg-white hover:scale-105 transition">
              Voir les logements
            </Link>
          </div>

          {/* KPIs */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-white/90">
            {[
              ["200+", "visites organisées"],
              ["48h", "confirmation moyenne"],
              [
                <>
                  4.9 <span className="inline-flex align-middle"><FaStar className="ml-1" /></span>
                </>,
                "note de satisfaction",
              ],
              ["#MTL", "couverture locale"],
            ].map(([kpi, label], i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-md p-3">
                <p className="text-xl font-bold">{kpi as any}</p>
                <p className="text-xs">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= GALERIE (Carrousel multi-cards paginé) ================= */}
      <section className="relative z-10 w-full py-12 px-6">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-white mb-6 drop-shadow-lg">
          Nos appartements disponibles
        </h2>

        <div
          className="relative max-w-6xl mx-auto overflow-hidden rounded-2xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* bande des pages */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${totalPages * 100}%`,
              transform: `translateX(-${pageIndex * (100 / totalPages)}%)`,
            }}
          >
            {pages.map((group, pIdx) => (
              <div key={pIdx} className="flex-none w-full px-1 sm:px-2">
                <div className="flex justify-center gap-4">
                  {group.map((id) => (
                    <Link
                      key={id}
                      href={`/logements/${id}`}
                      className="block shrink-0 w-[78%] sm:w-[46%] md:w-[31%] lg:w-[22%] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
                    >
                      <img
                        src={`/images/${id}/cover.jpg`}
                        alt={`Appartement ${id}`}
                        className="w-full h-48 md:h-56 object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Flèches */}
          {totalPages > 1 && (
            <>
              <button
                aria-label="Précédent"
                onClick={() => setPageIndex((p) => (p - 1 + totalPages) % totalPages)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/55 hover:bg-black/75 text-white rounded-full h-10 w-10 flex items-center justify-center"
              >
                ‹
              </button>
              <button
                aria-label="Suivant"
                onClick={() => setPageIndex((p) => (p + 1) % totalPages)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/55 hover:bg-black/75 text-white rounded-full h-10 w-10 flex items-center justify-center"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Pastilles */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-5 gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPageIndex(i)}
                className={`h-2 w-2 rounded-full transition ${i === pageIndex ? "bg-yellow-500 w-4" : "bg-white/40"}`}
                aria-label={`Aller à la page ${i + 1}`}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-6">
          <Link href="/logements" className="inline-block px-5 py-3 bg-white/90 text-black rounded-xl shadow hover:bg-white transition">
            Voir tous les logements
          </Link>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="relative z-10 w-full py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 drop-shadow-lg" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            Nos services premium
          </motion.h2>
          <p className="text-neutral-200 max-w-2xl mx-auto mb-10">
            Combinez la <strong>visite prioritaire</strong> avec la <strong>préparation de dossier</strong> pour maximiser vos chances.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <motion.div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/10" whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <div className="flex items-center gap-3 mb-3">
                <FaBolt className="text-yellow-600" />
                <h3 className="text-lg font-semibold">Visite prioritaire</h3>
              </div>
              <p className="text-neutral-700 mb-4">Créneau confirmé rapidement et suivi personnalisé.</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">$50</span>
                <span className="text-sm text-neutral-500">/ visite</span>
              </div>
            </motion.div>

            <motion.div className="bg-white/92 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/10" whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <div className="flex items-center gap-3 mb-3">
                <FaClipboardList className="text-yellow-600" />
                <h3 className="text-lg font-semibold">Préparation de dossier</h3>
              </div>
              <p className="text-neutral-700 mb-4">Documents vérifiés et dossier complet prêt à soumettre.</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">$50</span>
                <span className="text-sm text-neutral-500">/ dossier</span>
              </div>
            </motion.div>

            <motion.div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-yellow-600 relative" whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <span className="absolute -top-3 right-4 bg-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                Meilleur choix
              </span>
              <div className="flex items-center gap-3 mb-3">
                <FaShieldAlt className="text-yellow-600" />
                <h3 className="text-lg font-semibold">Pack Visite + Dossier</h3>
              </div>
              <p className="text-neutral-700 mb-4">Solution complète : gain de temps + crédibilité accrue.</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">$85</span>
                <span className="text-sm text-neutral-500">/ pack</span>
              </div>
            </motion.div>
          </div>

          <div className="mt-10">
            <Link href="/reservations" className="inline-block px-7 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-full shadow transition">
              Réserver ma visite premium
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TÉMOIGNAGES ================= */}
      <section className="relative z-10 w-full py-14 px-6">
        <div className="max-w-6xl mx-auto text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-white drop-shadow-lg">Témoignages de nos clients</h2>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { name: "Camille", text: "Prise de rendez-vous hyper rapide, service nickel. J’ai eu mon créneau le lendemain !" },
            { name: "Jordan", text: "Le pack à 85 $ vaut le coup. Dossier prêt, visite prioritaire — tout s’est enchaîné." },
            { name: "Sarah", text: "Très pro et simple. Je recommande pour accélérer sa recherche de logement à Montréal." },
          ].map((t, i) => (
            <motion.div
              key={i}
              className="bg-black/35 text-white backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/10 flex flex-col justify-between"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div>
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                <p>{t.text}</p>
              </div>
              <p className="mt-4 text-xs text-white/70 flex items-center gap-1">
                <FaCheckCircle className="text-green-400" /> Avis vérifié — {t.name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ÉQUIPE ================= */}
      <section className="relative z-10 w-full py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-4">
            <img src="/images/background2.jpg" alt="Équipe professionnelle" className="rounded-xl" loading="lazy" decoding="async" />
          </div>
          <div className="bg-gradient-to-br from-black/70 to-black/40 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-3 drop-shadow-md">Une équipe professionnelle à votre service</h2>
            <p className="text-neutral-200 leading-relaxed">
              Accompagnement dédié, coordination des visites et préparation de votre dossier pour maximiser vos chances d’obtenir le logement ciblé.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="relative z-10 w-full py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md px-6 py-8 text-center">
            <h3 className="text-xl md:text-2xl text-white font-semibold mb-2">Prêt à accélérer votre recherche ?</h3>
            <p className="text-neutral-200 mb-6">
              Réservez votre visite prioritaire et ajoutez la préparation de dossier pour maximiser vos chances.
            </p>
            <Link href="/reservations" className="inline-block px-7 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-full shadow transition">
              Réserver maintenant – Pack 85 $
            </Link>
          </div>
        </div>
      </section>

      {/* ================= Sticky CTA (mobile only) ================= */}
      <div className="fixed bottom-4 left-0 right-0 mx-auto w-[92%] md:hidden z-50">
        <Link href="/reservations" className="block text-center px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-full shadow-xl transition">
          Réserver maintenant (85 $)
        </Link>
      </div>
    </main>
  )
}