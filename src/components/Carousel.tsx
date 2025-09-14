"use client"

import { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

type CarouselProps = {
  photos: string[]
}

export default function Carousel({ photos }: CarouselProps) {
  const [index, setIndex] = useState(0)

  const next = () => {
    if (index < photos.length - 1) setIndex(index + 1)
  }

  const prev = () => {
    if (index > 0) setIndex(index - 1)
  }

  // Affiche 3–4 images visibles selon la taille d’écran
  const visiblePhotos = photos.slice(index, index + 4)

  return (
    <div className="relative w-full">
      {/* Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visiblePhotos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Photo ${i + 1}`}
            className="w-full h-48 object-cover rounded-xl shadow-md"
          />
        ))}
      </div>

      {/* Bouton gauche */}
      {index > 0 && (
        <button
          onClick={prev}
          className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          <FaChevronLeft />
        </button>
      )}

      {/* Bouton droit */}
      {index < photos.length - 4 && (
        <button
          onClick={next}
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  )
}