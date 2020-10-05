import { useEffect, useState } from 'react'

type Function = () => boolean

const useModal : Function = () => {

    const [show, setShow] = useState<boolean>(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false)
        }, 4000)
        return () => clearTimeout(timer)
    }, [show])

    return show
}

export default useModal