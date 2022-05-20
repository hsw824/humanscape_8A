import axios, { CancelTokenSource } from 'axios'
import { ISearchApiRes } from '../types/search.d'

const SEARCH_BASE_URL = '/B551182/diseaseInfoService/getDissNameCodeList'
const API_KEY = process.env.REACT_APP_DISEASE_API_KEY

const getDiseasesNameOptions = {
  ServiceKey: API_KEY,
  pageNo: 1,
  sickType: 1,
  medTp: 2,
  diseaseType: 'SICK_NM',
  _type: 'json',
}

let call: CancelTokenSource
export const getDiseasesName = (searchText: string) => {
  if (call) call.cancel()
  call = axios.CancelToken.source()
  console.log('호출되었습니다')
  return axios
    .get<ISearchApiRes>(SEARCH_BASE_URL, {
      cancelToken: call.token,
      params: {
        searchText,
        ...getDiseasesNameOptions,
      },
      timeout: 10000,
    })
    .then((res) => {
      const result = res?.data.response.body.items.item
      if (!result) return { data: [], call }
      if (Array.isArray(result)) return { data: result, call }
      if (typeof result === 'object') return { data: [result], call }
      return { data: result, call }
    })
    .catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        console.log(`%c Request ${thrown.message}`, 'background: #bd71ff; color:#eaeaea')
      }
    })
}
