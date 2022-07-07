<template>
  <div class="bg-primary min-h-screen">
    <div class="container">
      <h1 class="text-3xl title-text">
        Howdy Kolache Links
      </h1>
      <div class="grid grid-cols-5 gap-4 justify-center mt-8">
        <div class="col-span-2">
          <employee-card />
          <production-team class="mt-4" />
        </div>
        <div class="col-span-3">
          <coffee-shop-card />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  components: {
    EmployeeCard: () => import('@/components/dashboard/EmployeeCard'),
    CoffeeShopCard: () => import('@/components/dashboard/CoffeeShopCard'),
    ProductionTeam: () => import('@/components/dashboard/ProductionTeam')
  }
}
</script>
