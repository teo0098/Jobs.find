import cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React from 'react'

const withRedirect = (Component : React.FC) => {
    return (props : {}) => {
        const { back } = useRouter()

        if (cookies.get('name')) {
            back()
            return null
        }
        else {
            return <Component {...props} />
        }
    }
}

export default withRedirect