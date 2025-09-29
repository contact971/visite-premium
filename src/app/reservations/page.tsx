"use client"

import { useState, useMemo } from "react"
import { FaCalendarAlt, FaClock, FaHome, FaSearch, FaDollarSign } from "react-icons/fa"
import { motion } from "framer-motion"
import Link from "next/link"
import { logements } from "../../data/logements"

const PRIX = { VISITE: 50, DOSSIER: 50, PACK: 85 } as const
type Plan = "VISITE" | "DOSSIER" | "PACK"

export default function Reservations() {
  const [logement, setLogement] = useState<string>("")
  const [date, setDate] = useState("")
  const [heure, setHeure] = useState("")
  const [plan, setPlan] = useState<Plan>("VISITE")
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const PER_PAGE = 9

  const filteredLogements = useMemo(() => {
    const q = search.toLowerCase()
    return logements.filter(
      (l) => l.titre.toLowerCase().includes(q) || l.emplacement.toLowerCase().includes(q)
    )
  }, [search])

  const totalPages = Math.ceil(filteredLogements.length / PER_PAGE)
  const paginatedLogements = filteredLogements.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const total = useMemo(
    () => (plan === "VISITE" ? PRIX.VISITE : plan === "DOSSIER" ? PRIX.DOSSIER : PRIX.PACK),
    [plan]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: plan, logement: logement || "", date, heure }),
      })

      const data = await res.json()
      if (!res.ok || !data?.url) throw new Error(data?.error || "Erreur API Stripe")

      window.location.href = data.url
    } catch (err: any) {
      alert("Erreur Stripe: " + (err?.message || "inconnue"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen py-16 px-6">
      {/* HERO */}
      <motion.div
        className="relative z-10 flex flex-col items-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-semibold text-white text-center drop-shadow-lg mb-4">
          Réservez votre visite premium
        </h1>
        <p className="text-center text-neutral-200 max-w-2xl drop-shadow-md">
          Choisissez votre logement, sélectionnez une date et profitez de nos formules exclusives.
        </p>
      </motion.div>

      {/* FORMULAIRE */}
      <motion.div
        className="bg-black/60 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-8 w-full max-w-5xl mx-auto relative"
        whileHover={{ scale: 1.01 }}
      >
        {/* Badge prix sticky */}
        <div className="absolute -top-5 right-6 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-5 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-semibold">
          <FaDollarSign /> Total actuel : {total} $ CAD
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Recherche logement */}
          <div>
            <label className="block font-semibold mb-2 text-white flex items-center gap-2">
              <FaSearch /> Rechercher un logement
            </label>
            <input
              type="text"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="Ex: Montréal, Penthouse..."
              className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-neutral-400 focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Choix logement */}
          <div>
            <label className="block font-semibold mb-4 text-white flex items-center gap-2">
              <FaHome /> Sélectionnez un logement
            </label>
            {paginatedLogements.length === 0 && (
              <p className="text-sm text-neutral-400">Aucun logement trouvé.</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedLogements.map((l) => (
                <div
                  key={l.id}
                  onClick={() => setLogement(l.id)}
                  className={`cursor-pointer rounded-xl overflow-hidden border-2 shadow-sm transition ${
                    logement === l.id
                      ? "border-yellow-600 ring-2 ring-yellow-600"
                      : "border-white/10 hover:border-yellow-400"
                  }`}
                >
                  <img src={l.cover} alt={l.titre} className="w-full h-40 object-cover" />
                  <div className="p-3 bg-black/40 text-white">
                    <p className="font-semibold text-sm">{l.titre}</p>
                    <p className="text-xs text-neutral-400">{l.emplacement}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded bg-black/40 text-white border border-white/10 disabled:opacity-40"
                >
                  Précédent
                </button>
                <span className="text-sm text-neutral-300">
                  Page {page} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded bg-black/40 text-white border border-white/10 disabled:opacity-40"
                >
                  Suivant
                </button>
              </div>
            )}
          </div>

          {/* Date & heure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-2 text-white flex items-center gap-2">
                <FaCalendarAlt /> Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-white flex items-center gap-2">
                <FaClock /> Heure
              </label>
              <input
                type="time"
                value={heure}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeure(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
          </div>

          {/* Choix formule */}
          <div className="space-y-3">
            <p className="block font-semibold mb-1 text-white">Formule</p>

            <label className="flex items-start gap-3 p-4 rounded-xl bg-black/40 border border-white/10 hover:border-yellow-600 cursor-pointer transition">
              <input
                type="radio"
                name="plan"
                value="VISITE"
                className="mt-1"
                checked={plan === "VISITE"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlan(e.target.value as Plan)}
              />
              <div>
                <div className="text-white font-medium">Visite premium — 50&nbsp;$</div>
                <p className="text-sm text-neutral-400">
                  Réservation prioritaire, confirmation rapide.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 rounded-xl bg-black/40 border border-white/10 hover:border-yellow-600 cursor-pointer transition">
              <input
                type="radio"
                name="plan"
                value="DOSSIER"
                className="mt-1"
                checked={plan === "DOSSIER"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlan(e.target.value as Plan)}
              />
              <div>
                <div className="text-white font-medium">Préparation de dossier — 50&nbsp;$</div>
                <p className="text-sm text-neutral-400">
                  Aide à la constitution d’un dossier solide.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 rounded-xl bg-black/40 border border-white/10 hover:border-yellow-600 cursor-pointer transition">
              <input
                type="radio"
                name="plan"
                value="PACK"
                className="mt-1"
                checked={plan === "PACK"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlan(e.target.value as Plan)}
              />
              <div>
                <div className="text-white font-medium">Pack complet — 85&nbsp;$</div>
                <p className="text-sm text-neutral-400">Visite premium + préparation de dossier.</p>
              </div>
            </label>
          </div>

          {/* Conditions */}
          <div className="flex items-start space-x-2 mt-2">
            <input type="checkbox" id="conditions" required className="mt-1" />
            <label htmlFor="conditions" className="text-sm text-neutral-300">
              J’ai lu et j’accepte les{" "}
              <Link href="/conditions" className="text-yellow-500 underline">
                conditions d’utilisation
              </Link>
              .
            </label>
          </div>

          {/* Résumé dynamique */}
          {logement && date && heure && (
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-neutral-200 shadow-inner">
              <p>
                <strong>Résumé :</strong>{" "}
                {logements.find((l) => l.id === logement)?.titre || logement}, le {date} à {heure} —{" "}
                {plan === "PACK"
                  ? "Pack complet (85 $)"
                  : plan === "VISITE"
                  ? "Visite premium (50 $)"
                  : "Préparation de dossier (50 $)"}
              </p>
            </div>
          )}

          {/* CTA */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-lg font-semibold shadow-md transition ${
              loading
                ? "bg-yellow-600/60 cursor-not-allowed text-white"
                : "bg-gradient-to-r from-yellow-600 to-yellow-700 text-white hover:opacity-90"
            }`}
          >
            {loading ? "Traitement..." : `Confirmer et payer – $${total} CAD`}
          </button>
        </form>
      </motion.div>
    </main>
  )
}