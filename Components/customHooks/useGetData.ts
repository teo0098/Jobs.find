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
                if (!cookies.get('_id')) throw new Error()
                const { status: tokenStatus, headers: tokenHeaders } = await axios.get(`/api/users/${cookies.get('_id')}/token`)
                if (tokenStatus === 403) throw new Error()
                const { data: newData, status: newStatus } = await axios.get(url, { headers: { Authorization: `${tokenHeaders['authorization']}` } })
                if (newStatus === 500 || newStatus === 403) throw new Error()
                setUserData(newData)
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