// src/app/cookies/page.tsx
"use client"

import { motion } from "framer-motion"

export default function Cookies() {
  return (
    <main
      className="min-h-screen bg-fixed bg-center bg-cover py-20 px-6"
      style={{ backgroundImage: "url('/images/background.jpg')" }} // ✅ fond global
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-gradient-to-br from-black/90 to-yellow-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-yellow-700/30 p-10 leading-relaxed text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400 drop-shadow-md">
            Politique sur les cookies
          </h1>

          <p className="mb-4 text-neutral-200">
            Notre site utilise des fichiers témoins, communément appelés
            « cookies », afin d’améliorer l’expérience de navigation, de mesurer
            l’audience et d’assurer certaines fonctionnalités essentielles. Un
            cookie est un petit fichier texte stocké sur votre appareil lorsque
            vous visitez un site web.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2 text-yellow-400">
            Types de cookies utilisés
          </h2>
          <ul className="list-disc list-inside mb-4 space-y-1 text-neutral-200">
            <li>
              <strong className="text-white">Cookies essentiels</strong> : nécessaires au bon
              fonctionnement du site (navigation, accès sécurisé, etc.).
            </li>
            <li>
              <strong className="text-white">Cookies de performance et d’analyse</strong> : collectent
              des informations anonymes pour améliorer notre contenu et la
              convivialité du site.
            </li>
            <li>
              <strong className="text-white">Cookies de fonctionnalité</strong> : permettent de se
              souvenir de vos préférences (langue, région, paramètres sauvegardés).
            </li>
            <li>
              <strong className="text-white">Cookies de ciblage/publicité (si applicable)</strong> :
              servent à proposer des contenus personnalisés ou des annonces
              adaptées à vos intérêts.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2 text-yellow-400">
            Consentement
          </h2>
          <p className="mb-4 text-neutral-200">
            En utilisant notre site, vous consentez à l’utilisation des cookies
            décrits ci-dessus. Vous pouvez retirer ou modifier votre consentement
            en ajustant les paramètres de votre navigateur. Veuillez noter que la
            désactivation de certains cookies peut affecter le bon fonctionnement
            du site.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2 text-yellow-400">
            Durée de conservation
          </h2>
          <p className="mb-4 text-neutral-200">
            Les cookies sont conservés pour une durée limitée qui varie en fonction
            de leur finalité. Certains expirent à la fermeture de votre navigateur,
            d’autres peuvent être conservés plus longtemps, mais jamais au-delà des
            durées légales permises.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2 text-yellow-400">
            Gestion des cookies
          </h2>
          <p className="mb-4 text-neutral-200">
            Vous pouvez configurer votre navigateur pour refuser tous les cookies
            ou pour être averti lorsqu’un cookie est envoyé. Les paramètres varient
            selon le navigateur (Chrome, Safari, Firefox, Edge, etc.). Consultez la
            section d’aide de votre navigateur pour en savoir plus.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2 text-yellow-400">
            Responsabilité et contact
          </h2>
          <p className="text-neutral-200">
            Nous utilisons les cookies uniquement dans le respect des lois
            applicables au Québec et au Canada, notamment la Loi sur la protection
            des renseignements personnels dans le secteur privé. <br />
            Pour toute question concernant l’utilisation des cookies sur notre site : <br />
            • Courriel :{" "}
            <a
              href="mailto:contact@luxorpremium.com"
              className="text-yellow-400 underline"
            >
              contact@luxorpremium.com
            </a>{" "}
            <br />
            • Adresse :{" "}
            <strong className="text-white">
              Luxor – Visites Premium, CP 3143, Richmond (QC) J0B 2H0, Canada
            </strong>
          </p>
        </motion.div>
      </div>
    </main>
  )
}