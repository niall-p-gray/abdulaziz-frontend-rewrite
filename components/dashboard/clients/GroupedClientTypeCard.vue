<template>
  <div class="card">
    <div class="card__title">
      <h3>
        {{ title }}
      </h3>
    </div>
    <div v-if="clients.length > 0" class="card__content">
      <nuxt-link v-for="(client, index) in clients" :key="index" :to="`clients/${client.fields['Rec ID']}?admin=1`" class="card__content__link">
        <span class="card__content__link__text"> {{ client.fields.Name }} </span>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="card__content__link__icon" />
      </nuxt-link>
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
    clients: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>
