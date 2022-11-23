import { useContext } from 'react'
import { AppContext } from '@/App'

const useApp = () => useContext(AppContext)

export default useApp;