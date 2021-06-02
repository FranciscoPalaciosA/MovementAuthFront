const local = {
    backend_server: "http://0.0.0.0:8000/api/v1/",
}

const production = {
    backend_server: "https://movementauth.df.r.appspot.com/api/v1/",
}

const environments = {
    local: local,
    production: production,
}

const config = environments[process.env.REACT_APP_STAGE]
console.log(config)

export default {
    ...config,
}
