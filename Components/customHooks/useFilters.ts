import { useEffect, useState } from 'react'
import { useRouter, NextRouter } from 'next/router'

const technologies : Array<string> = [
    'JavaScript', 'Angular', 'React', '.NET', 'Vue', 'SQL', 'Python', 'Spring', 'Node', 'AWS', 'Android', 'Symfony', 'Ruby',
    'Django', 'TypeScript', 'RESTful', 'GraphQL', 'Golang', 'MongoDB', 'Cypress'
]

const mappedTechnologies : Array<string> = technologies.map(fName => fName.toLowerCase())

const useFilters = () => {

    const [filters, setFilters] = useState<boolean>(false);
    const [filter, setFilter] = useState<Array<string>>([])
    const { push, query: urlQuery } : NextRouter = useRouter()

    useEffect(() => {
        if (urlQuery.search) {
            const searchArr : Array<string> = urlQuery.search.toString().split(" ")
            searchArr.forEach(searchQ => {
                if (mappedTechnologies.includes(searchQ.toLowerCase())) setFilter(prevState => [...prevState, searchQ])
            })
        }
        return () => setFilter([])
    }, [filters, urlQuery])

    const changeFilter = (filterName : string) => {
        const exists : string | undefined = filter.find(fName => fName.toLowerCase() === filterName.toLowerCase())
        if (!exists) setFilter(prevState => [...prevState, filterName])
        else setFilter(prevState => prevState.filter(fName => fName.toLowerCase() !== filterName.toLowerCase()))
    }

    const isChecked = (filterName : string) => {
        const exists : string | undefined = filter.find(fName => fName.toLowerCase() === filterName.toLowerCase())
        if (!exists) return false
        return true
    }

    const search = () => {
        if (filter.length > 0) {
            setFilters(false)
            let query : string = '?search='
            filter.forEach(fName => query += `${fName} `)
            push(`/jobs${query}`, `/jobs${query}`, { shallow: true })
        }
    }

    const reset = () => {
        if (urlQuery.search) {
            setFilters(false)
            setFilter([])
            push('/')
        }
    }

    const getQueryValues = () => {
        if (urlQuery.search) {
            const searchArr : Array<string> = urlQuery.search.toString().split(" ")
            const filtersQuantity : string = searchArr.length > 1 ? `+${searchArr.length - 1}` : ''
            return `${searchArr[0]}${filtersQuantity}`
        }
        return 'Filters'
    }

    const isQueryNotPopular = () => {
        if (urlQuery.search) {
            const searchArr : Array<string> = urlQuery.search.toString().split(" ")
            const uknownQeuries : Array<string> = searchArr.filter(searchQ => {
                if (!mappedTechnologies.includes(searchQ.toLowerCase())) return searchQ
                return null
            })
            if (uknownQeuries.length === 0) return false
            return true
        }
        return false
    }

    const returnNotPopularQueries = () => {
        if (urlQuery.search) {
            const searchArr : Array<string> = urlQuery.search.toString().split(" ")
            const uknownQeuries : Array<string> = searchArr.filter(searchQ => {
                if (!mappedTechnologies.includes(searchQ.toLowerCase())) return searchQ
                return null
            })
            return uknownQeuries
        }
        return null
    }

    return { filters, setFilters, changeFilter, isChecked, search, reset, technologies, getQueryValues, urlQuery, isQueryNotPopular, returnNotPopularQueries }
}

export default useFilters