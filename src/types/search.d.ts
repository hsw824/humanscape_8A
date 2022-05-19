export interface ISearchApiRes {
  response: IResponse
}

export interface IResponse {
  header: IHeader
  body: IBody
}

export interface IBody {
  items: IItems
  numOfRows: number
  pageNo: number
  totalCount: number
}

export interface IItems {
  item: IItem[]
}

export interface IItem {
  sickCd: string
  sickNm: string
}

export interface IHeader {
  resultCode: string
  resultMsg: string
}
