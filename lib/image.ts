import { urlFor } from '@/sanity/lib/image'
import type { SanityImage } from '@/types'

/**
 * Resolves an image source to a URL.
 * Handles both Sanity images (asset._ref) and mock images (_url).
 */
export function resolveImage(
  source: SanityImage,
  width: number,
  height: number,
): string {
  if (source._url) return source._url
  if (source.asset?._ref?.startsWith('http')) return source.asset._ref
  return urlFor(source).width(width).height(height).auto('format').url()
}
