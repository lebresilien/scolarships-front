import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': cookie.get('XSRF-TOKEN')
    },
    withCredentials: true,
})

export default axios
