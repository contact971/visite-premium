export const metadata = { title: "FAQ — Visite Luxor" };

export default function FAQPage() {
  return (
    <div className="container py-12 space-y-6">
      <h1 className="text-3xl font-bold">FAQ</h1>
      <div className="card p-6 space-y-3">
        <h2 className="font-semibold text-lg">La visite est-elle remboursable ?</h2>
        <p>Non. En cas de no‑show, aucun remboursement n’est effectué.</p>
        <h2 className="font-semibold text-lg mt-4">Puis-je visiter gratuitement ?</h2>
        <p>Il se peut que des visites gratuites soient offertes directement par des propriétaires. Notre plateforme offre uniquement le service premium.</p>
      </div>
    </div>
  );
}
