const axios = require("axios")
const ERR_OK = 0
export function get(url) {
    return function () {
        return axios.get(url).then(res => {
            const { errno, data } = res.data
            if (errno == ERR_OK) {
                return data
            }
        })
    }
}
