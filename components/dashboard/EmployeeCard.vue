<template>
  <div class="card">
    <div class="card__title">
      <h3 class="title-text">
        Employee Links
      </h3>
    </div>
    <div class="card__content">
      <a v-for="(link, index) in links" :key="index" :href="link.fields.URL" target="_blank" class="card__content__link">
        <span class="card__content__link__text"> {{ link.fields.Name }} </span>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="card__content__link__icon" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeCard',
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
