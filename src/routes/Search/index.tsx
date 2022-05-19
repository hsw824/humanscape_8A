import React, { ChangeEvent, startTransition, useEffect, useMemo, Suspense } from 'react'
import { useQuery } from 'react-query'
import { useState, useQueryDebounce, useAppDispatch, useAppSelector } from 'hooks'

import styles from './Search.module.scss'
import { SearchIcon } from 'assets/svgs'
import { getDiseasesName } from 'services/search'
import { setItems } from 'states/search'
import { getHasResult, setHasResult } from 'states/searchHasResult'
import axios from 'axios'
import { IItem } from 'types/search'

const SearchList = React.lazy(() => import('./SearchList'))

const Search = () => {
  // 첫 렌더링때 useQuery 안불러올수 있게 해야함
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.search.items)

  const [searchText, setSearchText] = useState('암')
  const [reqCount, setReqCount] = useState<number>(0)

  const debouncedSearchText = useQueryDebounce(searchText)

  const hasResult = useAppSelector(getHasResult)

  const { data, isLoading, refetch, isError } = useQuery(
    ['diseaseList', debouncedSearchText],
    async () => {
      dispatch(setHasResult(false))
      const res = await getDiseasesName(debouncedSearchText).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message)
        }
      })
      const result = res?.data.response.body.items.item
      setReqCount((prev) => prev + 1)
      console.log(reqCount)
      dispatch(setHasResult(true))
      if (!result) return dispatch(setItems([]))
      if (Array.isArray(result)) return dispatch(setItems(result))
      if (typeof result === 'object') return dispatch(setItems([result]))
      return result
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!debouncedSearchText,
      useErrorBoundary: true,
      staleTime: 1000 * 60,
      // onSuccess: (successData) => {
      //   if (successData){

      //   }
      // },
      onError: () => console.error('err'),
    }
  )

  const handleChangeSearchText = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget
    setSearchText(value)
  }

  const resultMessage = useMemo(() => (hasResult ? '추천 검색어' : '검색 결과가 없습니다'), [hasResult])
  return (
    <div className={styles.searchContainer}>
      <h1 className={styles.description}>
        <p>국내 모든 임상시험 검색하고</p>
        <p>온라인으로 참여하기</p>
      </h1>

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
      <ul className={styles.dropdown}>
        {isLoading && <span>Loading...</span>}
        <span>{!isLoading && resultMessage}</span>
        <Suspense fallback={<span>Loading...</span>}>
          <SearchList isLoading={isLoading} />
        </Suspense>
      </ul>
    </div>
  )
}

export default Search
