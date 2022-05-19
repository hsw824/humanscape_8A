import { useAppDispatch, useAppSelector, useMemo } from 'hooks'
import { getItems } from 'states/search'
import { IItem } from 'types/search'
import { SearchIcon } from 'assets/svgs'
import styles from './Search.module.scss'
import { getHasResult } from 'states/searchHasResult'

interface Props {
  isLoading: boolean
}
const SearchList = ({ isLoading }: Props) => {
  const items = useAppSelector((state) => state.search.items)

  const itemList = useMemo(
    () =>
      items?.map(({ sickCd, sickNm }, i) => (
        <li key={sickCd}>
          <SearchIcon />
          {sickNm}
        </li>
      )),
    [items, !isLoading]
  )

  return <div>{itemList}</div>
}

export default SearchList
