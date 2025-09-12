// src/app/cookies/page.tsx
export default function Cookies() {
  return (
    <main className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Politique sur les cookies
        </h1>

        <p className="mb-4">
          Notre site utilise des fichiers témoins, communément appelés
          « cookies », afin d’améliorer l’expérience de navigation, de mesurer
          l’audience et d’assurer certaines fonctionnalités essentielles. Un
          cookie est un petit fichier texte stocké sur votre appareil lorsque
          vous visitez un site web.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Types de cookies utilisés</h2>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>
            <strong>Cookies essentiels</strong> : nécessaires au bon
            fonctionnement du site (navigation, accès sécurisé, etc.).
          </li>
          <li>
            <strong>Cookies de performance et d’analyse</strong> : collectent
            des informations anonymes pour améliorer notre contenu et la
            convivialité du site.
          </li>
          <li>
            <strong>Cookies de fonctionnalité</strong> : permettent de se
            souvenir de vos préférences (langue, région, paramètres sauvegardés).
          </li>
          <li>
            <strong>Cookies de ciblage/publicité (si applicable)</strong> :
            servent à proposer des contenus personnalisés ou des annonces
            adaptées à vos intérêts.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Consentement</h2>
        <p className="mb-4">
          En utilisant notre site, vous consentez à l’utilisation des cookies
          décrits ci-dessus. Vous pouvez retirer ou modifier votre consentement
          en ajustant les paramètres de votre navigateur. Veuillez noter que la
          désactivation de certains cookies peut affecter le bon fonctionnement
          du site.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Durée de conservation</h2>
        <p className="mb-4">
          Les cookies sont conservés pour une durée limitée qui varie en fonction
          de leur finalité. Certains expirent à la fermeture de votre navigateur,
          d’autres peuvent être conservés plus longtemps, mais jamais au-delà des
          durées légales permises.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Gestion des cookies</h2>
        <p className="mb-4">
          Vous pouvez configurer votre navigateur pour refuser tous les cookies
          ou pour être averti lorsqu’un cookie est envoyé. Les paramètres varient
          selon le navigateur (Chrome, Safari, Firefox, Edge, etc.). Consultez la
          section d’aide de votre navigateur pour en savoir plus.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Responsabilité et contact</h2>
        <p>
          Nous utilisons les cookies uniquement dans le respect des lois
          applicables au Québec et au Canada, notamment la Loi sur la protection
          des renseignements personnels dans le secteur privé. Pour toute question
          concernant l’utilisation des cookies sur notre site, veuillez nous
          contacter à l’adresse suivante :{" "}
          <a href="mailto:tonadresse@email.com" className="text-blue-600 underline">
            tonadresse@email.com
          </a>.
        </p>
      </div>
    </main>
  )
}