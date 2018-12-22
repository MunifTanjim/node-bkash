const fs = require('fs')
const path = require('path')

const deepclean = require('clean-deep')
const deepsort = require('deep-sort-object')

const specsPath = path.resolve('specification')
const routesPath = path.resolve('src/routes')

const specsMap = {
  '0.35.0': {
    checkout: 'bKashCheckoutAPI-sandbox_0_35_0-swagger-mod.json',
    payments: 'bKashPaymentsAPI-sandbox_0_35_0-swagger-mod.json'
  },
  '0.40.0': {
    checkout: 'bKash Checkout API-sandbox-sandbox_0_40_0-swagger-mod.json',
    payments: 'bKash Payments API-sandbox-sandbox_0_40_0-swagger-mod.json'
  },
  '1.0.0-beta': {
    checkout: 'bKash Checkout API-sandbox-sandbox_1_0_0-beta-swagger-mod.json',
    payments: 'bKash Payments API-sandbox-sandbox_1_0_0-beta-swagger-mod.json'
  },
  '1.1.0-beta': {
    checkout: 'bKash Checkout API-sandbox-sandbox_1_1_0-beta-swagger-mod.json',
    payments: 'bKash Payments API-sandbox-sandbox_1_1_0-beta-swagger-mod.json'
  }
}

const AUTHENTICATION_HEADERS = [
  'Authorization',
  'password',
  'username',
  'X-APP-Key'
]

const processParamsDefinitions = ({ required = [], properties = {} }) => {
  return Object.entries(properties).reduce((params, [paramName, param]) => {
    delete param.description

    if (required.includes(paramName)) {
      param.required = true
    }

    params[paramName] = param

    return params
  }, {})
}

const generateRoutes = (versions = []) => {
  versions.forEach(version => {
    fs.readdirSync(routesPath).forEach(filename => {
      if (!RegExp(version).test(filename)) {
        fs.unlinkSync(path.join(routesPath, filename))
      }
    })

    Object.keys(specsMap[version]).forEach(apiType => {
      const specs = require(path.join(specsPath, specsMap[version][apiType]))

      const info = {
        baseUrl: {
          pay: `${specs.schemes[0]}://${specs.host.replace('sandbox', 'pay')}${
            specs.basePath
          }`,
          sandbox: `${specs.schemes[0]}://${specs.host}${specs.basePath}`
        },
        title: specs.info.title,
        version: specs.info.version
      }

      const paths = specs.paths

      const routes = Object.keys(paths).reduce((routes, url) => {
        const urlObj = paths[url]

        const endpoints = Object.keys(urlObj).reduce((endpoints, method) => {
          const methodObj = urlObj[method]

          const endpoint = {}

          endpoint.method = method.toUpperCase()

          endpoint.url = url

          endpoint.name = methodObj.operationId.replace(
            RegExp(`using${method}$`, 'i'),
            ''
          )

          endpoint.params = methodObj.parameters.reduce((params, paramObj) => {
            let { name, required, schema, type } = paramObj

            if (AUTHENTICATION_HEADERS.includes(name)) return params

            let param = { required }

            if (type) param.type = type

            if (schema) {
              let paramsFromDefinitions = processParamsDefinitions(
                specs.definitions[schema.$ref.replace('#/definitions/', '')]
              )

              params = { ...params, ...paramsFromDefinitions }
            } else {
              params[name] = param
            }

            return params
          }, {})

          return endpoints.concat(endpoint)
        }, [])

        return routes.concat(endpoints)
      }, [])

      fs.writeFileSync(
        path.join(routesPath, `${apiType}-${version}-info.json`),
        JSON.stringify(deepsort(deepclean(info)), null, 2)
      )

      fs.writeFileSync(
        path.join(routesPath, `${apiType}-${version}.json`),
        JSON.stringify(deepsort(deepclean(routes)), null, 2)
      )
    })
  })
}

generateRoutes(['1.1.0-beta'])
