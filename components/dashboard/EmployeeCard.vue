<template>
  <div class="card">
    <div class="card__title">
      <h3 class="title-text">
        Employee Links
      </h3>
    </div>
    <div class="card__content">
      <div class="card__content__link">
        <span class="card__content__link__text">Delivery Summary</span>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="card__content__link__icon" />
      </div>
      <div class="card__content__link">
        <span class="card__content__link__text">SOPs</span>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="card__content__link__icon" />
      </div>
      <div class="card__content__link">
        <span class="card__content__link__text">Create a New Client</span>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="card__content__link__icon" />
      </div>
      <div class="card__content__link">
        <span class="card__content__link__text">Client Emailer</span>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="card__content__link__icon" />
      </div>
      <div class="card__content__link">
        <span class="card__content__link__text">Admin Order Creation</span>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="card__content__link__icon" />
      </div>
      <div class="card__content__link">
        <span class="card__content__link__text">Delivery Route</span>
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="card__content__link__icon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeCard'
}
</script>

<style>

</style>
