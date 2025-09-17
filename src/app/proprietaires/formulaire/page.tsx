// src/app/proprietaires/formulaire/page.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function ProprietaireFormulairePage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch("/api/proprietaires", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        setSuccess(true)
      } else {
        alert("Erreur lors de l’envoi du formulaire.")
      }
    } catch (err) {
      console.error("❌ Erreur:", err)
      alert("Erreur lors de l’envoi.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white p-6">
        <div className="bg-neutral-900 rounded-2xl shadow-lg p-8 max-w-lg text-center">
          <h1 className="text-2xl font-bold text-yellow-500 mb-4">Merci 🎉</h1>
          <p className="text-neutral-300">
            Votre logement a été soumis avec succès. L’équipe Luxor publiera votre annonce sous 24–48h.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-black/70 border border-yellow-600/20 rounded-2xl p-8 shadow-lg"
      >
        <h1 className="text-3xl font-bold text-yellow-500 mb-6 text-center">
          Formulaire de publication
        </h1>
        <p className="text-neutral-300 mb-8 text-center">
          Merci de remplir les informations ci-dessous afin que nous puissions publier votre annonce premium.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Infos personnelles */}
          <div>
            <label className="block text-sm font-semibold mb-2">Nom complet</label>
            <input
              type="text"
              name="nom"
              required
              className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Téléphone</label>
              <input
                type="tel"
                name="telephone"
                required
                className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Courriel</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* Infos logement */}
          <div>
            <label className="block text-sm font-semibold mb-2">Adresse complète du logement</label>
            <input
              type="text"
              name="adresse"
              required
              className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Prix demandé (CAD)</label>
              <input
                type="number"
                name="prix"
                required
                className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Type de logement</label>
              <select
                name="type"
                required
                className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Sélectionner</option>
                <option>Studio</option>
                <option>3 ½</option>
                <option>4 ½</option>
                <option>5 ½</option>
                <option>Maison</option>
                <option>Autre</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              name="description"
              rows={5}
              required
              className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:ring-2 focus:ring-yellow-500"
            ></textarea>
          </div>

          {/* Upload photos */}
          <div>
            <label className="block text-sm font-semibold mb-2">Photos du logement</label>
            <input
              type="file"
              name="photos"
              accept="image/*"
              multiple
              className="w-full text-neutral-300"
            />
            <p className="text-xs text-neutral-400 mt-1">
              Formats acceptés : JPG, PNG. Max 10 fichiers.
            </p>
          </div>

          {/* Bouton submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Envoi en cours..." : "Soumettre mon logement"}
          </button>
        </form>
      </motion.div>
    </main>
  )
}