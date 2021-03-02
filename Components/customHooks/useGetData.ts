import { useEffect, useState } from "react"
import cookies from 'js-cookie'

import axios from '../../axiosInstance'
import { Job } from "../../types/Job"
import { User } from "../../types/User"

const useGetData = (url : string) => {

    const [dataLoading, setDataLoading] = useState<boolean>(true)
    const [userData, setUserData] = useState<User | Job[]>(null)

    useEffect(() => {
        const getData = async () => {
            try {
                if (!cookies.get('name') || !cookies.get('_id')) throw new Error()
                const { data, status } = await axios.get(url)
                if (status === 403 || status === 500) throw new Error()
                setUserData(data)
            }
            catch {
                setUserData(null)
            }
            finally {
                setDataLoading(false)
            }
        }
        getData()
    }, [])

    return { dataLoading, userData, setUserData }
}

export default useGetData