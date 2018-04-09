const routeNames = [
  'auth',
  'data',
  'user'
]

const routes = routeNames.map(name => ({
    path: `/${name}`,
    router: require(`./${name}/${name}`)
  })
)

module.exports = routes
