// src/app/confidentialite/page.tsx
"use client"

import { motion } from "framer-motion"

export default function PolitiqueConfidentialite() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-10 leading-relaxed text-neutral-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-center mb-6 text-neutral-900">
            Politique de confidentialité
          </h1>

          <div className="text-justify space-y-4 text-sm">
            <p>
              La présente Politique de confidentialité décrit les pratiques de{" "}
              <strong>[NOM_DE_L_ENTREPRISE]</strong> (ci-après « nous », « notre »
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
              <strong>1. Données collectées.</strong> Nous collectons seulement
              les renseignements strictement nécessaires pour fournir et
              améliorer nos services : (a) informations d’identification :
              nom, prénom, courriel, numéro de téléphone ; (b) informations
              relatives à la réservation : logement sélectionné, date et heure
              souhaitée, historique des réservations ; (c) données de facturation
              et de paiement : traitées exclusivement par notre prestataire de
              paiement (Stripe) — nous ne stockons pas les numéros complets de
              carte bancaire ; (d) données techniques et de navigation : adresse
              IP, type de navigateur, pages visitées et cookies techniques
              nécessaires au fonctionnement du site ; (e) lorsque vous décidez
              de fournir des documents complémentaires (ex : références,
              pièces justificatives), ceux-ci sont collectés seulement si
              nécessaires au traitement de votre réservation.
            </p>

            <p>
              <strong>2. Finalités du traitement.</strong> Vos données servent
              uniquement aux finalités suivantes : effectuer et confirmer les
              réservations de visites, communiquer des informations liées à la
              réservation (confirmations, rappels), traiter les paiements via
              notre fournisseur, améliorer notre service, prévenir et gérer les
              fraudes, et respecter les obligations légales et comptables.
            </p>

            <p>
              <strong>3. Base légale et consentement.</strong> Le traitement de
              vos données s’appuie sur votre consentement explicite au moment de
              la réservation et, le cas échéant, sur l’exécution d’un contrat
              (prestation de service). Vous pouvez retirer votre consentement à
              tout moment ; toutefois, ce retrait peut empêcher la fourniture de
              certains services (ex. impossibilité d’organiser la visite).
            </p>

            <p>
              <strong>4. Partage avec des tiers.</strong> Nous ne vendons ni ne
              louons vos renseignements personnels à des tiers. Nous pouvons
              divulguer vos renseignements aux catégories de tiers suivantes
              lorsque nécessaire : (a) prestataires de paiement (Stripe) pour
              le traitement des paiements ; (b) fournisseurs d’hébergement et
              d’infrastructure web (ex. plateformes d’hébergement) ; (c)
              prestataires d’e-mailing en charge de l’envoi des confirmations et
              notifications ; (d) propriétaires ou gestionnaires de logement,
              strictement dans la mesure nécessaire pour organiser la visite
              (ex. transmettre votre nom et coordonnées au propriétaire chargé
              d’accueillir la visite). Nous exigeons que tous les prestataires
              offrent un niveau de protection approprié et respectent la
              confidentialité de vos données.
            </p>

            <p>
              <strong>5. Transferts internationaux.</strong> Certains de nos
              prestataires (hébergeur, services cloud, Stripe) peuvent traiter
              ou stocker des données en dehors du Canada. Lorsque des
              transferts internationaux ont lieu, nous mettons en place des
              garanties appropriées (clauses contractuelles, normes de sécurité)
              afin de protéger vos renseignements personnels conformément à la
              législation applicable.
            </p>

            <p>
              <strong>6. Durée de conservation.</strong> Nous conservons vos
              renseignements uniquement le temps nécessaire aux finalités
              indiquées (ex. gérer la réservation, respecter les obligations
              légales et comptables). À l’issue de ces finalités, vos données
              seront supprimées ou rendues anonymes, sauf si la loi exige une
              conservation prolongée. Pour certains enregistrements comptables
              ou fiscaux, la conservation peut être requise par la loi.
            </p>

            <p>
              <strong>7. Cookies et traceurs.</strong> Nous utilisons plusieurs
              types de cookies : (a) cookies essentiels nécessaires au
              fonctionnement du site (connexion, prévention des fraudes) ; (b)
              cookies analytiques (ex. Google Analytics) pour mesurer le trafic
              et améliorer l’expérience — ces cookies analytiques ne sont
              activés qu’avec votre consentement ; (c) cookies marketing ou de
              ciblage uniquement si vous les acceptez. Vous pouvez gérer les
              préférences de cookies via votre navigateur ou via le bandeau de
              cookies présent sur le site. Les cookies essentiels ne requièrent
              pas de consentement explicite mais les cookies analytiques et
              publicitaires en requièrent un, conformément aux bonnes pratiques
              et à la législation applicable.
            </p>

            <p>
              <strong>8. Courriels commerciaux et CASL.</strong> Si nous
              voulons vous envoyer des communications commerciales (newsletter,
              offres), nous demanderons votre consentement explicite (opt-in).
              Toutes les communications contiendront une méthode claire et
              simple pour se désabonner, conformément à la Loi canadienne
              anti-pourriel (CASL).
            </p>

            <p>
              <strong>9. Sécurité.</strong> Nous mettons en œuvre des mesures
              techniques et organisationnelles raisonnables pour protéger vos
              données (chiffrement, contrôle d’accès, sauvegardes, revue des
              accès). Toutefois, aucune méthode de transmission ou stockage en
              ligne n’offre une sécurité absolue ; en cas d’incident, nous
              agirons rapidement selon les obligations légales en vigueur.
            </p>

            <p>
              <strong>10. Violation de données et notification.</strong> En cas
              de violation de la confidentialité ou d’accès non autorisé à vos
              renseignements présentant un risque sérieux de dommage, nous
              prendrons les mesures appropriées, limiterons l’incident et
              notifierons, le cas échéant, la Commission d’accès à
              l’information du Québec (ou l’autorité compétente) et les
              personnes affectées, conformément aux exigences légales applicables.
            </p>

            <p>
              <strong>11. Vos droits et modalités d’exercice.</strong> Conformément
              à la Loi 25 (Québec) et à la LPRPDE (Canada), vous disposez des
              droits suivants : accès, rectification, suppression, limitation du
              traitement, opposition et portabilité des données. Pour exercer
              ces droits, adressez votre demande à : <strong>[EMAIL_DE_CONTACT]</strong>.
              Nous vous demanderons une preuve d’identité raisonnable avant de
              divulguer ou modifier des renseignements. Nous répondrons à votre
              demande dans les meilleurs délais et au plus tard dans le délai
              prévu par la loi (généralement 30 jours, sauf prorogation
              justifiée).
            </p>

            <p>
              <strong>12. Enfants.</strong> Notre service n’est pas destiné aux
              mineurs. Nous ne recueillons volontairement des renseignements
              personnels d’enfants de moins de l’âge légal sans le consentement
              parental requis. Si vous pensez que des informations concernant
              un mineur ont été recueillies par erreur, contactez-nous pour que
              nous les supprimions.
            </p>

            <p>
              <strong>13. Modifications.</strong> Nous pouvons mettre à jour la
              présente Politique pour refléter les modifications législatives ou
              opérationnelles. La date de dernière mise à jour apparaîtra en
              haut de la page. En cas de changement important, nous informerons
              nos utilisateurs via une notification visible ou un courriel.
            </p>

            <p>
              <strong>14. Contact.</strong> Pour toute question relative à la
              présente Politique, à l’exercice de vos droits ou pour déposer une
              plainte, contactez-nous : <br />
              • Courriel : <strong>[EMAIL_DE_CONTACT]</strong> <br />
              • Adresse : <strong>[ADRESSE_LEGALE]</strong> <br />
              Nous étudierons votre demande et y répondrons conformément aux
              lois applicables.
            </p>

            <p className="text-xs text-neutral-600">
              <em>
                Remarques techniques : remplacez <strong>[NOM_DE_L_ENTREPRISE]</strong>,
                <strong>[EMAIL_DE_CONTACT]</strong> et <strong>[ADRESSE_LEGALE]</strong> par vos
                informations réelles avant publication. Si vous utilisez des
                outils analytiques (ex. Google Analytics) ou des pixels
                publicitaires, indiquez-les explicitement et offrez un moyen
                de refus (opt-out) sur le site.
              </em>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}