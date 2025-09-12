# Visite Luxor — Site de réservation de visites premium

Projet Next.js (App Router) + Tailwind + Stripe Checkout.

## Démarrage

```bash
npm install
npm run dev
```

Créez un fichier `.env.local` à la racine avec:
```
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Déploiement

Sur Vercel, ajoutez la variable **STRIPE_SECRET_KEY** et **NEXT_PUBLIC_APP_URL** dans Project Settings → Environment Variables.
