'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Generic GSAP animation hook with full control
 * @param animationFn - Function that receives the element and returns a GSAP animation
 * @param deps - Dependencies array for useEffect
 */
export function useGSAP<T extends HTMLElement = HTMLElement>(
  animationFn: (element: T) => gsap.core.Tween | gsap.core.Timeline | void,
  deps: React.DependencyList = []
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const animation = animationFn(element)

    return () => {
      if (animation) {
        if ('kill' in animation) {
          animation.kill()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}

/**
 * Hook for timeline-based animations
 */
export function useGSAPTimeline<T extends HTMLElement = HTMLElement>(
  timelineFn: (element: T, tl: gsap.core.Timeline) => void,
  deps: React.DependencyList = []
) {
  return useGSAP<T>((element) => {
    const tl = gsap.timeline()
    timelineFn(element, tl)
    return tl
  }, deps)
}
