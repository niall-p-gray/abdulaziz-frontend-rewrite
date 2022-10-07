<template>
  <div class="create-order">
    <h1 class="create-order__title">
      Create Order
    </h1>
    <div class="create-order__content">
      <h2 class="create-order__content__question">
        <mark>Who Is This Order For?</mark>
      </h2>
      <div class="create-order__content__form-group">
        <label for="clientName" class="create-order__content__form-group__label">
          Client Name
        </label>
        <select id="clientName" v-model="clientName" type="text" class="create-order__content__form-group__input">
          <option disabled selected>
            Client Name
          </option>
          <option v-for="client in 10" :key="client" :value="client">
            Client {{ client + 1 }}
          </option>
        </select>
        <span class="create-order__content__form-group__message">
          Can't find the client? <router-link to="">Add Client</router-link>
        </span>
      </div>
      <h2 class="create-order__content__question">
        <mark>When Should It Be Ready?</mark>
      </h2>
      <div class="create-order__content__form-group">
        <div class="grid grid-cols-2 w-2/3 gap-10">
          <div class="">
            <label for="orderDate" class="create-order__content__form-group__label">
              Order Date
            </label>
            <input name="orderDate" type="date" placeholder="Select Date" class="create-order__content__form-group__input">
          </div>
          <div class="">
            <label for="orderDate" class="create-order__content__form-group__label">
              Order Time
            </label>
            <input name="orderDate" type="time" placeholder="Select Time" class="create-order__content__form-group__input">
          </div>
        </div>
        <span class="create-order__content__form-group__message">
          This should be the date and time that the order will be ready to LEAVE the shop, whether it is being picked up by a client or if we are delivering it.
        </span>
      </div>
      <h2 class="create-order__content__question">
        <mark>How will the client get it?</mark>
      </h2>
      <div class="create-order__content__form-group">
        <div class="">
          <input id="Pickup" type="radio" value="" name="pickup_delivery" class="create-order__content__form-group__radio">
          <label for="Pickup" class="create-order__content__form-group__label">
            <span class="font-medium text-xl">Pickup</span>
            <span class="ml-5 font-light">Client will pick up at 817 Fulton</span>
          </label>
        </div>
        <div class="mt-5">
          <input id="Delivery" type="radio" value="" name="pickup_delivery" class="create-order__content__form-group__radio">
          <label for="Delivery" class="create-order__content__form-group__label">
            <span class="create-order__content__form-group__label__radio-main">Delivery</span>
            <span class="create-order__content__form-group__label__radio-second">We will handle delivery <router-link to="">See detail</router-link>
            </span>
          </label>
        </div>
      </div>
      <div class="create-order__content__form-group">
        <input placeholder="Address" type="text" class="create-order__content__form-group__input">
        <input placeholder="Apt, Ste, Unit, or Floor #" type="text" class="create-order__content__form-group__input mt-3">
        <div class="grid grid-cols-2 gap-5 mt-3">
          <input placeholder="State" type="text" class="create-order__content__form-group__input">
          <input placeholder="Zip Code" type="text" class="create-order__content__form-group__input">
        </div>
      </div>
      <h2 class="create-order__content__question">
        <mark>How Should It Be Prepared?</mark>
      </h2>
      <div class="create-order__content__form-group">
        <div class="create-order__content__form-group__row">
          <div class="flex">
            <img src="~/assets/icons/thermo-black.svg" class="w-6 h-6 mr-3">
            <p class="">
              Temperature
            </p>
          </div>
          <div class="">
            <input id="warm" type="radio" value="" name="temperature">
            <label for="warm" class="create-order__content__form-group__label">Warm</label>
          </div>
          <div class="">
            <input id="roomTemp" type="radio" value="" name="temperature">
            <label for="roomTemp" class="create-order__content__form-group__label">Room Temp</label>
          </div>
          <div class="">
            <input id="cold" type="radio" value="" name="temperature">
            <label for="cold" class="create-order__content__form-group__label">Cold</label>
          </div>
        </div>
        <div class="create-order__content__form-group__row">
          <div class="flex">
            <img src="~/assets/icons/packaging.svg" class="w-6 h-6 mr-3">
            <p class="">
              Packaging
            </p>
          </div>
          <div class="">
            <input id="4box" type="radio" value="" name="packaging">
            <label for="4box" class="create-order__content__form-group__label">4 boxes</label>
          </div>
          <div class="">
            <input id="12box" type="radio" value="" name="packaging">
            <label for="12box" class="create-order__content__form-group__label">12 boxes</label>
          </div>
          <div class="">
            <input id="ziplogBags" type="radio" value="" name="packaging">
            <label for="ziplogBags" class="create-order__content__form-group__label">Ziplog Bags</label>
          </div>
        </div>
        <div class="create-order__content__form-group__row">
          <div class="flex">
            <img src="~/assets/icons/plus-circle.svg" class="w-6 h-6 mr-3">
            <p class="">
              Include
            </p>
          </div>
          <div class="flex flex-col gap-5">
            <div class="">
              <input id="napkins" type="checkbox" value="" name="include" class="create-order__content__form-group__checkbox">
              <label for="napkins" class="create-order__content__form-group__label !text-base">Napkins</label>
            </div>
            <div class="">
              <input id="glassineBags" type="checkbox" value="" name="include" class="create-order__content__form-group__checkbox">
              <label for="glassineBags" class="create-order__content__form-group__label !text-base">Glassine Bags</label>
            </div>
          </div>
          <div class="flex flex-col gap-5">
            <div class="">
              <input id="flavorCards" type="checkbox" value="" name="include" class="create-order__content__form-group__checkbox">
              <label for="flavorCards" class="create-order__content__form-group__label !text-base">Flavor Cards</label>
            </div>
            <div class="">
              <input id="plasticware" type="checkbox" value="" name="include" class="create-order__content__form-group__checkbox">
              <label for="plasticware" class="create-order__content__form-group__label !text-base">Plasticware</label>
            </div>
          </div>
        </div>

        <div class="mt-10">
          <label class="create-order__content__form-group__label mb-2">Special Notes</label>
          <textarea class="create-order__content__form-group__input" placeholder="Add any special notes here. A friend of the shop, regular buyer, special occasion, etc." rows="5" />
        </div>
      </div>
      <h2 class="create-order__content__question">
        <mark>What Flavors Are In This Order?</mark>
      </h2>
      <div class="create-order__content__flavors">
        <div class="create-order__content__flavors__item border-t-2">
          <div class="create-order__content__flavors__item__circle" />
          <p class="create-order__content__flavors__item__name">
            Coloradough
          </p>
          <div class="create-order__content__flavors__item__count">
            <button class="create-order__content__flavors__item__count__btn">
              <img src="~/assets/icons/minus.svg" class="w-6 h-6">
            </button>
            <input class="create-order__content__flavors__item__count__input">
            <button class="create-order__content__flavors__item__count__btn">
              <img src="~/assets/icons/plus.svg" class="w-6 h-6">
            </button>
          </div>
          <button class="create-order__content__flavors__item__remove">
            <img src="~/assets/icons/trash.svg" class="w-6 h-6">
          </button>
        </div>
        <div class="create-order__content__flavors__item border-t-2">
          <div class="create-order__content__flavors__item__circle" />
          <p class="create-order__content__flavors__item__name">
            Coloradough
          </p>
          <div class="create-order__content__flavors__item__count">
            <button class="create-order__content__flavors__item__count__btn">
              <img src="~/assets/icons/minus.svg" class="w-6 h-6">
            </button>
            <input class="create-order__content__flavors__item__count__input">
            <button class="create-order__content__flavors__item__count__btn">
              <img src="~/assets/icons/plus.svg" class="w-6 h-6">
            </button>
          </div>
          <button class="create-order__content__flavors__item__remove">
            <img src="~/assets/icons/trash.svg" class="w-6 h-6">
          </button>
        </div>
        <div class="create-order__content__flavors__item">
          <div class="create-order__content__flavors__item__circle" />
          <p class="create-order__content__flavors__item__name">
            Coloradough
          </p>
          <div class="create-order__content__flavors__item__count">
            <button class="create-order__content__flavors__item__count__btn">
              <img src="~/assets/icons/minus.svg" class="w-6 h-6">
            </button>
            <input class="create-order__content__flavors__item__count__input">
            <button class="create-order__content__flavors__item__count__btn">
              <img src="~/assets/icons/plus.svg" class="w-6 h-6">
            </button>
          </div>
          <button class="create-order__content__flavors__item__remove">
            <img src="~/assets/icons/trash.svg" class="w-6 h-6">
          </button>
        </div>
        <div class="create-order__content__flavors__item">
          <div class="create-order__content__flavors__item__circle" />
          <p class="create-order__content__flavors__item__name">
            Coloradough
          </p>
          <div class="create-order__content__flavors__item__count">
            <button class="create-order__content__flavors__item__count__btn">
              <img src="~/assets/icons/minus.svg" class="w-6 h-6">
            </button>
            <input class="create-order__content__flavors__item__count__input">
            <button class="create-order__content__flavors__item__count__btn">
              <img src="~/assets/icons/plus.svg" class="w-6 h-6">
            </button>
          </div>
          <button class="create-order__content__flavors__item__remove">
            <img src="~/assets/icons/trash.svg" class="w-6 h-6">
          </button>
        </div>
        <div class="create-order__content__flavors__item">
          <div class="create-order__content__flavors__item__circle" />
          <p class="create-order__content__flavors__item__name">
            Coloradough
          </p>
          <div class="create-order__content__flavors__item__count">
            <button class="create-order__content__flavors__item__count__btn">
              <img src="~/assets/icons/minus.svg" class="w-6 h-6">
            </button>
            <input class="create-order__content__flavors__item__count__input">
            <button class="create-order__content__flavors__item__count__btn">
              <img src="~/assets/icons/plus.svg" class="w-6 h-6">
            </button>
          </div>
          <button class="create-order__content__flavors__item__remove">
            <img src="~/assets/icons/trash.svg" class="w-6 h-6">
          </button>
        </div>
        <div class="create-order__content__flavors__item">
          <div class="create-order__content__flavors__item__circle" />
          <p class="create-order__content__flavors__item__name">
            Coloradough
          </p>
          <div class="create-order__content__flavors__item__count">
            <button class="create-order__content__flavors__item__count__btn">
              <img src="~/assets/icons/minus.svg" class="w-6 h-6">
            </button>
            <input class="create-order__content__flavors__item__count__input">
            <button class="create-order__content__flavors__item__count__btn">
              <img src="~/assets/icons/plus.svg" class="w-6 h-6">
            </button>
          </div>
          <button class="create-order__content__flavors__item__remove">
            <img src="~/assets/icons/trash.svg" class="w-6 h-6">
          </button>
        </div>
        <div class="create-order__content__flavors__item">
          <div class="create-order__content__flavors__item__circle" />
          <p class="create-order__content__flavors__item__name">
            Coloradough
          </p>
          <div class="create-order__content__flavors__item__count">
            <button class="create-order__content__flavors__item__count__btn">
              <img src="~/assets/icons/minus.svg" class="w-6 h-6">
            </button>
            <input class="create-order__content__flavors__item__count__input">
            <button class="create-order__content__flavors__item__count__btn">
              <img src="~/assets/icons/plus.svg" class="w-6 h-6">
            </button>
          </div>
          <button class="create-order__content__flavors__item__remove">
            <img src="~/assets/icons/trash.svg" class="w-6 h-6">
          </button>
        </div>
        <div class="create-order__content__flavors__item">
          <div class="create-order__content__flavors__item__circle" />
          <p class="create-order__content__flavors__item__name">
            Coloradough
          </p>
          <div class="create-order__content__flavors__item__count">
            <button class="create-order__content__flavors__item__count__btn">
              <img src="~/assets/icons/minus.svg" class="w-6 h-6">
            </button>
            <input class="create-order__content__flavors__item__count__input">
            <button class="create-order__content__flavors__item__count__btn">
              <img src="~/assets/icons/plus.svg" class="w-6 h-6">
            </button>
          </div>
          <button class="create-order__content__flavors__item__remove">
            <img src="~/assets/icons/trash.svg" class="w-6 h-6">
          </button>
        </div>
      </div>
      <div class="create-order__content__total">
        <p class="">
          <b>24</b> KOLACHES SELECTED
        </p>
      </div>
      <div class="create-order__content__create-btn">
        <button>Create New Order</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'CreateOrder',
  layout: 'dashboard',
  data () {
    return {
      clientName: ''
    }
  }
}
</script>

<style>

</style>
