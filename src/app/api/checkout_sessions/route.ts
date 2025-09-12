import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs" as const;

export async function POST(request: Request) {
  const origin =
    request.headers.get("origin") ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "STRIPE_SECRET_KEY manquante." }, { status: 500 });
  }

  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });

  let payload: any = {};
  try { payload = await request.json(); } catch {}

  const rawPlan = (payload?.plan ?? "").toString();
  const plan = rawPlan.toUpperCase() as "VISITE" | "DOSSIER" | "PACK";

  const PRICE_MAP = { VISITE: 5000, DOSSIER: 5000, PACK: 8500 } as const;
  const LABEL_MAP = {
    VISITE: "Visite immobilière premium (dépôt de priorité)",
    DOSSIER: "Préparation de dossier",
    PACK: "Pack Visite + Dossier",
  } as const;

  if (!plan || !(plan in PRICE_MAP)) {
    return NextResponse.json({ error: `Plan invalide: ${rawPlan}` }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            unit_amount: PRICE_MAP[plan],
            product_data: { name: LABEL_MAP[plan] },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/reservations?status=success`,
      cancel_url: `${origin}/reservations?status=cancel`,
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}