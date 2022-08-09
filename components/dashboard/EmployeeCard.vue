<template>
  <div class="card">
    <div class="card__title">
      <h3 class="title-text">
        Employee Links
      </h3>
    </div>
    <div v-if="links.length > 0" class="card__content">
      <a v-for="(link, index) in links" :key="index" :href="link.fields.URL" target="_blank" class="card__content__link">
        <span class="card__content__link__text"> {{ link.fields.Name }} </span>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="card__content__link__icon" />
      </a>
    </div>
    <loading v-else class="justify-center w-full" />
  </div>
</template>

<script>
export default {
  name: 'EmployeeCard',
  components: {
    Loading: () => import('@/components/layout/loading')
  },
  props: {
    links: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>
