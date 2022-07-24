<template>
  <div class="main">
    <div class="container">
      <h1 class="text-3xl title-text">
        Howdy Kolache Links
      </h1>
      <div class="grid grid-cols-5 gap-4 justify-center mt-8">
        <div class="col-span-2">
          <employee-card :links="employeeLinks" />
          <production-team class="mt-4" :links="productionLinks" />
        </div>
        <div class="col-span-3">
          <coffee-shop-card />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'IndexPage',
  components: {
    EmployeeCard: () => import('@/components/dashboard/EmployeeCard'),
    CoffeeShopCard: () => import('@/components/dashboard/CoffeeShopCard'),
    ProductionTeam: () => import('@/components/dashboard/ProductionTeam')
  },
  computed: {
    ...mapGetters({
      pageLinks: 'home/getPageLinks'
    }),
    employeeLinks () {
      return this.pageLinks.filter(link => link.fields.Section === 'Employee Links')
    },
    productionLinks () {
      return this.pageLinks.filter(link => link.fields.Section === 'Production Team Links')
    }
  },
  async mounted () {
    try {
      await this.getPageLinks()
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    ...mapActions('home', [
      'getPageLinks'
    ])
  }
}
</script>
