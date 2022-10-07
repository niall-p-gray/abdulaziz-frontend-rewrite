<template>
  <div class="wrapper">
    <form @submit.prevent="submit">
      <img src="~/assets/logo.svg" alt="Howdy Kolache" />
      <h1 class="heading">Howdy Kolache Admin</h1>
      <div class="input-wrapper">
        <img src="~/assets/icons/unlock.png" class="w-6 h-6" />
        <input
        v-model="password"
        :disabled="verifying"
        type="password"
        placeholder="Password"
        required />
      </div>
      <p v-if="error" class="error">Incorrect password</p>
      <button type="submit" class="btn mt-12">
          <span v-if="verifying">Verifying...</span>
          <span v-else>Enter</span>
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            password: '',
            verifying: false,
            error: false,
        }
    },
    methods: {
        async submit () {
            if (! await this.verify()) return

            this.login()
        },
        async verify () {
            this.verifying = true
            this.error = false

            let isValid = false

            try {
                const payload = {
                    password: this.password
                }
                const options = {
                    'Content-Type': 'application/json'
                }
    
                const res = await axios.post('/.netlify/functions/verify-password', payload, options)
                // 200 status code == valid password
                if (res.status === 200) isValid = true
            } catch (error) {
                console.error(error)
                this.error = true
            }

            this.verifying = false

            return isValid
        },
        login () {
            const logInDate = this.$moment().local().format()

            localStorage.setItem('loggedIn', true)
            localStorage.setItem('lastLogIn', logInDate)

            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.wrapper {
    @apply h-screen mt-40 p-3;
}

form {
    @apply w-full md:w-6/12 lg:w-3/12 mx-auto flex flex-col justify-center items-center;
}

.heading {
    @apply font-bold text-3xl mt-4;
}

.input-wrapper {
    @apply flex items-center p-2 border-b border-gray-500 w-full mt-16;
}

.input-wrapper input{
    @apply bg-transparent ml-2 text-base p-0;
}

.error{
    @apply text-red-500 mt-2 w-full;
}

.btn{
    @apply w-full md:w-auto;
}
</style>
