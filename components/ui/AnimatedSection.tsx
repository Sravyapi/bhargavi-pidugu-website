'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none' | 'scale' | 'blur'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: Direction
  duration?: number
  once?: boolean
}

const variants = {
  hidden: (direction: Direction) => {
    switch (direction) {
      case 'up':    return { opacity: 0, y: 40 }
      case 'down':  return { opacity: 0, y: -40 }
      case 'left':  return { opacity: 0, x: -40 }
      case 'right': return { opacity: 0, x: 40 }
      case 'scale': return { opacity: 0, scale: 0.85 }
      case 'blur':  return { opacity: 0, filter: 'blur(12px)', y: 16 }
      case 'none':  return { opacity: 0 }
      default:      return { opacity: 0, y: 40 }
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.65,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-60px' })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      custom={direction}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
        ...(direction === 'scale' ? {
          type: 'spring',
          stiffness: 200,
          damping: 20,
          delay,
        } : {}),
      }}
    >
      {children}
    </motion.div>
  )
}
