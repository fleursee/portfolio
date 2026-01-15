'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Hook for GSAP scroll-triggered animations
 * @param vars - GSAP animation properties
 * @param options - ScrollTrigger options
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  vars: gsap.TweenVars = {},
  options: ScrollTrigger.Vars = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const defaultOptions: ScrollTrigger.Vars = {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...options,
    }

    const animation = gsap.from(element, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      ...vars,
      scrollTrigger: defaultOptions,
    })

    return () => {
      animation.kill()
      ScrollTrigger.getById(defaultOptions.trigger as string)?.kill()
    }
  }, [vars, options])

  return ref
}

/**
 * Hook for fade-in animation on scroll
 */
export function useFadeIn<T extends HTMLElement = HTMLDivElement>(delay: number = 0) {
  return useScrollAnimation<T>(
    {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power2.out',
      delay,
    },
    {
      start: 'top 85%',
    }
  )
}

/**
 * Hook for slide-in animation from left
 */
export function useSlideInLeft<T extends HTMLElement = HTMLDivElement>(delay: number = 0) {
  return useScrollAnimation<T>(
    {
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: 'power3.out',
      delay,
    },
    {
      start: 'top 80%',
    }
  )
}

/**
 * Hook for slide-in animation from right
 */
export function useSlideInRight<T extends HTMLElement = HTMLDivElement>(delay: number = 0) {
  return useScrollAnimation<T>(
    {
      opacity: 0,
      x: 50,
      duration: 0.8,
      ease: 'power3.out',
      delay,
    },
    {
      start: 'top 80%',
    }
  )
}

/**
 * Hook for scale-up animation on scroll
 */
export function useScaleUp<T extends HTMLElement = HTMLDivElement>(delay: number = 0) {
  return useScrollAnimation<T>(
    {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: 'back.out(1.7)',
      delay,
    },
    {
      start: 'top 85%',
    }
  )
}

/**
 * Hook for GSAP animations on child elements by selector
 * @param selector - CSS selector for child elements to animate
 * @param vars - GSAP animation properties
 * @param options - ScrollTrigger options
 */
export function useGSAPAnimation<T extends HTMLElement = HTMLDivElement>(
  selector: string,
  vars: gsap.TweenVars = {},
  options: ScrollTrigger.Vars = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const elements = container.querySelectorAll(selector)
    if (elements.length === 0) return

    const defaultOptions: ScrollTrigger.Vars = {
      trigger: container,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...options,
    }

    const animation = gsap.from(elements, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      ...vars,
      scrollTrigger: defaultOptions,
    })

    return () => {
      animation.kill()
      // Clean up ScrollTrigger
      const triggers = ScrollTrigger.getAll()
      triggers.forEach(trigger => {
        if (trigger.vars.trigger === container || trigger.trigger === container) {
          trigger.kill()
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector])

  return ref
}