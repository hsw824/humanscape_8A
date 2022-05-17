import { ChangeEvent, startTransition } from 'react'
import { useQuery } from 'react-query'
import { useState, useQueryDebounce, useAppDispatch, useAppSelector } from 'hooks'

import styles from './Search.module.scss'
import { SearchIcon } from 'assets/svgs'
import { getDiseasesName } from 'services/search'
import { getItems, setItems } from 'states/search'

let handler: NodeJS.Timeout

const Search = () => {
  // 첫 렌더링때 useQuery 안불러올수 있게 해야함
  const dispatch = useAppDispatch()
  const items = useAppSelector(getItems)

  const [searchText, setSearchText] = useState('암')
  const debouncedSearchText = useQueryDebounce(searchText.replace(' ', ''))
  const [deSearchText, setDeSearchText] = useState<string>('')
  const [reqCount, setReqCount] = useState<number>(0)
  const [hasResult, setHasResult] = useState<boolean>(false)

  const { data, isLoading, refetch, isError } = useQuery(
    ['diseaseList', debouncedSearchText],

    async () => {
      if (debouncedSearchText.replace(' ', '') === '') return [{ sickCd: '', sickNm: '' }]
      const result = (await getDiseasesName(debouncedSearchText)).data?.response?.body.items.item
      setReqCount((prev) => prev + 1)
      console.log(reqCount)
      console.log(result)
      if (result) {
        setHasResult(true)
        if (Array.isArray(result)) return result
        if (typeof result !== 'string') return [result]
      }
      setHasResult(false)
      return [{ sickCd: '', sickNm: '' }]
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!debouncedSearchText,
      staleTime: 1000 * 60,
      onError: () => console.error('err'),
    }
  )

  const debouncedSetSearchText = (value: string) => {
    return startTransition(() => {
      if (handler) clearTimeout(handler)
      handler = setTimeout(() => {
        setDeSearchText(value)
      }, 400)
    })
  }

  const handleChangeSearchText = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget
    setSearchText(value)
    debouncedSetSearchText(value)
    if (data !== undefined) {
      dispatch(setItems(data))
    }
  }

  return (
    <div className={styles.searchContainer}>
      <p className={styles.description}>
        국내 모든 임상시험 검색하고
        <br /> 온라인으로 참여하기
      </p>

      <div className={styles.searchInputWarrper}>
        <SearchIcon />
        <input
          className={styles.searchInput}
          value={searchText}
          onChange={handleChangeSearchText}
          placeholder='질환명을 입력해 주세요.'
        />
        <button type='button' className={styles.searchButton}>
          검색
        </button>
      </div>
      {isLoading && <div>Loading...</div>}
      <ul className={styles.dropdown}>
        <span>{!isLoading && (hasResult ? '추천 검색어' : '검색 결과가 없습니다')}</span>

        {data !== undefined &&
          data.map((item) => {
            if (item.sickNm !== '') {
              return (
                <li key={item.sickCd}>
                  <SearchIcon />
                  {item.sickNm}
                </li>
              )
            }
            return ''
          })}
      </ul>
    </div>
  )
}

export default Search
