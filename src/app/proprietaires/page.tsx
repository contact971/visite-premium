// src/app/proprietaires/page.tsx
"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FaCrown, FaUserCheck, FaCalendarCheck, FaBolt, FaShieldAlt } from "react-icons/fa"

export default function ProprietairesPage() {
  return (
    <main className="relative min-h-screen w-full">
      {/* En-tête de page */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-white drop-shadow-lg">
            Espace propriétaires — Bientôt disponible
          </h1>
          <p className="mt-3 text-neutral-200 max-w-2xl mx-auto">
            Publiez vos logements sur une vitrine premium, recevez des candidats qualifiés
            et planifiez des visites prioritaires en quelques clics.
          </p>

          {/* CTA principaux */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:contact@luxorpremium.com?subject=Espace%20Propri%C3%A9taires%20-%20Je%20veux%20publier%20un%20logement"
              className="px-6 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-700 text-white font-semibold shadow-lg transition"
            >
              Parler à un représentant
            </a>
            <Link
              href="/nous-joindres"
              className="px-6 py-3 rounded-xl bg-white/90 hover:bg-white text-black font-semibold shadow-lg transition"
            >
              Nous joindre
            </Link>
          </div>

          {/* Badge statut */}
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-white/80 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            Phase pilote — Inscription sur liste d’attente
          </div>
        </motion.div>
      </section>

      {/* Avantages clés */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <FaCrown className="text-yellow-600" />,
              title: "Vitrine premium",
              text: "Mise en avant de vos annonces auprès d’un public sérieux et motivé."
            },
            {
              icon: <FaUserCheck className="text-yellow-600" />,
              title: "Candidats qualifiés",
              text: "Dossiers préparés (option) pour accélérer la prise de décision."
            },
            {
              icon: <FaCalendarCheck className="text-yellow-600" />,
              title: "Visites priorisées",
              text: "Créneaux organisés et confirmés rapidement."
            }
          ].map((card, i) => (
            <motion.div
              key={card.title}
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/10"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div className="flex items-center gap-3 mb-2">
                {card.icon}
                <h3 className="text-lg font-semibold">{card.title}</h3>
              </div>
              <p className="text-neutral-700">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fonctionnalités prévues */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <motion.div
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-6 md:p-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Ce qui arrive bientôt</h2>
          <ul className="space-y-3 text-neutral-800">
            <li className="flex items-start gap-3">
              <FaBolt className="mt-1 text-yellow-600 shrink-0" />
              <span><strong>Publication express</strong> de vos logements avec photos et critères.</span>
            </li>
            <li className="flex items-start gap-3">
              <FaShieldAlt className="mt-1 text-yellow-600 shrink-0" />
              <span><strong>Candidats pré-filtrés</strong> et option de <em>préparation de dossier</em> pour des décisions plus rapides.</span>
            </li>
            <li className="flex items-start gap-3">
              <FaCalendarCheck className="mt-1 text-yellow-600 shrink-0" />
              <span><strong>Agenda de visites</strong> synchronisé et confirmation en temps réel.</span>
            </li>
          </ul>

          {/* Bandeau inscription / contact */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="mailto:contact@luxorpremium.com?subject=Liste%20d%E2%80%99attente%20Propri%C3%A9taires&body=Bonjour%20Luxor%2C%0AJe%20souhaite%20rejoindre%20la%20liste%20d%E2%80%99attente%20pour%20publier%20mes%20logements.%0A%0ANom%20:%0AT%C3%A9l%C3%A9phone%20:%0ANombre%20de%20logements%20:%0AQuartiers%20:%0A"
              className="px-5 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-700 text-white font-semibold shadow-lg transition"
            >
              Rejoindre la liste d’attente
            </a>
            <Link
              href="/nous-joindres"
              className="px-5 py-3 rounded-xl bg-white/90 hover:bg-white text-black font-semibold shadow-lg transition"
            >
              Parler à un conseiller
            </Link>
          </div>

          {/* Note légale brève */}
          <p className="mt-4 text-xs text-neutral-600">
            Luxor n’est pas un courtier (OACIQ). Service de mise en relation et d’organisation de visites. 
            Les conditions complètes sont disponibles sur{" "}
            <Link href="/conditions" className="underline">/conditions</Link>.
          </p>
        </motion.div>
      </section>
    </main>
  )
}