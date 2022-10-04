<template>
  <div>
    <portal to="page-title">Rewards Lookup</portal>
    <main>
      <section class="search-form-container">
        <input
          v-model="phoneNumber"
          type="search"
          @keydown.enter="search"
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
      console.log(process.env.TYPEFORM_API_KEY)
      console.log(process.env.AIRTABLE_BASE_ID)
      if (typeof process.env.TYPEFORM_API_KEY === 'undefined') {
        console.log('TYPEFORM_API_KEY is not set')
      } else {
        console.log('TYPEFORM_API_KEY is set')
      }

      if (!this.canSubmit) return

      this.loading = true
      this.error = false

      try {
        const res = await this.$axios.get(`/.netlify/functions/rewards-lookup?phone-number=${this.phoneNumber}`)

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
