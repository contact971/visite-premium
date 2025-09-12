import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6">
        <nav className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md px-6 py-3">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-white/90 hover:text-white">
            Luxor
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-white/90 hover:text-white">Accueil</Link>
            <Link href="/logements" className="text-white/90 hover:text-white">Logements</Link>
            <Link href="/reservations" className="text-white/90 hover:text-white">Réservations</Link>
            <Link href="/nous-joindres" className="text-white/90 hover:text-white">Nous joindre</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}