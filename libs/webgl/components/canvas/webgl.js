import { Box, OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { useCanvas } from '../../hooks/use-canvas'
import { PostProcessing } from '../postprocessing'
import { Preload } from '../preload'
import { RAF } from '../raf'
import s from './webgl.module.scss'
import { Content } from './madworldCanvas'

export function WebGLCanvas({ render = true }) {
  const { WebGLTunnel, DOMTunnel } = useCanvas()

  return (
    <div className={s.webgl}>
      <Canvas
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
          stencil: false,
          depth: false,
          alpha: true,
        }}
        dpr={[1, 2]}
        frameloop="never"
        orthographic={true}
        camera={{  fov:75, position: [0, 0, 100] }}

        eventSource={document.documentElement}
        eventPrefix="client"
      >
        <Suspense>
          <RAF render={render} />
          <Suspense fallback={null}>
          <Content/>
          </Suspense>
          <PostProcessing />
          <WebGLTunnel.Out />
        </Suspense>
      </Canvas>
      <DOMTunnel.Out />
    </div>
  )
}
