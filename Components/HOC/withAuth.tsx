import cookies from 'js-cookie'
import React from 'react'

import axios from '../../axiosInstance'

const withAuth = (Component : React.FC<any>) => {
    return (props : any) => {

        React.useEffect(() => {
            if (cookies.get('_id')) axios.get(`/api/users/${cookies.get('_id')}/account`)
        }, [])
        
        return <Component {...props} />
    }
}

export default withAuth