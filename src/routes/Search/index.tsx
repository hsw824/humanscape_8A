import { ChangeEvent } from 'react'
import { useQuery } from 'react-query'
import { useState, useQueryDebounce } from 'hooks'

import styles from './Search.module.scss'
import { SearchIcon } from 'assets/svgs'
import { getDiseasesName } from 'services/search'

const DUMMY_RECOMMEND = ['간세포암', '고환암', '뼈암', '구강암']

const Search = () => {
  // 첫 렌더링때 useQuery 안불러올수 있게 해야함

  const [searchText, setSearchText] = useState('암')
  const debouncedSearchText = useQueryDebounce(searchText)
  const { data, isLoading, refetch, isError } = useQuery(
    ['diseaseList', debouncedSearchText],
    () => getDiseasesName(debouncedSearchText),
    {
      refetchOnWindowFocus: false,
    }
  )

  console.log(data)

  const handleChangeSearchText = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.currentTarget.value)
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
        <span>추천 검색어</span>

        {/* {data?.data.response.body.items.item.map((item: any, i: any) => {
          return (
            <li key={item.sickCd}>
              <SearchIcon />
              {item.sickNm}
            </li>
          )
        })} */}
      </ul>
    </div>
  )
}

export default Search
