"use client";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import React from "react";

export default function Footer() {
  const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61580142945571";

  const handleFacebookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // On gère nous-mêmes l’ouverture pour être sûrs du comportement
    e.preventDefault();
    e.stopPropagation();
    try {
      const win = window.open(FACEBOOK_URL, "_blank", "noopener,noreferrer");
      if (!win) {
        // Fallback si popups bloquées
        window.location.assign(FACEBOOK_URL);
      }
    } catch {
      window.location.assign(FACEBOOK_URL);
    }
  };

  return (
    <footer className="relative z-10 mt-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
            
            {/* Identité + localisation */}
            <div className="text-center md:text-left">
              <p className="text-white font-semibold">Luxor – Visites Premium</p>
              <p className="text-white/70 text-xs">
                CP 3143, Richmond (QC) J0B 2H0, Canada
              </p>
              <p className="text-white/60 text-xs mt-1">
                © {new Date().getFullYear()} — Tous droits réservés.
              </p>
            </div>

            {/* Liens légaux */}
            <div className="flex gap-6 text-center">
              <Link href="/conditions" className="text-white/90 hover:text-white">
                Conditions
              </Link>
              <Link href="/confidentialite" className="text-white/90 hover:text-white">
                Politique de confidentialité
              </Link>
              <Link href="/cookies" className="text-white/90 hover:text-white">
                Cookies
              </Link>
            </div>

            {/* Réseaux + CTA */}
            <div className="flex items-center gap-4">
              {/* Icône Facebook (zone cliquable élargie + fallback JS) */}
              <a
                href={FACEBOOK_URL}
                onClick={handleFacebookClick}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/90 hover:text-yellow-500 hover:border-yellow-500 transition"
              >
                <FaFacebookF size={18} />
              </a>

              {/* CTA secondaire */}
              <Link
                href="/reservations"
                className="inline-block px-5 py-2 rounded-full text-sm font-semibold text-white bg-yellow-600 hover:bg-yellow-700 shadow-lg transition"
              >
                Réserver une visite
              </Link>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}