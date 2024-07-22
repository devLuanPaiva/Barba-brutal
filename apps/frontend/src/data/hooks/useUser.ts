import { useContext } from 'react'
import UserContext from '../contexts/UseContext'

const useUser = () => useContext(UserContext)
export default useUser
