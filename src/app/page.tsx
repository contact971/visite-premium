// src/app/page.tsx
"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { logements } from "../data/logements"
import PremiumCard from "../components/PremiumCard"
import { FaHome, FaCalendarCheck, FaLock, FaBolt, FaShieldAlt, FaCrown } from "react-icons/fa"

type Logement = (typeof logements)[number]

export default function Home() {
  const [itemsPerView, setItemsPerView] = useState(4)

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

  const pages: Logement[][] = useMemo(() => {
    const out: Logement[][] = []
    for (let i = 0; i < logements.length; i += itemsPerView) {
      out.push(logements.slice(i, i + itemsPerView))
    }
    return out
  }, [itemsPerView])

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative z-10 text-center pt-20 pb-12 px-6">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <img src="/logo.png" alt="Luxor" className="w-44 mx-auto mb-6 drop-shadow-2xl" />
          <h1 className="text-3xl md:text-5xl font-semibold text-white drop-shadow-lg">
            Votre visite confirmée rapidement
          </h1>
          <p className="text-neutral-200 max-w-2xl mx-auto mt-4">
            Passez avant les autres candidats et maximisez vos chances d’obtenir le logement désiré.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/reservations" className="px-7 py-4 bg-yellow-600 text-white rounded-full shadow-xl hover:bg-yellow-700 hover:scale-105 transition">
              Réserver ma visite
            </Link>
            <Link href="/logements" className="px-7 py-4 bg-yellow-600 text-white rounded-full shadow-xl hover:bg-yellow-700 hover:scale-105 transition">
              Voir les logements
            </Link>
          </div>

          {/* KPIs */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              ["70+", "logements listés"],
              ["48h", "confirmation moyenne"],
              ["200+", "visites organisées"],
              ["Exclusif", "service unique au Québec"],
            ].map(([kpi, label], i) => (
              <PremiumCard key={i} className="text-center text-white">
                <p className="text-2xl font-bold text-yellow-500">{kpi}</p>
                <p className="text-sm text-neutral-300">{label}</p>
              </PremiumCard>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= LOGEMENTS ================= */}
      <section className="relative z-10 w-full py-12 px-6">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-white mb-6 drop-shadow-lg">
          Nos appartements disponibles
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {logements.slice(0, 8).map((logement) => (
            <div
              key={logement.id}
              className="group bg-black/60 backdrop-blur-md rounded-xl shadow-lg hover:shadow-yellow-600/40 transition overflow-hidden flex flex-col relative border border-white/10"
            >
              {logement.badge && (
                <span className="absolute top-2 left-2 bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                  {logement.badge}
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
                  <span className="absolute bottom-2 right-2 bg-yellow-600 text-white text-xs px-2 py-1 rounded shadow-md">
                    {logement.prix}
                  </span>
                </div>
              </Link>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1">{logement.titre}</h3>
                <p className="text-xs text-neutral-400 mb-3">{logement.emplacement}</p>
                <Link
                  href={`/logements/${logement.id}`}
                  className="mt-auto inline-block px-4 py-2 text-center text-xs font-medium bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
                >
                  Voir le logement
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            href="/logements"
            className="inline-block px-6 py-3 bg-yellow-600 text-white font-medium rounded-xl shadow hover:bg-yellow-700 transition"
          >
            Voir tous les logements
          </Link>
        </div>
      </section>

      {/* ================= COMMENT ÇA MARCHE + AVIS ================= */}
      <section className="relative z-10 w-full py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold text-white mb-12 drop-shadow-lg"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Comment ça marche ?
          </motion.h2>

          {/* Étapes en 3 colonnes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {[
              { icon: <FaHome className="text-yellow-500 text-3xl mb-3" />, title: "1. Choisissez un logement", text: "Parcourez nos appartements disponibles à Montréal et sélectionnez celui qui correspond parfaitement à vos besoins." },
              { icon: <FaCalendarCheck className="text-yellow-500 text-3xl mb-3" />, title: "2. Réservez votre visite", text: "Votre place est confirmée rapidement. Tous les détails vous sont envoyés par courriel et SMS, sans perte de temps." },
              { icon: <FaLock className="text-yellow-500 text-3xl mb-3" />, title: "3. Ajoutez l’option dossier vérifié", text: "Nous validons vos références (anciens locateurs, Équifax, TAL). Les propriétaires sont rassurés et vos chances d’obtenir le logement augmentent fortement." },
            ].map((step, i) => (
              <div key={i}>
                {step.icon}
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-white/80 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>

          {/* Témoignages visibles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { name: "Marc-André", text: "J’ai pu visiter dès le lendemain, aucun délai inutile." },
              { name: "Catherine", text: "Clarté et efficacité, j’ai eu une longueur d’avance." },
              { name: "Jonathan", text: "Pas de stress, horaire respecté, logement trouvé rapidement." },
            ].map((t, i) => (
              <div key={i} className="bg-black/70 border border-yellow-600 rounded-xl p-5 shadow-md text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="text-green-400 text-xs">Avis certifié</span>
                </div>
                <p className="text-sm text-white/90 italic">“{t.text}”</p>
                <p className="mt-3 text-xs text-white/70">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POURQUOI LUXOR ================= */}
      <section className="relative z-10 w-full py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img src="/images/background2.jpg" alt="Équipe Luxor" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6 drop-shadow-md">Pourquoi choisir Luxor ?</h2>
            <ul className="space-y-6 text-left">
              <li className="flex items-start gap-3">
                <FaBolt className="text-yellow-500 text-2xl mt-1" />
                <div>
                  <p className="text-lg font-semibold text-white">Visites confirmées</p>
                  <p className="text-white/80 text-sm">Réservez en priorité, sans délai.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaShieldAlt className="text-yellow-500 text-2xl mt-1" />
                <div>
                  <p className="text-lg font-semibold text-white">Dossiers vérifiés</p>
                  <p className="text-white/80 text-sm">Ils inspirent confiance et rassurent les propriétaires.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaCrown className="text-yellow-500 text-2xl mt-1" />
                <div>
                  <p className="text-lg font-semibold text-white">Service exclusif</p>
                  <p className="text-white/80 text-sm">Un accompagnement unique au Québec.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="relative z-10 w-full py-14">
        <div className="max-w-6xl mx-auto px-6">
          <PremiumCard className="text-center">
            <h3 className="text-xl md:text-2xl text-white font-semibold mb-2">Prêt à accélérer votre recherche ?</h3>
            <p className="text-white/80 mb-6">
              Sécurisez dès maintenant une visite confirmée rapidement.  
              Option dossier vérifié disponible lors de la réservation.
            </p>
            <Link href="/reservations" className="inline-block px-7 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-full shadow transition">
              Réserver maintenant
            </Link>
          </PremiumCard>
        </div>
      </section>

      {/* ================= Sticky CTA (mobile) ================= */}
      <div className="fixed bottom-4 left-0 right-0 mx-auto w-[92%] md:hidden z-50">
        <Link href="/reservations" className="block text-center px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-full shadow-xl transition">
          Réserver maintenant
        </Link>
      </div>
    </main>
  )
}