// src/app/page.tsx
"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { FaBolt, FaClipboardList, FaShieldAlt, FaStar, FaCheckCircle } from "react-icons/fa"
import { logements } from "../data/logements"
import PremiumCard from "../components/PremiumCard"

type Logement = (typeof logements)[number]

export default function Home() {
  const [itemsPerView, setItemsPerView] = useState(4)

  // calcule combien de cartes selon largeur écran
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

  // regroupe logements par "pages"
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
            Visites immobilières premium à Montréal
          </h1>
          <p className="text-neutral-200 max-w-2xl mx-auto mt-4">
            <strong>Visitez avant tout le monde</strong> et boostez votre crédibilité locataire avec notre préparation de dossier.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/reservations" className="px-7 py-4 bg-yellow-600 text-white rounded-full shadow-xl hover:bg-yellow-700 hover:scale-105 transition">
              Réserver maintenant (Pack 85 $)
            </Link>
            <Link href="/logements" className="px-7 py-4 bg-white/90 text-black rounded-full shadow-xl hover:bg-white hover:scale-105 transition">
              Voir les logements
            </Link>
          </div>

          {/* KPIs en PremiumCard */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              ["200+", "visites organisées"],
              ["48h", "confirmation moyenne"],
              ["4.9 ★", "note de satisfaction"],
              ["#MTL", "couverture locale"],
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
        {/* Badge dynamique */}
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
      className="inline-block px-6 py-3 bg-white/90 text-black font-medium rounded-xl shadow hover:bg-white transition"
    >
      Voir tous les logements
    </Link>
  </div>
</section>
      {/* ================= SERVICES ================= */}
      <section className="relative z-10 w-full py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold text-white mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Nos services premium
          </motion.h2>
          <p className="text-neutral-200 max-w-2xl mx-auto mb-10">
            Combinez la <strong>visite prioritaire</strong> avec la <strong>préparation de dossier</strong> pour maximiser vos chances.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PremiumCard>
              <h3 className="text-lg font-semibold text-white mb-2">Visite prioritaire</h3>
              <p className="text-neutral-300">Créneau confirmé rapidement et suivi personnalisé.</p>
              <p className="text-yellow-500 font-bold mt-3">$50 / visite</p>
            </PremiumCard>

            <PremiumCard>
              <h3 className="text-lg font-semibold text-white mb-2">Préparation de dossier</h3>
              <p className="text-neutral-300">Documents vérifiés et dossier complet prêt à soumettre.</p>
              <p className="text-yellow-500 font-bold mt-3">$50 / dossier</p>
            </PremiumCard>

            <PremiumCard>
              <h3 className="text-lg font-semibold text-white mb-2">Pack Visite + Dossier</h3>
              <p className="text-neutral-300">Solution complète : gain de temps + crédibilité accrue.</p>
              <p className="text-yellow-500 font-bold mt-3">$85 / pack</p>
            </PremiumCard>
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
            { name: "Camille", text: "Prise de rendez-vous hyper rapide, service insane. J’ai eu mon rendez-vous le lendemain !" },
            { name: "Jordan", text: "Le pack à 85 $ vaut le coup. Dossier prêt, visite prioritaire — tout s’est enchaîné." },
            { name: "Sarah", text: "Très pro et simple. Je recommande pour closer sa recherche de logement à Montréal." },
          ].map((t, i) => (
            <PremiumCard key={i} className="flex flex-col justify-between text-white">
              <div>
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                <p>{t.text}</p>
              </div>
              <p className="mt-4 text-xs text-white/70 flex items-center gap-1">
                <FaCheckCircle className="text-green-400" /> Avis vérifié — {t.name}
              </p>
            </PremiumCard>
          ))}
        </div>
      </section>

      {/* ================= ÉQUIPE ================= */}
      <section className="relative z-10 w-full py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img src="/images/background2.jpg" alt="Équipe professionnelle" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <PremiumCard>
            <h2 className="text-2xl font-semibold text-white mb-3 drop-shadow-md">Une équipe dédiée à votre succès locatif</h2>
            <p className="text-neutral-300 leading-relaxed">
              Nous vous offrons un accompagnement humain et transparent : visites prioritaires confirmées rapidement, préparation de dossier sur mesure et suivi personnalisé. 
              Avec Luxor, vous maximisez vos chances d’obtenir le logement désiré — avant les autres candidats.
            </p>
          </PremiumCard>
        </div>
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="relative z-10 w-full py-14">
        <div className="max-w-6xl mx-auto px-6">
          <PremiumCard className="text-center">
            <h3 className="text-xl md:text-2xl text-white font-semibold mb-2">Prêt à accélérer votre recherche ?</h3>
            <p className="text-neutral-300 mb-6">
              Réservez votre visite prioritaire et ajoutez la préparation de dossier pour maximiser vos chances.
            </p>
            <Link href="/reservations" className="inline-block px-7 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-full shadow transition">
              Réserver maintenant – Pack 85 $
            </Link>
          </PremiumCard>
        </div>
      </section>

      {/* ================= Sticky CTA (mobile) ================= */}
      <div className="fixed bottom-4 left-0 right-0 mx-auto w-[92%] md:hidden z-50">
        <Link href="/reservations" className="block text-center px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-full shadow-xl transition">
          Réserver maintenant (85 $)
        </Link>
      </div>
    </main>
  )
}