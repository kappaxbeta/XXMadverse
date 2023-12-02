import { useDeviceDetection } from 'components/device-detection'
import dynamic from 'next/dynamic'
import { CanvasContextProvider } from '../../hooks/use-canvas'

const WebGLCanvas = dynamic(
  () => import('./webgl').then(({ WebGLCanvas }) => WebGLCanvas),
  {
    ssr: false,
  },
)

export function Canvas({ children }) {
  const { isWebGL } = useDeviceDetection()

  return (
    <CanvasContextProvider>
      <WebGLCanvas />
      {children}
    </CanvasContextProvider>
  )
}
