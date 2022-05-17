import { axios } from 'hooks/worker'
import { useState } from 'react'
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

export const getDiseasesName = async (searchText: string) => {
  return axios.get<ISearchApiRes>(SEARCH_BASE_URL, {
    params: {
      searchText,
      ...getDiseasesNameOptions,
    },
    timeout: 30000,
  })
}
