import type { Metadata } from 'next'
import ExperiencesContent from './ExperiencesContent'

export const metadata: Metadata = {
  title: 'Experiences',
  description: 'Discover the Volkswagen lifestyle through cinematic videos. Road trips, community events, and driving experiences.',
}

export default function ExperiencesPage() {
  return <ExperiencesContent />
}
