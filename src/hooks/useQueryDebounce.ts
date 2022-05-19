import { useState, useEffect } from 'hooks'

export const useQueryDebounce = (value: string, delay = 600) => {
  const replacedValue = value.replace(' ', '')
  const [debounceValue, setDebounceValue] = useState(replacedValue)
  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebounceValue(replacedValue)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [replacedValue, delay])

  return debounceValue
}
