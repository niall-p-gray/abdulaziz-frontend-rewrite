<template>
  <div class="card">
    <div class="card__title">
      <h3 class="title-text">
        Coffee Shop
      </h3>
    </div>
    <div class="card__content">
      <router-link v-for="(shop, index) in coffeeShops" :key="index" :to="shop.link" class="card__content__link">
        <span class="card__content__link__text"> {{ shop.text }} </span>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="card__content__link__icon" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoffeeShopCard',
  data () {
    return {
      coffeeShops: [
        {
          text: 'Muse Coffee Studio',
          link: '/coffee-shop/order'
        },
        {
          text: 'Groundswell (Madison)',
          link: '/coffee-shop/order'
        },
        {
          text: 'Aglaia Coffee',
          link: '/coffee-shop/order'
        },
        {
          text: 'Red June Cafe',
          link: '/coffee-shop/order'
        },
        {
          text: 'Fuel Space @ lululemon',
          link: '/coffee-shop/order'
        },
        {
          text: 'Elaine\'s Coffee Call',
          link: '/coffee-shop/order'
        },
        {
          text: 'Olor Coffee Bar',
          link: '/coffee-shop/order'
        },
        {
          text: 'Cafe Deko',
          link: '/coffee-shop/order'
        },
        {
          text: 'Elevate',
          link: '/coffee-shop/order'
        },
        {
          text: 'Elaine\'s Coffee Call',
          link: '/coffee-shop/order'
        },
        {
          text: 'Olor Coffee Bar',
          link: '/coffee-shop/order'
        },
        {
          text: 'Cafe Deko',
          link: '/coffee-shop/order'
        },
        {
          text: 'Elevate',
          link: '/coffee-shop/order'
        }
      ]
    }
  }
}
</script>

<style>

</style>
