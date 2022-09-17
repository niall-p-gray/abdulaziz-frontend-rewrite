<template>
  <div class="upcoming-orders">
    <h1 class="upcoming-orders__title">
      Upcoming Orders
    </h1>
    <div class="upcoming-orders__client-type">
      <ClientTypeFilter v-model="selectedClientTypes" :options="clientTypes" />
    </div>
    <div class="upcoming-orders__content">
      <div class="upcoming-orders__content__day">
        <div class="upcoming-orders__content__day__title">
          <h1 class="upcoming-orders__content__day__title__date">
            <mark>Mon, 3/14</mark>
          </h1>
          <h2 class="upcoming-orders__content__day__title__orders">
            3 orders
          </h2>
        </div>
        <div class="upcoming-orders__content__day__table">
          <div class="upcoming-orders__content__day__table__head">
            <p>ready time</p>
            <p>#</p>
            <p>temp</p>
            <p>del</p>
            <p>client</p>
            <p />
          </div>
          <div class="upcoming-orders__content__day__table__body">
            <div class="upcoming-orders__content__day__table__body__row">
              <p>9:00 am</p>
              <p>36</p>
              <div class="upcoming-orders__content__day__table__body__row__inline">
                <img src="~/assets/icons/warm.svg" alt="warm">
                <span>Warm</span>
              </div>
              <div class="upcoming-orders__content__day__table__body__row__delivery">
                <img class="w-10 h-10" src="~/assets/icons/truck.svg" alt="truck">
              </div>
              <p>Sean Germaine</p>
              <div class="upcoming-orders__content__day__table__body__row__delivery">
                <img class="w-6 h-6" src="~/assets/icons/pen.svg" alt="truck">
              </div>
            </div>
            <div class="upcoming-orders__content__day__table__body__row">
              <p>9:00 am</p>
              <p>36</p>
              <div class="upcoming-orders__content__day__table__body__row__inline">
                <img src="~/assets/icons/thermometer.svg" alt="room">
                <span>Room Temp</span>
              </div>
              <div class="upcoming-orders__content__day__table__body__row__delivery">
                <img class="w-10 h-10" src="~/assets/icons/user-check.svg" alt="truck">
              </div>
              <p>Sean Germaine</p>
              <div class="upcoming-orders__content__day__table__body__row__delivery">
                <img class="w-6 h-6" src="~/assets/icons/pen.svg" alt="truck">
              </div>
            </div>
            <div class="upcoming-orders__content__day__table__body__row">
              <p>9:00 am</p>
              <p>36</p>
              <div class="upcoming-orders__content__day__table__body__row__inline">
                <img src="~/assets/icons/cold.svg" alt="cold">
                <span>Cold</span>
              </div>
              <div class="upcoming-orders__content__day__table__body__row__delivery">
                <img class="w-10 h-10" src="~/assets/icons/truck.svg" alt="truck">
              </div>
              <p>Sean Germaine</p>
              <div class="upcoming-orders__content__day__table__body__row__delivery">
                <img class="w-6 h-6" src="~/assets/icons/pen.svg" alt="truck">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="upcoming-orders__content__day">
        <div class="upcoming-orders__content__day__title">
          <h1 class="upcoming-orders__content__day__title__date">
            <mark>Mon, 3/14</mark>
          </h1>
          <h2 class="upcoming-orders__content__day__title__orders">
            3 orders
          </h2>
        </div>
        <div class="upcoming-orders__content__day__table">
          <div class="upcoming-orders__content__day__table__head">
            <p>ready time</p>
            <p>#</p>
            <p>temp</p>
            <p>del</p>
            <p>client</p>
            <p />
          </div>
          <div class="upcoming-orders__content__day__table__body">
            <div class="upcoming-orders__content__day__table__body__row">
              <p>9:00 am</p>
              <p>36</p>
              <div class="upcoming-orders__content__day__table__body__row__inline">
                <img src="~/assets/icons/warm.svg" alt="warm">
                <span>Warm</span>
              </div>
              <div class="upcoming-orders__content__day__table__body__row__delivery">
                <img class="w-10 h-10" src="~/assets/icons/truck.svg" alt="truck">
              </div>
              <p>Sean Germaine</p>
              <div class="upcoming-orders__content__day__table__body__row__delivery">
                <img class="w-6 h-6" src="~/assets/icons/pen.svg" alt="truck">
              </div>
            </div>
            <div class="upcoming-orders__content__day__table__body__row">
              <p>9:00 am</p>
              <p>36</p>
              <div class="upcoming-orders__content__day__table__body__row__inline">
                <img src="~/assets/icons/thermometer.svg" alt="room">
                <span>Room Temp</span>
              </div>
              <div class="upcoming-orders__content__day__table__body__row__delivery">
                <img class="w-10 h-10" src="~/assets/icons/user-check.svg" alt="truck">
              </div>
              <p>Sean Germaine</p>
              <div class="upcoming-orders__content__day__table__body__row__delivery">
                <img class="w-6 h-6" src="~/assets/icons/pen.svg" alt="truck">
              </div>
            </div>
            <div class="upcoming-orders__content__day__table__body__row">
              <p>9:00 am</p>
              <p>36</p>
              <div class="upcoming-orders__content__day__table__body__row__inline">
                <img src="~/assets/icons/cold.svg" alt="cold">
                <span>Cold</span>
              </div>
              <div class="upcoming-orders__content__day__table__body__row__delivery">
                <img class="w-10 h-10" src="~/assets/icons/truck.svg" alt="truck">
              </div>
              <p>Sean Germaine</p>
              <div class="upcoming-orders__content__day__table__body__row__delivery">
                <img class="w-6 h-6" src="~/assets/icons/pen.svg" alt="truck">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="upcoming-orders__content__day">
        <div class="upcoming-orders__content__day__title">
          <h1 class="upcoming-orders__content__day__title__date">
            <mark>Mon, 3/14</mark>
          </h1>
          <h2 class="upcoming-orders__content__day__title__orders">
            3 orders
          </h2>
        </div>
        <div class="upcoming-orders__content__day__table">
          <div class="upcoming-orders__content__day__table__head">
            <p>ready time</p>
            <p>#</p>
            <p>temp</p>
            <p>del</p>
            <p>client</p>
            <p />
          </div>
          <div class="upcoming-orders__content__day__table__body">
            <div class="upcoming-orders__content__day__table__body__row">
              <p>9:00 am</p>
              <p>36</p>
              <div class="upcoming-orders__content__day__table__body__row__inline">
                <img src="~/assets/icons/warm.svg" alt="warm">
                <span>Warm</span>
              </div>
              <div class="upcoming-orders__content__day__table__body__row__delivery">
                <img class="w-10 h-10" src="~/assets/icons/truck.svg" alt="truck">
              </div>
              <p>Sean Germaine</p>
              <div class="upcoming-orders__content__day__table__body__row__delivery">
                <img class="w-6 h-6" src="~/assets/icons/pen.svg" alt="truck">
              </div>
            </div>
            <div class="upcoming-orders__content__day__table__body__row">
              <p>9:00 am</p>
              <p>36</p>
              <div class="upcoming-orders__content__day__table__body__row__inline">
                <img src="~/assets/icons/thermometer.svg" alt="room">
                <span>Room Temp</span>
              </div>
              <div class="upcoming-orders__content__day__table__body__row__delivery">
                <img class="w-10 h-10" src="~/assets/icons/user-check.svg" alt="truck">
              </div>
              <p>Sean Germaine</p>
              <div class="upcoming-orders__content__day__table__body__row__delivery">
                <img class="w-6 h-6" src="~/assets/icons/pen.svg" alt="truck">
              </div>
            </div>
            <div class="upcoming-orders__content__day__table__body__row">
              <p>9:00 am</p>
              <p>36</p>
              <div class="upcoming-orders__content__day__table__body__row__inline">
                <img src="~/assets/icons/cold.svg" alt="cold">
                <span>Cold</span>
              </div>
              <div class="upcoming-orders__content__day__table__body__row__delivery">
                <img class="w-10 h-10" src="~/assets/icons/truck.svg" alt="truck">
              </div>
              <p>Sean Germaine</p>
              <div class="upcoming-orders__content__day__table__body__row__delivery">
                <img class="w-6 h-6" src="~/assets/icons/pen.svg" alt="truck">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpcomingOrders',
  components: {
    ClientTypeFilter: () => import('~/components/filters/ClientTypeFilter.vue')
  },
  layout: 'dashboard',
  data () {
    return {
      clientTypes: [
        'All',
        'Coffee Shops',
        'Internal',
        'Catering',
        'Bars',
        'Retail',
        'Wholesale'
      ],
      selectedClientTypes: []
    }
  }
}
</script>

<style>

</style>
