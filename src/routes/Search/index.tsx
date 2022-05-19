import { ChangeEvent, KeyboardEvent, Suspense } from 'react'
import { useQuery } from 'react-query'
import { useState, useEffect, useRef, useMemo, useAppSelector, useAppDispatch, useQueryDebounce } from 'hooks'
import axios from 'axios'
import { getDiseasesName } from 'services/search'
import { setDiseaseList, getDebouncedText, setDebouncedText } from 'states/search'
import classNames from 'classnames'
import { SearchIcon } from 'assets/svgs'

import styles from './Search.module.scss'
import List from './List'

const Search = () => {
  const debouncedSearchText = useAppSelector((state) => state.disease.debouncedText)

  const [searchText, setSearchText] = useState('')
  const [isEmptyResponse, setIsEmptyResponse] = useState(false)
  const [index, setIndex] = useState(0)

  const ref = useRef<HTMLInputElement>(null)

  useQueryDebounce(searchText)

  const { data, isLoading } = useQuery(
    ['diseaseList', debouncedSearchText],
    () =>
      getDiseasesName(debouncedSearchText).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
          throw new Error(thrown)
        }
      }),

    {
      onSuccess: (successData) => {
        if (successData) {
          setIsEmptyResponse(false)
        } else {
          setIsEmptyResponse(true)
        }
      },
      enabled: !!debouncedSearchText,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  )

  const handleChangeSearchText = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget
    setSearchText(value)
  }

  const handleKeyMove = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!data) return

    if (event.key === 'ArrowUp' && index > 0) {
      setIndex((prev) => prev - 1)
    } else if (event.key === 'ArrowUp' && index === 0) {
      setIndex(data.length - 1)
    }

    if (event.key === 'ArrowDown' && index < data.length - 1) {
      setIndex((prev) => prev + 1)
    } else if (event.key === 'ArrowDown' && index === data.length - 1) {
      setIndex(0)
    }
  }

  useEffect(() => {
    setIndex(-1)
  }, [searchText])

  const itemList = useMemo(
    () =>
      data?.map(({ sickCd, sickNm }, i) => (
        <li className={classNames({ [styles.active]: i === index })} key={sickCd}>
          <button type='button'>
            {sickNm.split(debouncedSearchText)[0]}
            <b className={styles.highlight}>{debouncedSearchText}</b>
            {sickNm.split(debouncedSearchText)[1]}
          </button>
        </li>
      )),
    [data, debouncedSearchText, index]
  )

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
          ref={ref}
          onKeyDown={handleKeyMove}
        />
        <button type='button' className={styles.searchButton}>
          검색
        </button>
      </div>

      {debouncedSearchText && (
        <ul className={styles.dropdown}>
          <li>추천 검색어</li>
          {isLoading && <li>Loading...</li>}
          {!isLoading && isEmptyResponse && !data && <li>검색어가 없습니다.</li>}
          {itemList}
        </ul>
      )}
    </div>
  )
}

export default Search
