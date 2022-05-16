import { useMount } from 'react-use'
import { Routes, Route } from 'react-router-dom'
import styles from './Routes.module.scss'

import { useAppSelector } from 'hooks'
import { getTheme } from 'states/system'

import Search from 'routes/Search'

const App = () => {
  const theme = useAppSelector(getTheme)

  useMount(() => {
    document.documentElement.setAttribute('color-theme', theme)
  })

  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<Search />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
