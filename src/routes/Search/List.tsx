import { IItem } from '../../types/search.d'
import { useEffect, useAppSelector } from 'hooks'
import classNames from 'classnames'
import styles from './list.module.scss'

interface Props {
  data: IItem[]
  isRender: boolean | undefined | void
  index: number
}

const List = ({ index, data, isRender }: Props): JSX.Element | null => {
  const debouncedSearchText = useAppSelector((state) => state.search.debouncedText)

  if (!isRender) {
    return null
  }

  return (
    <>
      {data.map((disease, i) => {
        return (
          <li className={classNames({ [styles.active]: i === index })} key={disease.sickCd}>
            <button type='button'>{disease.sickNm}</button>
          </li>
        )
      })}
    </>
  )
}

export default List
