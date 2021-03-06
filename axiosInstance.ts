import axios from 'axios'

const newInstance = axios.create({
    validateStatus: (status : number) => status >= 200 && status <= 500
})

export default newInstance