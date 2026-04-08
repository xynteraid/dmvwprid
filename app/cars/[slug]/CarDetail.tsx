'use client'

import type { Car } from '@/types'
import CarHero from '@/components/car/CarHero'
import KeyInfoBar from '@/components/car/KeyInfoBar'
import SpecStorytelling from '@/components/car/SpecStorytelling'
import TechnicalSpecAccordion from '@/components/car/TechnicalSpecAccordion'
import VariantsSection from '@/components/car/VariantsSection'
import CarCTA from '@/components/car/CarCTA'
import CarGallery from '@/components/car/CarGallery'
import ColorPicker from '@/components/car/ColorPicker'
import RelatedCars from '@/components/car/RelatedCars'
import RelatedPromos from '@/components/car/RelatedPromos'

interface CarDetailProps {
  car: Car
  whatsappNumber: string
}

export default function CarDetail({ car, whatsappNumber }: CarDetailProps) {
  return (
    <>
      <CarHero car={car} />
      <KeyInfoBar car={car} whatsappNumber={whatsappNumber} />

      {car.colors && car.colors.length > 0 && <ColorPicker car={car} />}

      {car.specSections && car.specSections.length > 0 && (
        <SpecStorytelling sections={car.specSections} />
      )}

      {car.technicalSpec && <TechnicalSpecAccordion spec={car.technicalSpec} />}

      {car.variants && car.variants.length > 0 && (
        <VariantsSection variants={car.variants} />
      )}

      <CarCTA carName={car.name} whatsappNumber={whatsappNumber} />

      {car.gallery && car.gallery.length > 0 && <CarGallery gallery={car.gallery} carName={car.name} />}

      {car.relatedCars && car.relatedCars.length > 0 && (
        <RelatedCars cars={car.relatedCars} />
      )}

      {car.relatedPromos && car.relatedPromos.length > 0 && (
        <RelatedPromos promos={car.relatedPromos} />
      )}
    </>
  )
}
