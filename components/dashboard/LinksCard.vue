<template>
  <div class="card">
    <div class="card__title">
      <h3 class="title-text">
        {{ title }}
      </h3>
    </div>
    <div class="card__content">
      <a v-for="(link, index) in links" :key="index" :href="link.url" target="_blank" class="card__content__link">
        <span class="card__content__link__text"> {{ link.name }} </span>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="card__content__link__icon" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    links: {
      type: Array,
      required: true
    }
  }
}
</script>
