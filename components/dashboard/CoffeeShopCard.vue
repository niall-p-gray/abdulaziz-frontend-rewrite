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
          link: ''
        },
        {
          text: 'Groundswell (Madison)',
          link: ''
        },
        {
          text: 'Aglaia Coffee',
          link: ''
        },
        {
          text: 'Red June Cafe',
          link: ''
        },
        {
          text: 'Fuel Space @ lululemon',
          link: ''
        },
        {
          text: 'Elaine\'s Coffee Call',
          link: ''
        },
        {
          text: 'Olor Coffee Bar',
          link: ''
        },
        {
          text: 'Cafe Deko',
          link: ''
        },
        {
          text: 'Elevate',
          link: ''
        },
        {
          text: 'Elaine\'s Coffee Call',
          link: ''
        },
        {
          text: 'Olor Coffee Bar',
          link: ''
        },
        {
          text: 'Cafe Deko',
          link: ''
        },
        {
          text: 'Elevate',
          link: ''
        }
      ]
    }
  }
}
</script>

<style>

</style>
