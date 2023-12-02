import { useFrame } from '@react-three/fiber'
import { useLenis } from '@studio-freight/react-lenis'
import { useWebGLRect } from 'libs/webgl/hooks/use-webgl-rect'
import { useRef } from 'react'

console.log('webgl.js')

export function WebGL({ rect }) {
  const meshRef = useRef()

  const getWebGLRect = useWebGLRect(rect)

  useLenis(() => {
    const { x, y, width, height } = getWebGLRect()

    meshRef.current.scale.set(width, height, width)
    meshRef.current.position.set(x, y, 0)
  }, [getWebGLRect])

  useFrame((_, deltaTime) => {
    meshRef.current.rotation.x += deltaTime
    meshRef.current.rotation.y += deltaTime
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}
