import { useRouter, NextRouter } from 'next/router'
import { useState } from 'react'

const useSearchEngine = () => {

    const { push } : NextRouter = useRouter()
    const [query, setQuery] = useState<string>('')

    const search = () => {
        if (query.trim() !== '') push(`/jobs?search=${query}`, `/jobs?search=${query}`, { shallow: true })
    }
    
    const handleOnEnter = (key : string) => {
        if (key === 'Enter') search()
    }

    return { search, handleOnEnter, setQuery }
}

export default useSearchEngine