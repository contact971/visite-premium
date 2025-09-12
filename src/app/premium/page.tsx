'use client';

import { useState } from 'react';

export default function PremiumPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/checkout_sessions', { method: 'POST' });
      if (!res.ok) throw new Error('Impossible de créer la session de paiement.');
      const data = await res.json();
      window.location.href = data.url;
    } catch (e: any) {
      setError(e.message || 'Erreur inattendue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-4">Service premium — Réservation de visite</h1>
      <p className="text-gray-700">
        Le paiement de <strong>50 $</strong> correspond à un <em>dépôt de priorité</em> pour réserver un créneau de visite.
        Aucune garantie de location. <strong>Aucun remboursement en cas de no‑show</strong>.
      </p>

      <div className="card p-6 mt-8">
        <h2 className="text-xl font-semibold mb-2">Ce qui est inclus</h2>
        <ul className="list-disc ml-5 text-gray-700">
          <li>Planification prioritaire de votre visite</li>
          <li>Rappel automatique par courriel</li>
          <li>Transmission de votre dossier locatif au propriétaire</li>
        </ul>
        <button onClick={startCheckout} disabled={loading} className="btn btn-primary mt-6">
          {loading ? "Création de la session..." : "Payer 50 $ et réserver"}
        </button>
        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>
    </div>
  );
}
