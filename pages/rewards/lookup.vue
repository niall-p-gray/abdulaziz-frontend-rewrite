<template>
  <div>
    <portal to="page-title">Rewards Lookup</portal>
    <main>
      <section class="search-form-container">
        <input
          v-model="phoneNumber"
          type="search"
          :disabled="loading"
          placeholder="Type a phone number"
          class="flex-1 h-full"
        />
        <button
          @click="search"
          :disabled="!canSubmit"
          :class="{ btn__disabled: !canSubmit || loading}"
          class="btn h-full"
        >
          Search
        </button>
      </section>
      <section class="mt-16">
        <div v-if="!loading && !error" >
          <table v-if="answers.length" class="table w-full">
            <thead>
              <th>Name</th>
              <th>Phone Number</th>
            </thead>
            <tbody>
              <tr v-for="(answer, index) in answers" :key="index">
                <td class="w-1/2">{{ answer.name }}</td>
                <td>{{ answer.phone_number }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else class="text-center">No data</p>
        </div>
        <div v-else class="text-center">
          <p v-if="loading">Please wait...</p>
          <p v-else class="text-red-500">Something went wrong, please try again</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data () {
    return {
      phoneNumber: null,
      loading: false,
      error: false,
      answers: []
    }
  },
  computed: {
    canSubmit () {
      return this.phoneNumber && this.phoneNumber !== ''
    }
  },
  methods: {
    async search () {
      this.loading = true
      this.error = false

      try {
        const baseUrl = `${window.location.protocol}//${window.location.hostname}:8888`
        const res = await this.$axios.get(`${baseUrl}/.netlify/functions/rewards-lookup?phone-number=${this.phoneNumber}`)

        this.answers = res.data.answers
      } catch (error) {
        console.error(error)
        this.error = true
      }

      this.loading = false
    }
  }
}
</script>

<style scoped>
main{
  @apply w-full md:w-6/12 mx-auto;
}

.search-form-container{
  @apply flex items-center h-10;
}

th {
  text-align: left;
}
</style>
