import { Hero } from 'components/hero'
import { Layout } from 'layouts/default'
import { Canvas } from 'libs/webgl/components/canvas'
import s from './home.module.scss'
import { Lenis } from '@studio-freight/react-lenis'
import LabelStudio from './Label/labelStudio'

export default function Home() {
  return (
    <Canvas>
      <Lenis root>
      <div className={s.page}>
        <div className={s.layout}>
          <main className={s.main}>
            <section className={s.hero}>
              <p className={s.header}>Madverse</p>

              <LabelStudio />
            </section>

            <section className={s.hero} >
              <p className={s.header}>Künstler</p>


            </section>
          </main>
        </div>
      </div>
      </Lenis>
    </Canvas>
  )
}

export async function getStaticProps() {
  return {
    props: {
      id: 'home'
    }, // will be passed to the page component as props
  }
}
