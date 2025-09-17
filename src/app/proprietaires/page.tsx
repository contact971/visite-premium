// src/app/proprietaires/page.tsx
"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FaCrown, FaUserCheck, FaCalendarCheck, FaBolt } from "react-icons/fa"
import { useState } from "react"

export default function ProprietairesPage() {
  const [loading, setLoading] = useState(false)

  const handleStripeCheckout = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "PROPRIETAIRE" }),
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Erreur : impossible de créer la session Stripe.")
      }
    } catch (err) {
      console.error("❌ Erreur Stripe:", err)
      alert("Erreur lors de la redirection vers le paiement.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white">
      {/* En-tête */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-yellow-500 drop-shadow-lg">
            Espace propriétaires
          </h1>
          <p className="mt-4 text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Confiez-nous vos logements : vous payez la mise en ligne, nous créons et publions une annonce 
            premium qui attire des candidats <strong>qualifiés et motivés</strong>.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleStripeCheckout}
              disabled={loading}
              className="px-7 py-4 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:scale-105 transition text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Redirection..." : "Publier un logement – 79 $"}
            </button>
            <Link
              href="/nous-joindres"
              className="px-7 py-4 rounded-full bg-white/90 hover:bg-white text-black font-semibold shadow-lg transition"
            >
              Parler à un conseiller
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Avantages */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <FaCrown className="text-yellow-500 text-xl" />,
            title: "Annonce premium clé en main",
            text: "Texte, mise en page et diffusion soignée par l’équipe Luxor.",
          },
          {
            icon: <FaUserCheck className="text-yellow-500 text-xl" />,
            title: "Candidats qualifiés",
            text: "Nos visiteurs paient pour réserver — moins de pertes de temps, plus de sérieux.",
          },
          {
            icon: <FaCalendarCheck className="text-yellow-500 text-xl" />,
            title: "Visites organisées",
            text: "Créneaux confirmés rapidement avec des candidats motivés.",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-black/60 backdrop-blur-md rounded-2xl shadow-lg shadow-yellow-600/20 p-6 border border-yellow-600/20"
          >
            <div className="flex items-center gap-3 mb-3">
              {card.icon}
              <h3 className="text-lg font-semibold">{card.title}</h3>
            </div>
            <p className="text-neutral-300">{card.text}</p>
          </motion.div>
        ))}
      </section>

      {/* Processus */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          className="bg-black/70 backdrop-blur-md rounded-2xl shadow-2xl border border-yellow-600/20 p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-yellow-500 mb-6">
            Comment ça fonctionne ?
          </h2>
          <ul className="space-y-4 text-neutral-300">
            <li>
              <FaBolt className="inline text-yellow-500 mr-2" />{" "}
              <strong>Vous payez</strong> la publication de votre logement via Stripe.
            </li>
            <li>
              <FaBolt className="inline text-yellow-500 mr-2" />{" "}
              <strong>Nous créons</strong> une annonce claire, optimisée et fidèle à votre logement.
            </li>
            <li>
              <FaBolt className="inline text-yellow-500 mr-2" />{" "}
              <strong>Vos visites</strong> sont planifiées avec des candidats sérieux via Luxor.
            </li>
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleStripeCheckout}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Redirection..." : "Publier un logement – 79 $"}
            </button>
            <Link
              href="/nous-joindres"
              className="px-6 py-3 bg-white/90 text-black rounded-full font-semibold shadow-lg hover:bg-white transition"
            >
              Contact direct
            </Link>
          </div>

          <p className="mt-6 text-sm text-neutral-400">
            <span className="font-semibold text-yellow-500">Tarif compétitif :</span>{" "}
            <strong>79 $ / annonce</strong>, incluant mise en ligne, gestion et 2 visites organisées.
          </p>
        </motion.div>
      </section>

      {/* Témoignage propriétaire */}
      <section className="max-w-4xl mx-auto px-6 pb-16 text-center">
        <blockquote className="bg-black/60 backdrop-blur-md p-6 rounded-2xl shadow-md border border-yellow-600/20">
          <p className="italic text-neutral-300">
            “J’ai confié mon condo à Luxor, l’annonce était en ligne en 24h et j’ai reçu deux visites sérieuses la même semaine.”
          </p>
          <footer className="mt-3 text-sm text-neutral-400">
            — Marc, propriétaire à Montréal
          </footer>
        </blockquote>
      </section>
    </main>
  )
}