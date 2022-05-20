import { ChangeEvent, KeyboardEvent, Suspense } from 'react'
import { useQuery } from 'react-query'
import { useState, useEffect, useRef, useMemo, useAppSelector, useAppDispatch, useQueryDebounce } from 'hooks'
import axios from 'axios'
import { getDiseasesName } from 'services/search'
import classNames from 'classnames'
import { SearchIcon } from 'assets/svgs'

import styles from './Search.module.scss'

const Search = () => {
  const debouncedSearchText = useAppSelector((state) => state.search.debouncedText)

  const [searchText, setSearchText] = useState('')
  const [index, setIndex] = useState(-2)
  const [isEmptyResponse, setIsEmptyResponse] = useState<boolean>(false)

  const ref = useRef<HTMLInputElement>(null)

  useQueryDebounce(searchText.replaceAll(' ', ''))

  const { data, isLoading } = useQuery(
    ['diseaseList', debouncedSearchText],
    () => {
      if (debouncedSearchText === '') return undefined
      return getDiseasesName(debouncedSearchText)
    },
    {
      onSuccess: (successData) => {
        console.log(successData)
        if (successData?.data.length === 0) {
          setIsEmptyResponse(true)
        } else {
          setIsEmptyResponse(false)
        }
      },
      enabled: !!debouncedSearchText,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  )
  useEffect(() => {
    console.log(index)
  }, [])

  useEffect(() => {
    if (data?.call) {
      console.log('hi')
      data.call.cancel('취소')
    }
  }, [searchText])

  const handleChangeSearchText = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget
    setSearchText(value)
  }

  const handleKeyMove = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!data?.data) return
    console.log(event.currentTarget.value)
    console.log(index)

    if (event.key === 'ArrowUp' && index > 0) {
      setIndex((prev) => prev - 1)
    } else if (event.key === 'ArrowUp' && index === 0) {
      setIndex(data.data.length - 1)
    }
    console.log()
    if (event.key === 'ArrowDown' && index < data.data.length - 1) {
      console.log(index)
      setIndex((prev) => prev + 1)
    } else if (event.key === 'ArrowDown' && index === data.data.length - 1) {
      console.log('hi')
      setIndex(0)
    }
  }

  useEffect(() => {
    setIndex(-2)
  }, [searchText])

  const itemList = useMemo(
    () =>
      data?.data.map(({ sickCd, sickNm }, i) => {
        console.log(sickNm, i)
        return (
          <li className={classNames({ [styles.active]: i === index })} key={sickCd}>
            <button type='button'>
              {sickNm.split(debouncedSearchText)[0]}
              <b className={styles.highlight}>{debouncedSearchText}</b>
              {sickNm.split(debouncedSearchText)[1]}
            </button>
          </li>
        )
      }),
    [data, debouncedSearchText, index]
  )

  const resultMessage = useMemo(() => {
    console.log(isEmptyResponse, isLoading)
    return isEmptyResponse ? '검색 결과가 없습니다' : '추천 검색어'
  }, [isEmptyResponse])

  const onClick = () => {
    console.log(index)
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
          onClick={onClick}
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
          {isLoading && <p>Loading...</p>}
          <span>{!isLoading && resultMessage}</span>
          {itemList}
        </ul>
      )}
    </div>
  )
}

export default Search
