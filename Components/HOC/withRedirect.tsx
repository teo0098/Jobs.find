import cookies from 'js-cookie'
import { useRouter } from 'next/router'

const withRedirect = (Component : React.FC) => {
    return (props : {}) => {
        const { back } = useRouter()

        if (cookies.get('_id')) {
            back()
            return null
        }
        else {
            return <Component {...props} />
        }
    }
}

export default withRedirect