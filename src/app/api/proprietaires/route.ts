// src/app/api/proprietaires/route.ts
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    // Récupère le formulaire envoyé
    const formData = await req.formData()

    // Conversion en objet JS simple
    const entries: Record<string, any> = {}
    formData.forEach((value, key) => {
      if (value instanceof File) {
        entries[key] = {
          filename: value.name,
          size: value.size,
          type: value.type,
        }
      } else {
        entries[key] = value
      }
    })

    // Log complet pour debug
    console.log("📩 Nouveau formulaire propriétaire reçu :", entries)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("❌ Erreur réception formulaire propriétaire:", err)
    return NextResponse.json(
      { error: "Impossible de traiter le formulaire." },
      { status: 500 }
    )
  }
}