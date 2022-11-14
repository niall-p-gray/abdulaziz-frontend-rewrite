<template>
  <div class="order">
    <div @click="expanded = !expanded" class="main-content lg:cursor-pointer">
      <div class="cell time lg:order-1">
        <div class="title">Ready time</div>
        <div class="value">{{ order.readyTime ? order.readyTime : '---' }}</div>
      </div>
      <div class="cell time lg:order-2">
        <div class="title">Delivery time</div>
        <div class="value">
          {{ order.deliveryTime ? order.deliveryTime : '---' }}
        </div>
      </div>
      <div class="cell qty lg:order-3">
        <div class="title">#</div>
        <div class="value">{{ order.qty }}</div>
      </div>
      <div class="cell delivery lg:order-6">
        <div class="title">Delivery</div>
        <div class="value">
          <div v-if="order.deliveryType">
            <div v-if="order.deliveryType.toLowerCase() === 'delivery'" >
              <img src="~/assets/icons/truck.svg" />
              <div v-if="order.deliveryDriver" class="text-xs">{{ order.deliveryDriver }}</div>
            </div>
            <img
              v-if="order.deliveryType.toLowerCase() === 'pickup'"
              src="~/assets/icons/user-check.svg"
            />
          </div>
          <div v-else>---</div>
        </div>
      </div>
      <div class="cell client lg:order-7">
        <div class="title">Client</div>
        <div class="value">
          <div class="flex justify-between items-center">
            <div>
              <p>{{ order.clientName }}</p>
              <p v-if="order.clientDetails" class="text-sm font-normal">
                {{ order.clientDetails }}
              </p>
            </div>
            <div class="actions hidden lg:flex justify-end">
              <a :href="order.editUrl" target="_blank">
                <font-awesome-icon :icon="['fas', 'pencil']" class="text-xs"/>
              </a>
              <font-awesome-icon :icon="['fas', `chevron-${expanded ? 'up' : 'down'}`]" class="text-s ml-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="order.notes" class="text-sm text-gray-500 pl-5 pt-1">{{ order.notes }}</div>
    <div :class="{expanded: expanded}" class="expandable-content">
      <div class="details">
        <div class="detail">
          <span class="title">Address</span>
          <span class="value">{{ order.address ? order.address : '---' }}</span>
        </div>
        <div class="detail">
          <span class="title">Contact name</span>
          <span class="value">{{ order.contactName  ? order.contactName : '---'}}</span>
        </div>
        <div class="detail">
          <span class="title">Contact phone number</span>
          <span class="value">{{ order.phoneNumber ? order.phoneNumber : '---' }}</span>
        </div>
        <div class="detail">
          <span class="title">Delivery note</span>
          <span class="value">{{ order.deliveryNotes ? order.deliveryNotes : '---' }}</span>
        </div>
      </div>
      <OrderProducts :order="order" />
    </div>
  </div>
</template>

<script>
import OrderProducts from '@/components/upcoming-orders/OrderProducts'
export default {
  components: {
    OrderProducts
  },
  props: {
    order: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      expanded: false
    }
  }
}
</script>
