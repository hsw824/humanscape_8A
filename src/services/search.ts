import { axios } from 'hooks/worker'
import { ISearchApiRes } from '../types/search.d'

const SEARCH_BASE_URL =
  'https://cors-anywhere.herokuapp.com/http://apis.data.go.kr/B551182/diseaseInfoService/getDissNameCodeList'

const getDiseasesNameOptions = {
  // ServiceKey: process.env.REACT_APP_DISEASE_API_KEY,
  ServiceKey: 'Xokhems/S69u//piF4ZQXzwejXPmBzwpCxSILxtlvih7xZsRFF+D9I7bH/8YOwQasNN6UojUbb8cjysk7BSgLw==',
  pageNo: 1,
  sickType: 2,
  medTp: 2,
  diseaseType: 'SICK_NM',
  _type: 'json',
}

export const getDiseasesName = (searchText: string) =>
  axios.get<ISearchApiRes>(SEARCH_BASE_URL, {
    params: {
      searchText,
      ...getDiseasesNameOptions,
    },
  })
// .then((res: any) => console.log('res', res))
// .catch((res: any) => console.log('err', res))

// export const getDiseasesName = (searchText: string) =>
// axios.get<ISearchApiRes>(SEARCHBAR_BASE_URL, {
//   params: {
//     searchText,
//     ...getDiseasesNameOptions,
//   },
// })
