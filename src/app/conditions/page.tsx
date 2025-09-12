// src/app/conditions/page.tsx
"use client"

import { motion } from "framer-motion"

export default function ConditionsPage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10 leading-relaxed text-neutral-800 text-justify border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold text-center mb-8 text-neutral-900">
            Conditions d’utilisation – Service Premium de Réservation de Visite
          </h1>

          <p className="whitespace-pre-line">
            Notre plateforme offre un service premium payant qui permet à
            l’utilisateur de réserver une visite prioritaire d’un logement
            présenté sur notre site. En procédant au paiement de ce service,
            l’utilisateur reconnaît et accepte l’intégralité des conditions
            décrites ci-dessous, lesquelles constituent un accord juridiquement
            contraignant. Le frais demandé, soit cinquante dollars (50 $) plus
            taxes applicables, constitue exclusivement un frais administratif et
            technologique pour l’organisation et la gestion d’un rendez-vous de
            visite. Ce montant ne représente en aucun cas un dépôt de location,
            un acompte, un crédit, une avance ou une quelconque garantie de
            bail. Le service fourni est limité à l’organisation d’une visite et
            n’accorde aucun droit de location ni aucune priorité dans le
            processus décisionnel du propriétaire.

            Il est entendu que notre société n’est pas propriétaire des
            logements présentés sur la plateforme. Les logements appartiennent à
            des tiers, qu’il s’agisse de propriétaires individuels, de courtiers
            ou de gestionnaires immobiliers. Nous n’exerçons aucun contrôle sur
            la disponibilité réelle, l’état, la conformité ou les conditions de
            location des logements, et nous ne participons en aucune manière aux
            décisions relatives à l’attribution ou à la signature éventuelle
            d’un bail. L’utilisateur comprend et accepte que la réservation
            d’une visite n’entraîne et n’impose aucune garantie de location. La
            décision finale quant à l’octroi ou non d’un logement relève
            uniquement du propriétaire ou de son représentant.

            L’utilisateur accepte également qu’aucun remboursement ne sera
            effectué après paiement, et ce, quelle que soit la situation. Cette
            absence de remboursement s’applique notamment, mais sans s’y
            limiter, en cas d’absence ou de retard de l’utilisateur au
            rendez-vous, d’annulation ou de modification par le propriétaire, de
            retrait du logement du marché, d’indisponibilité, de refus de
            candidature, ou de tout autre événement hors de notre contrôle. Le
            paiement effectué constitue un engagement ferme et irrévocable de la
            part de l’utilisateur, et celui-ci renonce expressément à tout
            recours visant à obtenir un remboursement, un dédommagement ou une
            compensation.

            Notre rôle se limite exclusivement à une fonction d’intermédiaire
            technologique facilitant la mise en relation et l’organisation des
            visites. Nous ne garantissons pas l’exactitude ou l’exhaustivité des
            informations fournies par les propriétaires, ni la tenue effective
            des visites, ni la qualité ou la conformité des logements.
            L’utilisateur reconnaît que toute information concernant un logement
            est transmise à titre indicatif et sous la responsabilité exclusive
            du propriétaire ou de son représentant. En aucun cas, notre
            responsabilité ne saurait être engagée pour des frais engagés par
            l’utilisateur, des déplacements inutiles, des pertes de temps, des
            désagréments, ou encore des dommages directs, indirects ou
            consécutifs résultant de l’utilisation de notre service ou de
            l’annulation ou modification d’une visite.

            Nous déclarons expressément ne pas être courtiers immobiliers au
            sens de l’Organisme d’autoréglementation du courtage immobilier du
            Québec (OACIQ). Notre service n’est pas une agence immobilière, ne
            constitue pas une activité de courtage, et ne confère aucune
            garantie de bail ni aucun droit locatif. Le service est fourni tel
            quel (“as is”), sans garantie d’aucune nature, qu’elle soit expresse
            ou implicite.

            En procédant au paiement et à l’utilisation de notre plateforme,
            l’utilisateur confirme avoir lu, compris et accepté toutes les
            dispositions des présentes conditions, lesquelles s’appliquent
            intégralement et sans restriction. L’utilisateur reconnaît qu’il
            s’agit d’un service administratif et technologique distinct,
            indépendant de toute décision de location, et accepte que la
            responsabilité finale relative à la disponibilité, la location et la
            conclusion éventuelle d’un bail appartienne exclusivement au
            propriétaire ou à son représentant.
          </p>
        </motion.div>
      </div>
    </main>
  )
}