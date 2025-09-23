// src/app/confidentialite/page.tsx
"use client"

import { motion } from "framer-motion"

export default function PolitiqueConfidentialite() {
  return (
    <main
      className="min-h-screen bg-fixed bg-center bg-cover py-20 px-6"
      style={{ backgroundImage: "url('/images/background.jpg')" }} // ✅ fond global
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-gradient-to-br from-black/90 to-yellow-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-10 leading-relaxed text-white text-justify border border-yellow-700/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400 drop-shadow-md">
            Politique de confidentialité
          </h1>

          <div className="space-y-4 text-sm">
            <p>
              La présente Politique de confidentialité décrit les pratiques de{" "}
              <strong>Luxor – Visites Premium</strong> (ci-après « nous », « notre »
              ou « la Plateforme ») en matière de collecte, d’utilisation,
              de conservation et de divulgation des renseignements personnels
              des utilisateurs (ci-après « vous » ou « l’utilisateur ») dans le
              cadre de l’utilisation de notre site et de nos services de
              réservation de visites de logements. En utilisant notre site ou
              en achetant nos services, vous confirmez avoir pris connaissance de
              cette Politique et consentez à la collecte et au traitement de
              vos renseignements personnels tel que décrit ci-dessous.
            </p>

            <p>
              <strong className="text-yellow-400">1. Données collectées.</strong>{" "}
              Nous collectons seulement les renseignements strictement nécessaires : 
              identification (nom, prénom, courriel, téléphone), informations de 
              réservation, données de paiement (traitées par Stripe, jamais stockées), 
              données techniques (IP, navigateur, cookies nécessaires), et, le cas échéant, 
              documents fournis volontairement.
            </p>

            <p>
              <strong className="text-yellow-400">2. Finalités.</strong> Vos données servent à : 
              organiser les visites, envoyer confirmations/rappels, traiter les paiements, 
              améliorer notre service, prévenir les fraudes, et respecter nos obligations légales.
            </p>

            <p>
              <strong className="text-yellow-400">3. Base légale.</strong> Consentement explicite 
              au moment de la réservation + exécution du contrat. Le retrait du consentement peut 
              empêcher la prestation du service.
            </p>

            <p>
              <strong className="text-yellow-400">4. Partage avec tiers.</strong> Stripe (paiement), 
              hébergeurs, prestataires emailing, et propriétaires/gestionnaires de logements (nom 
              + coordonnées uniquement). Tous doivent respecter un haut niveau de confidentialité.
            </p>

            <p>
              <strong className="text-yellow-400">5. Transferts internationaux.</strong> Certains 
              prestataires (Stripe, hébergement) peuvent être situés hors Canada. Des clauses et 
              mesures de sécurité sont appliquées.
            </p>

            <p>
              <strong className="text-yellow-400">6. Conservation.</strong> Données gardées seulement 
              pour la durée nécessaire (réservation, facturation, obligations légales). 
              Suppression/anonymisation ensuite.
            </p>

            <p>
              <strong className="text-yellow-400">7. Cookies.</strong> Essentiels (obligatoires), 
              analytiques (Google Analytics, avec consentement), marketing (si acceptés). 
              Vous pouvez gérer vos préférences via le bandeau ou votre navigateur.
            </p>

            <p>
              <strong className="text-yellow-400">8. Communications commerciales (CASL).</strong> 
              Toute info promotionnelle requiert un opt-in explicite et inclut toujours 
              un lien de désabonnement.
            </p>

            <p>
              <strong className="text-yellow-400">9. Sécurité.</strong> Mesures techniques et 
              organisationnelles (chiffrement, contrôle d’accès). Aucun système n’est infaillible, 
              mais nous agissons rapidement en cas d’incident.
            </p>

            <p>
              <strong className="text-yellow-400">10. Violation de données.</strong> Notification 
              à la CAI (Québec) et aux personnes concernées en cas de risque sérieux.
            </p>

            <p>
              <strong className="text-yellow-400">11. Vos droits.</strong> Conformément à la Loi 25 
              et à la LPRPDE : accès, rectification, suppression, opposition, portabilité. 
              Demande à :{" "}
              <strong className="text-white">contact@luxorpremium.com</strong>.
            </p>

            <p>
              <strong className="text-yellow-400">12. Enfants.</strong> Service non destiné aux 
              mineurs. Données supprimées si recueillies par erreur.
            </p>

            <p>
              <strong className="text-yellow-400">13. Modifications.</strong> Nous pouvons ajuster 
              la Politique (mise à jour indiquée en haut de page). Notification en cas de changement majeur.
            </p>

            <p>
              <strong className="text-yellow-400">14. Contact.</strong> Pour toute question : <br />
              • Courriel :{" "}
              <strong className="text-white">contact@luxorpremium.com</strong> <br />
              • Adresse :{" "}
              <strong className="text-white">
                Luxor – Visites Premium, CP 3143, Richmond (QC) J0B 2H0, Canada
              </strong>
            </p>

            <p className="text-xs text-neutral-400 mt-6">
              <em>
                Cette politique est conforme à la Loi 25 (Québec) et à la LPRPDE (Canada). 
                Si vous utilisez des outils analytiques ou des pixels publicitaires, indiquez-les 
                explicitement et offrez un moyen de refus (opt-out).
              </em>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}