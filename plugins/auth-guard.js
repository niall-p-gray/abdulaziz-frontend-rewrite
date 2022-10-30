import moment from 'moment'

// Routes that don’t require authentication 
const whitelistedRouteNames = [
  'clients-id'
]

export default ({ app, redirect }) => {
  app.router.beforeEach((to, from, next) => {
    // Redirect to login if we are not logged, target route is not whitelisted and we are not already going
    // to the login page
    const whitelisted = whitelistedRouteNames.includes(to.name)
    if (!isLoggedIn() && !whitelisted && to.name !== 'login') return next('/login')

    // Prevent us from accessing the login page while logged in
    if (isLoggedIn() && to.name === 'login') return next('/')

    return next()
  })
}

const isLoggedIn = () => {
  const isLoggedIn = localStorage.getItem('loggedIn')
  const lastLoginTime = localStorage.getItem('lastLogIn')

  if (!isLoggedIn) return false

  const loginDate = moment(lastLoginTime).local()
  const today = moment().local()

  const daysSinceLastLogIn = today.diff(loginDate, 'days')

  if (daysSinceLastLogIn > 7) {
    localStorage.setItem('loggedIn', false)
    return false
  }

  return true
}
