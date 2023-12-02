import { useThree } from '@react-three/fiber'
import { useLenis } from '@studio-freight/react-lenis'
import { useCallback } from 'react'

export function useWebGLRect(rect) {
  const size = useThree(({ size }) => size)

  const lenis = useLenis()

  const get = useCallback(() => {
    const x = -size.width / 2 + (rect.left + rect.width / 2)
    const y = size.height / 2 - (rect.top + rect.height / 2) + lenis.scroll
    const width = rect.width
    const height = rect.height

    return { x, y, width, height }
  }, [lenis, size, rect])

  return get
}
