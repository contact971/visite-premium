// src/app/conditions/page.tsx
"use client"

import { motion } from "framer-motion"

export default function ConditionsPage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10 leading-relaxed text-neutral-800 text-justify border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold text-center mb-8 text-neutral-900">
            Conditions d’utilisation – Luxor Visites Premium
          </h1>

          <p>
            L’utilisation de la plateforme Luxor et le paiement d’un service
            impliquent l’acceptation entière et irrévocable des présentes
            conditions. Le service offert constitue exclusivement un service
            administratif et technologique permettant de réserver une visite
            prioritaire de logement et, le cas échéant, d’accéder à une option
            de préparation de dossier. Le montant exigé, soit cinquante dollars
            (50 $) CAD pour une visite premium, cinquante dollars (50 $) CAD
            pour la préparation de dossier ou quatre-vingt-cinq dollars (85 $)
            CAD pour le Pack complet, est facturé à titre de frais
            administratifs fixes. Ce paiement ne représente pas un acompte, un
            dépôt de location, une avance, un crédit, une garantie de bail ni un
            quelconque droit locatif. Il s’agit exclusivement d’un frais lié à
            l’organisation, la gestion et la priorisation de rendez-vous via une
            infrastructure technologique. Luxor n’est pas propriétaire des
            logements présentés et ne détient aucun droit sur ceux-ci. Les
            logements appartiennent à des tiers (propriétaires, gestionnaires,
            courtiers) qui demeurent seuls responsables de leur disponibilité, de
            leurs caractéristiques, de leur conformité et de la décision finale
            d’attribuer ou non un bail. La réservation d’une visite ne garantit
            en aucun cas l’obtention d’un logement. Toute décision de location
            demeure à la discrétion exclusive du propriétaire ou de son
            représentant. L’utilisateur comprend et accepte que, quelle que soit
            la situation, aucun remboursement ne sera accordé après le paiement.
            Cette politique stricte s’applique notamment, sans limitation, en
            cas d’absence ou de retard de l’utilisateur, de désistement, de
            retrait du logement par son propriétaire, d’annulation ou de
            modification du rendez-vous, d’indisponibilité, de refus de
            candidature ou de tout événement indépendant de notre contrôle. Le
            paiement est définitif, ferme et irrévocable, et l’utilisateur
            renonce expressément à tout recours en remboursement, dédommagement
            ou compensation. Luxor agit exclusivement comme intermédiaire
            technologique et administratif, facilitant la mise en relation et la
            coordination de visites. Nous ne garantissons pas l’exactitude des
            informations fournies par les propriétaires, ni la tenue effective
            des visites, ni la qualité ou la conformité des logements. Les
            descriptions, photos et caractéristiques publiées le sont à titre
            indicatif et relèvent de la responsabilité exclusive des
            propriétaires ou courtiers. Notre responsabilité ne peut en aucun
            cas être engagée pour des frais, déplacements, pertes de temps,
            désagréments, dommages matériels, moraux, directs ou indirects
            découlant de l’utilisation de notre service, de l’annulation ou du
            report d’une visite. Nous ne sommes pas courtiers immobiliers au
            sens de l’Organisme d’autoréglementation du courtage immobilier du
            Québec (OACIQ). Notre plateforme n’est pas une agence immobilière,
            n’exerce pas d’activités de courtage et n’accorde aucune garantie de
            bail ni droit locatif. Le service est fourni tel quel (“as is”),
            sans garantie expresse ou implicite de disponibilité, de qualité,
            d’adéquation ou de résultat. Les paiements sont traités via la
            solution Stripe, conforme aux normes PCI DSS et reconnue
            internationalement pour la sécurité des transactions. Luxor n’a
            jamais accès directement aux données bancaires des utilisateurs. En
            procédant au paiement et à la réservation, l’utilisateur confirme
            avoir lu, compris et accepté intégralement les présentes conditions,
            reconnaît que le service est indépendant de toute décision de
            location et accepte que toute responsabilité finale quant à la
            disponibilité, l’octroi et la conclusion d’un bail appartienne
            exclusivement au propriétaire ou à son représentant. Toute
            utilisation du service vaut acceptation explicite des présentes
            conditions sans restriction.
          </p>
        </motion.div>
      </div>
    </main>
  )
}