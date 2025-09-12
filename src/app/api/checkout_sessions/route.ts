// src/app/api/checkout_sessions/route.ts
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { type, logement, date, heure } = body // Reçu depuis page.tsx

    let priceId: string | undefined

    if (type === "VISITE") {
      priceId = process.env.STRIPE_PRICE_VISITE
    } else if (type === "DOSSIER") {
      priceId = process.env.STRIPE_PRICE_DOSSIER
    } else if (type === "PACK") {
      priceId = process.env.STRIPE_PRICE_PACK
    }

    if (!priceId) {
      return NextResponse.json(
        { error: "Type de produit invalide." },
        { status: 400 }
      )
    }

    // ✅ Création session Stripe
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
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/reservations?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/reservations?canceled=true`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error("Stripe error:", err)
    return NextResponse.json(
      { error: "Erreur lors de la création de la session Stripe." },
      { status: 500 }
    )
  }
}