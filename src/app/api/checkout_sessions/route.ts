// src/app/api/checkout_sessions/route.ts
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { type, logement, date, heure } = body

    console.log("➡️ Requête reçue depuis reservations/page.tsx :", body)
    console.log("➡️ Stripe Price IDs chargés :", {
      VISITE: process.env.STRIPE_PRICE_VISITE,
      DOSSIER: process.env.STRIPE_PRICE_DOSSIER,
      PACK: process.env.STRIPE_PRICE_PACK,
      PROPRIETAIRE: process.env.STRIPE_PRICE_PROPRIETAIRE, // 👈 nouveau
    })

    let priceId: string | undefined

    if (type === "VISITE") {
      priceId = process.env.STRIPE_PRICE_VISITE
    } else if (type === "DOSSIER") {
      priceId = process.env.STRIPE_PRICE_DOSSIER
    } else if (type === "PACK") {
      priceId = process.env.STRIPE_PRICE_PACK
    } else if (type === "PROPRIETAIRE") {
      priceId = process.env.STRIPE_PRICE_PROPRIETAIRE // 👈 nouveau
    }

    if (!priceId) {
      console.error("❌ Aucun priceId trouvé pour le type:", type)
      return NextResponse.json(
        { error: "Type de produit invalide." },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        logement: logement || "Non spécifié",
        date: date || "Non spécifiée",
        heure: heure || "Non spécifiée",
        plan: type,
      },
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/reservations?canceled=true`,
    })

    console.log("✅ Session Stripe créée :", session.id)

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error("❌ Stripe error:", err)
    return NextResponse.json(
      { error: "Erreur lors de la création de la session Stripe." },
      { status: 500 }
    )
  }
}