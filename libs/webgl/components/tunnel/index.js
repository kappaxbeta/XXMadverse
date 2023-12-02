import { useContextBridge } from '@react-three/drei'
import { useCanvas } from 'libs/webgl/hooks/use-canvas'
import { TransformContext } from 'libs/webgl/hooks/use-transform'
import { Fragment, useId } from 'react'

export function WebGLTunnel({ children }) {
  const { WebGLTunnel } = useCanvas()

  const ContextBridge = useContextBridge(TransformContext)

  const uuid = useId()

  return (
    <WebGLTunnel.In>
      <ContextBridge key={uuid}>{children}</ContextBridge>
    </WebGLTunnel.In>
  )
}

export function DOMTunnel({ children }) {
  const { DOMTunnel } = useCanvas()

  const uuid = useId()

  return (
    <DOMTunnel.In>
      <Fragment key={uuid}>{children}</Fragment>
    </DOMTunnel.In>
  )
}
