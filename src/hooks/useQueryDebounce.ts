import { useEffect, useAppDispatch } from 'hooks'
import { setDebouncedText } from 'states/search'
import { CancelTokenSource } from 'axios'

export const useQueryDebounce = (value: string, delay = 600) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      // eslint-disable-next-line no-console
      dispatch(setDebouncedText(value))
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay, dispatch])
}
