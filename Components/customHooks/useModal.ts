import { useEffect, useState } from 'react'

const useModal = () => {

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