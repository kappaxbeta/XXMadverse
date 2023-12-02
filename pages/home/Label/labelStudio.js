import s from './LabelStudio.module.scss'

function LabelStudio (props) {
  return <span>
              <div>
                  <h2 className={s.top}>Sugar</h2>
               <h2>
                <span>©</span> {new Date().getFullYear()} Studio
              </h2>
              </div>
          </span>
}

/*
  return <span className={cn(s.sub)}>
              <div>
                  <h2 className={cn('h3', s.subtitle)}>Sugar</h2>
               <h2 className={cn('p-xs', s.tm)}>
                <span>©</span> {new Date().getFullYear()} Studio
              </h2>
              </div>
          </span>
* */

export default LabelStudio