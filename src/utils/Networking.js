import axios from "axios"
import config from "./config"
import { toast } from "react-toastify"
const REST_END_POINT = config.backend_server

let env = "dev"

function baseAxios(options) {
    const defaultHeaders = {
        "Content-Type": "application/json",
        "Accept-Language": options.language ? options.language : "en",
        lang: options.lang ? options.lang : "en",
        ...options.extraHeaders,
    }

    const baseUrl = REST_END_POINT

    const instance = axios.create({
        baseURL: baseUrl,
        timeout: options.timeout || 30000,
        headers: defaultHeaders,
    })

    instance.interceptors.response.use(
        function(response) {
            return response
        },
        function(error) {
            toast.error(error.message)
            return Promise.reject(error)
        }
    )

    return instance
}

function executeRequest(method, pathname, data, options = {}) {
    pathname = pathname.replace("env", env)

    const body =
        method === "get" || !data
            ? {}
            : {
                  data,
              }
    const reqObj = {
        method,
        url: pathname,
        params: options.query,
        ...body,
    }

    const baseAxiosRequest = baseAxios(options)
    return new Promise((resolve, reject) => {
        return baseAxiosRequest
            .request(reqObj)
            .then(res => {
                resolve(res)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export default {
    async get(pathname, options) {
        return executeRequest("get", pathname, null)
    },

    async post(pathname, data, options) {
        return executeRequest("post", pathname, data)
    },

    async put(pathname, data, options) {
        return executeRequest("put", pathname, data)
    },

    async patch(pathname, data, options) {
        return executeRequest("patch", pathname, data)
    },

    async delete(pathname, data, options) {
        return executeRequest("delete", pathname, data)
    },

    all(promises) {
        return axios.all(promises)
    },
  }