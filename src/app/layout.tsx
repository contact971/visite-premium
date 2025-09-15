// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";
import Footer from "../components/Footer"; 
import { Analytics } from "@vercel/analytics/react"; 

export const metadata = {
  title: "Luxor – Visites premium",
  description: "Réservez vos visites immobilières premium, avec option préparation de dossier.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen antialiased bg-transparent relative">
        {/* 🌌 Fond global animé */}
        <div className="fixed inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center bg-animated"
            style={{ backgroundImage: "url('/images/background.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* HEADER */}
        <header className="w-full fixed top-0 inset-x-0 z-50">
          <div className="mx-auto max-w-7xl px-6">
            <nav className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md px-6 py-3">
              <Link href="/" className="flex items-center">
                <img src="/logo.png" alt="Luxor" className="h-8 w-auto" />
              </Link>

              {/* ✅ Menu principal réorganisé */}
              <div className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-white/90 hover:text-white">Accueil</Link>
                <Link href="/logements" className="text-white/90 hover:text-white">Logements</Link>
                <Link href="/reservations" className="text-white/90 hover:text-white">Réservations</Link>
                <Link href="/proprietaires" className="text-white/90 hover:text-white">Propriétaires</Link>
                <Link href="/nous-joindres" className="text-white/90 hover:text-white">Nous joindre</Link>
              </div>

              {/* CTA bouton */}
              <div className="hidden md:block">
                <Link
                  href="/reservations"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-4 py-2 rounded-xl transition"
                >
                  Réserver
                </Link>
              </div>
            </nav>
          </div>
        </header>

        {/* Espace pour header fixe */}
        <div className="h-24" />

        {/* CONTENU */}
        {children}

        {/* FOOTER */}
        <Footer />

        <Analytics />
      </body>
    </html>
  );
}