import { Float, OrbitControls, TransformControls, useGLTF,Clouds, Cloud,} from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useFrame as useRaf } from '@studio-freight/hamo'
import { useScroll } from 'hooks/use-scroll'
//import { button, useControls } from 'leva'
//import { mapRange } from 'lib/maths'
//import { useStore } from 'lib/store'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import {
  Color,
  DoubleSide,
  Euler,
  MathUtils,
  MeshPhysicalMaterial,
  Vector2,
  Vector3,
} from 'three'
import fragmentShader from '../particles/fragment.glsl'
import vertexShader from '../particles/vertex.glsl'
import { useLenis } from '@studio-freight/react-lenis'

function Raf({ render = true }) {
  const { advance } = useThree()

  useRaf((time) => {
    if (render) {
      advance(time / 1000)
    }
  })
}

export function Particles({
  width = 250,
  height = 250,
  depth = 250,
  count = 1000,
  scale = 100,
  size = 100,
}) {
  const positions = useMemo(() => {
    const array = new Array(count * 3)

    for (let i = 0; i < array.length; i += 3) {
      array[i] = MathUtils.randFloatSpread(width)
      array[i + 1] = MathUtils.randFloatSpread(height)
      array[i + 2] = MathUtils.randFloatSpread(depth)
    }

    return Float32Array.from(array)
  }, [count, scale, width, height, depth])

  const noise = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count * 3 }, () => Math.random() * 100)
      ),
    [count]
  )

  const sizes = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count }, () => Math.random() * size)
      ),
    [count, size]
  )

  const speeds = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count }, () => Math.random() * 0.2)
      ),
    [count]
  )

  const scales = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count }, () => Math.random() * 100)
      ),
    [count]
  )

  const material = useRef()
  const points = useRef()

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0,
      },
      uColor: {
        // value: new Color('rgb(255, 152, 162)'),
        value: new Color('rgb(255, 207, 206)'),
        // value: new Color('rgb(255, 236, 234)'),
      },
      uScroll: {
        value: 0,
      },
      uResolution: {
        value: new Vector2(width, height),
      },
    }),
    []
  )

  useEffect(() => {
    uniforms.uResolution.value.set(width, height)
  }, [width, height])

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime
  })

  useScroll(({ scroll }) => {
    uniforms.uScroll.value = scroll
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-noise" args={[noise, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-speed" args={[speeds, 1]} />
        <bufferAttribute attach="attributes-scale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        uniforms={uniforms}
      />
    </points>
  )
}

const steps = [
  {
    position: [-0.1, -1.75, 0],
    scale: 0.045,
    rotation: [0, Math.PI * 0.5, 0],
    type: 1,
  },
  {
    position: [0.15, -0.4, 0],
    scale: 0.02,
    rotation: [
      MathUtils.degToRad(-45),
      MathUtils.degToRad(-135),
      MathUtils.degToRad(-45),
    ],
    type: 1,
  },
  {
    position: [0.15, -0.4, 0],
    scale: 0.02,
    rotation: [
      MathUtils.degToRad(45),
      MathUtils.degToRad(-315),
      MathUtils.degToRad(-45),
    ],
    type: 1,
  },
  {
    position: [-0.2, -0.35, 0],
    scale: 0.02,
    rotation: [
      MathUtils.degToRad(-90),
      MathUtils.degToRad(-405),
      MathUtils.degToRad(-45),
    ],
    type: 1,
  },
  {
    position: [-1.2, -0.6, 0],
    scale: 0.05,
    rotation: [
      MathUtils.degToRad(-90),
      MathUtils.degToRad(-405),
      MathUtils.degToRad(-45),
    ],
    type: 1,
  },
  {
    position: [-1.6, -0.6, 0],
    scale: 0.05,
    rotation: [
      MathUtils.degToRad(-90),
      MathUtils.degToRad(-405),
      MathUtils.degToRad(-45),
    ],
    type: 1,
  },
  {
    position: [0.16, -1.38, 0],
    scale: 0.05,
    rotation: [
      MathUtils.degToRad(0),
      MathUtils.degToRad(200),
      MathUtils.degToRad(-16),
    ],
    type: 2,
  },
  {
    position: [0, -0.68, 0],
    scale: 0.04,
    rotation: [
      MathUtils.degToRad(0),
      MathUtils.degToRad(-14),
      MathUtils.degToRad(-16),
    ],
    type: 2,
  },
  {
    position: [-0.22, -0.61, 0],
    scale: 0.03,
    rotation: [
      MathUtils.degToRad(0),
      MathUtils.degToRad(-(157 + 360)),
      MathUtils.degToRad(-16),
    ],
    type: 2,
  },
  {
    position: [0.2, -0.46, 0],
    scale: 0.03,
    rotation: [
      MathUtils.degToRad(0),
      MathUtils.degToRad(-(340 + 360)),
      MathUtils.degToRad(-16),
    ],
    type: 2,
  },
]

// const thresholds = [0, 1000, 2000, 3000, 4000, 5000]

const material = new MeshPhysicalMaterial({
  color: new Color('#FF98A2'),
  metalness: 1,
  roughness: 0.4,
  wireframe: true,
  side: DoubleSide,
})


  export function Lion() {
    const lenis = useLenis()
    const { viewport } = useThree()
    const { scene: world } = useGLTF('/models/lion2.glb')
    const copiedScene = useMemo(() => world.clone(), [world])

    useLenis((scroll, limit) => {
      console.log(scroll)

      //parent.current.scale.set(width, height, width)
      if(scroll.targetScroll > 500) {
        parent.current.position.y += 20
      }

      if(scroll.targetScroll < 500) {
        parent.current.position.y = 0
      }

    }, [])

    const parent = useRef()
  return   <>
    <ambientLight args={[new Color(111,210, 35)]} />
    <group position={[300, -100, 150]}>
      {/* <mesh scale={25}>
          <boxGeometry />
          <meshBasicMaterial color={'red'} />
        </mesh> */}
      <directionalLight args={[new Color(111,210, 35), 0.3]} />
    </group>

    <Float floatIntensity={1} rotationIntensity={ 0}>
      <group
        ref={parent}
        // position={[viewport.width * 0.155, viewport.height * -0.6, 0]}
        //scale={viewport.height * 0.023}
        // rotation={[
        //   MathUtils.degToRad(125),
        //   MathUtils.degToRad(-57),
        //   MathUtils.degToRad(140),
        // ]}
      >

        <primitive object={world}  position={[viewport.width * -0.4, -4, 0]} scale={[200, 200, 200]} />
        <primitive object={copiedScene}  rotation={[0,MathUtils.degToRad(-30),0]} position={[viewport.width * 0.4, -4, 0]} scale={[200, 200, 200]} />

        {/* </TransformControls> */}
      </group>
    </Float>


  </>
}
//    <OrbitControls makeDefault />
//*
//    { {target && (
//         <TransformControls mode="translate" object={target} makeDefault />
//       )} }
// *//



export function Wolken () {
  return <group scale={100}>
    <Suspense fallback={null}>

      <Clouds limit={400} material={MeshPhysicalMaterial}>

        <Cloud seed={53} fade={30} speed={0.1} growth={4} segments={40} volume={6} opacity={0.6} bounds={[4, 3, 1]} />
        <Cloud seed={27 + 1} fade={30} position={[0, 1, 0]} speed={0.5} growth={4} volume={10} opacity={1} bounds={[6, 2, 1]} />
        <Cloud seed={567} fade={30} speed={0.1} growth={4} segments={40} volume={6} opacity={0.6} bounds={[4, 3, 1]} />
        <Cloud seed={45 + 1} fade={30} position={[0, 1, 0]} speed={0.5} growth={4} volume={10} opacity={1} bounds={[6, 2, 1]} />
        <Cloud seed={57} fade={30} speed={0.1} growth={4} segments={40} volume={6} opacity={0.6} bounds={[4, 3, 1]} />
        <Cloud seed={56 + 1} fade={30} position={[0, 1, 0]} speed={0.5} growth={4} volume={10} opacity={1} bounds={[6, 2, 1]} />
        <Cloud seed={96} fade={30} speed={0.1} growth={4} segments={40} volume={6} opacity={0.6} bounds={[4, 3, 1]} />
        <Cloud seed={1 + 1} fade={30} position={[0, 1, 0]} speed={0.5} growth={4} volume={10} opacity={1} bounds={[6, 2, 1]} />




      </Clouds>
    </Suspense>

  </group>
}

/*
    <Clouds material={material}>
      <Cloud segments={40} bounds={[10, 2, 2]} volume={10} color="orange" />
      <Cloud seed={1} scale={2} volume={5} color="hotpink" fade={100} />
    </Clouds>
* */
export function Content() {
  const { viewport } = useThree()

  return (
    <>

      {/* <OrbitControls makeDefault /> */}
      <Particles
        width={viewport.width}
        height={viewport.height}
        depth={500}
        count={100}
        scale={500}
        size={150}
      />
      <Lion></Lion>
      <Wolken/>


    </>
  )
}

export function MadworldCanvas({ render = true }) {
  return (
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
    >
      <Raf render={render} />
      <Suspense>
        <Content />
      </Suspense>
    </Canvas>
  )
}
