import axios, { Canceler, CancelTokenSource } from 'axios'
import { ISearchApiRes } from '../types/search.d'

const SEARCH_BASE_URL = '/B551182/diseaseInfoService/getDissNameCodeList'
const API_KEY = process.env.REACT_APP_DISEASE_API_KEY

const getDiseasesNameOptions = {
  // ServiceKey: process.env.REACT_APP_DISEASE_API_KEY,
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
  return axios.get<ISearchApiRes>(SEARCH_BASE_URL, {
    cancelToken: call.token,
    params: {
      searchText,
      ...getDiseasesNameOptions,
    },
    timeout: 5000,
  })
}
