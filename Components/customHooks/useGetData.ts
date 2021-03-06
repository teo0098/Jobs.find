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
                if (status === 500) throw new Error()
                if (status === 403) {
                    const { status: tokenStatus } = await axios.get(`/api/users/${cookies.get('_id')}/token`)
                    if (tokenStatus === 403) throw new Error()
                    const { data: newData, status: newStatus } = await axios.get(url)
                    if (newStatus === 500 || newStatus === 403) throw new Error()
                    setUserData(newData)
                }
                else {
                    setUserData(data)
                }
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