"use client"

import { motion } from "framer-motion"
import { FaEnvelope, FaFacebook } from "react-icons/fa"
import Link from "next/link"

export default function ContactPage() {
  return (
    <main
      className="min-h-screen bg-fixed bg-center bg-cover py-20 px-6"
      style={{ backgroundImage: "url('/images/background.jpg')" }} // ✅ ton background global
    >
      {/* HERO */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 drop-shadow-md">
          Nous joindre
        </h1>
        <p className="text-neutral-200 mt-4 max-w-2xl mx-auto">
          Pour toute question ou assistance, notre équipe est disponible et vous
          répond habituellement en moins de 24 heures.
        </p>
      </motion.div>

      {/* COORDONNÉES */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <motion.div
            className="bg-gradient-to-br from-black/90 to-yellow-900/70 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-yellow-700/30"
            whileHover={{ y: -5 }}
          >
            <FaEnvelope className="text-yellow-400 text-3xl mb-3" />
            <h3 className="font-semibold text-lg mb-2 text-white">Courriel</h3>
            <p className="text-neutral-300 mb-3">contact@luxorpremium.com</p>
            <a
              href="mailto:contact@luxorpremium.com"
              className="px-5 py-2 rounded-xl bg-yellow-600 text-white font-semibold hover:bg-yellow-700 transition"
            >
              Écrire un email
            </a>
          </motion.div>

          {/* Facebook */}
          <motion.div
            className="bg-gradient-to-br from-black/90 to-yellow-900/70 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-yellow-700/30"
            whileHover={{ y: -5 }}
          >
            <FaFacebook className="text-yellow-400 text-3xl mb-3" />
            <h3 className="font-semibold text-lg mb-2 text-white">Facebook</h3>
            <p className="text-neutral-300 mb-3">
              Suivez-nous et contactez-nous via Messenger.
            </p>
            <a
              href="https://www.facebook.com/profile.php?id=61580142945571"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-xl bg-yellow-600 text-white font-semibold hover:bg-yellow-700 transition"
            >
              Ouvrir Facebook
            </a>
          </motion.div>
        </div>

        {/* Note discrète avec adresse */}
        <p className="text-center text-neutral-400 text-xs mt-6">
          Adresse postale officielle : CP 3143, Richmond (QC) J0B 2H0, Canada
        </p>
      </div>

      {/* SECTION ÉQUIPE */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center mb-20">
        {/* Image équipe */}
        <motion.div
          className="bg-gradient-to-br from-black/90 to-yellow-900/70 backdrop-blur-md rounded-2xl shadow-2xl border border-yellow-700/30 p-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/images/background2.jpg"
            alt="Notre équipe"
            className="rounded-xl"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        {/* Texte expertise */}
        <motion.div
          className="bg-gradient-to-br from-black/90 to-yellow-900/70 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-yellow-700/30"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-yellow-400 mb-3 drop-shadow-md">
            Une équipe dédiée à vos démarches
          </h2>
          <p className="text-neutral-200 leading-relaxed">
            Chez <strong>Luxor – Visites Premium</strong>, nous savons que trouver un
            logement à Montréal est souvent un défi : forte demande, visites
            limitées, propriétaires exigeants. Notre équipe agit comme un{" "}
            <em>concierge immobilier</em>, en vous offrant un service haut de
            gamme et transparent.
          </p>
          <p className="text-neutral-200 leading-relaxed mt-4">
            Nos spécialistes s’occupent de coordonner vos visites
            <strong> en priorité</strong>, d’optimiser votre{" "}
            <strong>dossier locatif</strong> et de vous guider à chaque étape.
            Grâce à notre expertise locale et à notre approche structurée, nous
            vous aidons à maximiser vos chances d’obtenir le logement que vous
            convoitez.
          </p>
          <p className="text-neutral-200 leading-relaxed mt-4">
            Notre mission est simple : <strong>vous faire gagner du temps</strong>,{" "}
            <strong>réduire le stress</strong> et vous offrir une expérience
            fluide, professionnelle et premium.
          </p>
        </motion.div>
      </section>

      {/* CTA FINAL */}
      <motion.div
        className="max-w-3xl mx-auto text-center bg-gradient-to-r from-yellow-600 to-yellow-700 p-10 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">
          Prêt à réserver votre visite premium ?
        </h2>
        <Link
          href="/reservations"
          className="inline-block px-8 py-4 bg-white text-yellow-700 font-semibold rounded-xl shadow-lg hover:opacity-90 transition"
        >
          Réserver maintenant →
        </Link>
      </motion.div>
    </main>
  )
}