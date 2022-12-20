import { isLoggedIn } from '@/utils/auth'

export default {
  created() {
    if (!process.client) return

    if (!isLoggedIn()) {
      this.$router.replace('/login')
    }
  }
}
