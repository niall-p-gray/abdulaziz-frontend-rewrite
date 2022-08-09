<template>
  <div class="card">
    <div class="card__title">
      <h3 class="title-text">
        Coffee Shop
      </h3>
    </div>
    <div v-if="coffeeShops.length > 0" class="card__content">
      <nuxt-link v-for="(shop, index) in coffeeShops" :key="index" :to="`coffee-shop/${shop.fields['Rec ID']}`" class="card__content__link">
        <span class="card__content__link__text"> {{ shop.fields.Name }} </span>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="card__content__link__icon" />
      </nuxt-link>
    </div>
    <loading v-else class="justify-center w-full" />
  </div>
</template>

<script>
export default {
  name: 'CoffeeShopCard',
  components: {
    Loading: () => import('@/components/layout/Loading')
  },
  props: {
    coffeeShops: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>
