import cn from 'clsx'
import { Image } from 'libs/webgl/components/image'
import s from './hero.module.scss'

export function Hero() {
  return (
    <section className={cn(s.hero, 'layout-grid')}>
      <Image className={s.image} src="/images/nebula.jpg" alt="nasa" />
    </section>
  )
}
