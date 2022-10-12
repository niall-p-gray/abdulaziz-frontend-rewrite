import moment from 'moment'

export default ({ app, redirect }) => {
  app.router.beforeEach((to, from, next) => {
    // Redirect to login, if we are not logged and we are not already going
    // to the login page
    if (!isLoggedIn() && to.name !== 'login') return next('/login')
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
