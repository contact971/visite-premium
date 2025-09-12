// src/app/success/page.tsx
"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function SuccessPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-20">
      {/* Fond noir élégant */}
      <div className="absolute inset-0 bg-black" />

      {/* Contenu centré */}
      <motion.div
        className="relative z-10 max-w-2xl text-center bg-white/10 backdrop-blur-md rounded-2xl p-10 shadow-2xl border border-white/20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-6 drop-shadow-lg">
          Merci pour votre achat !
        </h1>
        <p className="text-lg text-neutral-200 mb-8">
          Votre paiement a bien été confirmé. <br />
          Notre équipe vous contactera sous peu pour finaliser votre dossier.
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-700 text-white font-semibold shadow-md hover:opacity-90 transition"
        >
          Retour à l’accueil
        </Link>
      </motion.div>
    </main>
  )
}